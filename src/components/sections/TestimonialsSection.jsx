import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { featuredTestimonials, publishedTestimonials } from '../../data/testimonials'

export default function TestimonialsSection() {
  const testimonialsToShow = featuredTestimonials.length ? featuredTestimonials : publishedTestimonials.slice(0, 3)

  if (!testimonialsToShow.length) return null

  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Client Feedback"
            title="What clients said about the work"
            description="Selected client feedback from WordPress, Shopify, and Webflow projects adds direct trust signals on top of the case studies and shipped work already shown across the site."
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonialsToShow.map((testimonial, index) => (
            <Reveal
              key={testimonial.id}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-orange-200">{testimonial.service}</p>
              <blockquote className="mt-5 text-sm leading-7 text-zinc-200">"{testimonial.quote}"</blockquote>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm text-zinc-400">Client testimonial</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
