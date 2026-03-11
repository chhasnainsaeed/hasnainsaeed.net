import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import { projects } from '../data/projects'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const projectIndex = projects.findIndex((item) => item.slug === slug)

  if (projectIndex === -1) return <Navigate to="/portfolio" replace />

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]
  document.title = `${project.title} | Hasnain Saeed`

  return (
    <>
      <PageHero eyebrow={project.category} title={project.title} description={project.heroSummary} />

      <section className="section-pad pb-14">
        <div className="section-wrap">
          <Reveal className="premium-card h-72 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6">
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/15 text-zinc-400">
              Cover image placeholder ({project.platform} | {project.year})
            </div>
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
            {project.gallery.map((item, index) => (
              <Reveal key={item} delay={index * 0.05} className="premium-card h-40 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-white/15 text-xs text-zinc-400">
                  Gallery placeholder {index + 1}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="premium-card p-6">
            <h2 className="text-2xl font-semibold text-white">Client Testimonial</h2>
            <p className="mt-3 text-zinc-200">"{project.testimonial.quote}"</p>
            <p className="mt-4 text-sm text-zinc-400">{project.testimonial.name} - {project.testimonial.role}</p>
          </Reveal>
          <Reveal className="premium-card flex flex-wrap items-center justify-between gap-3 p-6">
            <Link className="text-sm text-orange-300" to={`/portfolio/${nextProject.slug}`}>
              Next Project: {nextProject.title} &rarr;
            </Link>
            <ButtonLink to="/contact">Book Consultation</ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}

