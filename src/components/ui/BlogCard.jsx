import { Link } from 'react-router-dom'
import { getBlogPath } from '../../utils/routes'

export default function BlogCard({ post }) {
  return (
    <article className="group premium-card overflow-hidden">
      <Link to={getBlogPath(post.slug)} className="block h-44 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="relative h-full">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-zinc-100">
            {post.category}
          </div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-3 text-balance text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">
          <Link to={getBlogPath(post.slug)} className="transition group-hover:text-orange-200">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-zinc-300">{post.excerpt}</p>
        <p className="mt-4 text-xs text-zinc-500">{post.displayDate || post.date}</p>
        <Link to={getBlogPath(post.slug)} className="mt-4 inline-flex text-sm font-semibold text-orange-300">
          Read Guide &rarr;
        </Link>
      </div>
    </article>
  )
}
