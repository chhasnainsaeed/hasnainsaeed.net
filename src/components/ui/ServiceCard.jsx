import { Link } from 'react-router-dom'
import { getServicePath } from '../../utils/routes'

export default function ServiceCard({ service }) {
  return (
    <article className="group premium-card relative flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-[0_18px_45px_rgba(255,115,0,0.14)]">
      <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/75 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/12 text-xs font-bold text-orange-300 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
        {service.icon}
      </span>
      <h3 className="mt-4 text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm text-zinc-300">{service.summary}</p>
      <Link
        to={getServicePath(service.slug)}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange-300 transition group-hover:text-orange-200"
      >
        Learn More <span className="transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
      </Link>
    </article>
  )
}
