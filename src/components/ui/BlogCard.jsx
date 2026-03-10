import { Link } from 'react-router-dom'
import { getBlogCategoryPath, getBlogPath } from '../../utils/routes'
import SiteImage from './SiteImage'

export default function BlogCard({ post }) {
  return (
    <article className="group premium-card overflow-hidden">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <SiteImage
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex rounded-full border border-white/12 bg-black/45 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-100 backdrop-blur">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
          <Link to={getBlogCategoryPath(post.categorySlug)} className="transition hover:text-orange-200">
            {post.categoryName}
          </Link>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-white">
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
