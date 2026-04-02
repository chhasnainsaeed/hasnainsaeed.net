<?php

declare(strict_types=1);

// Place contact-form-config.php above public_html when possible.
// Supported config keys:
// CONTACT_RECIPIENT_EMAIL, CONTACT_FROM_EMAIL, CONTACT_FROM_NAME, CONTACT_BACKUP_DIR
// SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_SECURE, SMTP_TIMEOUT
// CONTACT_ALLOW_MAIL_FALLBACK=1 to allow PHP mail() if SMTP is configured but unavailable

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    echo json_encode($payload);
    exit;
}

function load_runtime_config(): array
{
    $candidates = [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . 'contact-form-config.php',
        __DIR__ . DIRECTORY_SEPARATOR . 'contact-form-config.php',
    ];

    foreach ($candidates as $path) {
        if (!is_file($path)) {
            continue;
        }

        $loaded = require $path;
        if (is_array($loaded)) {
            return $loaded;
        }
    }

    return [];
}

function get_config(array $config, string $key, $default = '')
{
    $envValue = getenv($key);
    if ($envValue !== false && $envValue !== '') {
        return $envValue;
    }

    if (array_key_exists($key, $config) && $config[$key] !== '') {
        return $config[$key];
    }

    return $default;
}

function clean_text($value, int $maxLength = 500): string
{
    $text = trim((string) $value);
    $text = preg_replace('/[\r\n]+/', ' ', $text) ?? '';
    return function_exists('mb_substr') ? mb_substr($text, 0, $maxLength) : substr($text, 0, $maxLength);
}

function clean_multiline($value, int $maxLength = 5000): string
{
    $text = trim((string) $value);
    $text = str_replace("\r\n", "\n", $text);
    $text = str_replace("\r", "\n", $text);
    $text = preg_replace("/\n{3,}/", "\n\n", $text) ?? '';
    return function_exists('mb_substr') ? mb_substr($text, 0, $maxLength) : substr($text, 0, $maxLength);
}

function sanitize_header_text(string $value, int $maxLength = 180): string
{
    $value = clean_text($value, $maxLength);
    return trim(str_replace(['"', '<', '>'], '', $value));
}

function encode_mime_header(string $value): string
{
    $value = sanitize_header_text($value, 300);
    if ($value === '') {
        return '';
    }

    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n");
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function create_reference_id(): string
{
    return gmdate('Ymd_His') . '_' . substr(str_replace('.', '', uniqid('', true)), -10);
}

function ensure_directory(string $directory): bool
{
    if (is_dir($directory)) {
        return is_writable($directory);
    }

    return @mkdir($directory, 0755, true) || is_dir($directory);
}

function build_backup_directory_candidates(array $config): array
{
    $configuredDirectory = trim((string) get_config($config, 'CONTACT_BACKUP_DIR', ''));
    if ($configuredDirectory !== '') {
        return [$configuredDirectory];
    }

    return [
        dirname(__DIR__) . DIRECTORY_SEPARATOR . 'contact-form-leads',
        __DIR__ . DIRECTORY_SEPARATOR . 'contact-form-leads',
    ];
}

function save_lead_backup(array $config, array $record): array
{
    $encoded = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) {
        return [
            'success' => false,
            'path' => '',
            'error' => 'Lead backup encoding failed.',
        ];
    }

    foreach (build_backup_directory_candidates($config) as $directory) {
        if (!ensure_directory($directory)) {
            continue;
        }

        $path = rtrim($directory, '\\/') . DIRECTORY_SEPARATOR . $record['reference'] . '.json';
        $bytesWritten = @file_put_contents($path, $encoded, LOCK_EX);

        if ($bytesWritten !== false) {
            return [
                'success' => true,
                'path' => $path,
                'error' => '',
            ];
        }
    }

    return [
        'success' => false,
        'path' => '',
        'error' => 'Lead backup storage is unavailable.',
    ];
}

function update_lead_backup(string $path, array $record): void
{
    if ($path === '') {
        return;
    }

    $encoded = json_encode($record, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) {
        return;
    }

    @file_put_contents($path, $encoded, LOCK_EX);
}

