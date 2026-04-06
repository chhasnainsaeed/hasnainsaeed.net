import { blogPosts } from '../../data/blogPosts'
import { projects } from '../../data/projects'
import { services } from '../../data/services'
import { siteConfig } from '../../utils/site'
import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const resultStats = [
  {
    title: 'Live Case Studies',
    value: projects.length,
    suffix: '',
    progress: 88,
    note: 'Portfolio entries now point to real published sites with screenshots and route-level detail pages.',
  },
  {
    title: 'Published Guides',
    value: blogPosts.length,
    suffix: '',
    progress: 62,
    note: 'The blog now has indexable article pages instead of a list-only archive.',
  },
  {
    title: 'Core Services',
    value: services.length,
    suffix: '',
    progress: 76,
    note: 'Service coverage spans platform builds, optimization, UI implementation, QA, and SEO-ready setup.',
  },
  {
    title: 'Markets Served',
    value: siteConfig.serviceMarkets.length,
    suffix: '',
    progress: 54,
    note: 'Remote delivery is positioned for international clients and cross-time-zone collaboration.',
  },
]

export default function ResultsSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Website Snapshot"
            title="Current Coverage Across Services, Case Studies, and Content"
            description="These are factual site-level counts that support the public portfolio, service positioning, and organic content footprint."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resultStats.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <article className="premium-card flex h-full flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">Coverage</span>
                  <span className="text-sm text-emerald-300">Live</span>
                </div>
                <div className="text-4xl font-bold leading-none text-white sm:text-5xl">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" style={{ width: `${item.progress}%` }} />
                </div>
                <h3 className="mt-4 text-balance text-lg font-semibold leading-[1.18] tracking-[-0.01em] text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
