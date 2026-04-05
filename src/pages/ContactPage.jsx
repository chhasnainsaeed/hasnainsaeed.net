import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import { services } from '../data/services'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createFAQSchema, createOrganizationSchema, createWebPageSchema } from '../seo/schema'
import { routes } from '../utils/routes'
import { getWhatsAppUrl, siteConfig } from '../utils/site'

const initialForm = {
  name: '',
  email: '',
  company: '',
  websiteUrl: '',
  companyWebsite: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
}

const budgetOptions = [
  { value: '', label: 'Select...' },
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-3k', label: '$1,000 - $3,000' },
  { value: '3k-6k', label: '$3,000 - $6,000' },
  { value: '6k-plus', label: '$6,000+' },
]

const timelineOptions = [
  { value: '', label: 'Select...' },
  { value: 'asap', label: 'ASAP' },
  { value: '2-weeks', label: 'Within 2 weeks' },
  { value: '1-month', label: 'Within 1 month' },
  { value: 'flexible', label: 'Flexible' },
]

const faqs = [
  {
    question: 'What should I include in the inquiry?',
    answer: 'The most helpful briefs include the current platform, the main blocker, the target outcome, and any live site or design links.',
  },
  {
    question: 'Do I need a finalized scope before reaching out?',
    answer: 'No. If the project still needs clarification, describe the business goal and the main technical problem and the next step can be narrowed from there.',
  },
  {
    question: 'How does the form work?',
    answer: `The contact form submits the project brief directly to ${siteConfig.contactEmail}, and there is still a WhatsApp option if a faster chat is better for the project.`,
  },
]

