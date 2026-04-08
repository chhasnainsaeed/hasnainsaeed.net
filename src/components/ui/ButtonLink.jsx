import { Link } from 'react-router-dom'
import { getRouteHref } from '../../utils/routes'

export default function ButtonLink({ to, href, children, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400'
  const styles = {
    primary:
      'bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 text-black shadow-[0_14px_34px_rgba(255,115,0,0.35)] hover:scale-[1.03] hover:shadow-[0_18px_40px_rgba(255,115,0,0.42)]',
    ghost:
      'border border-orange-300/70 bg-white/[0.04] text-zinc-100 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-400/14 hover:shadow-[0_12px_30px_rgba(255,115,0,0.25)]',
  }

  if (href) {
    return (
      <a href={href} className={`${base} ${styles[variant]} ${className}`} {...props}>
        {children}
      </a>
    )
  }

  const resolvedTo = typeof to === 'string' ? getRouteHref(to) : to

  return (
    <Link to={resolvedTo} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Link>
  )
}
