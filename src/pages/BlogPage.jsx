import { useMemo, useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import BlogCard from '../components/ui/BlogCard'
import { blogPosts } from '../data/blogPosts'

const categories = ['All', 'Shopify', 'WordPress', 'Webflow', 'QA', 'UI/UX']

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const byCategory = category === 'All' || post.category === category
      const bySearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
      return byCategory && bySearch
    })
  }, [searchTerm, category])

  const perPage = 3
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visible = filtered.slice((page - 1) * perPage, page * perPage)

  document.title = 'Blog | Hasnain Saeed'

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights on Development, Optimization, and QA"
        description="UI-ready blog structure with search and category filters for future CMS/API integration."
      />

      <section className="section-pad pb-16">
        <div className="section-wrap space-y-7">
          <Reveal className="premium-card p-5 sm:p-6">
            <div className="grid gap-3 lg:grid-cols-[1.4fr_2fr]">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  setPage(1)
                }}
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm ${category === item ? 'bg-orange-500 text-black' : 'border border-white/15 bg-white/5 text-zinc-300'}`}
                    onClick={() => {
                      setCategory(item)
                      setPage(1)
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>

          <Reveal className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`page-${index + 1}`}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`h-9 w-9 rounded-full text-sm ${page === index + 1 ? 'bg-orange-500 text-black' : 'border border-white/15 text-zinc-300'}`}
              >
                {index + 1}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-18">
        <div className="section-wrap">
          <Reveal className="premium-card p-7 sm:p-10">
            <h2 className="text-3xl font-semibold text-white">Join the Newsletter</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">Get practical development and optimization insights. Placeholder UI ready for email integration.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
              <button type="button" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black">
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
