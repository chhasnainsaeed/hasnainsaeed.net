import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import BlogCard from '../components/ui/BlogCard'
import ButtonLink from '../components/ui/ButtonLink'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import SiteImage from '../components/ui/SiteImage'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { blogCategories } from '../data/blogCategories'
import { blogPosts } from '../data/blogPosts'
import { createBreadcrumbSchema, createCollectionPageSchema, createProfessionalServiceReference } from '../seo/schema'
import { getFeaturedPosts, getPostsByCategory, getRelatedServices, getTopicOutlinesByCategory, sortPostsByDate } from '../utils/content'
import { blogHubInternalLinkGroups } from '../utils/internalLinks'
import { getBlogCategoryPath, getBlogPath, getServicePath, routes } from '../utils/routes'

const sortedPosts = sortPostsByDate(blogPosts)
const featuredPosts = getFeaturedPosts(3)
const primaryFeaturedPost = featuredPosts[0] || sortedPosts[0]
const connectedServiceCount = new Set(blogCategories.flatMap((category) => category.relatedServiceSlugs)).size

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)
  const metadata = getStaticPageMetadata('blog')

  const categorySummaries = useMemo(
    () =>
      blogCategories.map((item) => ({
        ...item,
        publishedCount: getPostsByCategory(item.slug).length,
        plannedCount: getTopicOutlinesByCategory(item.slug).length,
        relatedServices: getRelatedServices(item.relatedServiceSlugs).slice(0, 3),
      })),
    []
  )

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return sortedPosts.filter((post) => {
      const byCategory = category === 'all' || post.categorySlug === category
      const searchable = [post.title, post.excerpt, post.intro, post.categoryName, post.category, ...(post.keywords || [])].join(' ').toLowerCase()
      const bySearch = !query || searchable.includes(query)
      return byCategory && bySearch
    })
  }, [searchTerm, category])

  const perPage = 6
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
        keywords={Array.from(new Set(blogCategories.flatMap((item) => item.keywordThemes)))}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Blog', path: routes.blog },
          ]),
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: routes.blog,
            items: sortedPosts.map((post) => ({
              name: post.title,
              path: getBlogPath(post.slug),
            })),
            about: [
              createProfessionalServiceReference(),
              'freelance web developer',
              'shopify developer',
              'wordpress developer',
              'webflow developer',
              'website optimization',
              'website maintenance',
            ],
            image: metadata.image,
          }),
        ]}
      />

      <PageHero
        eyebrow="Insights"
        title="SEO-ready web development insights built to support rankings, authority, and better buying decisions"
        description="This content library is structured to help businesses compare platforms, understand web development scope, improve website performance, and make clearer decisions before hiring a freelance web developer."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Insights' },
        ]}
        chips={[`${sortedPosts.length} published guides`, `${blogCategories.length} topic clusters`, `${connectedServiceCount} core service paths`]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
            <ButtonLink to={routes.services} variant="ghost">
              Explore Services
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Built for Service Rankings',
              description: 'Each topic cluster is mapped back to commercial service pages so informational content supports lead-generation intent.',
            },
            {
              title: 'Readable by AI Systems',
              description: 'Posts and category hubs use semantic headings, explicit scope, author reinforcement, and structured metadata for clearer summarization.',
            },
            {
              title: 'Planned for Topical Authority',
              description: 'The archive is organized around platform strategy, ecommerce growth, performance, implementation quality, and service-website conversion.',
            },
          ].map((item, index) => (
            <Reveal key={item.title} className="premium-card p-6 sm:p-7" delay={index * 0.05}>
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-zinc-300">{item.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Content Paths"
              title="Use the blog as a route into services, proof, and topic clusters"
              description="The archive is intentionally linked back into service pages, case studies, and category hubs so informational content supports both crawl depth and buyer progression."
              groups={blogHubInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white">Topic Clusters</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              These clusters define the blog architecture. Each one supports a distinct search intent, reinforces a clear topic area, and links directly to the most relevant service pages.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categorySummaries.map((item, index) => (
              <Reveal key={item.slug} className="premium-card h-full p-6 sm:p-7" delay={index * 0.05}>
                <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">Topic Cluster</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  <Link to={getBlogCategoryPath(item.slug)} className="transition hover:text-orange-200">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-zinc-300">{item.description}</p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-zinc-200">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{item.publishedCount} published</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{item.plannedCount} planned</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.relatedServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={getServicePath(service.slug)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200 transition hover:border-orange-300/60 hover:text-orange-200"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>

                <Link to={getBlogCategoryPath(item.slug)} className="mt-6 inline-flex text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                  Explore Cluster &rarr;
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {primaryFeaturedPost ? (
        <section className="section-pad pb-12">
          <div className="section-wrap">
            <Reveal className="premium-card overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="min-h-[280px] overflow-hidden">
                  <SiteImage
                    src={primaryFeaturedPost.image}
                    alt={primaryFeaturedPost.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                <div className="p-7 sm:p-10">
                  <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">Featured Guide</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-zinc-200">
                    <Link
                      to={getBlogCategoryPath(primaryFeaturedPost.categorySlug)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:border-orange-300/60 hover:text-orange-200"
                    >
                      {primaryFeaturedPost.categoryName}
                    </Link>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">{primaryFeaturedPost.readTime}</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold text-white">
                    <Link to={getBlogPath(primaryFeaturedPost.slug)} className="transition hover:text-orange-200">
                      {primaryFeaturedPost.title}
                    </Link>
                  </h2>
                  <p className="mt-4 text-zinc-300">{primaryFeaturedPost.excerpt}</p>
                  <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                    {primaryFeaturedPost.keyTakeaways.slice(0, 3).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink to={getBlogPath(primaryFeaturedPost.slug)}>Read Featured Guide</ButtonLink>
                    <ButtonLink to={routes.contact} variant="ghost">
                      Discuss a Similar Need
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-16">
        <div className="section-wrap space-y-7">
          <Reveal className="premium-card p-5 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
              <input
                type="text"
                placeholder="Search by topic, platform, service, or keyword"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value)
                  setPage(1)
                }}
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm ${category === 'all' ? 'bg-orange-500 text-black' : 'border border-white/15 bg-white/5 text-zinc-300'}`}
                  onClick={() => {
                    setCategory('all')
                    setPage(1)
                  }}
                >
                  All Topics
                </button>

                {categorySummaries.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    className={`rounded-full px-4 py-2 text-sm ${category === item.slug ? 'bg-orange-500 text-black' : 'border border-white/15 bg-white/5 text-zinc-300'}`}
                    onClick={() => {
                      setCategory(item.slug)
                      setPage(1)
                    }}
                  >
                    {item.name}
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
            <Reveal className="premium-card p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">No guides matched that filter</h2>
              <p className="mt-3 max-w-2xl text-zinc-300">
                Try a different keyword, switch topic clusters, or go straight to the service pages if you already know what kind of implementation help you need.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to={routes.services}>See Services</ButtonLink>
                <ButtonLink to={routes.contact} variant="ghost">
                  Book Consultation
                </ButtonLink>
              </div>
            </Reveal>
          )}

          {totalPages > 1 ? (
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
          ) : null}
        </div>
      </section>
    </>
  )
}
