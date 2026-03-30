import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import FaqAccordion from '../components/ui/FaqAccordion'
import { getBlogPostBySlug } from '../data/blogPosts'
import NotFoundPage from './NotFoundPage'
import Seo from '../seo/Seo'
import { getBlogPostMetadata } from '../seo/metadata'
import { createArticleSchema, createBreadcrumbSchema, createFAQSchema, createWebPageSchema } from '../seo/schema'
import { getBlogPath, routes } from '../utils/routes'
import { getAbsoluteUrl } from '../utils/site'

function getSectionId(heading) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = getBlogPostBySlug(slug)

  if (!post) return <NotFoundPage />

  const postPath = getBlogPath(post.slug)
  const metadata = getBlogPostMetadata(post)
  const faqSchema = createFAQSchema(post.faq, postPath)

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
        type={metadata.type}
        keywords={metadata.keywords}
        jsonLd={[
          createWebPageSchema({
            path: postPath,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            mainEntity: { '@id': `${getAbsoluteUrl(postPath)}#article` },
            about: [post.category, ...(post.keywords || [])],
          }),
          createArticleSchema(post),
          createBreadcrumbSchema([
            { name: 'Home', path: routes.home },
            { name: 'Blog', path: routes.blog },
            { name: post.title, path: postPath },
          ]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card overflow-hidden">
            <img src={post.image} alt={post.title} className="h-72 w-full object-cover sm:h-80" loading="eager" />
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">Why this topic matters</h2>
              <p className="mt-4 text-zinc-300">{post.intro}</p>
            </div>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Article Snapshot</h2>
            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Category</p>
                <p className="mt-2 text-sm text-zinc-200">{post.category}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Published</p>
                <p className="mt-2 text-sm text-zinc-200">{post.displayDate || post.date}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Read Time</p>
                <p className="mt-2 text-sm text-zinc-200">{post.readTime}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Key Takeaways</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              {post.keyTakeaways.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="premium-card p-6 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">On This Page</h2>
            <nav aria-label="Article sections" className="mt-5">
              <ol className="space-y-3 text-sm text-zinc-300">
                {post.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${getSectionId(section.heading)}`} className="transition hover:text-orange-200">
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <Link to={routes.blog} className="mt-6 inline-flex text-sm font-semibold text-orange-300">
              Back to Blog &rarr;
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap space-y-6">
          {post.sections.map((section, index) => (
            <Reveal key={section.heading} className="premium-card p-6 sm:p-8" delay={index * 0.04}>
              <h2 id={getSectionId(section.heading)} className="scroll-mt-28 text-2xl font-semibold text-white">
                {section.heading}
              </h2>
              <p className="mt-4 max-w-4xl text-zinc-300">{section.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">FAQ</h2>
            <FaqAccordion items={post.faq} />
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Need this applied on a live website?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              If this issue already affects your site, I can review the bottleneck, implement the fix, and support the QA required to launch it cleanly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
              <ButtonLink to={routes.services} variant="ghost">
                Review Services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
