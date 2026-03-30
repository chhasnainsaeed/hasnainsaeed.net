import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import { projects } from '../data/projects'
import NotFoundPage from './NotFoundPage'
import Seo from '../seo/Seo'
import { getProjectMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCaseStudySchema, createWebPageSchema } from '../seo/schema'
import { getProjectPath, routes } from '../utils/routes'
import { getAbsoluteUrl } from '../utils/site'

function ProjectMedia({ src, alt, fallback, className = '' }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center border border-dashed border-white/15 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-center text-sm text-zinc-400">
        {fallback}
      </div>
    )
  }

  return <img src={src} alt={alt} loading="lazy" className={className} onError={() => setHasError(true)} />
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const projectIndex = projects.findIndex((item) => item.slug === slug)

  if (projectIndex === -1) return <NotFoundPage />

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const projectPath = getProjectPath(project.slug)
  const metadata = getProjectMetadata(project)

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
          createWebPageSchema({
            path: projectPath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: { '@id': `${getAbsoluteUrl(projectPath)}#case-study` },
            about: Array.from(new Set([project.platform, project.category, 'case study'])),
          }),
          createCaseStudySchema(project),
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Portfolio', path: routes.portfolio },
            { name: project.title, path: projectPath },
          ]),
        ]}
      />

      <PageHero eyebrow={`${project.platform} | ${project.year}`} title={project.title} description={project.heroSummary} />

      <section className="section-pad pb-14">
        <div className="section-wrap">
          <Reveal className="premium-card h-72 overflow-hidden">
            <ProjectMedia
              src={project.cover}
              alt={`${project.title} cover`}
              fallback={`Cover preview unavailable (${project.platform} | ${project.year})`}
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-white">Client Overview</h2>
            <p className="mt-3 text-sm text-zinc-300">{project.clientOverview}</p>
          </Reveal>
          <Reveal className="premium-card p-6" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Challenge</h2>
            <p className="mt-3 text-sm text-zinc-300">{project.challenge}</p>
          </Reveal>
          <Reveal className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-white">Solution</h2>
            <p className="mt-3 text-sm text-zinc-300">{project.solution}</p>
          </Reveal>
          <Reveal className="premium-card p-6" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Development Process</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.process.map((step) => (
                <li key={step}>- {step}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-white">QA / Testing Notes</h2>
            <p className="mt-3 text-sm text-zinc-300">{project.qaNotes}</p>
          </Reveal>
          <Reveal className="premium-card p-6" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Result Highlights</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {project.results.map((result) => (
                <li key={result}>- {result}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap space-y-6">
          <Reveal className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-white">Tools Used</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {(project.gallery || []).map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="premium-card h-40 overflow-hidden">
                <ProjectMedia
                  src={item}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fallback={`Gallery preview ${index + 1} unavailable`}
                  className="h-full w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
          {project.testimonial ? (
            <Reveal className="premium-card p-6">
              <h2 className="text-2xl font-semibold text-white">Client Testimonial</h2>
              <p className="mt-3 text-zinc-200">"{project.testimonial.quote}"</p>
              <p className="mt-4 text-sm text-zinc-400">
                {project.testimonial.name} - {project.testimonial.role}
              </p>
            </Reveal>
          ) : null}
          <Reveal className="premium-card flex flex-wrap items-center justify-between gap-3 p-6">
            <Link className="text-sm text-orange-300" to={getProjectPath(nextProject.slug)}>
              Next Project: {nextProject.title} &rarr;
            </Link>
            <div className="flex flex-wrap gap-3">
              {project.websiteUrl ? (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-orange-300/70 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-100 shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-400/14 hover:shadow-[0_12px_30px_rgba(255,115,0,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                >
                  View Live Site
                </a>
              ) : null}
              <ButtonLink to="/contact">Book Consultation</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
