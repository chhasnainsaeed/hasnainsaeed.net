import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'

export default function ServicesPreviewSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Execution-Focused Services for Growth-Driven Brands"
            description="From development and implementation to optimization and QA support, each service is built to improve quality and business outcomes."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to="/services" className="inline-flex text-sm font-semibold text-orange-300">
            Explore All Services &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

