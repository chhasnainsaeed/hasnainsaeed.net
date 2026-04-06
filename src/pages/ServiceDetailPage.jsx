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
import { createBreadcrumbSchema, createFAQSchema, createOrganizationSchema, createServiceSchema, createWebPageSchema } from '../seo/schema'
import { getRelatedPostsForService, getRelatedProjectsForService } from '../utils/relatedContent'
import { getServicePath, routes } from '../utils/routes'
import { getAbsoluteUrl } from '../utils/site'

function getServiceKeyword(service) {
  return service.seoLabel || service.title
}

function getServiceImageAlt(service) {
  return `${service.seoLabel || service.title} example website preview by Hasnain Saeed`
}

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
  const serviceKeyword = getServiceKeyword(service)

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
          createOrganizationSchema(),
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
            <DetailMediaFrame src={service.image} alt={getServiceImageAlt(service)} fallback={`${service.title} preview unavailable`} />
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">Service Snapshot</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Ideal Fit</p>
                <p className="mt-2 text-sm text-zinc-200">{service.idealFor}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Starting Investment</p>
                <p className="mt-2 text-sm text-zinc-200">{service.startingPrice || 'Quoted based on scope'}</p>
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
            <p className="mt-5 text-sm leading-7 text-zinc-400">{service.pricingNote}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Back to Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {service.detailSections?.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap grid gap-6 lg:grid-cols-2">
            {service.detailSections.map((section, index) => (
              <Reveal key={section.heading} className="premium-card p-6 sm:p-8" delay={index * 0.05}>
                <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">{section.heading}</h2>
                <p className="mt-4 text-sm leading-8 text-zinc-300">{section.body}</p>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="max-w-[20ch] text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">
              Problems solved by {serviceKeyword}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {service.painPoints.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="max-w-[20ch] text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">
              What&apos;s included in {serviceKeyword}
            </h2>
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
            <h2 className="max-w-[20ch] text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">
              Deliverables and outcomes from {serviceKeyword}
            </h2>
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
            <h2 className="max-w-[20ch] text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">
              How {serviceKeyword} projects usually run
            </h2>
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
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[46rem]">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Related Proof</p>
              <h2 className="mt-2 max-w-[18ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                Relevant case studies for {serviceKeyword}
              </h2>
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
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[46rem]">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Support Content</p>
              <h2 className="mt-2 max-w-[18ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                Guides related to {serviceKeyword}
              </h2>
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
            <h2 className="mb-5 max-w-[18ch] text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white">
              FAQ about {serviceKeyword}
            </h2>
            <FaqAccordion items={service.faq} />
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">Explore related services</h2>
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