function normalize_smtp_secure_setting(array $config): string
{
    $secure = strtolower(trim((string) get_config($config, 'SMTP_SECURE', 'tls')));
    if (!in_array($secure, ['ssl', 'tls', 'none'], true)) {
        return 'tls';
    }

    return $secure;
}

function smtp_read_response($socket): array
{
    $message = '';
    $statusCode = 0;

    while (($line = fgets($socket, 515)) !== false) {
        $message .= $line;

        if (preg_match('/^(\d{3})([ -])/', $line, $matches) === 1) {
            $statusCode = (int) $matches[1];
            if ($matches[2] === ' ') {
                break;
            }
        }
    }

    if ($message === '') {
        throw new RuntimeException('SMTP server returned an empty response.');
    }

    return [
        'code' => $statusCode,
        'message' => trim($message),
    ];
}

function smtp_expect($socket, array $expectedCodes): array
{
    $response = smtp_read_response($socket);
    if (!in_array($response['code'], $expectedCodes, true)) {
        throw new RuntimeException('SMTP error ' . $response['code'] . ': ' . $response['message']);
    }

    return $response;
}

function smtp_write_line($socket, string $line): void
{
    $written = fwrite($socket, $line . "\r\n");
    if ($written === false) {
        throw new RuntimeException('Unable to write to the SMTP server.');
    }
}

function smtp_command($socket, string $command, array $expectedCodes): array
{
    smtp_write_line($socket, $command);
    return smtp_expect($socket, $expectedCodes);
}

