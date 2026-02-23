import { useState } from 'react'

export default function FaqAccordion({ items }) {
  const [active, setActive] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = active === index
        return (
          <article key={item.question} className="premium-card overflow-hidden">
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setActive(isOpen ? -1 : index)}
            >
              <span className="font-semibold text-white">{item.question}</span>
              <span className="text-orange-300">{isOpen ? '-' : '+'}</span>
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm text-zinc-300">{item.answer}</p> : null}
          </article>
        )
      })}
    </div>
  )
}
