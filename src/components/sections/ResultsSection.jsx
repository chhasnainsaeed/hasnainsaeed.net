import { resultStats } from '../../utils/site'
import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

export default function ResultsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="Performance Metrics Clients Care About"
            description="Clear improvements in speed, UX quality, and launch stability from focused development and QA processes."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resultStats.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="premium-card flex h-full flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Metric</span>
                  <span className="text-sm text-emerald-300">?</span>
                </div>
                <div className="text-4xl font-bold leading-none text-white sm:text-5xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${Math.min(item.value, 100)}%` }} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
