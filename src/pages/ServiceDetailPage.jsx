import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import FaqAccordion from '../components/ui/FaqAccordion'
import ButtonLink from '../components/ui/ButtonLink'
import BlogCard from '../components/ui/BlogCard'
import ProjectCard from '../components/ui/ProjectCard'
import DetailMediaFrame from '../components/ui/DetailMediaFrame'
import { getServiceBySlug, services } from '../data/services'
import NotFoundPage from './NotFoundPage'
import Seo from '../seo/Seo'
import { getServiceMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createServiceSchema, createWebPageSchema } from '../seo/schema'
import { getRelatedPostsForService, getRelatedProjectsForService } from '../utils/relatedContent'
import { getServicePath, routes } from '../utils/routes'
import { getAbsoluteUrl } from '../utils/site'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFoundPage />

  const servicePath = getServicePath(service.slug)
  const metadata = getServiceMetadata(service)
  const faqSchema = createFAQSchema(service.faq, servicePath)
  const relatedProjects = getRelatedProjectsForService(service)
  const relatedPosts = getRelatedPostsForService(service)
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3)
  const breadcrumbItems = [
    { name: 'Home', path: routes.home },
    { name: 'Services', path: routes.services },
    { name: service.title, path: servicePath },
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
        keywords={metadata.keywords}
        jsonLd={[
          createWebPageSchema({
            path: servicePath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: { '@id': `${getAbsoluteUrl(servicePath)}#service` },
            about: Array.from(new Set([service.title, ...(service.keywords || [])])),
          }),
          createServiceSchema(service, servicePath),
          createBreadcrumbSchema(breadcrumbItems),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero eyebrow={`${service.eyebrow} | ${service.timeline}`} title={service.title} description={service.intro} breadcrumbs={breadcrumbItems} />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <Reveal>
            <DetailMediaFrame src={service.image} alt={service.title} fallback={`${service.title} preview unavailable`} />
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Service Snapshot</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Ideal Fit</p>
                <p className="mt-2 text-sm text-zinc-200">{service.idealFor}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Typical Timeline</p>
                <p className="mt-2 text-sm text-zinc-200">{service.timeline}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Deliverables</p>
                <p className="mt-2 text-sm text-zinc-200">{service.deliverables.join(', ')}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Back to Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">What this service solves</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {service.painPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">What&apos;s included</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {service.includes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Deliverables and outcomes</h2>
            <h3 className="mt-5 text-sm uppercase tracking-[0.18em] text-zinc-400">Deliverables</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {service.deliverables.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm uppercase tracking-[0.18em] text-zinc-400">Likely outcomes</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {service.outcomes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">How engagements usually run</h2>
            <ol className="mt-5 space-y-4">
              {service.workflow.map((step, index) => (
                <li key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-orange-300/80">Step {index + 1}</p>
                  <p className="mt-2 text-sm text-zinc-200">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm text-zinc-400">Optional add-ons: {service.addons.join(', ')}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Related Proof</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Relevant case studies</h2>
            </div>
            <Link to={routes.portfolio} className="text-sm font-semibold text-orange-300">
              View Portfolio &rarr;
            </Link>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {relatedPosts.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Support Content</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Guides that support this service</h2>
              </div>
              <Link to={routes.blog} className="text-sm font-semibold text-orange-300">
                Browse Blog &rarr;
              </Link>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={service.faq} />
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Explore related services</h2>
            <div className="mt-5 space-y-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  to={getServicePath(item.slug)}
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-orange-300/40 hover:bg-white/[0.05]"
                >
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm text-zinc-300">{item.summary}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Start a Project</ButtonLink>
              <ButtonLink to={routes.packages} variant="ghost">
                View Packages
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