function format_smtp_message(
    string $recipient,
    string $fromEmail,
    string $fromName,
    string $replyToName,
    string $replyToEmail,
    string $subject,
    string $body
): string {
    $messageIdDomain = 'localhost';

    if (strpos($fromEmail, '@') !== false) {
        $parts = explode('@', $fromEmail, 2);
        $messageIdDomain = preg_replace('/[^A-Za-z0-9.-]/', '', $parts[1]) ?: 'localhost';
    }

    $headers = [
        'Date: ' . gmdate(DATE_RFC2822),
        'To: <' . $recipient . '>',
        'From: ' . encode_mime_header($fromName) . ' <' . $fromEmail . '>',
        'Reply-To: ' . encode_mime_header($replyToName) . ' <' . $replyToEmail . '>',
        'Message-ID: <' . uniqid('', true) . '@' . $messageIdDomain . '>',
        'Subject: ' . encode_mime_header($subject),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    $normalizedBody = str_replace("\r\n", "\n", $body);
    $normalizedBody = str_replace("\r", "\n", $normalizedBody);
    $normalizedBody = preg_replace('/^\./m', '..', $normalizedBody) ?? $normalizedBody;
    $normalizedBody = str_replace("\n", "\r\n", $normalizedBody);

    return implode("\r\n", $headers) . "\r\n\r\n" . $normalizedBody;
}

function send_via_smtp(
    array $config,
    string $recipient,
    string $fromEmail,
    string $fromName,
    string $replyToName,
    string $replyToEmail,
    string $subject,
    string $body
): array {
    $host = trim((string) get_config($config, 'SMTP_HOST', ''));
    $username = trim((string) get_config($config, 'SMTP_USERNAME', ''));
    $password = (string) get_config($config, 'SMTP_PASSWORD', '');

    if ($host === '' || $username === '' || $password === '') {
        return [
            'success' => false,
            'transport' => 'smtp',
            'skipped' => true,
            'error' => 'SMTP is not configured yet.',
        ];
    }

    $secure = normalize_smtp_secure_setting($config);
    $port = (int) get_config($config, 'SMTP_PORT', $secure === 'ssl' ? 465 : 587);
    $timeout = (int) get_config($config, 'SMTP_TIMEOUT', 20);
    $connectScheme = $secure === 'ssl' ? 'ssl' : 'tcp';
    $remoteSocket = $connectScheme . '://' . $host . ':' . $port;
    $context = stream_context_create();

    $errorNumber = 0;
    $errorMessage = '';
    $socket = @stream_socket_client($remoteSocket, $errorNumber, $errorMessage, $timeout, STREAM_CLIENT_CONNECT, $context);

    if (!$socket) {
        return [
            'success' => false,
            'transport' => 'smtp',
            'skipped' => false,
            'error' => 'Unable to connect to the SMTP server: ' . $errorMessage,
        ];
    }

    stream_set_timeout($socket, $timeout);

    try {
        smtp_expect($socket, [220]);

        $ehloName = preg_replace('/[^A-Za-z0-9.-]/', '', (string) ($_SERVER['HTTP_HOST'] ?? 'localhost')) ?: 'localhost';
        smtp_command($socket, 'EHLO ' . $ehloName, [250]);

        if ($secure === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            $cryptoEnabled = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            if ($cryptoEnabled !== true) {
                throw new RuntimeException('Unable to start TLS encryption with the SMTP server.');
            }

            smtp_command($socket, 'EHLO ' . $ehloName, [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $recipient . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $messagePayload = format_smtp_message($recipient, $fromEmail, $fromName, $replyToName, $replyToEmail, $subject, $body);
        $dataWritten = fwrite($socket, $messagePayload . "\r\n.\r\n");

        if ($dataWritten === false) {
            throw new RuntimeException('Unable to send the message body to the SMTP server.');
        }

        smtp_expect($socket, [250]);
        smtp_command($socket, 'QUIT', [221]);
        fclose($socket);

        return [
            'success' => true,
            'transport' => 'smtp',
            'skipped' => false,
            'error' => '',
        ];
    } catch (Throwable $exception) {
        fclose($socket);

        return [
            'success' => false,
            'transport' => 'smtp',
            'skipped' => false,
            'error' => $exception->getMessage(),
        ];
    }
}

function send_via_mail_function(
    string $recipient,
    string $fromEmail,
    string $fromName,
    string $replyToName,
    string $replyToEmail,
    string $subject,
    string $body
): array {
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . sanitize_header_text($fromName, 120) . ' <' . $fromEmail . '>',
        'Reply-To: ' . sanitize_header_text($replyToName, 120) . ' <' . $replyToEmail . '>',
    ];

    $sent = @mail($recipient, $subject, $body, implode("\r\n", $headers));

    return [
        'success' => $sent,
        'transport' => 'mail',
        'skipped' => false,
        'error' => $sent ? '' : 'PHP mail() could not hand off the message to the mail server.',
    ];
}

function send_lead_email(
    array $config,
    string $recipient,
    string $fromEmail,
    string $fromName,
    string $replyToName,
    string $replyToEmail,
    string $subject,
    string $body
): array {
    $smtpResult = send_via_smtp($config, $recipient, $fromEmail, $fromName, $replyToName, $replyToEmail, $subject, $body);
    if ($smtpResult['success']) {
        return $smtpResult;
    }

    if (!$smtpResult['skipped']) {
        $allowMailFallback = (string) get_config($config, 'CONTACT_ALLOW_MAIL_FALLBACK', '0') === '1';
        if (!$allowMailFallback) {
            return $smtpResult;
        }
    }

    return send_via_mail_function($recipient, $fromEmail, $fromName, $replyToName, $replyToEmail, $subject, $body);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, [
        'success' => false,
        'message' => 'Method not allowed.',
    ]);
}

$config = load_runtime_config();
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    $data = $_POST;
}

$recipient = trim((string) get_config($config, 'CONTACT_RECIPIENT_EMAIL', 'hello@hasnainsaeed.net'));
$fromEmail = trim((string) get_config($config, 'CONTACT_FROM_EMAIL', $recipient));
$fromName = sanitize_header_text((string) get_config($config, 'CONTACT_FROM_NAME', 'Website Contact Form'), 120);

$honeypot = clean_text($data['companyWebsite'] ?? '', 100);
if ($honeypot !== '') {
    respond(200, [
        'success' => true,
        'message' => 'Thanks. Your inquiry was sent.',
    ]);
}

$name = clean_text($data['name'] ?? '', 120);
$email = clean_text($data['email'] ?? '', 180);
$company = clean_text($data['company'] ?? '', 180);
$websiteUrl = clean_text($data['websiteUrl'] ?? '', 500);
$projectType = clean_text($data['projectType'] ?? '', 180);
$budget = clean_text($data['budgetLabel'] ?? ($data['budget'] ?? ''), 180);
$timeline = clean_text($data['timelineLabel'] ?? ($data['timeline'] ?? ''), 180);
$message = clean_multiline($data['message'] ?? '', 5000);
$submittedFrom = clean_text($data['submittedFrom'] ?? '', 500);
$submittedAt = clean_text($data['submittedAt'] ?? '', 120);
$receivedAt = $submittedAt !== '' ? $submittedAt : gmdate('c');

if ($name === '' || $email === '' || $projectType === '' || $message === '') {
    respond(422, [
        'success' => false,
        'message' => 'Please complete the required fields.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, [
        'success' => false,
        'message' => 'Please enter a valid email address.',
    ]);
}

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    respond(500, [
        'success' => false,
        'message' => 'The recipient mailbox is not configured correctly.',
    ]);
}

