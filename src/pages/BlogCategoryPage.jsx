import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import BlogCard from '../components/ui/BlogCard'
import ButtonLink from '../components/ui/ButtonLink'
import ServiceCard from '../components/ui/ServiceCard'
import Seo from '../seo/Seo'
import { getBlogCategoryMetadata } from '../seo/metadata'
import { getBlogCategoryBySlug } from '../data/blogCategories'
import { createBreadcrumbSchema, createCollectionPageSchema, createProfessionalServiceReference } from '../seo/schema'
import { getRelatedServices, getPostsByCategory, getTopicOutlinesByCategory } from '../utils/content'
import { getBlogCategoryPath, getBlogPath, getServicePath, routes } from '../utils/routes'

export default function BlogCategoryPage() {
  const { slug } = useParams()
  const category = getBlogCategoryBySlug(slug)

  if (!category) return <Navigate to={routes.blog} replace />

  const publishedPosts = getPostsByCategory(category.slug)
  const plannedTopics = getTopicOutlinesByCategory(category.slug)
  const relatedServices = getRelatedServices(category.relatedServiceSlugs)
  const metadata = getBlogCategoryMetadata(category)

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
        keywords={metadata.keywords}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Insights', path: routes.blog },
            { name: category.name, path: getBlogCategoryPath(category.slug) },
          ]),
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: getBlogCategoryPath(category.slug),
            items: publishedPosts.map((post) => ({
              name: post.title,
              path: getBlogPath(post.slug),
            })),
            about: [createProfessionalServiceReference(), category.name, ...category.keywordThemes],
            image: metadata.image,
          }),
        ]}
      />

      <PageHero
        eyebrow="Topic Cluster"
        title={category.heroTitle}
        description={category.heroDescription}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Insights', to: routes.blog },
          { label: category.name },
        ]}
        chips={[`${publishedPosts.length} published guides`, `${plannedTopics.length} planned guides`]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
            <ButtonLink to={routes.blog} variant="ghost">
              Browse All Insights
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">What This Cluster Covers</h2>
            <p className="mt-4 text-zinc-300">{category.description}</p>
            <p className="mt-4 text-sm text-zinc-400">{category.searchIntent}</p>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.06}>
            <h2 className="text-2xl font-semibold text-white">Keyword Themes</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.keywordThemes.map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200">
                  {keyword}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white">Services Connected to This Topic</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              These service pages connect the educational content in this cluster to the implementation work businesses usually need next.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {relatedServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white">Published Articles</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">
              These published guides already support this topic cluster with practical advice, clearer entity signals, and direct internal paths back to the related service pages.
            </p>
          </Reveal>

          {publishedPosts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {publishedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="premium-card p-6 sm:p-8">
              <p className="text-zinc-300">
                This cluster is being expanded next. The planned guides below define the search coverage and supporting content already mapped for future publication.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {plannedTopics.length ? (
        <section className="section-pad pb-16">
          <div className="section-wrap space-y-6">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white">Editorial Roadmap for This Cluster</h2>
              <p className="mt-3 max-w-3xl text-zinc-300">
                These planned articles are already scoped with target slugs, metadata, FAQs, and service-linking paths so the blog can expand without losing topical focus.
              </p>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-2">
              {plannedTopics.map((topic, index) => (
                <Reveal key={topic.slug} className="premium-card p-6 sm:p-8" delay={index * 0.05}>
                  <p className="text-xs uppercase tracking-[0.22em] text-orange-300/90">Planned Guide</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{topic.h1}</h3>
                  <p className="mt-3 text-sm text-zinc-300">{topic.metaDescription}</p>
                  <ul className="mt-5 space-y-2 text-sm text-zinc-300">
                    {topic.detailedOutline.slice(0, 4).map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {getRelatedServices(topic.internalServiceSlugs).map((service) => (
                      <Link
                        key={service.slug}
                        to={getServicePath(service.slug)}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200 transition hover:border-orange-300/60 hover:text-orange-200"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-16">
        <div className="section-wrap">
          <Reveal className="premium-card p-7 sm:p-9">
            <h2 className="text-3xl font-semibold text-white">Need Help Applying This Topic on a Live Website?</h2>
            <p className="mt-4 max-w-3xl text-zinc-300">
              If the problem behind this topic cluster already affects your site, I can help you audit the issue, implement the right fixes, and support the release without agency overhead.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Explore Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
