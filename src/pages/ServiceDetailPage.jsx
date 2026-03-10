import { Navigate, useParams } from 'react-router-dom'
import AnswerSummaryCard from '../components/ui/AnswerSummaryCard'
import BlogCard from '../components/ui/BlogCard'
import ButtonLink from '../components/ui/ButtonLink'
import FaqAccordion from '../components/ui/FaqAccordion'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/ui/ProjectCard'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import { getServiceBySlug } from '../data/services'
import Seo from '../seo/Seo'
import { getServiceMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createProfessionalServiceReference, createServiceReference, createServiceSchema, createWebPageSchema } from '../seo/schema'
import { getRelatedPosts, getRelatedProjects, getRelatedServices } from '../utils/content'
import { getServiceInternalLinkGroups } from '../utils/internalLinks'
import { getServicePath, routes } from '../utils/routes'
import { siteConfig, supportPromisePoints } from '../utils/site'

function createFallbackItems(values = [], description) {
  return values.map((value) => ({
    title: value,
    description,
  }))
}

function normalizeServiceContent(service) {
  return {
    answerSummary: service.answerSummary || service.quoteSummary || service.summary,
    heroChips: service.heroChips || [],
    introParagraphs: service.introParagraphs || [service.summary, service.heroDescription],
    whoItsForIntro: service.whoItsForIntro || `This service is a strong fit for ${service.idealFor}.`,
    whoItsForItems:
      service.whoItsForItems ||
      createFallbackItems(service.includes || [], 'Useful when the project needs focused implementation with clean delivery and launch-ready QA.'),
    problemsIntro: service.problemsIntro || `These are the common issues ${service.title.toLowerCase()} is usually hired to solve.`,
    problemItems:
      service.problemItems ||
      createFallbackItems(service.outcomes || [], 'This usually shows up when the current site needs clearer UX, stronger implementation, or more stable technical execution.'),
    deliverablesIntro: service.deliverablesIntro || `The deliverables are shaped around the most important commercial and technical priorities in the project.`,
    deliverableItems:
      service.deliverableItems ||
      createFallbackItems(service.deliverables || [], 'Included where relevant to the scope, platform, and launch requirements of the engagement.'),
    processIntro: service.processIntro || 'The process is designed to keep scope, implementation quality, and release confidence aligned.',
    processDetail:
      service.processDetail ||
      (service.process || []).map((step, index) => ({
        title: `Step ${index + 1}`,
        description: step,
      })),
    expertiseTitle: service.expertiseTitle || 'Platform expertise',
    expertiseIntro:
      service.expertiseIntro ||
      `This service is delivered with platform-aware implementation and a focus on maintainability, responsive quality, and clear execution.`,
    expertiseItems:
      service.expertiseItems ||
      createFallbackItems(service.includes || [], 'Handled with attention to structure, responsive behavior, and technical cleanliness.'),
    ctaTitle: service.ctaTitle || `Need help with ${service.title.toLowerCase()}?`,
    ctaDescription:
      service.ctaDescription ||
      'Share the current platform, biggest blocker, and timeline. I will reply with the most practical next step and the right execution path.',
  }
}

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = getServiceBySlug(slug)

  if (!service) return <Navigate to={routes.services} replace />

  const content = normalizeServiceContent(service)
  const servicePath = getServicePath(service.slug)
  const metadata = getServiceMetadata(service)
  const heroChips = Array.from(new Set([`Timeline: ${service.timeline}`, ...content.heroChips, 'Remote delivery']))
  const relatedServices = getRelatedServices(service.relatedServiceSlugs).filter((item) => item.slug !== service.slug)
  const relatedProjects = getRelatedProjects(service.relatedProjectSlugs)
  const relatedPosts = getRelatedPosts(service.relatedPostSlugs)
  const serviceInternalLinkGroups = getServiceInternalLinkGroups({ relatedServices, relatedProjects, relatedPosts })
  const faqSchema = createFAQSchema(service.faq, servicePath)

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
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Services', path: routes.services },
            { name: service.title, path: servicePath },
          ]),
          createWebPageSchema({
            path: servicePath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: createServiceReference(service.slug),
            about: [createProfessionalServiceReference(), service.title, service.idealFor],
          }),
          createServiceSchema(service),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Service"
        title={service.heroTitle}
        description={service.heroDescription}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Services', to: routes.services },
          { label: service.title },
        ]}
        chips={heroChips}
        actions={
          <>
            <ButtonLink to={routes.contact}>Book a Discovery Call</ButtonLink>
            <ButtonLink to={routes.portfolio} variant="ghost">
              View Case Studies
            </ButtonLink>
          </>
        }
      >
        <p className="mt-6 max-w-3xl text-sm uppercase tracking-[0.16em] text-zinc-400">{service.searchIntent}</p>
      </PageHero>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <AnswerSummaryCard
              title={`What is ${service.title}?`}
              answer={content.answerSummary}
              facts={[
                { term: 'Best for', description: service.idealFor },
                { term: 'Typical timeline', description: service.timeline },
                { term: 'Primary outcomes', description: service.outcomes.join(', ') },
                { term: 'Typical deliverables', description: service.deliverables.join(', ') },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.contact}>Book a Discovery Call</ButtonLink>
                <ButtonLink to={routes.portfolio} variant="ghost">
                  View Similar Work
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>

          <Reveal delay={0.06}>
            <AnswerSummaryCard
              eyebrow="Best Fit"
              title={`When is ${service.title.toLowerCase()} the right fit?`}
              answer={`This service is usually the right next step when the website, storefront, or approved design needs focused execution instead of vague redesign talk. It fits projects where implementation quality, technical cleanup, and launch confidence need to improve together.`}
              facts={[
                { term: 'Common problems', description: content.problemItems.slice(0, 2).map((item) => item.title).join(', ') },
                { term: 'Related services', description: relatedServices.length ? relatedServices.map((item) => item.title).join(', ') : 'Explore the services index for adjacent scope.' },
                { term: 'Case study path', description: relatedProjects.length ? relatedProjects.map((item) => item.title).join(', ') : 'Relevant project work is highlighted below.' },
                { term: 'Useful reading', description: relatedPosts.length ? relatedPosts.map((item) => item.title).join(', ') : 'Related guides are linked below.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.blog}>Read Related Guides</ButtonLink>
                <ButtonLink to={routes.services} variant="ghost">
                  Explore Adjacent Services
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <SectionHeading
              eyebrow="Service Intro"
              title="Why businesses hire this service"
              description={content.introParagraphs[0]}
            />
            <div className="mt-5 space-y-4 text-zinc-300">
              {content.introParagraphs.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.outcomes.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <h2 className="text-2xl font-semibold text-white">Who This Service Is For</h2>
            <p className="mt-4 text-zinc-300">{content.whoItsForIntro}</p>
            <div className="mt-6 space-y-4">
              {content.whoItsForItems.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-orange-300/25 bg-orange-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Best Fit</p>
              <p className="mt-2 text-sm text-zinc-100">{service.idealFor}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Problems Solved"
              title={`Common problems ${service.title.toLowerCase()} is usually hired to solve`}
              description={content.problemsIntro}
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {content.problemItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="premium-card h-full p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-8">
          <Reveal>
            <SectionHeading
              eyebrow="Scope"
              title={`What is usually included in ${service.title.toLowerCase()}`}
              description={content.deliverablesIntro}
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {content.deliverableItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="premium-card h-full p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Optional Add-ons</p>
            <p className="mt-3 text-sm text-zinc-300">{service.addons.join(', ')}.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-8">
          <Reveal>
            <SectionHeading eyebrow="Process" title="How I work on this service" description={content.processIntro} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {content.processDetail.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="premium-card h-full p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Step {index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-8">
          <Reveal>
            <SectionHeading eyebrow="Expertise" title={content.expertiseTitle} description={content.expertiseIntro} />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {content.expertiseItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="premium-card h-full p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Related Paths"
              title="Use the next pages around this service"
              description="The internal links below connect this service page to adjacent commercial pages, proof pages, and supporting guides so the scope is easier to evaluate from multiple angles."
              groups={serviceInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Related Services"
                title="Services closely related to this scope"
                description="If the current project touches more than one bottleneck, these are the service pages most likely to overlap with the work."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <ServiceCard service={item} />
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
              <SectionHeading
                eyebrow="Case Studies"
                title="Relevant project work"
                description="These examples show how the same kind of service work translated into live improvements for real websites."
              />
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

      {relatedPosts.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Related Insights"
                title="Useful reading around this service"
                description="These articles add more context around the strategy, implementation decisions, and quality standards behind the service."
              />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-3">
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
            <SectionHeading
              eyebrow="FAQ"
              title={`Questions clients ask about ${service.title.toLowerCase()}`}
              description="These answers cover the common scope, platform, and delivery questions that usually come up before work starts."
            />
            <div className="mt-6">
              <FaqAccordion items={service.faq} />
            </div>
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">{content.ctaTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">{content.ctaDescription}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Working model</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {supportPromisePoints.slice(0, 3).map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-zinc-500">
                {siteConfig.responseTimeNote} {siteConfig.timezoneNote}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Start a Project</ButtonLink>
              <ButtonLink to={routes.portfolio} variant="ghost">
                View Case Studies
              </ButtonLink>
            </div>
            <ButtonLink to={routes.services} variant="ghost" className="mt-3">
              Explore All Services
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
