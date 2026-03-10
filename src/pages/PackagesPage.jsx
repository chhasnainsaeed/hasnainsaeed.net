import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import FaqAccordion from '../components/ui/FaqAccordion'
import ButtonLink from '../components/ui/ButtonLink'
import PackageCard from '../components/ui/PackageCard'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createProfessionalServiceReference, createWebPageSchema } from '../seo/schema'
import { packageComparison, packages } from '../data/packages'
import { routes } from '../utils/routes'

const faqs = [
  { question: 'Are these fixed-price packages?', answer: 'Think of them as structured starting points. Final scope depends on the platform, content readiness, and whether the project includes optimization or ongoing support.' },
  { question: 'Can I request custom scope beyond the listed packages?', answer: 'Yes. The Custom package is specifically for unique builds, complex handoffs, or long-term support work.' },
  { question: 'Do packages include QA before launch?', answer: 'Growth and Premium include a QA pass by default. Other packages can add QA and bug-fix coverage depending on the project.' },
]

export default function PackagesPage() {
  const metadata = getStaticPageMetadata('packages')
  const faqSchema = createFAQSchema(faqs, routes.packages)

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
            { name: 'Packages', path: routes.packages },
          ]),
          createWebPageSchema({
            path: routes.packages,
            title: metadata.title,
            description: metadata.description,
            mainEntity: createProfessionalServiceReference(),
            about: [createProfessionalServiceReference(), 'website project packages', 'freelance web development pricing structure'],
            image: metadata.image,
          }),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Packages"
        title="Structured Packages for Builds, Rebuilds, and Ongoing Support"
        description="These packages help frame scope quickly. They are designed to give clear starting points, not to force every project into the same shape."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Packages' },
        ]}
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
            <h3 className="text-2xl font-semibold text-white">Need a custom proposal?</h3>
            <p className="mt-3 text-zinc-300">Share the current site, platform, and what success should look like. I&apos;ll recommend the right package or propose a custom scope when the work does not fit a standard tier.</p>
            <ButtonLink to={routes.contact} className="mt-6">
              Request a Proposal
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  )
}
