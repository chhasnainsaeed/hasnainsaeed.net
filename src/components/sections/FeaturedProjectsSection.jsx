import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import { routes } from '../../utils/routes'
import ButtonLink from '../ui/ButtonLink'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'

export default function FeaturedProjectsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Case Studies"
            title="Selected work that shows the build quality, the business problem, and the outcome."
            description="A few representative case studies across Shopify, WordPress, and Webflow showing how the work improves clarity, conversion flow, frontend quality, or performance."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Each case study adds more context around the platform, scope, implementation approach, QA process, and the improvement delivered.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to={routes.portfolio} variant="ghost">
              View All Case Studies
            </ButtonLink>
            <Link to={routes.contact} className="inline-flex items-center text-sm font-semibold text-orange-300">
              Ask About Similar Work &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

