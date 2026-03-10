import { useMemo, useState } from 'react'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ProjectCard from '../components/ui/ProjectCard'
import ButtonLink from '../components/ui/ButtonLink'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCollectionPageSchema, createProfessionalServiceReference } from '../seo/schema'
import { projectFilters, projects } from '../data/projects'
import { portfolioInternalLinkGroups } from '../utils/internalLinks'
import { getProjectPath, routes } from '../utils/routes'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const metadata = getStaticPageMetadata('portfolio')
  const caseStudyTopics = Array.from(new Set(projects.flatMap((project) => [project.platform, project.category, project.industry].filter(Boolean))))

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
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Case Studies', path: routes.portfolio },
          ]),
          createCollectionPageSchema({
            name: metadata.title,
            description: metadata.description,
            path: routes.portfolio,
            items: projects.map((project) => ({
              name: project.title,
              path: getProjectPath(project.slug),
            })),
            about: [createProfessionalServiceReference(), ...caseStudyTopics],
            image: metadata.image,
          }),
        ]}
      />

      <PageHero
        eyebrow="Case Studies"
        title="SEO-Friendly Case Studies That Show the Problem, the Work, and the Result"
        description="This portfolio is structured as proof of expertise, not a gallery. Each case study explains the business goal, the implementation approach, the technology used, and the result."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Case Studies' },
        ]}
        actions={
          <>
            <ButtonLink to={routes.contact}>Discuss a Similar Project</ButtonLink>
            <ButtonLink to={routes.services} variant="ghost">
              Explore Services
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-16">
        <div className="section-wrap">
          <Reveal className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">What these case studies are designed to show</h2>
              <p className="mt-4 text-zinc-300">
                Each project page breaks down the client type, business goal, solution delivered, technology stack, implementation summary, and result narrative so you can see how the work translates into live outcomes.
              </p>
            </div>
            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Best for buyers comparing implementation quality</h2>
              <p className="mt-4 text-zinc-300">
                If you need a freelance Shopify, WordPress, Webflow, WooCommerce, optimization, or QA partner, these pages are built to make the scope and proof easier to evaluate quickly.
              </p>
            </div>
          </Reveal>

          <Reveal className="mb-8">
            <InternalLinkSection
              eyebrow="Proof Paths"
              title="Use the proof pages to move into the right service path"
              description="The strongest internal links from the case-study hub point back into commercial service pages, planning content, and direct inquiry routes so buyers can keep moving without guessing."
              groups={portfolioInternalLinkGroups}
            />
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
