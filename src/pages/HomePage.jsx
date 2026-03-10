import ClientProblemSection from '../components/sections/ClientProblemSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import FinalCtaSection from '../components/sections/FinalCtaSection'
import HeroSection from '../components/sections/HeroSection'
import ProcessSection from '../components/sections/ProcessSection'
import ServicesPreviewSection from '../components/sections/ServicesPreviewSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import TrustRow from '../components/sections/TrustRow'
import WhyWorkWithMeSection from '../components/sections/WhyWorkWithMeSection'
import AnswerSummaryCard from '../components/ui/AnswerSummaryCard'
import ButtonLink from '../components/ui/ButtonLink'
import FaqAccordion from '../components/ui/FaqAccordion'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { services } from '../data/services'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import {
  createBreadcrumbSchema,
  createFAQSchema,
  createPersonSchema,
  createProfessionalServiceReference,
  createProfessionalServiceSchema,
	createWebPageSchema,
	createWebsiteSchema,
} from '../seo/schema'
import { homeInternalLinkGroups } from '../utils/internalLinks'
import { routes } from '../utils/routes'
import { siteConfig } from '../utils/site'

const homeFaqs = [
  {
    question: 'What does Hasnain Saeed do as a freelance web developer?',
    answer:
      'Hasnain Saeed builds and improves business websites across Shopify, WordPress, Webflow, and WooCommerce. Common engagements include new page builds, redesign implementation, website optimization, bug fixing, and ongoing website maintenance.',
  },
  {
    question: 'Do you only build new websites?',
    answer:
      'No. Many projects start with improving an existing website through clearer service pages, faster performance, cleaner frontend implementation, technical fixes, or QA before launch.',
  },
  {
    question: 'Which platforms do you work with?',
    answer:
      'Shopify, WordPress, Webflow, and WooCommerce are the main platforms, along with focused Figma to website and UI implementation work when a team already has designs approved.',
  },
  {
    question: 'Do you offer website optimization and maintenance?',
    answer:
      'Yes. Website speed optimization, bug fixing, ongoing updates, and website maintenance are available as focused sprints or ongoing support.',
  },
  {
    question: 'Do you work with clients outside Pakistan?',
    answer:
      'Yes. Projects are delivered remotely for clients in the USA, UK, Canada, and other international markets with clear milestones and async-friendly communication.',
  },
]

export default function HomePage() {
  const metadata = getStaticPageMetadata('home')
  const serviceNames = services.map((service) => service.title)
  const faqSchema = createFAQSchema(homeFaqs, routes.home)

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
          createWebsiteSchema(),
          createPersonSchema(serviceNames),
          createProfessionalServiceSchema(serviceNames),
          createWebPageSchema({
            path: routes.home,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: createProfessionalServiceReference(),
            about: [createProfessionalServiceReference(), ...serviceNames],
          }),
          createBreadcrumbSchema([{ name: 'Home', path: routes.home }]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <HeroSection />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <AnswerSummaryCard
              title="Who is Hasnain Saeed and what does he do?"
              answer={siteConfig.answerSummary}
              facts={[
                { term: 'Main services', description: 'Shopify development, WordPress development, Webflow development, WooCommerce development, website optimization, and website maintenance.' },
                { term: 'Best-fit clients', description: siteConfig.bestFitClients },
                { term: 'Markets served', description: siteConfig.serviceMarkets.join(', ') },
                { term: 'Delivery model', description: 'Remote freelance delivery with implementation, QA, and post-launch support.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.about}>About Hasnain</ButtonLink>
                <ButtonLink to={routes.services} variant="ghost">
                  Explore Services
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>

          <Reveal delay={0.08}>
            <AnswerSummaryCard
              eyebrow="Best Fit"
              title="When do businesses usually hire Hasnain?"
              answer="Most projects start when a business needs a website to convert better, when design quality is getting lost in development, when speed or technical issues are hurting results, or when the team needs an ongoing technical partner after launch."
              facts={[
                { term: 'Common triggers', description: 'Website redesign implementation, service-page clarity, ecommerce UX improvements, speed cleanups, and release QA.' },
                { term: 'Platforms', description: siteConfig.corePlatforms.join(', ') },
                { term: 'Support work', description: 'Figma to website delivery, UI implementation, bug fixing, QA support, and maintenance.' },
                { term: 'Proof paths', description: 'Every major service links to case studies, blog guides, and direct inquiry paths.' },
              ]}
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.portfolio}>View Case Studies</ButtonLink>
                <ButtonLink to={routes.blog} variant="ghost">
                  Read Insights
                </ButtonLink>
              </div>
            </AnswerSummaryCard>
          </Reveal>
        </div>
      </section>

      <ClientProblemSection />
      <ServicesPreviewSection />
      <FeaturedProjectsSection />
      <TrustRow />
      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Start Here"
              title="Follow the path that matches the project"
              description="The homepage links below are organized by commercial intent so it is easier to move from broad discovery into the right service page, proof page, or topic cluster."
              groups={homeInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>
      <WhyWorkWithMeSection />
      <ProcessSection />
      <TestimonialsSection />

      <section className="section-pad py-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions clients ask before hiring a freelance web developer"
              description="These cover the common questions around platforms, existing-site improvements, website optimization, and ongoing support."
            />
            <div className="mt-6">
              <FaqAccordion items={homeFaqs} />
            </div>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <p className="text-xs uppercase tracking-[0.22em] text-orange-200">Next Step</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Need help choosing the right scope?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              The work can start as a full build, a focused implementation sprint, a performance cleanup, or ongoing website maintenance and support. The first goal is simply to define the highest-impact next step.
            </p>

            <ul className="mt-5 space-y-3 text-sm text-zinc-200">
              <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">Shopify, WordPress, Webflow, and WooCommerce scope</li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">Figma to website and UI implementation support</li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">Website optimization, bug fixing, QA, and maintenance</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Explore Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCtaSection />
    </>
  )
}
