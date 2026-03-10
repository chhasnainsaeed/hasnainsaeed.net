export default function AuthorityGridSection({
  eyebrow = 'Authority Signals',
  title,
  description,
  items = [],
  columnsClassName = 'xl:grid-cols-4',
}) {
  if (!items.length) return null

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-zinc-300">{description}</p> : null}
      </div>

      <div className={`grid gap-5 md:grid-cols-2 ${columnsClassName}`}>
        {items.map((item, index) => (
          <article key={`${item.title}-${index}`} className="premium-card h-full p-6 sm:p-7">
            {item.eyebrow ? <p className="text-xs uppercase tracking-[0.18em] text-orange-200">{item.eyebrow}</p> : null}
            <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
            {item.description ? <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p> : null}

            {item.list?.length ? (
              <ul className="mt-5 space-y-3 text-sm text-zinc-200">
                {item.list.map((entry) => (
                  <li key={entry}>- {entry}</li>
                ))}
              </ul>
            ) : null}

            {item.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            {item.note ? <p className="mt-5 text-sm text-zinc-400">{item.note}</p> : null}
          </article>
        ))}
      </div>
    </div>
  )
}
