import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import { getProjectPath } from '../../utils/routes'

const proofSlugs = [
  'feyre-shopify-luxury-fashion-storefront',
  'mapx-development-wordpress-site',
  'apex-tuition-australia-tutoring-site',
]

const proofProjects = proofSlugs.map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean)

export default function ProofHighlightsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Social Proof"
            title="Proof from recent client work"
            description="Instead of generic claims, the site surfaces real shipped case studies across Shopify, WordPress, and Webflow work with live project context and measurable trust signals."
          />
        </Reveal>

        <Reveal className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-3xl font-semibold text-white">{projects.length}</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Live case studies</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              A portfolio built around shipped websites, not placeholder mock work, across service businesses, ecommerce, and startup marketing pages.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-3xl font-semibold text-white">USA, UK &amp; Canada</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Active client markets</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              The work is structured for remote collaboration across different time zones, with direct communication from first reply through launch support.
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <p className="text-3xl font-semibold text-white">Build + QA</p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Differentiator</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Most projects do not stop at implementation. They also need responsive cleanup, final polish, launch validation, and fewer surprises after go-live.
            </p>
          </article>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {proofProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05} className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6">
              <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{project.platform}</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{project.resultBadge}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{project.shortResult}</p>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{project.title}</p>
              <Link to={getProjectPath(project.slug)} className="mt-6 inline-flex text-sm font-semibold text-orange-300">
                Read case study &rarr;
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