if (!filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    $fromEmail = $recipient;
}

$reference = create_reference_id();
$subject = sprintf('New Project Inquiry: %s - %s', $projectType, $name);
$bodyLines = [
    'A new project inquiry was submitted from the website.',
    'Reference: ' . $reference,
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'Website or Design Link: ' . ($websiteUrl !== '' ? $websiteUrl : 'Not provided'),
    'Project Type: ' . $projectType,
    'Budget: ' . ($budget !== '' ? $budget : 'Not provided'),
    'Timeline: ' . ($timeline !== '' ? $timeline : 'Not provided'),
    '',
    'Project Brief:',
    $message,
    '',
    'Technical Details:',
    'Submitted At: ' . $receivedAt,
    'Submitted From: ' . ($submittedFrom !== '' ? $submittedFrom : 'Not provided'),
    'Host: ' . ($_SERVER['HTTP_HOST'] ?? 'Unknown'),
    'IP Address: ' . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown'),
    'User Agent: ' . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'),
];
$body = implode("\n", $bodyLines);

$leadRecord = [
    'reference' => $reference,
    'receivedAt' => $receivedAt,
    'recipient' => $recipient,
    'lead' => [
        'name' => $name,
        'email' => $email,
        'company' => $company,
        'websiteUrl' => $websiteUrl,
        'projectType' => $projectType,
        'budget' => $budget,
        'timeline' => $timeline,
        'message' => $message,
    ],
    'meta' => [
        'submittedFrom' => $submittedFrom,
        'host' => $_SERVER['HTTP_HOST'] ?? '',
        'ipAddress' => $_SERVER['REMOTE_ADDR'] ?? '',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
    ],
];

$backupResult = save_lead_backup($config, $leadRecord);
$deliveryResult = send_lead_email($config, $recipient, $fromEmail, $fromName, $name, $email, $subject, $body);

$leadRecord['backup'] = [
    'saved' => $backupResult['success'],
    'path' => $backupResult['path'],
    'error' => $backupResult['error'],
];
$leadRecord['delivery'] = [
    'success' => $deliveryResult['success'],
    'transport' => $deliveryResult['transport'],
    'error' => $deliveryResult['error'],
];

if ($backupResult['success']) {
    update_lead_backup($backupResult['path'], $leadRecord);
}

if ($deliveryResult['success']) {
    $messageText = 'Thanks. Your inquiry was sent successfully.';
    if ($backupResult['success']) {
        $messageText .= ' Reference: ' . $reference . '.';
    }

    respond(200, [
        'success' => true,
        'message' => $messageText,
        'reference' => $reference,
        'transport' => $deliveryResult['transport'],
    ]);
}

if ($backupResult['success']) {
    respond(502, [
        'success' => false,
        'message' => 'Your inquiry was received and saved with reference ' . $reference . ', but email delivery failed. Please also email ' . $recipient . ' directly while SMTP is checked.',
        'reference' => $reference,
        'transport' => $deliveryResult['transport'],
        'error' => $deliveryResult['error'],
    ]);
}

respond(500, [
    'success' => false,
    'message' => 'The inquiry could not be delivered or saved. Please email ' . $recipient . ' directly.',
    'reference' => $reference,
    'transport' => $deliveryResult['transport'],
    'error' => $deliveryResult['error'],
]);
