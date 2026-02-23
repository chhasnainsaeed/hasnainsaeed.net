import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frameId
    const start = performance.now()
    const duration = 1400

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [started, value])

  return (
    <span ref={ref} className="text-3xl font-bold text-white sm:text-4xl">
      {count}
      {suffix}
    </span>
  )
}
