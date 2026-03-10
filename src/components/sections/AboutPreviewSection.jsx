import { Link } from 'react-router-dom'
import { FaShopify, FaWordpressSimple } from 'react-icons/fa6'
import { FiActivity, FiCode, FiShield } from 'react-icons/fi'
import { SiWebflow } from 'react-icons/si'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const skills = [
  {
    title: 'WordPress',
    note: 'Custom builds and CMS structure',
    icon: <FaWordpressSimple className="h-4 w-4" />,
  },
  {
    title: 'Shopify',
    note: 'Storefront and conversion UX',
    icon: <FaShopify className="h-4 w-4" />,
  },
  {
    title: 'Webflow',
    note: 'Landing pages and interactions',
    icon: <SiWebflow className="h-4 w-4" />,
  },
  {
    title: 'UI/UX Implementation',
    note: 'Design-to-code precision',
    icon: <FiCode className="h-4 w-4" />,
  },
  {
    title: 'Performance Optimization',
    note: 'Speed and Core Web Vitals',
    icon: <FiActivity className="h-4 w-4" />,
  },
  {
    title: 'QA Support',
    note: 'Testing and release confidence',
    icon: <FiShield className="h-4 w-4" />,
  },
]

export default function AboutPreviewSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap">
        <Reveal className="premium-card relative overflow-hidden p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-20 top-8 h-56 w-56 rounded-full bg-orange-500/15 blur-[90px]" />

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="About Hasnain"
                title="Web Developer and QA-Minded Implementation Specialist"
                description="I work with founders, agencies, and businesses to ship websites that look premium, perform faster, and feel more trustworthy. The process combines platform expertise, technical cleanup, and structured QA so launches stay smooth."
              />
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-orange-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-orange-200">
                Detail-Oriented Delivery
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <article
                  key={skill.title}
                  className="group rounded-xl border border-white/12 bg-[linear-gradient(140deg,rgba(255,255,255,0.04),rgba(0,0,0,0.18))] p-4 transition duration-300 hover:border-orange-300/35"
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-orange-300/35 bg-orange-500/12 text-orange-200 transition group-hover:scale-105">
                    {skill.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-100">{skill.title}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{skill.note}</p>
                </article>
              ))}

              <Link
                to="/about"
                className="sm:col-span-2 mt-1 inline-flex items-center text-sm font-semibold text-orange-300 transition hover:text-orange-200"
              >
                More About Me &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
