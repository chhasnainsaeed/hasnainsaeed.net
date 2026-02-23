import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import PackageCard from '../components/ui/PackageCard'
import FaqAccordion from '../components/ui/FaqAccordion'
import ButtonLink from '../components/ui/ButtonLink'
import { packageComparison, packages } from '../data/packages'

const faqs = [
  { question: 'Can I request custom scope beyond listed packages?', answer: 'Yes. The Custom package is specifically for unique project needs, complex builds, and ongoing support.' },
  { question: 'Do packages include QA before launch?', answer: 'Growth and Premium include QA pass by default. Starter can add QA as an optional service.' },
  { question: 'How fast can a project start?', answer: 'Most projects can start within 3-7 days depending on scope and current schedule.' },
]

export default function PackagesPage() {
  document.title = 'Packages | Hasnain Saeed'

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Flexible Website Packages"
        description="Clear pricing tiers for Starter, Growth, Premium, and Custom project requirements."
      />

      <section className="section-pad pb-14">
        <div className="section-wrap grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pack, index) => (
            <Reveal key={pack.id} delay={index * 0.04}>
              <PackageCard pack={pack} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-14">
        <div className="section-wrap premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-zinc-200">
              <thead className="bg-white/5 text-xs uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="px-5 py-4">Feature</th>
                  <th className="px-5 py-4">Starter</th>
                  <th className="px-5 py-4">Growth</th>
                  <th className="px-5 py-4">Premium</th>
                  <th className="px-5 py-4">Custom</th>
                </tr>
              </thead>
              <tbody>
                {packageComparison.map((row) => (
                  <tr key={row.feature} className="border-t border-white/10">
                    <td className="px-5 py-4 text-zinc-100">{row.feature}</td>
                    <td className="px-5 py-4">{row.starter ? 'Yes' : '-'}</td>
                    <td className="px-5 py-4">{row.growth ? 'Yes' : '-'}</td>
                    <td className="px-5 py-4">{row.premium ? 'Yes' : '-'}</td>
                    <td className="px-5 py-4">{row.custom ? 'Yes' : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">Frequently Asked Questions</h2>
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal className="premium-card p-7" delay={0.08}>
            <h3 className="text-2xl font-semibold text-white">Need a Custom Proposal?</h3>
            <p className="mt-3 text-zinc-300">Share your goals and timeline to receive a tailored scope with realistic delivery milestones.</p>
            <ButtonLink to="/contact" className="mt-6">
              Book Consultation
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
