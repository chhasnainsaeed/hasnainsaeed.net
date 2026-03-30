import Counter from '../ui/Counter'
import Reveal from '../ui/Reveal'
import { clientLogos, trustStats } from '../../utils/site'

const statMeta = {
  'Years Experience': {
    chip: 'Experience',
    note: 'Hands-on delivery across design-to-development workflows.',
  },
  'Live Case Studies': {
    chip: 'Proof',
    note: 'Public case studies backed by screenshots and live site references.',
  },
  'Core Platforms': {
    chip: 'Stack',
    note: 'Specialized in Shopify, WordPress, Webflow, and WooCommerce work.',
  },
  'Service Markets': {
    chip: 'Markets',
    note: 'Remote collaboration for USA, UK, Canada, and international clients.',
  },
}

function TickerTrack() {
  return (
    <div className="inline-flex items-center gap-3 px-4">
      {clientLogos.map((logo) => (
        <span
          key={logo}
          className="inline-flex h-9 items-center rounded-full border border-white/12 bg-white/[0.03] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200"
        >
          {logo}
        </span>
      ))}
    </div>
  )
}

export default function TrustRow() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(130deg,rgba(255,115,0,0.14),rgba(255,77,45,0.08),rgba(8,10,16,0.95))] p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -left-12 top-10 h-44 w-44 rounded-full bg-orange-500/20 blur-[80px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 rounded-full bg-red-500/16 blur-[90px]" />

          <div className="relative grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-orange-200/85">Credibility</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">Built Around Public Proof and Direct Delivery</h2>
              <p className="mt-3 max-w-xl text-sm text-zinc-300 sm:text-base">
                The site now centers on real portfolio work, clear service scope, and a direct working model instead of generic agency-style claims.
              </p>
            </div>
            <div className="flex lg:justify-end">
              <span className="inline-flex items-center rounded-full border border-orange-300/30 bg-orange-500/12 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-orange-200">
                International Delivery
              </span>
            </div>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trustStats.map((item) => (
              <article
                key={item.label}
                className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(140deg,rgba(255,255,255,0.06),rgba(0,0,0,0.25))] p-5"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <div className="mb-4 inline-flex h-8 items-center rounded-full border border-orange-300/35 bg-orange-500/12 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-orange-200">
                  {statMeta[item.label]?.chip ?? 'Metric'}
                </div>
                <div className="text-4xl font-bold leading-none text-white">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <p className="mt-3 text-sm font-semibold text-zinc-200">{item.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{statMeta[item.label]?.note}</p>
              </article>
            ))}
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/12 bg-black/30 p-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-black/70 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-black/70 to-transparent" />
            <div className="flex w-max animate-[marquee_26s_linear_infinite]">
              <TickerTrack />
              <TickerTrack />
              <TickerTrack />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
