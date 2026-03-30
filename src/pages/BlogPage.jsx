import { useMemo, useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import BlogCard from '../components/ui/BlogCard'
import ButtonLink from '../components/ui/ButtonLink'
import { blogPosts } from '../data/blogPosts'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCollectionPageSchema } from '../seo/schema'
import { getBlogPath, routes } from '../utils/routes'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const metadata = getStaticPageMetadata('blog')
  const categories = useMemo(() => ['All', ...new Set(blogPosts.map((post) => post.category))], [])

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const byCategory = category === 'All' || post.category === category
      const searchable = [post.title, post.excerpt, ...(post.keywords || [])].join(' ').toLowerCase()
      const bySearch = searchable.includes(searchTerm.trim().toLowerCase())
      return byCategory && bySearch
    })
  }, [searchTerm, category])

  const perPage = 3
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const visible = filtered.slice((safePage - 1) * perPage, safePage * perPage)

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        pathname={metadata.pathname}
        ogTitle={metadata.ogTitle}
        ogDescription={metadata.ogDescription}
        twitterTitle={metadata.twitterTitle}
        twitterDescription={metadata.twitterDescription}
        image={metadata.image}
        jsonLd={[
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: routes.blog,
            image: metadata.image,
            items: blogPosts.map((post) => ({
              name: post.title,
              path: getBlogPath(post.slug),
            })),
            about: ['Shopify guides', 'WordPress guides', 'Webflow guides', 'website QA', 'UI implementation'],
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Blog', path: routes.blog },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Blog"
        title="Insights on Development, Optimization, and QA"
        description="Published guides on Shopify, WordPress, Webflow, launch QA, and frontend implementation quality."
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

          {visible.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="premium-card p-7 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">No articles matched that filter</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">Try a broader keyword or switch categories to explore the full archive.</p>
            </Reveal>
          )}

          <Reveal className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`page-${index + 1}`}
                type="button"
                onClick={() => setPage(index + 1)}
                className={`h-9 w-9 rounded-full text-sm ${safePage === index + 1 ? 'bg-orange-500 text-black' : 'border border-white/15 text-zinc-300'}`}
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
            <h2 className="text-3xl font-semibold text-white">Need these improvements applied on a live website?</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">
              The guides explain the thinking. The next step is implementation, cleanup, or QA support on the pages that are already affecting leads or sales.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Review Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
