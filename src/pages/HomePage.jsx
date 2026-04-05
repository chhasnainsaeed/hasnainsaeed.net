import HeroSection from '../components/sections/HeroSection'
import TrustRow from '../components/sections/TrustRow'
import AboutPreviewSection from '../components/sections/AboutPreviewSection'
import ProofHighlightsSection from '../components/sections/ProofHighlightsSection'
import ServicesPreviewSection from '../components/sections/ServicesPreviewSection'
import FeaturedProjectsSection from '../components/sections/FeaturedProjectsSection'
import ProcessSection from '../components/sections/ProcessSection'
import ResultsSection from '../components/sections/ResultsSection'
import PackagesPreviewSection from '../components/sections/PackagesPreviewSection'
import BlogPreviewSection from '../components/sections/BlogPreviewSection'
import FinalCtaSection from '../components/sections/FinalCtaSection'
import { services } from '../data/services'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createOrganizationSchema, createPersonSchema, createWebPageSchema, createWebsiteSchema } from '../seo/schema'
import { routes } from '../utils/routes'

export default function HomePage() {
  const metadata = getStaticPageMetadata('home')
  const serviceNames = services.map((service) => service.title)

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
        keywords={metadata.keywords}
        jsonLd={[
          createWebsiteSchema(),
          createPersonSchema(),
          createOrganizationSchema(serviceNames),
          createWebPageSchema({
            path: routes.home,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            about: serviceNames,
          }),
          createBreadcrumbSchema([{ name: 'Home', path: routes.home }]),
        ]}
      />
      <HeroSection />
      <TrustRow />
      <AboutPreviewSection />
      <ProofHighlightsSection />
      <ServicesPreviewSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <ResultsSection />
      <PackagesPreviewSection />
      <BlogPreviewSection />
      <FinalCtaSection />
    </>
  )
}
