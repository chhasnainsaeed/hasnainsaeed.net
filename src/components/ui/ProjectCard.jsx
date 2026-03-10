import { Link } from 'react-router-dom'
import { getProjectPath } from '../../utils/routes'
import SiteImage from './SiteImage'

export default function ProjectCard({ project }) {
  return (
    <article className="group premium-card overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
        <SiteImage
          src={project.cover}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-zinc-100">
          {project.platform}
        </div>
        <div className="absolute right-4 top-4 rounded-full border border-orange-300/45 bg-orange-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-200">
          {project.resultBadge}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400">
          <span>{project.platform}</span>
          <span>|</span>
          <span>{project.clientType || project.category}</span>
          <span>|</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{project.shortResult}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-zinc-500">{project.industry}</p>
        <Link to={getProjectPath(project.slug)} className="mt-5 inline-flex text-sm font-semibold text-orange-300">
          Read Case Study &rarr;
        </Link>
      </div>
    </article>
  )
}
