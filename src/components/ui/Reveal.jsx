import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, className = '', delay = 0, priority = false }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(priority)

  useEffect(() => {
    if (priority) {
      setVisible(true)
      return undefined
    }

    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={ref}
      className={`reveal-ready ${visible ? 'reveal-visible' : 'reveal-hidden'} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
