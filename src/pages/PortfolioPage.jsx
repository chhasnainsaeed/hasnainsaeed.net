import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import { projectFilters, projects } from '../data/projects'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCollectionPageSchema } from '../seo/schema'
import { getProjectPath, routes } from '../utils/routes'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const metadata = getStaticPageMetadata('portfolio')
  const breadcrumbItems = [
    { name: 'Home', path: routes.home },
    { name: 'Portfolio', path: routes.portfolio },
  ]

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  return (
    <>
      <Seo
        title={metadata.title}
        description={metadata.description}
        pathname={metadata.pathname}
        ogTitle={metadata.ogTitle}
        ogDescription={metadata.ogDescription}
        twitterTitle={metadata.twitterTitle}
        twitterDescription={metadata.twitterDescription}
        image={metadata.image}
        jsonLd={[
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: routes.portfolio,
            image: metadata.image,
            items: projects.map((project) => ({
              name: project.title,
              path: getProjectPath(project.slug),
            })),
            about: ['Shopify case studies', 'WordPress case studies', 'Webflow case studies'],
          }),
          createBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <PageHero
        eyebrow="Portfolio"
        title="Case Study Portfolio"
        description="Filterable project gallery across Shopify, WordPress, and Webflow work, each supported by screenshots and implementation notes."
        breadcrumbs={breadcrumbItems}
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
