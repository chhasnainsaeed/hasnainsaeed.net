import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import TestimonialsSlider from './TestimonialsSlider'

export default function TestimonialsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Clients Across International Markets"
            description="Feedback from founders and teams who needed premium implementation with reliable delivery."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <TestimonialsSlider />
        </Reveal>
      </div>
    </section>
  )
}
