import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { testimonials } from '../../data/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Trust Signals"
            title="Trust is built through the way the work is delivered."
            description="If you are hiring a freelance web developer, these are usually the things that matter once the project starts: clear scope, sharp execution, solid QA, and support when the site needs to keep moving."
          />
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="premium-card h-full p-6">
                <p className="inline-flex rounded-full border border-orange-300/35 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-orange-200">
                  {item.stat}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-100">{item.quote}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.supportingText}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
