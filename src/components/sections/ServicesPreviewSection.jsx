import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import { getRouteHref, routes } from '../../utils/routes'

const featuredSummaries = ['shopify-store-development', 'wordpress-development', 'webflow-development']

export default function ServicesPreviewSection() {
  const featuredServices = featuredSummaries.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean)

  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Execution-Focused Services for Growth-Driven Brands"
            description="From development and implementation to optimization and QA support, each service is built to improve quality, search readiness, and business outcomes."
          />
        </Reveal>
        <Reveal className="grid gap-4 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <article key={service.slug} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{service.title}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{service.intro}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Best fit: {service.idealFor}. {service.startingPrice ? `Starting from ${service.startingPrice}.` : 'Quoted based on scope.'}
              </p>
            </article>
          ))}
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.slice(0, 8).map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to={getRouteHref(routes.services)} className="inline-flex text-sm font-semibold text-orange-300">
            Explore All Services &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

