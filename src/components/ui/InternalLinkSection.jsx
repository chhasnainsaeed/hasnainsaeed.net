import { Link } from 'react-router-dom'

export default function InternalLinkSection({
  eyebrow = 'Internal Paths',
  title,
  description,
  groups = [],
  columnsClassName = 'xl:grid-cols-3',
  className = '',
}) {
  const visibleGroups = groups.filter((group) => group?.links?.length)

  if (!visibleGroups.length) return null

  return (
    <section className={className}>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
          {description ? <p className="mt-3 max-w-3xl text-zinc-300">{description}</p> : null}
        </div>

        <div className={`grid gap-5 md:grid-cols-2 ${columnsClassName}`}>
          {visibleGroups.map((group) => (
            <nav key={group.title} aria-label={group.title} className="premium-card h-full p-6 sm:p-7">
              <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
              {group.description ? <p className="mt-3 text-sm text-zinc-300">{group.description}</p> : null}
              <ul className="mt-5 space-y-4">
                {group.links.map((item) => (
                  <li key={`${group.title}-${item.to}`}>
                    <Link to={item.to} className="text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                      {item.label}
                    </Link>
                    {item.note ? <p className="mt-1 text-sm text-zinc-400">{item.note}</p> : null}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  )
}
