import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ButtonLink from '../ui/ButtonLink'

const rotatingWords = ['Shopify', 'WordPress', 'Webflow', 'CRO', 'QA', 'SEO-ready']

const proofItems = [
  { label: 'Average Speed Gain', value: '+45%' },
  { label: 'Launch QA Coverage', value: '100%' },
  { label: 'Projects Delivered', value: '100+' },
]

const projectTiles = [
  { title: 'Skincare Shopify Revamp', tag: 'Shopify', result: '+34% checkout completion' },
  { title: 'Corporate WP Rebuild', tag: 'WordPress', result: '+51% lead submissions' },
  { title: 'SaaS Webflow Launch', tag: 'Webflow', result: '+38% trial signups' },
]

const tagStyle = {
  Shopify: 'border-emerald-400/45 bg-emerald-500/15 text-emerald-300',
  WordPress: 'border-blue-400/45 bg-blue-500/15 text-blue-300',
  Webflow: 'border-violet-400/45 bg-violet-500/15 text-violet-300',
}

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  const activeWord = useMemo(() => rotatingWords[wordIndex], [wordIndex])

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-12 sm:px-8 sm:pb-24 lg:px-14 lg:pt-16">
      <div className="section-wrap">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_8%_10%,rgba(255,115,0,0.18),transparent_38%),radial-gradient(circle_at_92%_18%,rgba(255,77,45,0.16),transparent_34%),linear-gradient(145deg,#0d0f14,#080a0f)] p-6 sm:p-9 lg:p-12">
          <div className="absolute -left-16 top-24 h-56 w-56 rounded-full bg-orange-500/20 blur-[90px]" aria-hidden="true" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/16 blur-[95px]" aria-hidden="true" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-orange-300/90">Hasnain Saeed | Freelance Web Developer</p>

              <h1 className="max-w-[16ch] text-[2rem] font-semibold leading-[1.14] text-white sm:text-[3rem] xl:text-[3.8rem]">
                Websites That
                <span className="text-gradient"> Look Premium</span>
                <br />
                and Convert Like a Sales Engine
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-zinc-200">
                <span className="text-sm uppercase tracking-[0.18em] text-zinc-400">Built for</span>
                <motion.span
                  key={activeWord}
                  className="rounded-full border border-orange-300/35 bg-orange-500/12 px-4 py-1.5 text-sm font-semibold text-orange-200"
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                >
                  {activeWord}
                </motion.span>
              </div>

              <p className="mt-5 max-w-[56ch] text-zinc-300">
                I help brands in USA, UK, and Canada launch high-performing Shopify, WordPress, and Webflow websites with
                conversion-focused UI implementation and QA-backed delivery.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink to="/contact">Book Consultation</ButtonLink>
                <ButtonLink to="/portfolio" variant="ghost">
                  View Portfolio
                </ButtonLink>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {proofItems.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3">
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:pl-2">
              <div className="premium-card relative p-5 sm:p-6 lg:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">Live Project Highlights</p>
                  <span className="rounded-2xl border border-orange-300/30 bg-orange-500/12 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-orange-200">
                    Premium Delivery
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {projectTiles.map((item, index) => (
                    <article
                      key={item.title}
                      className={`rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(255,115,0,0.2)] ${
                        index === 0 ? 'border-orange-400/40 bg-orange-500/[0.1]' : 'border-white/12 bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-sm font-semibold leading-snug text-white sm:text-base">{item.title}</h3>
                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${tagStyle[item.tag]}`}>
                          {item.tag}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-zinc-300">{item.result}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
