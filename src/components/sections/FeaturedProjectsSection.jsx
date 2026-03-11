import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
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
            title="Selected Work Across Shopify, WordPress, and Webflow"
            description="Each project is structured with clear goals, quality implementation, and measurable outcomes."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to="/portfolio" className="inline-flex text-sm font-semibold text-orange-300">
            View Full Portfolio &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

