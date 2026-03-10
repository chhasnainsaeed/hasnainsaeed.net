import ButtonLink from '../ui/ButtonLink'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { routes } from '../../utils/routes'

const problemCards = [
  {
    title: 'Weak service-page clarity',
    description: 'Visitors do not quickly understand the offer, the difference, or the next step to take.',
  },
  {
    title: 'Design quality gets lost in development',
    description: 'The live site feels flatter, less polished, or less trustworthy than the approved design direction.',
  },
  {
    title: 'Performance and bug friction',
    description: 'Slow pages, layout problems, plugin conflicts, and broken interactions quietly reduce trust and conversions.',
  },
  {
    title: 'No reliable technical partner',
    description: 'The team needs a freelance web developer who can build, fix, optimize, and maintain the site without agency overhead.',
  },
]

export default function ClientProblemSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
        <Reveal>
          <SectionHeading
            eyebrow="Common Triggers"
            title="Most clients reach out when the website is not doing the job it should."
            description="The problem is rarely just one bug or one page. It is usually a mix of unclear messaging, weak implementation, slow loading, technical issues, or a site that has become harder to maintain than it should be."
          />

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-orange-300/85">Best Fit</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Founder-led businesses, ecommerce brands, marketing teams, and agencies that already know the website needs to convert better, load faster, or be easier to manage.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Explore Services
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {problemCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <article className="premium-card h-full p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-orange-300">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{card.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
