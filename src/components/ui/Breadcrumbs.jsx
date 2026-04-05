import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.name}-${item.path || index}`} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="font-medium text-white">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="transition hover:text-orange-200">
                  {item.name}
                </Link>
              )}
              {!isLast ? <span className="text-zinc-600">/</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
