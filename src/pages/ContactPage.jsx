import { useState } from 'react'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'

const initialForm = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.'
    if (!form.projectType) nextErrors.projectType = 'Please select a project type.'
    if (!form.budget) nextErrors.budget = 'Please select a budget range.'
    if (!form.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm(initialForm)
    }
  }

  document.title = 'Contact | Hasnain Saeed'

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start Your Project"
        description="Share your project goals and I will respond with next steps, timeline guidance, and a suitable package recommendation."
      />

      <section className="section-pad pb-16">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="premium-card p-7 sm:p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="name">Name</label>
                <input id="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name}</p> : null}
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="email">Email</label>
                <input id="email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                {errors.email ? <p className="mt-1 text-xs text-red-300">{errors.email}</p> : null}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="projectType">Project Type</label>
                  <select id="projectType" value={form.projectType} onChange={(event) => setForm({ ...form, projectType: event.target.value })}>
                    <option value="">Select...</option>
                    <option value="wordpress">WordPress</option>
                    <option value="shopify">Shopify</option>
                    <option value="webflow">Webflow</option>
                    <option value="optimization">Optimization</option>
                    <option value="qa">QA Support</option>
                  </select>
                  {errors.projectType ? <p className="mt-1 text-xs text-red-300">{errors.projectType}</p> : null}
                </div>
                <div>
                  <label className="mb-1 block text-sm text-zinc-300" htmlFor="budget">Budget</label>
                  <select id="budget" value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })}>
                    <option value="">Select...</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-3k">$1,000 - $3,000</option>
                    <option value="3k-6k">$3,000 - $6,000</option>
                    <option value="6k-plus">$6,000+</option>
                  </select>
                  {errors.budget ? <p className="mt-1 text-xs text-red-300">{errors.budget}</p> : null}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-300" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Tell me about your goals, timeline, and current website challenges..."
                />
                {errors.message ? <p className="mt-1 text-xs text-red-300">{errors.message}</p> : null}
              </div>
              <button type="submit" className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-black">
                Book Consultation
              </button>
              {submitted ? (
                <p className="text-sm text-emerald-300">Success! Your message has been submitted. This is a placeholder success state.</p>
              ) : null}
            </form>
          </Reveal>

          <Reveal className="premium-card p-7" delay={0.08}>
            <h2 className="text-2xl font-semibold text-white">Contact Information</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-300">
              <li>Email: your-email@example.com</li>
              <li>WhatsApp: +92-XXX-XXXXXXX</li>
              <li>Location: Pakistan</li>
              <li>Calendly: placeholder link</li>
            </ul>
            <div className="mt-6 space-y-2 text-sm text-zinc-400">
              <p>LinkedIn placeholder</p>
              <p>Behance placeholder</p>
              <p>Dribbble placeholder</p>
            </div>
            <button type="button" className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm text-zinc-200">
              Open Calendly (Placeholder)
            </button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
