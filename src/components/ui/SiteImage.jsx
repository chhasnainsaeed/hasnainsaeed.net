export default function SiteImage({
  src,
  alt,
  className = '',
  width = 1200,
  height = 800,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  sizes,
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      sizes={sizes}
      className={className}
    />
  )
}
