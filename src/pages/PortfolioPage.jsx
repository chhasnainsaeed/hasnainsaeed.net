import { useMemo, useState } from 'react'
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
  const liveSiteCount = projects.filter((item) => item.websiteUrl).length
  const platformCount = new Set(projects.map((item) => item.platform)).size

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
        keywords={metadata.keywords}
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
        title="Hasnain Saeed Web Developer Portfolio"
        description="Filterable Shopify, WordPress, and Webflow case studies with screenshots, implementation notes, and launch-ready execution details."
        breadcrumbs={breadcrumbItems}
      />

      <section className="section-pad pb-16">
        <div className="section-wrap">
          <Reveal className="premium-card mb-8 p-7 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.8fr)]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Shopify, WordPress, and Webflow case studies for international clients</h2>
                <p className="max-w-3xl text-sm text-zinc-300">
                  This portfolio brings together selected Shopify, WordPress, and Webflow projects delivered for businesses in the USA,
                  UK, Australia, and Pakistan. Each case study focuses on the real implementation work: launch-ready builds, clearer user
                  journeys, QA checks, and the business outcomes the site needed to support.
                </p>
                <p className="max-w-3xl text-sm text-zinc-300">
                  If you are comparing a freelance web developer for ecommerce, service businesses, or marketing sites, these examples show
                  how Hasnain Saeed handles structure, messaging, conversion flow, and live-site validation across different industries.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Case Studies</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{projects.length}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Platforms</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{platformCount}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Live Site References</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{liveSiteCount}</p>
                </div>
              </div>
            </div>
          </Reveal>
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project) => (
              <div key={project.slug}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
