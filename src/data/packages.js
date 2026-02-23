// Update pricing and package feature scope based on your current service model.
export const packages = [
  {
    id: 'starter',
    name: 'Starter Website',
    price: '$699+',
    idealFor: 'Small businesses needing a professional first website',
    pages: '3-5 pages',
    timeline: '7-12 days',
    popular: false,
    features: ['Responsive setup', 'Contact form', 'Basic SEO setup', 'Speed baseline optimization'],
  },
  {
    id: 'growth',
    name: 'Growth Website',
    price: '$1,499+',
    idealFor: 'Businesses scaling marketing and lead generation',
    pages: '5-10 pages',
    timeline: '12-20 days',
    popular: true,
    features: ['Advanced sections', 'UI polish', 'Speed optimization', 'Analytics setup placeholder'],
  },
  {
    id: 'premium',
    name: 'Premium Build',
    price: '$2,900+',
    idealFor: 'Brands needing custom implementation and conversion focus',
    pages: 'Custom scope',
    timeline: '20-35 days',
    popular: false,
    features: ['Custom design implementation', 'Advanced animations', 'Conversion-oriented layouts', 'Full QA pass + launch support'],
  },
  {
    id: 'custom',
    name: 'Custom Retainer',
    price: 'Quote Based',
    idealFor: 'Complex Shopify builds and ongoing technical support',
    pages: 'Flexible',
    timeline: 'Flexible',
    popular: false,
    features: ['Monthly support', 'Priority bug fixing', 'Store/site iterations', 'Dedicated QA and optimization sprints'],
  },
]

export const packageComparison = [
  { feature: 'Responsive Design', starter: true, growth: true, premium: true, custom: true },
  { feature: 'Basic SEO Setup', starter: true, growth: true, premium: true, custom: true },
  { feature: 'Speed Optimization', starter: false, growth: true, premium: true, custom: true },
  { feature: 'Advanced Motion/Interactions', starter: false, growth: false, premium: true, custom: true },
  { feature: 'QA Documentation', starter: false, growth: true, premium: true, custom: true },
  { feature: 'Launch Support', starter: false, growth: false, premium: true, custom: true },
]
