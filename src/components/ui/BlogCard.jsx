export default function BlogCard({ post }) {
  return (
    <article className="group premium-card overflow-hidden">
      <div className="h-44 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="h-full bg-gradient-to-br from-orange-500/20 to-transparent transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
        <p className="mt-2 text-sm text-zinc-300">{post.excerpt}</p>
        <p className="mt-4 text-xs text-zinc-500">{post.date}</p>
      </div>
    </article>
  )
}
