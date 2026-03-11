import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'

const timeline = ['2021 - Started freelancing with WordPress builds', '2022 - Expanded into Shopify customizations and CRO work', '2023 - Added Webflow implementation for startup landing pages', '2024 - Focused on QA-backed development workflows for smoother launches', '2025+ - Delivering premium multi-platform implementation for international clients']

export default function AboutPage() {
  document.title = 'About | Hasnain Saeed'

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Hasnain Saeed - Freelance Web Developer with QA-Driven Delivery"
        description="I help businesses build premium websites that balance design polish, technical performance, and conversion goals."
      />

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="premium-card h-full min-h-80 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/15 text-zinc-400">
              Professional photo placeholder
            </div>
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-9" delay={0.1}>
            <h2 className="text-3xl font-semibold text-white">Freelancer + Technical Implementer</h2>
            <p className="mt-4 text-zinc-300">
              My background combines front-end implementation, platform-specific development, and QA workflows. I work closely with
              clients to translate design intent into high-quality production websites, with performance and usability prioritized
              from the start.
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
            {['WordPress', 'Shopify', 'Webflow', 'WooCommerce', 'HTML/CSS/JS', 'Basic SEO', 'QA Testing', 'Performance Optimization'].map(
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
              <li>- Clean handoff documentation</li>
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
