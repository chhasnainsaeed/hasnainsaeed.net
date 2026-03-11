import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import { projectFilters, projects } from '../data/projects'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    if (activeFilter === 'Landing Pages') return projects.filter((item) => item.category === 'Webflow')
    return projects.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  document.title = 'Portfolio | Hasnain Saeed'

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Case Study Portfolio"
        description="Filterable project gallery across Shopify, WordPress, Webflow, optimization, and QA support work."
      />

      <section className="section-pad pb-16">
        <div className="section-wrap">
          <Reveal className="mb-8 flex flex-wrap gap-2">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeFilter === filter ? 'bg-orange-500 text-black' : 'border border-white/15 bg-white/5 text-zinc-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </Reveal>
          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <motion.div layout key={project.slug}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
