import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createPersonSchema, createWebPageSchema } from '../seo/schema'
import { routes } from '../utils/routes'
import { siteConfig } from '../utils/site'

const timeline = [
  '2021 - Started freelancing with WordPress builds',
  '2022 - Expanded into Shopify customizations and CRO work',
  '2023 - Added Webflow implementation for startup landing pages',
  '2024 - Focused on QA-backed development workflows for smoother launches',
  '2025+ - Delivering multi-platform implementation for international clients',
]

export default function AboutPage() {
  const metadata = getStaticPageMetadata('about')

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
          createPersonSchema(),
          createWebPageSchema({
            path: routes.about,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            about: [siteConfig.name, siteConfig.jobTitle, ...siteConfig.corePlatforms],
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'About', path: routes.about },
          ]),
        ]}
      />

      <PageHero
        eyebrow="About"
        title="Hasnain Saeed - Freelance Web Developer with QA-Driven Delivery"
        description="I help businesses build premium websites that balance design polish, technical performance, and conversion goals."
      />

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="premium-card h-full min-h-80 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 sm:p-8">
            <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-orange-300/90">Working Model</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Direct collaboration from first reply to final delivery</h2>
                <p className="mt-4 text-zinc-300">
                  I work as an independent implementation partner, which keeps communication direct and project decisions clearer from the start.
                </p>
              </div>

              <div className="grid gap-3 pt-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Location</p>
                  <p className="mt-2 text-sm font-semibold text-white">{siteConfig.location}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Markets</p>
                  <p className="mt-2 text-sm font-semibold text-white">{siteConfig.serviceMarkets.join(', ')}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Response</p>
                  <p className="mt-2 text-sm font-semibold text-white">{siteConfig.responseTimeNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-9" delay={0.1}>
            <h2 className="text-3xl font-semibold text-white">Freelancer + Technical Implementer</h2>
            <p className="mt-4 text-zinc-300">
              My background combines front-end implementation, platform-specific development, and QA workflows. I work closely with clients to translate design intent into high-quality production websites, with performance and usability prioritized from the start.
            </p>
            <h3 className="mt-7 text-xl font-semibold text-white">Experience Timeline</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {timeline.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap space-y-6">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white">Skills and Tools</h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {['WordPress', 'Shopify', 'Webflow', 'WooCommerce', 'HTML/CSS/JS', 'Technical SEO foundations', 'QA Testing', 'Performance Optimization'].map(
              (skill, index) => (
                <Reveal key={skill} delay={index * 0.04} className="premium-card p-4 text-sm text-zinc-200">
                  {skill}
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-6">
            <h3 className="text-xl font-semibold text-white">Work Style and Values</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>- Detail-oriented execution</li>
              <li>- Clear and proactive client communication</li>
              <li>- Performance-first implementation</li>
              <li>- Realistic scope guidance and clean handoff notes</li>
            </ul>
          </Reveal>
          <Reveal className="premium-card p-6" delay={0.1}>
            <h3 className="text-xl font-semibold text-white">Need a reliable implementation partner?</h3>
            <p className="mt-3 text-sm text-zinc-300">I am available for project-based builds and ongoing technical support.</p>
            <ButtonLink to="/contact" className="mt-6">
              Book Consultation
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
