import { useState } from 'react'
import AnswerSummaryCard from '../components/ui/AnswerSummaryCard'
import ButtonLink from '../components/ui/ButtonLink'
import FaqAccordion from '../components/ui/FaqAccordion'
import InternalLinkSection from '../components/ui/InternalLinkSection'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createProfessionalServiceReference, createProfessionalServiceSchema, createWebPageSchema } from '../seo/schema'
import { services } from '../data/services'
import { contactInternalLinkGroups } from '../utils/internalLinks'
import { routes } from '../utils/routes'
import { siteConfig } from '../utils/site'

const serviceOptions = [
  { value: '', label: 'Select the main service you need' },
  { value: 'not-sure', label: 'Not sure yet - need guidance' },
  ...services.map((service) => ({ value: service.slug, label: service.title })),
]

const platformOptions = [
  { value: '', label: 'Select the current platform (optional)' },
  ...siteConfig.corePlatforms.map((platform) => ({
    value: platform.toLowerCase(),
    label: platform,
  })),
  { value: 'custom', label: 'Custom or mixed stack' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const budgetOptions = [
  { value: '', label: 'Select a budget range (optional)' },
  { value: 'under-1500', label: 'Under $1,500' },
  { value: '1500-3000', label: '$1,500 - $3,000' },
  { value: '3000-6000', label: '$3,000 - $6,000' },
  { value: '6000-12000', label: '$6,000 - $12,000' },
  { value: '12000-plus', label: '$12,000+' },
]

const timelineOptions = [
  { value: '', label: 'Select a timeline (optional)' },
  { value: 'asap', label: 'ASAP' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-2-months', label: 'Within 1-2 months' },
  { value: 'flexible', label: 'Flexible' },
]

const fitSignals = [
  'Businesses planning a new Shopify, WordPress, Webflow, or WooCommerce build',
  'Teams improving an existing website that is underperforming, slow, or hard to maintain',
  'Founders and agencies with approved Figma designs that need dependable implementation',
  'Marketing teams needing bug fixing, QA, landing-page updates, or ongoing website support',
]

const reassurancePoints = [
  'Direct communication with Hasnain from first reply to delivery',
  'Clear scope guidance before the project moves forward',
  'Remote collaboration built for USA, UK, Canada, and international clients',
  'No vague proposal language or inflated deliverables',
]

const faqs = [
  {
    question: 'Who should use this contact page?',
    answer:
      'Use it if you need a freelance web developer for Shopify, WordPress, Webflow, WooCommerce, website speed optimization, maintenance, Figma-to-website implementation, or bug fixing and QA support.',
  },
  {
    question: 'What should I include in my inquiry?',
    answer:
      'The best inquiries include the current platform, website or design link, business goal, key blocker, target timeline, and whether the work is a new build, improvement sprint, or ongoing support need.',
  },
  {
    question: 'Do I need to know the exact service before reaching out?',
    answer:
      'No. If you are not sure which service fits the project, choose the guidance option in the form and describe the main problem. The reply can help narrow the right scope.',
  },
  {
    question: 'How quickly do you reply?',
    answer:
      'Most project inquiries receive a reply within one business day. Faster replies are easier when the message includes the core scope details and any relevant links.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes. Projects are handled remotely with overlap for clients in the USA, UK, Canada, and other international markets.',
  },
]

const initialForm = {
  name: '',
  email: '',
  company: '',
  websiteUrl: '',
  projectType: '',
  platform: '',
  budget: '',
  timeline: '',
  message: '',
}

function getOptionLabel(options, value, fallback = 'Not provided') {
  if (!value) return fallback
  return options.find((option) => option.value === value)?.label || value
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const metadata = getStaticPageMetadata('contact')
  const serviceNames = services.map((service) => service.title)

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.projectType) nextErrors.projectType = 'Please choose the closest service or select the guidance option.'
    if (!form.message.trim()) nextErrors.message = 'Project details are required.'
    return nextErrors
  }

  const handleFieldChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (submitted) setSubmitted(false)
    setErrors((current) => {
      if (!current[field]) return current
      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const selectedService = getOptionLabel(serviceOptions, form.projectType, 'Not provided')
    const selectedPlatform = getOptionLabel(platformOptions, form.platform)
    const selectedBudget = getOptionLabel(budgetOptions, form.budget)
    const selectedTimeline = getOptionLabel(timelineOptions, form.timeline)
    const subject = encodeURIComponent(`Project Inquiry: ${selectedService} - ${form.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company or Brand: ${form.company || 'Not provided'}`,
        `Main Service Needed: ${selectedService}`,
        `Current Platform: ${selectedPlatform}`,
        `Budget Range: ${selectedBudget}`,
        `Timeline: ${selectedTimeline}`,
        `Website or Design Link: ${form.websiteUrl || 'Not provided'}`,
        '',
        'Project Brief:',
        form.message,
      ].join('\n'),
    )

    setSubmitted(true)
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`
  }

  const faqSchema = createFAQSchema(faqs, routes.contact)

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
            { name: 'Contact', path: routes.contact },
          ]),
          createWebPageSchema({
            path: routes.contact,
            title: metadata.title,
            description: metadata.description,
            type: 'ContactPage',
            mainEntity: createProfessionalServiceReference(),
            about: [createProfessionalServiceReference(), siteConfig.name, 'website project inquiry', 'freelance web development contact'],
            image: metadata.image,
          }),
          createProfessionalServiceSchema(serviceNames),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Contact Hasnain Saeed for Shopify, WordPress, Webflow, WooCommerce, and Website Optimization Projects"
        description="This page is for businesses, founders, agencies, and marketing teams that need a dependable freelance web developer for a new build, a focused improvement sprint, or ongoing website support."
        breadcrumbs={[
          { label: 'Home', to: routes.home },
          { label: 'Contact' },
        ]}
        chips={[siteConfig.responseTimeNote, 'Direct with Hasnain', 'Remote across USA, UK, Canada, and international time zones']}
        actions={
          <>
            <ButtonLink to={routes.services}>Review Services</ButtonLink>
            <ButtonLink to={routes.portfolio} variant="ghost">
              View Case Studies
            </ButtonLink>
          </>
        }
      />

      <section className="section-pad pb-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <AnswerSummaryCard
              title="Who should inquire?"
              answer="Reach out if you need a website built, improved, sped up, stabilized, or maintained by someone who can handle implementation quality, conversion-aware structure, and QA without unnecessary agency overhead."
              facts={[
                { term: 'Best-fit clients', description: siteConfig.bestFitClients },
                { term: 'Core platforms', description: siteConfig.corePlatforms.join(', ') },
                { term: 'Typical scopes', description: 'Full builds, redesign implementation, speed work, bug fixing, QA support, and ongoing maintenance.' },
                { term: 'Best proof paths', description: 'Service pages for scope clarity and case studies for execution proof.' },
              ]}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <AnswerSummaryCard
              eyebrow="What Happens Next"
              title="What should you expect after sending an inquiry?"
              answer="The first reply is meant to reduce ambiguity. You can expect a direct response on fit, likely scope, and the most practical next step instead of a generic sales message."
              facts={[
                { term: 'Response time', description: siteConfig.responseTimeNote },
                { term: 'Time zone note', description: siteConfig.timezoneNote },
                { term: 'Communication style', description: siteConfig.directContactNote },
                { term: 'Useful details', description: 'Platform, current website or design link, main blocker, and the target timeline.' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-white">Tell me about the project</h2>
                <p className="mt-3 max-w-3xl text-zinc-300">
                  The form prepares an email draft addressed to <strong>{siteConfig.contactEmail}</strong>. Include the business goal, the platform, and the main blocker so the first reply can be specific.
                </p>
              </div>
              <p className="text-sm text-zinc-400">Only name, work email, main service, and the project brief are required.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="name">
                    Your name
                  </label>
                  <input id="name" autoComplete="name" placeholder="Example: Sarah Ahmed" value={form.name} onChange={handleFieldChange('name')} />
                  {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="email">
                    Work email
                  </label>
                  <input id="email" type="email" autoComplete="email" placeholder="name@company.com" value={form.email} onChange={handleFieldChange('email')} />
                  {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="company">
                    Company or brand
                  </label>
                  <input id="company" autoComplete="organization" placeholder="Optional" value={form.company} onChange={handleFieldChange('company')} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="websiteUrl">
                    Website or design link
                  </label>
                  <input
                    id="websiteUrl"
                    type="url"
                    placeholder="Optional: live site, staging link, or Figma file"
                    value={form.websiteUrl}
                    onChange={handleFieldChange('websiteUrl')}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="projectType">
                    Main service needed
                  </label>
                  <select id="projectType" value={form.projectType} onChange={handleFieldChange('projectType')}>
                    {serviceOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-zinc-500">Choose the closest match. If you are unsure, use the guidance option.</p>
                  {errors.projectType ? <p className="mt-1 text-xs text-red-300">{errors.projectType}</p> : null}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="platform">
                    Current platform
                  </label>
                  <select id="platform" value={form.platform} onChange={handleFieldChange('platform')}>
                    {platformOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="budget">
                    Budget range
                  </label>
                  <select id="budget" value={form.budget} onChange={handleFieldChange('budget')}>
                    {budgetOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="timeline">
                    Target timeline
                  </label>
                  <select id="timeline" value={form.timeline} onChange={handleFieldChange('timeline')}>
                    {timelineOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="message">
                  Project brief
                </label>
                <textarea
                  id="message"
                  rows="7"
                  value={form.message}
                  onChange={handleFieldChange('message')}
                  placeholder="Describe what needs to be built, fixed, improved, or supported. Useful details include the current blocker, the pages or templates involved, the target outcome, and any launch deadline."
                />
                <p className="mt-1 text-xs text-zinc-500">
                  Helpful details: current site or design link, revenue or lead goal, pages in scope, key blockers, and the launch date if one exists.
                </p>
                {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                <p className="font-semibold text-white">What happens when you submit?</p>
                <p className="mt-2">
                  This opens your email app with a pre-filled inquiry draft to <strong>{siteConfig.contactEmail}</strong>. If your email app does not open, you can send the same details directly by email.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-black">
                  Prepare Project Inquiry
                </button>
                <ButtonLink to={`mailto:${siteConfig.contactEmail}`} variant="ghost">
                  Email Directly
                </ButtonLink>
              </div>

              <p className="text-sm text-zinc-400">{siteConfig.responseTimeNote}</p>

              {submitted ? (
                <p aria-live="polite" className="text-sm text-emerald-300">
                  Your inquiry draft has been prepared for <strong>{siteConfig.contactEmail}</strong>. If your email app did not open, email the same details directly and I&apos;ll reply with the clearest next step.
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal className="space-y-6" delay={0.08}>
            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Best-fit inquiries</h2>
              <p className="mt-4 text-sm text-zinc-300">
                The strongest fit is work where the website needs clearer execution, better UX, stronger performance, or dependable technical support after launch.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-zinc-300">
                {fitSignals.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>

            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Response, availability, and trust notes</h2>
              <dl className="mt-5 space-y-4 text-sm text-zinc-200">
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Response time</dt>
                  <dd className="mt-2">{siteConfig.responseTimeNote}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Timezone and location</dt>
                  <dd className="mt-2">
                    {siteConfig.location}. {siteConfig.timezoneNote}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Working relationship</dt>
                  <dd className="mt-2">{siteConfig.directContactNote}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.18em] text-zinc-400">Direct email</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${siteConfig.contactEmail}`} className="text-orange-300 transition hover:text-orange-200">
                      {siteConfig.contactEmail}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Why the process stays low-friction</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                {reassurancePoints.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12">
        <div className="section-wrap">
          <Reveal>
            <InternalLinkSection
              eyebrow="Pre-Inquiry Paths"
              title="Review the right pages before you send the brief"
              description="These links support better lead quality by helping buyers clarify service fit, review proof, and understand scope before contacting."
              groups={contactInternalLinkGroups}
            />
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal>
            <h2 className="mb-5 text-3xl font-semibold text-white">Contact FAQ</h2>
            <FaqAccordion items={faqs} />
          </Reveal>
          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <p className="text-xs uppercase tracking-[0.22em] text-orange-200">Next Step</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">Ready to discuss the scope?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              Send the inquiry with the closest service, the platform, and the target outcome. If you are still deciding, review the services and case studies first, then come back with the sharpest version of the brief.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.services}>Review Services</ButtonLink>
              <ButtonLink to={routes.portfolio} variant="ghost">
                View Case Studies
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
