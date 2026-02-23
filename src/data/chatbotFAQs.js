export const quickPrompts = [
  'What services do you offer?',
  'How much does a website cost?',
  'How long does a project take?',
  'Can we schedule a consultation?',
]

export const fallbackAnswers = [
  {
    intent: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'salam', 'assalam'],
    answer:
      'Hello. I can help with services, pricing, timelines, SEO, bug fixes, and consultation booking. What do you need? ',
  },
  {
    intent: 'services',
    keywords: ['service', 'services', 'offer', 'shopify', 'wordpress', 'webflow', 'qa', 'ui', 'ux', 'implement'],
    answer:
      'I provide Shopify, WordPress, and Webflow development, UI implementation, optimization, bug fixing, and QA support.',
  },
  {
    intent: 'seo',
    keywords: ['seo', 'ranking', 'search', 'google', 'meta', 'schema', 'indexing'],
    answer:
      'Yes. SEO-ready setup is included: semantic structure, metadata framework, indexing checks, and performance baseline.',
  },
  {
    intent: 'pricing',
    keywords: ['price', 'pricing', 'package', 'cost', 'budget', 'quote'],
    answer:
      'Packages start from Starter and scale to Growth, Premium, or Custom. If you share scope and budget, I can suggest the right package.',
  },
  {
    intent: 'timeline',
    keywords: ['time', 'timeline', 'how long', 'duration', 'days', 'weeks'],
    answer:
      'Typical ranges: Starter 7-12 days, Growth 12-20 days, Premium 20-35 days. Custom projects are milestone-based.',
  },
  {
    intent: 'maintenance',
    keywords: ['maintain', 'maintenance', 'support', 'ongoing', 'retainer', 'monthly'],
    answer:
      'Yes, ongoing support is available through the Custom/Retainer option for updates, fixes, QA, and optimization sprints.',
  },
  {
    intent: 'bugs',
    keywords: ['bug', 'issue', 'error', 'broken', 'fix', 'problem', 'urgent'],
    answer:
      'Yes, bug fixing and technical troubleshooting are available. Share the platform and issue details for a quick estimate.',
  },
  {
    intent: 'qa',
    keywords: ['qa', 'testing', 'test', 'regression', 'checklist', 'documentation'],
    answer:
      'QA support includes test scenario mapping, bug logging, retest validation, and release-readiness checklists.',
  },
  {
    intent: 'consultation',
    keywords: ['book', 'consultation', 'call', 'meeting', 'contact', 'schedule', 'chat'],
    answer:
      'Yes. Use the "Book Consultation" button or Contact page. Share your goals, platform, and budget to get faster guidance.',
  },
  {
    intent: 'location',
    keywords: ['country', 'location', 'international', 'usa', 'uk', 'canada', 'remote', 'timezone'],
    answer:
      'Projects are delivered remotely for international clients (USA, UK, Canada) with clear async communication and milestones.',
  },
  {
    intent: 'portfolio',
    keywords: ['portfolio', 'projects', 'case study', 'work', 'examples'],
    answer:
      'You can view case studies on the Portfolio page, including Shopify, WordPress, Webflow, optimization, and QA projects.',
  },
  {
    intent: 'thanks',
    keywords: ['thanks', 'thank you', 'great', 'awesome', 'perfect'],
    answer: 'You are welcome. If you want, I can help you pick the best package based on your project scope.',
  },
]

export const defaultFallback =
  'I can help with services, pricing, timeline, SEO, bug fixing, QA, and booking consultation. Tell me your platform and goal.'

export function getFallbackReply(input) {
  const text = input.toLowerCase().trim()
  if (!text) return defaultFallback

  const scored = fallbackAnswers
    .map((item) => {
      const hits = item.keywords.reduce((count, keyword) => {
        return count + (text.includes(keyword) ? 1 : 0)
      }, 0)
      return { item, hits }
    })
    .filter((entry) => entry.hits > 0)
    .sort((a, b) => b.hits - a.hits)

  if (scored.length === 0) {
    return defaultFallback
  }

  const top = scored[0]
  const second = scored[1]

  if (second && second.hits === top.hits && second.item.intent !== top.item.intent) {
    return `${top.item.answer} ${second.item.answer}`
  }

  return top.item.answer
}
