import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const differentiators = [
  {
    title: 'Platform-specific execution',
    description: 'Shopify, WordPress, Webflow, and WooCommerce all have different constraints. The implementation is adapted to the platform instead of forced through one generic process.',
  },
  {
    title: 'Conversion-focused implementation',
    description: 'Copy hierarchy, CTA placement, responsive behavior, and frontend polish are built to move visitors toward action, not just fill the page.',
  },
  {
    title: 'Search-ready structure',
    description: 'Semantic HTML, heading hierarchy, internal links, metadata, and schema are treated as implementation requirements, not cleanup tasks after launch.',
  },
  {
    title: 'Support after launch',
    description: 'Website maintenance, bug fixes, QA support, and follow-up improvements stay available when the site needs to keep moving after the first release.',
  },
]

export default function WhyWorkWithMeSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Why Work With Me"
            title="A strong website needs more than code that technically works."
            description="The build has to support trust, search visibility, conversion flow, performance, and long-term maintainability. That is how I approach freelance web development."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {differentiators.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="premium-card h-full p-6">
                <div className="inline-flex rounded-full border border-orange-300/35 bg-orange-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-200">
                  Reason {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
