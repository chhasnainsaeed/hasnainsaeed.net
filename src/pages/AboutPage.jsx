import { Link } from 'react-router-dom'
import AnswerSummaryCard from '../components/ui/AnswerSummaryCard'
import AuthorityGridSection from '../components/ui/AuthorityGridSection'
import FaqAccordion from '../components/ui/FaqAccordion'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createPersonSchema, createProfessionalServiceSchema, createProfilePageSchema } from '../seo/schema'
import { services } from '../data/services'
import { getServicePath, routes } from '../utils/routes'
import { industryProfiles, platformProfiles, projectTypeProfiles, siteConfig, stackTags, supportPromisePoints } from '../utils/site'

const timeline = [
  '2021: Started freelancing with WordPress implementation and service-business website builds.',
  '2022: Expanded into Shopify customization, conversion-focused storefront work, and QA-backed delivery.',
  '2023: Added Webflow implementation for launch pages, startup marketing sites, and Figma handoff projects.',
  '2024: Deepened performance optimization and release QA workflows to improve launch quality.',
  '2025 and beyond: Focused on premium multi-platform implementation for international clients that need speed, precision, and reliability.',
]

const aboutFaqs = [
  {
    question: 'Who is Hasnain Saeed?',
    answer:
      'Hasnain Saeed is a freelance web developer who helps businesses build, improve, and maintain Shopify, WordPress, Webflow, and WooCommerce websites with a focus on conversion quality, speed, and dependable execution.',
  },
  {
    question: 'What kind of projects is he best suited for?',
    answer:
      'The best fit is service-business websites, ecommerce storefront improvements, Figma-to-website implementation, speed optimization, bug fixing, QA support, and ongoing maintenance after launch.',
  },
  {
    question: 'Which platforms does Hasnain work with most?',
    answer:
      'Shopify, WordPress, Webflow, and WooCommerce are the main platforms, along with cross-platform work like Figma to website implementation, website speed optimization, and QA-backed support.',
  },
  {
    question: 'Does Hasnain only build new websites?',
    answer:
      'No. Many engagements start with improving an existing website through clearer service pages, front-end refinement, speed cleanup, technical fixes, or launch QA.',
  },
  {
    question: 'Where does Hasnain work with clients?',
    answer:
      'Projects are delivered remotely for clients in the USA, UK, Canada, and other international markets with async-friendly communication and clear milestones.',
  },
]

