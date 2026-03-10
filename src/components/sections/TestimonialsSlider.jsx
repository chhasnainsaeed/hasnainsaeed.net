import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { testimonials } from '../../data/testimonials'

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [])

  const current = testimonials[index]
  const next = testimonials[(index + 1) % testimonials.length]

  const goNext = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="premium-card p-7 sm:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
          >
            <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-orange-200">
              {current.stat}
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{current.title}</h3>
            <p className="mt-4 text-lg text-zinc-100">{current.quote}</p>
            <p className="mt-4 text-sm text-zinc-300">{current.supportingText}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 rounded-full transition ${dotIndex === index ? 'w-8 bg-orange-400' : 'w-2.5 bg-white/30'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={goPrev} className="h-9 w-9 rounded-full border border-white/20 text-zinc-200 hover:border-orange-300">
              &larr;
            </button>
            <button type="button" onClick={goNext} className="h-9 w-9 rounded-full border border-white/20 text-zinc-200 hover:border-orange-300">
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div className="premium-card hidden p-6 lg:block">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Up Next</p>
        <p className="mt-2 text-base text-zinc-200">{next.title}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-orange-300">{next.stat}</p>
        <p className="mt-4 text-sm text-zinc-400">{next.supportingText}</p>
      </div>
    </div>
  )
}
