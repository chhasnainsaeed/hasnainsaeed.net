import HeroSection from '../components/sections/HeroSection'
import TrustRow from '../components/sections/TrustRow'
import AboutPreviewSection from '../components/sections/AboutPreviewSection'
import ServicesPreviewSection from '../components/sections/ServicesPreviewSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import ProcessSection from '../components/sections/ProcessSection'
import ResultsSection from '../components/sections/ResultsSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import PackagesPreviewSection from '../components/sections/PackagesPreviewSection'
import BlogPreviewSection from '../components/sections/BlogPreviewSection'
import FinalCtaSection from '../components/sections/FinalCtaSection'

export default function HomePage() {
  document.title = 'Hasnain Saeed | Premium Freelance Web Developer'

  return (
    <>
      <HeroSection />
      <TrustRow />
      <AboutPreviewSection />
      <ServicesPreviewSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <ResultsSection />
      <TestimonialsSection />
      <PackagesPreviewSection />
      <BlogPreviewSection />
      <FinalCtaSection />
    </>
  )
}
