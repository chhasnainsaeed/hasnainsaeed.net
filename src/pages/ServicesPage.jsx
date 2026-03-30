import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import FaqAccordion from '../components/ui/FaqAccordion'
import ButtonLink from '../components/ui/ButtonLink'
import BlogCard from '../components/ui/BlogCard'
import { blogPosts } from '../data/blogPosts'
import { services } from '../data/services'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createCollectionPageSchema, createFAQSchema, createProfessionalServiceSchema } from '../seo/schema'
import { getServicePath, routes } from '../utils/routes'

const faqs = [
  {
    question: 'Do you work with international clients?',
    answer: 'Yes. I regularly collaborate with clients in USA, UK, and Canada using async-friendly workflows and clear milestone updates.',
  },
  {
    question: 'Can you join existing projects for fixes and optimization?',
    answer: 'Yes. I can audit ongoing sites, resolve bugs, improve speed, and strengthen UX without requiring a full rebuild.',
  },
  {
    question: 'Do you provide QA support before launch?',
    answer: 'Yes. QA validation is available as a dedicated service or integrated into development packages.',
  },
]

export default function ServicesPage() {
  const metadata = getStaticPageMetadata('services')
  const serviceNames = services.map((service) => service.title)
  const serviceItems = services.map((service) => ({ name: service.title, path: getServicePath(service.slug) }))
  const featuredGuides = [...blogPosts].sort((left, right) => new Date(right.date) - new Date(left.date)).slice(0, 3)
  const faqSchema = createFAQSchema(faqs, routes.services)

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
          createProfessionalServiceSchema(serviceNames),
          createCollectionPageSchema({
            path: routes.services,
            name: metadata.title,
            description: metadata.description,
            image: metadata.image,
            items: serviceItems,
            about: serviceNames,
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Services', path: routes.services },
          ]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Services"
        title="Premium Web Development, Implementation, and QA Services"
        description="Detailed services built for businesses that need quality execution, better performance, and conversion-focused outcomes."
      />

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-5">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04} className="premium-card p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">{service.icon}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{service.title}</h2>
                  <p className="mt-3 text-sm text-zinc-300">{service.summary}</p>
                  <ButtonLink to={getServicePath(service.slug)} variant="ghost" className="mt-5">
                    View Service Page
                  </ButtonLink>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">What's Included</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-200">
                    {service.includes.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Deliverables</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-zinc-200">
                    {service.deliverables.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-zinc-400">Ideal client: {service.idealFor}</p>
                  <p className="mt-1 text-xs text-zinc-400">Timeline: {service.timeline}</p>
                  <p className="mt-1 text-xs text-zinc-400">Optional add-ons: {service.addons.join(', ')}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal className="premium-card p-7" delay={0.1}>
            <h2 className="text-2xl font-semibold text-white">Why Work With Hasnain</h2>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>- Platform-specific implementation expertise</li>
              <li>- Conversion-aware UI decisions</li>
              <li>- Reliable communication and milestone clarity</li>
              <li>- QA-backed launch confidence</li>
            </ul>
            <ButtonLink to="/contact" className="mt-6">
              Book Consultation
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-18">
        <div className="section-wrap space-y-6">
          <Reveal className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Content Support</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Guides connected to these services</h2>
            </div>
            <ButtonLink to={routes.blog} variant="ghost">
              View All Articles
            </ButtonLink>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredGuides.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.05}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
