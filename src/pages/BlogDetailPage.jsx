import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import FaqAccordion from '../components/ui/FaqAccordion'
import ProfilePortrait from '../components/ui/ProfilePortrait'
import { getBlogPostBySlug } from '../data/blogPosts'
import NotFoundPage from './NotFoundPage'
import Seo from '../seo/Seo'
import { getBlogPostMetadata } from '../seo/metadata'
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema, createOrganizationSchema, createPersonSchema, createWebPageSchema } from '../seo/schema'
import { getRelatedProjectsForPost, getRelatedServicesForPost } from '../utils/relatedContent'
import { getBlogPath, getProjectPath, getServicePath, routes } from '../utils/routes'
import { getAbsoluteUrl, siteConfig } from '../utils/site'

function getSectionId(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function getServiceAnchorText(service) {
  const baseLabel = service.seoLabel || service.title
  return /\bservice\b/i.test(baseLabel) ? baseLabel : `${baseLabel} service`
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) return <NotFoundPage />

  const postPath = getBlogPath(post.slug)
  const metadata = getBlogPostMetadata(post)
  const faqSchema = createFAQSchema(post.faq, postPath)
  const relatedServices = getRelatedServicesForPost(post)
  const relatedProjects = getRelatedProjectsForPost(post)
  const breadcrumbItems = [
    { name: 'Home', path: routes.home },
    { name: 'Blog', path: routes.blog },
    { name: post.title, path: postPath },
  ]

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
        type={metadata.type}
        author={metadata.author}
        publishedTime={metadata.publishedTime}
        modifiedTime={metadata.modifiedTime}
        keywords={metadata.keywords}
        jsonLd={[
          createPersonSchema(),
          createOrganizationSchema(),
          createWebPageSchema({
            path: postPath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: { '@id': `${getAbsoluteUrl(postPath)}#article` },
            about: [post.category, ...(post.keywords || [])],
          }),
          createArticleSchema(post),
          createBreadcrumbSchema(breadcrumbItems),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} breadcrumbs={breadcrumbItems} />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card overflow-hidden">
            <div className="flex items-start justify-center border-b border-white/10 bg-[linear-gradient(180deg,rgba(10,10,12,0.95),rgba(21,11,5,0.92))] p-3 sm:p-4">
              <img src={post.image} alt={post.title} className="mx-auto h-auto w-auto max-h-[34rem] max-w-full" loading="eager" />
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">Why this topic matters</h2>
              <p className="mt-4 text-zinc-300">{post.intro}</p>
            </div>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Article Snapshot</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Author</p>
                <p className="mt-2 text-sm font-semibold text-zinc-100">{siteConfig.name}</p>
                <p className="mt-1 text-sm text-zinc-300">{siteConfig.jobTitle}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Category</p>
                <p className="mt-2 text-sm text-zinc-200">{post.category}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Published</p>
                <p className="mt-2 text-sm text-zinc-200">{post.displayDate || post.date}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Read Time</p>
                <p className="mt-2 text-sm text-zinc-200">{post.readTime}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Key Takeaways</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {post.keyTakeaways.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
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
            <Link to={routes.blog} className="mt-6 inline-flex text-sm font-semibold text-orange-300">
              Back to Blog &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          {post.sections.map((section, index) => (
            <Reveal key={section.heading} className="premium-card p-6 sm:p-8" delay={index * 0.04}>
              <h2 id={getSectionId(section.heading)} className="scroll-mt-28 text-2xl font-semibold text-white">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-4xl text-zinc-300">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal className="premium-card p-7 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">About the author</p>
                <ProfilePortrait className="mt-4" showCaption={false} />
                <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
                  <p className="mt-1 text-sm text-orange-200">{siteConfig.jobTitle}</p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{siteConfig.availability}</p>
                </div>
              </div>

              <div>
                <p className="text-sm leading-7 text-zinc-300">{siteConfig.authorBio}</p>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  These articles are written to help business owners and teams understand what usually goes wrong in implementation, launch prep, and
                  ongoing optimization before those issues affect leads or sales.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink to={routes.about}>Read More About Hasnain</ButtonLink>
                  <ButtonLink to={routes.contact} variant="ghost">
                    Ask About Your Website
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={post.faq} />
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Turn this topic into execution</h2>
            <p className="mt-4 text-sm text-zinc-300">
              If this issue already affects a live website, the next step is implementation, cleanup, and QA on the pages that matter most.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Advice only becomes useful when it is tested against the live pages people already visit. In practice, that means checking the homepage,
              service pages, landing pages, portfolio routes, and contact flow where search visibility and conversion quality are already connected. The
              strongest improvements usually come from reviewing real templates, real content, and real mobile behavior instead of treating the topic as a
              checklist item in isolation.
            </p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              For most business websites, content, UX, and technical cleanup have to move together. A good implementation pass may involve tightening copy
              hierarchy, fixing weak internal links, improving template consistency, reducing avoidable friction, and retesting the highest-intent user
              journeys after changes are made. That is why the related services below are tied directly to this article instead of sitting on a separate,
              disconnected part of the site.
            </p>
            {relatedServices.length ? (
              <>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Related service pages for this topic:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-zinc-300">
                  {relatedServices.map((service) => (
                    <li key={service.slug}>
                      <Link to={getServicePath(service.slug)} className="font-semibold text-orange-300 transition hover:text-orange-200">
                        {getServiceAnchorText(service)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {relatedServices.length ? (
              <div className="mt-6 space-y-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={getServicePath(service.slug)}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-300/40 hover:bg-white/[0.05]"
                  >
                    <p className="text-sm font-semibold text-white">{getServiceAnchorText(service)}</p>
                    <p className="mt-2 text-sm text-zinc-300">{service.summary}</p>
                  </Link>
                ))}
              </div>
            ) : null}
            {relatedProjects.length ? (
              <>
                <h3 className="mt-6 text-sm uppercase tracking-[0.18em] text-zinc-400">Relevant case studies</h3>
                <div className="mt-3 space-y-3">
                  {relatedProjects.map((project) => (
                    <Link
                      key={project.slug}
                      to={getProjectPath(project.slug)}
                      className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-300/40 hover:bg-white/[0.05]"
                    >
                      <p className="text-sm font-semibold text-white">{project.title}</p>
                      <p className="mt-2 text-sm text-zinc-300">{project.shortResult}</p>
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
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
