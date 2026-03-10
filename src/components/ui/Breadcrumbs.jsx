import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="transition hover:text-orange-200">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-zinc-200' : ''}>{item.label}</span>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
