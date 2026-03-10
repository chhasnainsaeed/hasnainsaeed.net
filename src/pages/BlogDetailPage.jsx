import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import FaqAccordion from '../components/ui/FaqAccordion'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import ButtonLink from '../components/ui/ButtonLink'
import ServiceCard from '../components/ui/ServiceCard'
import ProjectCard from '../components/ui/ProjectCard'
import BlogCard from '../components/ui/BlogCard'
import AuthorBioCard from '../components/ui/AuthorBioCard'
import SiteImage from '../components/ui/SiteImage'
import Seo from '../seo/Seo'
import { getBlogPostMetadata } from '../seo/metadata'
import { createArticleReference, createArticleSchema, createBreadcrumbSchema, createFAQSchema, createProfessionalServiceReference, createWebPageSchema } from '../seo/schema'
import { getBlogPostBySlug } from '../data/blogPosts'
import { getRecommendedPosts, getRelatedProjects, getRelatedServices } from '../utils/content'
import { getBlogPostInternalLinkGroups } from '../utils/internalLinks'
import { getBlogCategoryPath, getBlogPath, getServicePath, routes } from '../utils/routes'

function getSectionId(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) return <Navigate to={routes.blog} replace />

  const category = post.categoryData
  const categoryPath = category ? getBlogCategoryPath(category.slug) : routes.blog
  const postPath = getBlogPath(post.slug)
  const metadata = getBlogPostMetadata(post)
  const relatedServices = getRelatedServices(post.relatedServiceSlugs)
  const relatedProjects = getRelatedProjects(post.relatedProjectSlugs)
  const relatedPosts = getRecommendedPosts(post, 3)
  const blogInternalLinkGroups = getBlogPostInternalLinkGroups({ category, relatedServices, relatedProjects, relatedPosts })
  const faqSchema = createFAQSchema(post.faq, postPath)

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        pathname={metadata.pathname}
        image={metadata.image}
        type={metadata.type}
        ogTitle={metadata.ogTitle}
        ogDescription={metadata.ogDescription}
        twitterTitle={metadata.twitterTitle}
        twitterDescription={metadata.twitterDescription}
        keywords={metadata.keywords}
        jsonLd={[
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Insights', path: routes.blog },
            { name: category?.name || 'Article', path: categoryPath },
            { name: post.title, path: postPath },
          ]),
          createWebPageSchema({
            path: postPath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: createArticleReference(post.slug),
            about: [createProfessionalServiceReference(), category?.name || post.category, ...relatedServices.map((service) => service.title)],
          }),
          createArticleSchema(post),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow={category?.name || 'Insights'}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Insights', to: routes.blog },
          ...(category ? [{ label: category.name, to: categoryPath }] : []),
          { label: post.title },
        ]}
        chips={[post.category, post.displayDate, post.readTime]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
            <ButtonLink to={categoryPath} variant="ghost">
              Explore This Topic Cluster
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="premium-card overflow-hidden">
            <SiteImage
              src={post.image}
              alt={post.title}
              className="h-64 w-full object-cover sm:h-80"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="100vw"
            />
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">Why This Topic Matters</h2>
              <p className="mt-4 text-zinc-300">{post.intro}</p>
            </div>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.06}>
            <h2 className="text-2xl font-semibold text-white">Article Summary</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Best For</p>
                <p className="mt-2 text-sm text-zinc-200">{post.audience}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Search Intent</p>
                <p className="mt-2 text-sm text-zinc-200">{post.searchIntent}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Article Goal</p>
                <p className="mt-2 text-sm text-zinc-200">{post.articleGoal}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Related Paths"
              title="Follow the pages connected to this guide"
              description="These links connect the article to the commercial service pages, proof pages, and topic-cluster hubs that sit closest to the same problem space."
              groups={blogInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="space-y-6">
            <Reveal className="premium-card p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">Key Takeaways</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                {post.keyTakeaways.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </Reveal>

            {post.sections.map((section, index) => (
              <Reveal key={section.heading} className="premium-card scroll-mt-28 p-6 sm:p-8" delay={index * 0.04}>
                <h2 id={getSectionId(section.heading)} className="text-2xl font-semibold text-white">
                  {section.heading}
                </h2>
                <p className="mt-4 max-w-4xl text-zinc-300">{section.body}</p>
              </Reveal>
            ))}

            <AuthorBioCard serviceSlugs={post.relatedServiceSlugs} />
          </article>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="premium-card p-6 sm:p-7">
              <h2 className="text-2xl font-semibold text-white">On This Page</h2>
              <nav aria-label="Article sections" className="mt-5">
                <ol className="space-y-3 text-sm text-zinc-300">
                  {post.sections.map((section) => (
                    <li key={section.heading}>
                      <a href={`#${getSectionId(section.heading)}`} className="transition hover:text-orange-200">
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <Link to={categoryPath} className="mt-6 inline-flex text-sm font-semibold text-orange-300 transition hover:text-orange-200">
                Explore {category?.name || 'More Insights'} &rarr;
              </Link>
            </Reveal>

            {relatedServices.length ? (
              <Reveal className="premium-card p-6 sm:p-7" delay={0.05}>
                <h2 className="text-2xl font-semibold text-white">Related Services</h2>
                <p className="mt-3 text-sm text-zinc-300">These service pages apply the same ideas to live client work.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {relatedServices.map((service) => (
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
            ) : null}
          </div>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white">Implementation Services Related to This Guide</h2>
              <p className="mt-3 max-w-3xl text-zinc-300">
                If you want these recommendations applied on a live site, these are the service lines most closely connected to the work.
              </p>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((service, index) => (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white">Further Reading</h2>
              <p className="mt-3 max-w-3xl text-zinc-300">
                These related articles extend the topic cluster and create a clearer internal path from education to service-level decision making.
              </p>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <Reveal key={relatedPost.slug} delay={index * 0.05}>
                  <BlogCard post={relatedPost} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedProjects.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <h2 className="text-3xl font-semibold text-white">Case Studies Behind the Advice</h2>
              <p className="mt-3 max-w-3xl text-zinc-300">
                These case studies show how the same thinking translated into real implementation, QA, optimization, and launch work.
              </p>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {relatedProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={post.faq} />
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Need Help Applying This to Your Website?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              If this issue already affects your site, I can audit the bottleneck, implement the fixes, and support the QA needed to ship the improvement safely.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book a Consultation</ButtonLink>
              <ButtonLink to={categoryPath} variant="ghost">
                Explore More in This Cluster
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
