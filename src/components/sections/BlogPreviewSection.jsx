import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import BlogCard from '../ui/BlogCard'

export default function BlogPreviewSection() {
  const latestPosts = [...blogPosts].sort((left, right) => new Date(right.date) - new Date(left.date)).slice(0, 3)

  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Practical Insights for Better Website Performance"
            description="Guides on Shopify, WordPress, Webflow, QA, and frontend implementation, each published as its own indexable article."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {latestPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to="/blog" className="inline-flex text-sm font-semibold text-orange-300">
            Read More Articles &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