export default function AboutPage() {
  const metadata = getStaticPageMetadata('about')
  const serviceNames = services.map((service) => service.title)
  const primaryServices = services.slice(0, 6)
  const authorityCards = [
    {
      eyebrow: 'Industries',
      title: 'Industries and teams served',
      description: 'The strongest fit is work where the website is tied directly to lead generation, product growth, launch quality, or ongoing technical support.',
      tags: industryProfiles.map((item) => item.title),
      note: 'Most projects come from service businesses, ecommerce brands, SaaS teams, agencies, and founder-led companies.',
    },
    {
      eyebrow: 'Project Types',
      title: 'Project types handled most often',
      description: 'The work spans both new implementation and improvement work on live websites.',
      list: projectTypeProfiles.map((item) => item.title),
    },
    {
      eyebrow: 'Support',
      title: 'What the working relationship includes',
      description: 'The goal is not just to ship pages. It is to keep scope, execution quality, and launch confidence aligned.',
      list: supportPromisePoints,
    },
    {
      eyebrow: 'Tools',
      title: 'Tools and stack familiarity',
      description: 'The stack changes with the platform, but the standards stay consistent across implementation, optimization, and QA.',
      tags: stackTags,
      note: 'Technical SEO, responsive QA, and post-launch maintainability are treated as part of the delivery standard.',
    },
  ]
  const faqSchema = createFAQSchema(aboutFaqs, routes.about)

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
            { name: 'About', path: routes.about },
          ]),
          createProfilePageSchema({
            path: routes.about,
            title: metadata.title,
            description: metadata.description,
            about: serviceNames,
          }),
          createPersonSchema(serviceNames),
          createProfessionalServiceSchema(serviceNames),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="About"
        title="Freelance Web Developer Focused on Premium Execution, Performance, and Launch Confidence"
        description="I help businesses and agencies turn strategy and design into websites that are easier to trust, easier to use, and easier to scale after launch."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'About' },
        ]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Book a Discovery Call</ButtonLink>
            <ButtonLink to={routes.services} variant="ghost">
              Explore Services
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <AnswerSummaryCard
              title="Who is Hasnain Saeed?"
              answer={siteConfig.answerSummary}
              facts={[
                { term: 'Role', description: siteConfig.jobTitle },
                { term: 'Core platforms', description: siteConfig.corePlatforms.join(', ') },
                { term: 'Best-fit clients', description: siteConfig.bestFitClients },
                { term: 'Markets served', description: siteConfig.serviceMarkets.join(', ') },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.services}>Explore Services</ButtonLink>
                <ButtonLink to={routes.portfolio} variant="ghost">
                  View Case Studies
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
          <Reveal delay={0.08}>
            <AnswerSummaryCard
              eyebrow="Working Style"
              title="How does Hasnain approach freelance web development?"
              answer="The work combines strategy-aware implementation, technical cleanup, performance thinking, and QA before launch. The goal is not just to ship pages that look close to the design. It is to deliver websites that communicate clearly, behave reliably, and stay easier to maintain after release."
              facts={[
                { term: 'Typical work', description: 'Website builds, redesign implementation, speed optimization, Figma to website delivery, bug fixing, and maintenance.' },
                { term: 'What clients value', description: 'Cleaner implementation, clearer communication, better launch quality, and more reliable support.' },
                { term: 'Best next pages', description: 'Services, case studies, blog insights, and the contact page for scope discussions.' },
                { term: 'Delivery style', description: 'Remote, milestone-based, and designed to work well with internal teams or agencies.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.blog}>Read Insights</ButtonLink>
                <ButtonLink to={routes.contact} variant="ghost">
                  Start a Project
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal className="premium-card p-7 sm:p-9">
            <h2 className="text-3xl font-semibold text-white">What I actually help clients do</h2>
            <p className="mt-4 text-zinc-300">
              The work usually starts with one of four needs: build a better website, improve an underperforming one, turn Figma designs into production-ready pages, or stabilize launches through bug fixing and QA. The common thread is dependable execution.
            </p>
            <p className="mt-4 text-zinc-300">
              My process combines frontend implementation, platform-specific development, technical cleanup, and QA thinking so the final site does not just look polished. It behaves like a business asset.
            </p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Most requested service paths</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {primaryServices.map((service) => (
                  <Link
                    key={service.slug}
                    to={getServicePath(service.slug)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-zinc-200 transition hover:border-orange-300/60 hover:text-orange-200"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-9" delay={0.08}>
            <h2 className="text-3xl font-semibold text-white">How clients describe the value</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Cleaner implementation', 'Clearer communication', 'Better launch quality', 'More reliable support'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-400">Best suited for businesses that care about quality, clarity, and long-term maintainability.</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <AuthorityGridSection
              eyebrow="Platform Coverage"
              title="Platforms I work with most"
              description="The implementation approach changes with the platform, but the priorities stay consistent: clean structure, conversion-aware execution, responsive quality, and dependable support."
              items={platformProfiles.map((item) => ({
                eyebrow: 'Platform',
                title: item.title,
                description: item.description,
                note: item.note,
              }))}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="premium-card p-7">
            <h2 className="text-2xl font-semibold text-white">Experience Timeline</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {timeline.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="premium-card p-7" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Core Working Principles</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>- Build for clarity first so the site communicates quickly.</li>
              <li>- Treat frontend quality as a trust signal, not decoration.</li>
              <li>- Keep performance and responsiveness part of implementation, not a cleanup phase.</li>
              <li>- Use QA to protect the final result before launch or handoff.</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <AuthorityGridSection
              eyebrow="Delivery Fit"
              title="Industries, project types, support, and stack familiarity"
              description="These details help clarify the kind of work, teams, and delivery standards that define the best-fit engagements."
              items={authorityCards}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal className="premium-card p-7 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Availability</p>
                <p className="mt-3 text-lg font-semibold text-white">{siteConfig.availability}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Response time</p>
                <p className="mt-3 text-lg font-semibold text-white">{siteConfig.responseTimeNote}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Markets served</p>
                <p className="mt-3 text-lg font-semibold text-white">{siteConfig.serviceMarkets.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Timezone note</p>
                <p className="mt-3 text-lg font-semibold text-white">{siteConfig.timezoneNote}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">About FAQ</h2>
            <FaqAccordion items={aboutFaqs} />
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-9" delay={0.08}>
            <h2 className="text-3xl font-semibold text-white">Need a dependable implementation partner?</h2>
            <p className="mt-4 max-w-3xl text-zinc-300">
              If you already know what needs to be built, fixed, or improved, the next step is simple: share the brief and I&apos;ll map the most practical execution path.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Start a Project</ButtonLink>
              <ButtonLink to={routes.portfolio} variant="ghost">
                View Case Studies
              </ButtonLink>
              <ButtonLink to={routes.blog} variant="ghost">
                Read Insights
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
