import { useState } from 'react'

export default function DetailMediaFrame({
  src,
  alt,
  fallback,
  loading = 'eager',
  className = '',
  imageClassName = '',
  maxHeightClass = 'max-h-[52rem]',
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`premium-card p-3 sm:p-4 ${className}`}>
      <div className="flex items-start justify-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,12,0.95),rgba(21,11,5,0.92))]">
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            loading={loading}
            className={`mx-auto h-auto w-auto max-w-full ${maxHeightClass} ${imageClassName}`.trim()}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex min-h-[16rem] w-full items-center justify-center px-6 py-12 text-center text-sm text-zinc-400">{fallback}</div>
        )}
      </div>
    </div>
  )
}
