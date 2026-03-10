import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blogPosts'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import BlogCard from '../ui/BlogCard'

export default function BlogPreviewSection() {
  return (
    <section className="section-pad py-16">
      <div className="section-wrap space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Insights"
            title="Practical Articles for Better Websites, Better UX, and Cleaner Launches"
            description="Actionable reading on Shopify, WordPress, Webflow, performance, implementation quality, and QA-backed delivery."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.05}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link to="/blog" className="inline-flex text-sm font-semibold text-orange-300">
            Browse All Articles &rarr;
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

