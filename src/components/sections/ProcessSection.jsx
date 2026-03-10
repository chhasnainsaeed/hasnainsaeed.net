import { processSteps } from '../../data/services'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function ProcessSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="A practical process that keeps scope clear and delivery predictable."
            description="The work moves from discovery to launch through clear milestones, focused implementation, and QA before anything goes live."
          />
        </Reveal>
        <div className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-orange-400/30 to-transparent xl:block" />
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.05}>
              <article className="premium-card relative p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-300">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
