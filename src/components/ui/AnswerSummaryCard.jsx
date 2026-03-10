export default function AnswerSummaryCard({
  eyebrow = 'Direct Answer',
  title,
  answer,
  facts = [],
  titleAs = 'h2',
  className = '',
  children = null,
}) {
  const HeadingTag = titleAs

  return (
    <article className={`premium-card p-7 sm:p-8 ${className}`}>
      <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">{eyebrow}</p>
      <HeadingTag className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</HeadingTag>
      <p className="mt-4 text-zinc-300">{answer}</p>

      {facts.length ? (
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.term} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">{fact.term}</dt>
              <dd className="mt-2 text-sm text-zinc-100">{fact.description}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  )
}