function getOptionLabel(options, value, fallback = 'Not provided') {
  if (!value) return fallback
  return options.find((option) => option.value === value)?.label || value
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submissionState, setSubmissionState] = useState('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const metadata = getStaticPageMetadata('contact')
  const serviceNames = services.map((service) => service.title)
  const faqSchema = createFAQSchema(faqs, routes.contact)
  const contactEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '/contact-form.php'
  const breadcrumbItems = [
    { name: 'Home', path: routes.home },
    { name: 'Contact', path: routes.contact },
  ]

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.projectType) nextErrors.projectType = 'Please select a project type.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleFieldChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    if (submissionState !== 'idle') {
      setSubmissionState('idle')
      setSubmissionMessage('')
    }
    setErrors((current) => {
      if (!current[field]) return current
      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const getSelectedService = () => services.find((service) => service.id === form.projectType)?.title || form.projectType

  const buildInquiryMessage = (selectedService) =>
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || 'Not provided'}`,
      `Website or Design Link: ${form.websiteUrl || 'Not provided'}`,
      `Project Type: ${selectedService}`,
      `Budget: ${getOptionLabel(budgetOptions, form.budget)}`,
      `Timeline: ${getOptionLabel(timelineOptions, form.timeline)}`,
      '',
      'Project Brief:',
      form.message,
    ].join('\n')

  const validateBeforeSend = () => {
    const nextErrors = validate()
    setErrors(nextErrors)
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateBeforeSend()

    if (Object.keys(nextErrors).length > 0) return

    const selectedService = getSelectedService()

    setSubmissionState('submitting')
    setSubmissionMessage('')

    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          projectType: selectedService,
          budgetLabel: getOptionLabel(budgetOptions, form.budget),
          timelineLabel: getOptionLabel(timelineOptions, form.timeline),
          submittedFrom: window.location.href,
          submittedAt: new Date().toISOString(),
        }),
      })

      let responseData = null

      try {
        responseData = await response.json()
      } catch {
        responseData = null
      }

      if (!response.ok) {
        throw new Error(responseData?.message || 'The form could not be sent right now.')
      }

      setForm(initialForm)
      setErrors({})
      setSubmissionState('success')
      setSubmissionMessage(responseData?.message || `Thanks. Your inquiry was sent to ${siteConfig.contactEmail}.`)
    } catch (error) {
      setSubmissionState('error')
      setSubmissionMessage(
        error instanceof Error && error.message
          ? error.message
          : `The form could not be sent automatically. Please email ${siteConfig.contactEmail} directly.`
      )
    }
  }

  const handleWhatsApp = () => {
    const nextErrors = validateBeforeSend()

    if (Object.keys(nextErrors).length > 0) return

    const selectedService = getSelectedService()
    const text = `New project inquiry\n\n${buildInquiryMessage(selectedService)}`

    setSubmissionState('idle')
    setSubmissionMessage('')
    window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
  }

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
          createOrganizationSchema(serviceNames),
          createWebPageSchema({
            path: routes.contact,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            type: 'ContactPage',
            about: ['website project inquiry', ...serviceNames],
          }),
          createBreadcrumbSchema(breadcrumbItems),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Start Your Project"
        description="Share the platform, blocker, and target outcome. The contact form sends the project brief directly by email, and WhatsApp is still available if a faster conversation is better."
        breadcrumbs={breadcrumbItems}
      />

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <input
                type="text"
                name="companyWebsite"
                value={form.companyWebsite}
                onChange={handleFieldChange('companyWebsite')}
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="name">Name</label>
                  <input id="name" autoComplete="name" value={form.name} onChange={handleFieldChange('name')} />
                  {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="email">Email</label>
                  <input id="email" type="email" autoComplete="email" value={form.email} onChange={handleFieldChange('email')} />
                  {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="company">Company</label>
                  <input id="company" autoComplete="organization" value={form.company} onChange={handleFieldChange('company')} />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="websiteUrl">Website or Design Link</label>
                  <input id="websiteUrl" type="url" value={form.websiteUrl} onChange={handleFieldChange('websiteUrl')} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="projectType">Project Type</label>
                  <select id="projectType" value={form.projectType} onChange={handleFieldChange('projectType')}>
                    <option value="">Select...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.projectType ? <p className="mt-1 text-xs text-red-300">{errors.projectType}</p> : null}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="budget">Budget</label>
                  <select id="budget" value={form.budget} onChange={handleFieldChange('budget')}>
                    {budgetOptions.map((option) => (
                      <option key={option.value || option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="timeline">Timeline</label>
                <select id="timeline" value={form.timeline} onChange={handleFieldChange('timeline')}>
                  {timelineOptions.map((option) => (
                    <option key={option.value || option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  value={form.message}
                  onChange={handleFieldChange('message')}
                  placeholder="Tell me what needs to be built, fixed, improved, or supported."
                />
                {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                The contact form sends directly to <strong>{siteConfig.contactEmail}</strong>. If you prefer, you can still open WhatsApp at <strong>{siteConfig.contactPhone}</strong>.
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submissionState === 'submitting' ? 'Sending Inquiry...' : 'Send Project Inquiry'}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/16"
                >
                  Send via WhatsApp
                </button>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center justify-center rounded-full border border-orange-300/70 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-100 transition duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-400/14"
                >
                  Email Directly
                </a>
                <a
                  href={siteConfig.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-100 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:text-emerald-200"
                >
                  Open WhatsApp
                </a>
              </div>

              <p className="text-sm text-zinc-400">{siteConfig.responseTimeNote}</p>

              {submissionMessage ? (
                <p className={`text-sm ${submissionState === 'error' ? 'text-red-300' : 'text-emerald-300'}`}>
                  {submissionMessage}
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal className="space-y-6" delay={0.08}>
            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Direct Contact</h2>
              <ul className="mt-4 space-y-3 text-sm text-zinc-300">
                <li>
                  Email:{' '}
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-orange-300 transition hover:text-orange-200">
                    {siteConfig.contactEmail}
                  </a>
                </li>
                <li>
                  WhatsApp:{' '}
                  <a href={siteConfig.whatsAppUrl} target="_blank" rel="noreferrer" className="text-orange-300 transition hover:text-orange-200">
                    {siteConfig.contactPhone}
                  </a>
                </li>
                <li>Location: {siteConfig.location}</li>
                <li>Markets: {siteConfig.serviceMarkets.join(', ')}</li>
                <li>{siteConfig.timezoneNote}</li>
              </ul>
            </div>

            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Best details to include</h2>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>- The current platform or tech stack</li>
                <li>- The main blocker or opportunity</li>
                <li>- The pages, templates, or flows in scope</li>
                <li>- The target timeline or launch date</li>
              </ul>
            </div>

            <div className="premium-card p-7">
              <h2 className="text-2xl font-semibold text-white">Before you send the brief</h2>
              <p className="mt-3 text-sm text-zinc-300">If you need help narrowing scope first, the fastest review paths are the service pages and the portfolio case studies.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink to={routes.services}>Review Services</ButtonLink>
                <ButtonLink to={routes.portfolio} variant="ghost">
                  View Case Studies
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <h2 className="text-3xl font-semibold text-white">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item) => (
                <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{item.answer}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal className="premium-card p-7 sm:p-8" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">What happens next?</h2>
            <p className="mt-4 text-sm text-zinc-300">
              The first reply is meant to reduce ambiguity. You can expect a direct answer on fit, likely scope, and the clearest next step for the project.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to={routes.portfolio}>See Recent Work</ButtonLink>
              <ButtonLink to={routes.blog} variant="ghost">
                Read Related Guides
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
