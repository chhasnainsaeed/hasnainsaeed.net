import AnswerSummaryCard from '../components/ui/AnswerSummaryCard'
import AuthorityGridSection from '../components/ui/AuthorityGridSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import FaqAccordion from '../components/ui/FaqAccordion'
import ButtonLink from '../components/ui/ButtonLink'
import ServiceCard from '../components/ui/ServiceCard'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCollectionPageSchema, createFAQSchema, createProfessionalServiceReference, createProfessionalServiceSchema } from '../seo/schema'
import { processSteps, services } from '../data/services'
import { industryProfiles, platformProfiles, projectTypeProfiles, siteConfig, supportPromisePoints } from '../utils/site'
import { getServicePath, routes } from '../utils/routes'

const faqs = [
  {
    question: 'Do you work with businesses in the USA, UK, and Canada?',
    answer: 'Yes. The site and service offers are built around remote collaboration with clients in the USA, UK, Canada, and other international markets.',
  },
  {
    question: 'Can you join an in-progress project instead of starting from zero?',
    answer: 'Yes. Many engagements start with an audit, a set of bugs, a Figma handoff, or a conversion problem inside an existing site.',
  },
  {
    question: 'Which platforms do you support most often?',
    answer: 'Shopify, WordPress, Webflow, and WooCommerce are the main platforms, plus general frontend implementation, speed optimization, and QA support.',
  },
  {
    question: 'How do I choose the right service if my website has multiple issues?',
    answer:
      'Start with the biggest bottleneck. If the site needs a full platform build or redesign implementation, choose the platform-specific service. If the site is already live but slower, unstable, or hard to update, choose optimization, maintenance, or bug-fixing support first.',
  },
  {
    question: 'Can one project combine development, optimization, and maintenance?',
    answer:
      'Yes. Many projects begin with one core service and then expand into related work such as website speed optimization, bug fixing, QA, or ongoing maintenance after launch.',
  },
]

export default function ServicesPage() {
  const metadata = getStaticPageMetadata('services')
  const serviceNames = services.map((service) => service.title)
  const deliveryAuthorityCards = [
    {
      eyebrow: 'Platforms',
      title: 'Platforms supported',
      description: 'Each platform has different technical constraints, editing needs, and conversion challenges. The delivery approach is adapted to that reality.',
      tags: platformProfiles.map((item) => item.title),
      note: 'The strongest fit is platform-specific implementation rather than one generic process for every build.',
    },
    {
      eyebrow: 'Buyer Fit',
      title: 'Industries and client types',
      description: 'The services are built around the commercial problems most common in lead-generation sites, ecommerce stores, and launch-focused marketing pages.',
      tags: industryProfiles.map((item) => item.title),
    },
    {
      eyebrow: 'Scope Types',
      title: 'Project types handled',
      description: 'Most scopes fall into a few repeatable patterns, which makes service selection and next-step planning easier.',
      list: projectTypeProfiles.map((item) => item.title),
    },
    {
      eyebrow: 'Support',
      title: 'Support, maintenance, and delivery standard',
      description: 'Even when the scope starts as a build or sprint, delivery quality still depends on QA, follow-up support, and clear communication.',
      list: supportPromisePoints,
      note: `${siteConfig.responseTimeNote} ${siteConfig.timezoneNote}`,
    },
  ]
  const faqSchema = createFAQSchema(faqs, routes.services)

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
          ]),
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: routes.services,
            items: services.map((service) => ({
              name: service.title,
              path: getServicePath(service.slug),
            })),
            about: [createProfessionalServiceReference(), ...serviceNames],
            image: metadata.image,
          }),
          createProfessionalServiceSchema(serviceNames),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Services"
        title="Freelance Web Development Services Built Around Conversion, Quality, and Clean Delivery"
        description="Choose the service line that matches your current bottleneck, whether that is a new build, a Figma handoff, speed issues, unstable releases, or ongoing support after launch."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Services' },
        ]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Discuss Your Project</ButtonLink>
            <ButtonLink to={routes.portfolio} variant="ghost">
              View Case Studies
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <AnswerSummaryCard
              title="What services does Hasnain Saeed offer?"
              answer="Hasnain Saeed offers freelance Shopify development, WordPress development, Webflow development, WooCommerce development, website speed optimization, website maintenance, Figma to website development, UI implementation, and bug fixing support for businesses that need a website to perform like a real business asset."
              facts={[
                { term: 'Core platforms', description: siteConfig.corePlatforms.join(', ') },
                { term: 'Main outcomes', description: 'Clearer service messaging, stronger storefront UX, cleaner implementation, faster pages, and more reliable launches.' },
                { term: 'Best-fit clients', description: siteConfig.bestFitClients },
                { term: 'Delivery style', description: 'Remote freelance delivery with structured scope, implementation, QA, and post-launch support.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.contact}>Discuss Your Project</ButtonLink>
                <ButtonLink to={routes.about} variant="ghost">
                  About Hasnain
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
          <Reveal delay={0.08}>
            <AnswerSummaryCard
              eyebrow="How To Choose"
              title="How do you choose the right service?"
              answer="Choose the service based on the current bottleneck. If the main issue is platform build quality or redesign implementation, start with the platform-specific page. If the website is already live but underperforming, unstable, or hard to maintain, start with optimization, maintenance, or bug-fixing support."
              facts={[
                { term: 'Platform builds', description: 'Shopify, WordPress, Webflow, and WooCommerce development cover new builds, rebuilds, and focused implementation work.' },
                { term: 'Optimization work', description: 'Website speed optimization, bug fixing, and QA support are best when a live site needs technical improvement without a full rebuild.' },
                { term: 'Design handoff', description: 'Figma to website development is the best fit when the design is approved and the next step is clean execution.' },
                { term: 'Proof paths', description: 'Each service page links to relevant case studies, blog guides, and direct inquiry paths.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.portfolio}>View Case Studies</ButtonLink>
                <ButtonLink to={routes.blog} variant="ghost">
                  Read Related Guides
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.03}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <AuthorityGridSection
              eyebrow="Delivery Standards"
              title="How projects usually run across these services"
              description="The services differ by platform and scope, but the working model stays consistent: focused implementation, clear milestones, QA before release, and support when the website needs to keep moving."
              items={deliveryAuthorityCards}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white">How projects move from idea to launch</h2>
            <p className="mt-3 max-w-3xl text-zinc-300">Every engagement follows a clear sequence so scope, execution quality, and release confidence stay aligned.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.04} className="premium-card p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Step {index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-zinc-300">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal className="premium-card p-7" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Need help choosing the right service?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              Send the current platform, a rough timeline, and the biggest issue on the site. I&apos;ll point you to the most practical engagement instead of forcing unnecessary scope.
            </p>
            <ButtonLink to={routes.contact} className="mt-6">
              Start the Conversation
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
