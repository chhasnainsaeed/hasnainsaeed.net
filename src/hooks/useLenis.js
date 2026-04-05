import { useEffect } from 'react'

export default function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    if (prefersReduced || !isDesktop) return

    let lenis = null
    let frame = 0
    let cancelled = false
    let timeoutId = 0
    let idleId = 0

    const initialize = async () => {
      const { default: Lenis } = await import('lenis')
      if (cancelled) return

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
      })

      const raf = (time) => {
        lenis?.raf(time)
        frame = requestAnimationFrame(raf)
      }

      frame = requestAnimationFrame(raf)
    }

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => {
        void initialize()
      }, { timeout: 1200 })
    } else {
      timeoutId = window.setTimeout(() => {
        void initialize()
      }, 250)
    }

    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
      if (idleId && 'cancelRequestIdleCallback' in window) {
        window.cancelRequestIdleCallback(idleId)
      }
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])
}
