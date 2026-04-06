import { Link } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import ProfilePortrait from '../ui/ProfilePortrait'
import { siteConfig } from '../../utils/site'

const bestFitItems = [
  'Approved designs that need clean implementation',
  'Live websites that feel rough in production',
  'Near-launch builds that need QA and polish',
]

const serviceColumns = [
  {
    label: 'Platforms',
    title: 'Shopify, WordPress, and Webflow',
    note: 'Most projects sit inside these systems, with the work focused on structure, clarity, and finish quality.',
  },
  {
    label: 'Scope',
    title: 'Builds, refinements, and launch prep',
    note: 'That can mean a new page, a redesign implementation, or a final cleanup pass before traffic hits.',
  },
  {
    label: 'Standard',
    title: 'Responsive, stable, and ready to ship',
    note: 'I treat UI quality, performance cleanup, and QA as part of the same delivery standard.',
  },
]

export default function AboutPreviewSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,20,0.98),rgba(12,12,16,0.98))] p-6 shadow-[0_28px_70px_rgba(0,0,0,0.36)] sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.85) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.26em] text-orange-300/85">About Hasnain</p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 transition hover:text-white"
              >
                More About Me
                <FiArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_380px] lg:gap-12">
              <div>
                <h2 className="max-w-[18ch] text-balance text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.75rem] lg:text-[3rem]">
                  Quiet execution for websites that need to feel finished.
                </h2>
                <p className="mt-5 max-w-[60ch] text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  {siteConfig.firstPersonIntro}
                </p>
                <p className="mt-4 max-w-[60ch] text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  {siteConfig.firstPersonDifferentiator}
                </p>
                <p className="mt-4 max-w-[60ch] text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">
                  That usually means joining projects where the strategy, offer, or design direction already exists, then carrying the work through
                  responsive implementation, cleanup, QA, and launch prep so the final site feels trustworthy instead of half-finished.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {['Direct collaboration', 'Build + QA', 'Remote delivery'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="space-y-5">
                <ProfilePortrait />
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Best Fit</p>
                  <div className="mt-5 space-y-4">
                    {bestFitItems.map((item, index) => (
                      <div key={item} className="flex gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-200">{`0${index + 1}`}</span>
                        <p className="text-sm leading-6 text-zinc-200">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-8 h-px bg-white/10" />

            <div className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
              {serviceColumns.map((item) => (
                <article key={item.label} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-5 sm:p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">{item.label}</p>
                  <h3 className="mt-4 text-balance text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
