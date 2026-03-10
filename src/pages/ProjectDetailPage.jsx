import { Navigate, useParams } from 'react-router-dom'
import BlogCard from '../components/ui/BlogCard'
import ButtonLink from '../components/ui/ButtonLink'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/ui/ProjectCard'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import SiteImage from '../components/ui/SiteImage'
import { getProjectBySlug, projects } from '../data/projects'
import Seo from '../seo/Seo'
import { getProjectMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCaseStudyPageSchema, createCaseStudySchema } from '../seo/schema'
import { getRelatedPosts, getRelatedProjects, getRelatedServices } from '../utils/content'
import { getProjectInternalLinkGroups } from '../utils/internalLinks'
import { getProjectPath, routes } from '../utils/routes'

function getImplementationItems(project) {
  if (project.implementationSummary?.length) return project.implementationSummary

  return (project.process || []).map((step, index) => ({
    title: `Step ${index + 1}`,
    description: step,
  }))
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const projectIndex = projects.findIndex((item) => item.slug === slug)

  if (projectIndex === -1) return <Navigate to={routes.portfolio} replace />

  const project = getProjectBySlug(slug)
  const metadata = getProjectMetadata(project)
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const relatedServices = getRelatedServices(project.relatedServiceSlugs)
  const relatedPosts = getRelatedPosts(project.relatedPostSlugs)
  const relatedProjects = getRelatedProjects(projects.map((item) => item.slug).filter((item) => item !== project.slug)).slice(0, 2)
  const implementationItems = getImplementationItems(project)
  const projectInternalLinkGroups = getProjectInternalLinkGroups({ relatedServices, relatedPosts, nextProject })
  const heroChips = Array.from(new Set([project.clientType, project.industry, project.duration, project.resultBadge].filter(Boolean)))

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
            { name: project.title, path: getProjectPath(project.slug) },
          ]),
          createCaseStudyPageSchema(project),
          createCaseStudySchema(project),
        ]}
      />

      <PageHero
        eyebrow={`${project.platform} Case Study`}
        title={project.title}
        description={project.heroSummary}
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Case Studies', to: routes.portfolio },
          { label: project.title },
        ]}
        chips={heroChips}
        actions={
          <>
            <ButtonLink to={routes.contact}>Inquire About Similar Work</ButtonLink>
            <ButtonLink to={routes.portfolio} variant="ghost">
              Back to Case Studies
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal className="premium-card overflow-hidden p-4 sm:p-5">
            <div className={`grid gap-4 ${project.media?.length > 1 ? 'lg:grid-cols-[1.2fr_0.8fr]' : ''}`}>
              {project.media?.map((item, index) => (
                <figure key={`${item.image}-${index}`} className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 ${index === 0 ? '' : 'h-full'}`}>
                  <SiteImage
                    src={item.image}
                    alt={item.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : undefined}
                    sizes={index === 0 ? '(min-width: 1024px) 55vw, 100vw' : '(min-width: 1024px) 28vw, 100vw'}
                    className={`w-full object-cover ${index === 0 ? 'max-h-[420px]' : 'h-full min-h-[220px]'}`}
                  />
                  <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-zinc-300">{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <SectionHeading
              eyebrow="Project Snapshot"
              title="The project in context"
              description={project.projectOverview}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Client Type</p>
                <p className="mt-2 text-sm text-zinc-200">{project.clientType}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Industry</p>
                <p className="mt-2 text-sm text-zinc-200">{project.industry}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Engagement</p>
                <p className="mt-2 text-sm text-zinc-200">{project.engagement}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Region</p>
                <p className="mt-2 text-sm text-zinc-200">{project.region}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-4 md:grid-cols-3">
          {project.metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.04} className="premium-card p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200">{metric.label}</p>
              <p className="mt-4 text-4xl font-semibold text-white">{metric.value}</p>
              <p className="mt-3 text-sm text-zinc-300">{metric.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Next Paths"
              title="Use this case study to move into the right next page"
              description="Each case study now links into the closest service pages, supporting articles, and adjacent proof pages so the portfolio works like a real evaluation path instead of a dead end."
              groups={projectInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-7 sm:p-8">
            <SectionHeading eyebrow="Overview" title="Project overview" description={project.clientOverview} />
            <p className="mt-5 text-zinc-300">{project.projectOverview}</p>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <SectionHeading eyebrow="Business Goal" title="The business problem to solve" description={project.businessGoal} />
            <p className="mt-5 text-zinc-300">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal className="premium-card p-7 sm:p-8">
            <SectionHeading eyebrow="Solution" title="What was delivered" description={project.solutionDelivered || project.solution} />
            <p className="mt-5 text-zinc-300">{project.solution}</p>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <SectionHeading eyebrow="Results" title="Challenge-to-result narrative" description={project.beforeAfterNarrative} />
            <div className="mt-5 space-y-4 text-zinc-300">
              {project.challengeResultNarrative?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <SectionHeading eyebrow="Technology Stack" title="Tools and platform used" description={project.stackSummary} />
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
                  {tool}
                </span>
              ))}
            </div>

            <h3 className="mt-8 text-xl font-semibold text-white">Scope and deliverables</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {project.deliverables.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <SectionHeading eyebrow="Implementation" title="Process and implementation summary" description="The case study work moved through a clear sequence so the technical output and business goal stayed aligned." />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {implementationItems.map((item, index) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Step {index + 1}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{item.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm text-zinc-400">{project.qaNotes}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <SectionHeading
              eyebrow="Outcome"
              title="What changed after the work"
              description="The result of the project was a clearer, stronger, and more dependable user experience tied to the original business goal."
            />
            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
              {project.results.map((result) => (
                <li key={result}>- {result}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.06}>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-200">Client Feedback</p>
            <p className="mt-4 text-xl font-semibold text-white">{project.testimonial.quote}</p>
            <p className="mt-5 text-sm text-zinc-300">
              {project.testimonial.name}
              <span className="text-zinc-500"> | {project.testimonial.role}</span>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Inquire About Similar Work</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Explore Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {relatedServices.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Related Services"
                title="Services connected to this case study"
                description="If you need similar work on a live project, these are the service lines most directly related to the outcome shown here."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedServices.map((service, index) => (
                <Reveal key={service.slug} delay={index * 0.05}>
                  <ServiceCard service={service} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="Related Insights"
                title="Further reading behind the work"
                description="These articles explain the technical and strategic thinking that supports the kind of implementation shown in this case study."
              />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedProjects.length ? (
        <section className="section-pad pb-12">
          <div className="section-wrap space-y-6">
            <Reveal>
              <SectionHeading
                eyebrow="More Case Studies"
                title="Other examples of similar proof"
                description="Browse additional projects to see how the same quality standards apply across different platforms, industries, and business goals."
              />
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {relatedProjects.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <ProjectCard project={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-pad pb-16">
        <div className="section-wrap">
          <Reveal className="premium-card flex flex-col gap-5 p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.18em] text-orange-200">Inquiry CTA</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{project.ctaTitle}</h2>
              <p className="mt-4 text-zinc-300">{project.ctaDescription}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Inquire About Similar Work</ButtonLink>
              <ButtonLink to={getProjectPath(nextProject.slug)} variant="ghost">
                View Next Case Study
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
