import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { routes } from '../../utils/routes'
import ButtonLink from '../ui/ButtonLink'
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
            title="Core freelance web development services for businesses that need results, not filler."
            description="Choose a focused engagement for Shopify development, WordPress development, Webflow development, WooCommerce development, website optimization, website maintenance, Figma to website implementation, UI/UX implementation, or bug fixing and QA support."
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal className="premium-card flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300/85">Need The Right Scope?</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
              Some projects need a full website build. Others need a focused sprint for website optimization, a cleaner UI implementation, or ongoing maintenance and support. Each service page breaks down the fit, process, and deliverables.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to={routes.services} variant="ghost">
              View All Service Pages
            </ButtonLink>
            <Link to={routes.contact} className="inline-flex items-center text-sm font-semibold text-orange-300">
              Discuss Your Scope &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

