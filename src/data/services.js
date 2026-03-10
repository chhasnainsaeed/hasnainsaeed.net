import { servicePageContent } from './servicePageContent.js'

const baseServices = [
  {
    id: 'shopify-development',
    slug: 'shopify-development',
    title: 'Shopify Development',
    icon: 'SF',
    summary: 'Custom Shopify storefront development focused on conversion flow, merchandising clarity, and clean performance.',
    quoteSummary: 'Shopify development helps ecommerce brands improve storefront UX, theme flexibility, mobile buying flow, and conversion performance.',
    metaTitle: 'Freelance Shopify Developer | Custom Shopify Development by Hasnain Saeed',
    metaDescription:
      'Hire Hasnain Saeed for custom Shopify development, theme customization, CRO-focused storefront improvements, performance optimization, and ongoing Shopify support.',
    heroTitle: 'Freelance Shopify Development for Stores That Need Better UX and Better Conversion',
    heroDescription:
      'Custom Shopify work for brands that need stronger product pages, smoother user journeys, cleaner theme code, and ongoing technical support.',
    searchIntent: 'For founders and teams looking to hire a freelance Shopify developer for custom theme work, CRO-focused UX, and store optimization.',
    includes: ['Custom theme sections and templates', 'Product page and collection page UX improvements', 'App conflict cleanup', 'Responsive QA before launch'],
    outcomes: ['Stronger merchandising hierarchy', 'Cleaner mobile buying flow', 'Faster storefront performance', 'Lower friction from cart to checkout'],
    deliverables: ['Production-ready Shopify implementation', 'Reusable sections for merchandisers', 'Launch checklist and QA report'],
    idealFor: 'D2C brands, growing ecommerce teams, and agencies needing reliable Shopify execution',
    timeline: '1-4 weeks',
    addons: ['Retention-focused CRO improvements', 'Speed optimization sprint', 'Ongoing monthly support'],
    process: [
      'Audit the current storefront, user journey, and conversion blockers.',
      'Map the highest-impact theme, PDP, collection, and navigation improvements.',
      'Build or refine sections with clean responsive behavior and accessible markup.',
      'Run browser, device, and checkout QA before release.',
    ],
    faq: [
      {
        question: 'Do you work on existing Shopify themes or only new builds?',
        answer: 'Both. I can refine an existing store, customize a purchased theme, or build a tailored storefront structure around your conversion goals.',
      },
      {
        question: 'Can you improve Shopify speed without damaging design quality?',
        answer: 'Yes. The goal is to reduce unnecessary scripts, optimize assets, and tighten page structure without flattening the brand experience.',
      },
    ],
    relatedProjectSlugs: ['shopify-store-customization', 'ecommerce-ux-revamp'],
    relatedPostSlugs: ['shopify-conversion-optimization-checklist', 'website-speed-optimization-for-service-and-ecommerce-sites'],
  },
  {
    id: 'wordpress-development',
    slug: 'wordpress-development',
    title: 'WordPress Development',
    icon: 'WP',
    summary: 'Custom WordPress development for service businesses that need flexible content management and strong lead-generation structure.',
    quoteSummary: 'WordPress development helps service businesses build websites that are easier to manage, easier to trust, and better at generating leads.',
    metaTitle: 'Freelance WordPress Developer | Custom WordPress Development by Hasnain Saeed',
    metaDescription:
      'Need a freelance WordPress developer? Hasnain Saeed builds conversion-focused WordPress websites with clean UI implementation, technical cleanup, performance optimization, and QA support.',
    heroTitle: 'WordPress Development Built for Lead Generation, Content Control, and Long-Term Maintainability',
    heroDescription:
      'Custom WordPress websites for service businesses, agencies, consultants, and brands that need premium design execution with practical admin flexibility.',
    searchIntent: 'For businesses searching for a freelance WordPress developer who can build, rebuild, optimize, and support a modern business website.',
    includes: ['Custom page implementation', 'CMS structure for editors', 'Plugin and theme cleanup', 'Technical SEO-friendly markup'],
    outcomes: ['Stronger service-page clarity', 'Better content manageability', 'Improved load speed', 'Cleaner handoff for your team'],
    deliverables: ['Responsive WordPress pages', 'Flexible backend structure', 'Launch-ready QA and content polish'],
    idealFor: 'Service businesses, agencies, consultants, and corporate brands',
    timeline: '2-5 weeks',
    addons: ['WooCommerce add-on scope', 'Content migration', 'Maintenance retainers'],
    process: [
      'Review the current site, content gaps, and lead-generation bottlenecks.',
      'Plan page architecture, service hierarchy, and admin-friendly content patterns.',
      'Implement pixel-accurate frontend and clean backend structure.',
      'Test forms, responsive behavior, and performance before go-live.',
    ],
    faq: [
      {
        question: 'Can you rebuild a WordPress site without changing the full brand direction?',
        answer: 'Yes. I can work within the current design language and improve hierarchy, clarity, performance, and trust signals without forcing a full redesign.',
      },
      {
        question: 'Do you work with Elementor, Gutenberg, or custom setups?',
        answer: 'Yes. The build approach depends on how much flexibility, editing control, and long-term maintainability the site needs.',
      },
    ],
    relatedProjectSlugs: ['suave-florida-website-revamp'],
    relatedPostSlugs: ['wordpress-speed-optimization-guide', 'figma-to-website-handoff-process'],
  },
  {
    id: 'webflow-development',
    slug: 'webflow-development',
    title: 'Webflow Development',
    icon: 'WF',
    summary: 'Pixel-precise Webflow implementation for brands that need polished landing pages, CMS structure, and a premium visual experience.',
    quoteSummary: 'Webflow development helps brands launch polished marketing sites and landing pages with cleaner CMS structure and stronger front-end quality.',
    metaTitle: 'Freelance Webflow Developer | Premium Webflow Development by Hasnain Saeed',
    metaDescription:
      'Hasnain Saeed provides freelance Webflow development for startups, agencies, and personal brands that need polished landing pages, clean CMS setup, and launch-ready QA.',
    heroTitle: 'Webflow Development for Premium Landing Pages and Marketing Sites',
    heroDescription:
      'Ideal for startups, SaaS teams, and personal brands that need fast implementation, strong visual polish, and a maintainable Webflow setup.',
    searchIntent: 'For teams looking to hire a freelance Webflow developer for launch pages, company sites, and high-quality Figma-to-Webflow implementation.',
    includes: ['Pixel-perfect Webflow build', 'CMS collections and style system', 'Interaction refinement', 'Responsive and launch QA'],
    outcomes: ['Cleaner visual execution', 'Faster launch turnaround', 'Better content publishing workflow', 'Higher confidence for paid traffic'],
    deliverables: ['Production-ready Webflow site', 'Reusable class structure', 'Launch checklist and post-launch support window'],
    idealFor: 'SaaS startups, campaign landing pages, creators, and agency handoffs',
    timeline: '1-3 weeks',
    addons: ['Webflow CMS migration', 'Localization setup', 'Conversion-focused landing page iteration'],
    process: [
      'Review designs, offer, and traffic source expectations.',
      'Translate layouts into clean Webflow structure with reusable patterns.',
      'Polish interactions, spacing, and responsive behavior.',
      'Validate forms, SEO basics, and key conversion flows before launch.',
    ],
    faq: [
      {
        question: 'Can you build directly from Figma into Webflow?',
        answer: 'Yes. Figma-to-Webflow implementation is a common engagement when a design team needs a dependable development partner.',
      },
      {
        question: 'Do you optimize Webflow sites for performance and search readiness?',
        answer: 'Yes. I focus on clean structure, compressed media, semantic sections, and metadata support so the site is launch-ready rather than just visually complete.',
      },
    ],
    relatedProjectSlugs: ['webflow-landing-page'],
    relatedPostSlugs: ['webflow-launch-best-practices', 'figma-to-website-handoff-process'],
  },
  {
    id: 'woocommerce-development',
    slug: 'woocommerce-development',
    title: 'WooCommerce Development',
    icon: 'WC',
    summary: 'WooCommerce development for WordPress-powered ecommerce stores that need product clarity, faster shopping flows, and dependable support.',
    quoteSummary: 'WooCommerce development helps WordPress-based stores improve shopping flow, technical stability, and ecommerce UX without unnecessary complexity.',
    metaTitle: 'Freelance WooCommerce Developer | WooCommerce Development by Hasnain Saeed',
    metaDescription:
      'Work with Hasnain Saeed for WooCommerce development, store UX improvements, bug fixes, speed optimization, and QA-backed ecommerce support on WordPress.',
    heroTitle: 'WooCommerce Development for Stores That Need Cleaner UX and Stronger Performance',
    heroDescription:
      'For WordPress-based ecommerce businesses that want better shopping flow, improved speed, and reliable technical execution.',
    searchIntent: 'For businesses searching for a freelance WooCommerce developer to improve store UX, resolve technical issues, and support growth.',
    includes: ['Storefront and product template improvements', 'Cart and checkout issue resolution', 'Plugin conflict cleanup', 'Responsive ecommerce QA'],
    outcomes: ['Smoother purchase path', 'More stable store behavior', 'Better product-page communication', 'Less plugin-related friction'],
    deliverables: ['Updated WooCommerce templates', 'Bug-fix summary', 'Launch verification notes'],
    idealFor: 'Small to mid-size ecommerce businesses running on WordPress',
    timeline: '1-4 weeks',
    addons: ['Subscription or membership support', 'Analytics setup', 'Speed optimization'],
    process: [
      'Audit templates, plugin stack, and shopping flow.',
      'Prioritize the revenue-impacting technical and UX issues.',
      'Implement fixes, streamline templates, and improve mobile behavior.',
      'Retest cart, checkout, and account flows before release.',
    ],
    faq: [
      {
        question: 'Can you work on a WooCommerce site with many plugins already installed?',
        answer: 'Yes. Part of the job is identifying plugin conflicts, template overrides, and performance issues caused by bloated setups.',
      },
      {
        question: 'Do you also handle speed and UX improvements for WooCommerce?',
        answer: 'Yes. Store performance and conversion flow matter just as much as getting the code technically working.',
      },
    ],
    relatedProjectSlugs: ['ecommerce-ux-revamp'],
    relatedPostSlugs: ['woocommerce-growth-fixes', 'website-speed-optimization-for-service-and-ecommerce-sites'],
  },
  {
    id: 'website-speed-optimization',
    slug: 'website-speed-optimization',
    title: 'Website Speed Optimization',
    icon: 'SP',
    summary: 'Performance optimization for websites slowed down by heavy assets, script bloat, weak loading strategy, or platform-specific technical debt.',
    quoteSummary: 'Website speed optimization helps businesses improve load time, Core Web Vitals, and user experience without weakening design or conversion flow.',
    metaTitle: 'Website Speed Optimization Freelancer | Performance Improvements by Hasnain Saeed',
    metaDescription:
      'Improve Core Web Vitals, Lighthouse scores, and real-world page speed with performance audits, code cleanup, image optimization, and QA-backed fixes by Hasnain Saeed.',
    heroTitle: 'Website Speed Optimization That Improves Performance Without Breaking the Experience',
    heroDescription:
      'Focused speed work for Shopify, WordPress, Webflow, and WooCommerce sites that need better Core Web Vitals and stronger user experience.',
    searchIntent: 'For businesses needing a freelance developer to improve load speed, reduce page bloat, and strengthen Core Web Vitals.',
    includes: ['Performance audit and bottleneck review', 'Asset and script optimization', 'Third-party cleanup recommendations', 'Before-and-after benchmarking'],
    outcomes: ['Faster page load times', 'Cleaner Core Web Vitals', 'Lower bounce risk', 'Better mobile experience'],
    deliverables: ['Optimization roadmap', 'Implemented performance fixes', 'Benchmark summary and recommendations'],
    idealFor: 'Sites with slow load times, weak PageSpeed scores, and heavy front-end overhead',
    timeline: '3-10 days',
    addons: ['Ongoing monthly optimization', 'Speed monitoring', 'CRO follow-up improvements'],
    process: [
      'Measure the current performance baseline and isolate the biggest bottlenecks.',
      'Fix what affects load time, rendering, and mobile responsiveness first.',
      'Retest core templates and validate no visual regressions were introduced.',
      'Document the gains and remaining recommendations.',
    ],
    faq: [
      {
        question: 'Will speed optimization force a redesign or remove important features?',
        answer: 'No. The goal is to remove waste, reduce friction, and improve loading behavior while protecting the parts of the experience that drive trust and conversion.',
      },
      {
        question: 'Do you optimize only Lighthouse scores or the real user experience too?',
        answer: 'The focus is real-world UX first. Lighthouse and Core Web Vitals are useful, but the bigger goal is a faster site people can actually use comfortably.',
      },
    ],
    relatedProjectSlugs: ['ecommerce-ux-revamp', 'shopify-store-customization'],
    relatedPostSlugs: ['wordpress-speed-optimization-guide', 'website-speed-optimization-for-service-and-ecommerce-sites'],
  },
  {
    id: 'website-maintenance-support',
    slug: 'website-maintenance-support',
    title: 'Website Maintenance & Support',
    icon: 'MS',
    summary: 'Ongoing website support for updates, fixes, content changes, QA checks, and technical upkeep across WordPress, Shopify, Webflow, and WooCommerce.',
    quoteSummary: 'Website maintenance and support helps teams keep a live website updated, stable, and easier to manage after launch.',
    metaTitle: 'Website Maintenance and Support Freelancer | Ongoing Website Support by Hasnain Saeed',
    metaDescription:
      'Need reliable website maintenance and support? Hasnain Saeed provides ongoing updates, bug fixes, QA checks, content changes, and performance support for modern business websites.',
    heroTitle: 'Website Maintenance and Support for Teams That Need a Dependable Technical Partner',
    heroDescription:
      'For businesses that want a responsive freelance developer on hand for updates, fixes, landing pages, QA, and ongoing website care.',
    searchIntent: 'For companies looking for a freelance developer to maintain, update, and support a live website without agency overhead.',
    includes: ['Monthly updates and content changes', 'Bug fixes and troubleshooting', 'Pre-launch QA for new pages', 'Technical recommendations and backlog support'],
    outcomes: ['Fewer fire-drill fixes', 'Cleaner release cycles', 'Reliable turnaround for updates', 'Lower technical risk over time'],
    deliverables: ['Support backlog management', 'Documented updates', 'Recurring QA and issue resolution'],
    idealFor: 'Growing businesses, agencies, and internal marketing teams without an in-house developer',
    timeline: 'Retainer or sprint-based',
    addons: ['Conversion testing support', 'Performance reviews', 'Landing page implementation'],
    process: [
      'Agree on turnaround expectations, support scope, and priority types.',
      'Handle updates, fixes, and QA with clear communication and documented progress.',
      'Spot recurring issues and recommend structural improvements.',
      'Keep the site stable while new work ships.',
    ],
    faq: [
      {
        question: 'Do you offer monthly support retainers?',
        answer: 'Yes. Ongoing support works well for businesses that regularly publish content, launch campaigns, or need reliable technical coverage.',
      },
      {
        question: 'Can you work alongside an internal designer or marketing team?',
        answer: 'Yes. I regularly plug into existing workflows and execute the technical side while keeping updates clear and low-friction.',
      },
    ],
    relatedProjectSlugs: ['suave-florida-website-revamp', 'qa-testing-resolution'],
    relatedPostSlugs: ['website-qa-launch-checklist', 'figma-to-website-handoff-process'],
  },
  {
    id: 'figma-to-website-development',
    slug: 'figma-to-website-development',
    title: 'Figma to Website Development',
    icon: 'FG',
    summary: 'Turn approved Figma designs into production-ready websites with responsive accuracy, component consistency, and launch QA.',
    quoteSummary: 'Figma to website development turns approved designs into responsive, production-ready pages with cleaner handoff and better launch quality.',
    metaTitle: 'Figma to Website Developer | Design to Development by Hasnain Saeed',
    metaDescription:
      'Looking for a Figma to website developer? Hasnain Saeed converts Figma files into clean, responsive Shopify, WordPress, Webflow, and custom front-end builds with QA-backed delivery.',
    heroTitle: 'Figma to Website Development With Clean Implementation and QA-Backed Delivery',
    heroDescription:
      'For design teams, agencies, and founders who already have layouts approved and now need dependable, high-quality execution.',
    searchIntent: 'For teams needing a freelance developer to translate Figma into a live website with pixel-accurate responsiveness and clean implementation.',
    includes: ['Design-to-code implementation', 'Responsive refinement', 'Component consistency', 'Cross-browser QA'],
    outcomes: ['Faster design handoff execution', 'Closer visual accuracy', 'More reliable launch quality', 'Less rework between design and dev'],
    deliverables: ['Production-ready website pages', 'Responsive adaptation notes', 'QA checklist and launch handoff'],
    idealFor: 'Design-led businesses, agencies, SaaS teams, and personal brands',
    timeline: '1-4 weeks',
    addons: ['Animation polish', 'CMS integration', 'Post-launch support'],
    process: [
      'Review the Figma file for components, spacing logic, and interaction expectations.',
      'Define the target platform and responsive behavior before implementation starts.',
      'Build the pages with clean structure and pixel-aware execution.',
      'QA the final output against design intent and device behavior.',
    ],
    faq: [
      {
        question: 'How close will the live site be to the Figma design?',
        answer: 'The goal is visual fidelity without sacrificing performance, accessibility, or maintainability. That means matching the design where it matters and making smart implementation decisions where needed.',
      },
      {
        question: 'Which platforms can you implement from Figma?',
        answer: 'Shopify, WordPress, Webflow, and custom frontend interfaces depending on the project scope.',
      },
    ],
    relatedProjectSlugs: ['webflow-landing-page', 'suave-florida-website-revamp'],
    relatedPostSlugs: ['figma-to-website-handoff-process', 'webflow-launch-best-practices'],
  },
  {
    id: 'ui-ux-implementation',
    slug: 'ui-ux-implementation',
    title: 'UI/UX Implementation',
    icon: 'UI',
    summary: 'High-quality frontend implementation for teams that need polished interfaces, consistent behavior, and strong responsive execution.',
    quoteSummary: 'UI/UX implementation helps teams turn approved design into polished, trustworthy front-end experiences that behave correctly across devices.',
    metaTitle: 'UI UX Implementation Developer | Frontend Implementation by Hasnain Saeed',
    metaDescription:
      'Hasnain Saeed provides UI/UX implementation services for websites and product interfaces, translating design into responsive, production-ready frontend with precision and QA.',
    heroTitle: 'UI/UX Implementation for Brands That Need Premium Frontend Execution',
    heroDescription:
      'For teams that care about design quality, interaction polish, responsive consistency, and clean frontend delivery.',
    searchIntent: 'For businesses looking for a frontend-focused freelance developer to implement approved UI with accuracy and quality assurance.',
    includes: ['Pixel-aware layout implementation', 'Interaction polish', 'Responsive and accessibility alignment', 'Cross-browser QA'],
    outcomes: ['Sharper visual consistency', 'More trustworthy user experience', 'Fewer layout regressions', 'Cleaner frontend systems'],
    deliverables: ['Responsive UI implementation', 'Reusable front-end structure', 'QA and refinement pass'],
    idealFor: 'Agencies, startups, internal product teams, and founder-led websites',
    timeline: '1-4 weeks',
    addons: ['Component cleanup', 'Motion refinement', 'Landing page CRO adjustments'],
    process: [
      'Review design intent, component states, and business goals.',
      'Implement the interface with clean structure and consistent behavior.',
      'Refine responsiveness, interactions, and accessibility details.',
      'QA against design, browser behavior, and device breakpoints.',
    ],
    faq: [
      {
        question: 'Do you work only on full websites or also on specific pages and components?',
        answer: 'Both. I can handle complete page builds or step into focused UI implementation work where a team needs extra delivery capacity.',
      },
      {
        question: 'Can you improve existing UI while implementing new designs?',
        answer: 'Yes. Many projects include both design implementation and cleanup of older frontend inconsistencies.',
      },
    ],
    relatedProjectSlugs: ['suave-florida-website-revamp', 'webflow-landing-page'],
    relatedPostSlugs: ['ui-implementation-mistakes-that-cost-conversions', 'figma-to-website-handoff-process'],
  },
  {
    id: 'bug-fixing-qa-support',
    slug: 'bug-fixing-qa-support',
    title: 'Bug Fixing & QA Support',
    icon: 'QA',
    summary: 'Technical troubleshooting, issue resolution, and QA support for teams that need stable releases and cleaner launch confidence.',
    quoteSummary: 'Bug fixing and QA support helps teams diagnose issues, validate fixes, and launch with more confidence.',
    metaTitle: 'Bug Fixing and QA Support Freelancer | Website QA by Hasnain Saeed',
    metaDescription:
      'Get bug fixing and QA support from Hasnain Saeed for websites, web apps, and ecommerce projects that need stable releases, reproducible testing, and structured issue resolution.',
    heroTitle: 'Bug Fixing and QA Support for Smoother Launches and Cleaner Release Cycles',
    heroDescription:
      'For teams shipping websites, ecommerce updates, or product releases that need fast issue resolution and clear QA coverage.',
    searchIntent: 'For businesses looking for freelance QA support, bug fixing, release validation, and pre-launch testing.',
    includes: ['Issue reproduction and debugging', 'Structured QA checklists', 'Severity-based bug tracking', 'Retest validation after fixes'],
    outcomes: ['Fewer launch-day issues', 'Better release confidence', 'Clearer issue documentation', 'Less wasted time for dev teams'],
    deliverables: ['Bug reports with repro steps', 'Validated fixes', 'Launch readiness checklist'],
    idealFor: 'Product teams, ecommerce brands, agencies, and businesses shipping frequent updates',
    timeline: 'Sprint-based or ongoing',
    addons: ['Regression testing', 'Release support', 'Documentation for internal teams'],
    process: [
      'Review the release scope, known issues, and highest-risk workflows.',
      'Run structured testing across critical user journeys and devices.',
      'Document issues clearly and support the fix-validation loop.',
      'Confirm release readiness before launch.',
    ],
    faq: [
      {
        question: 'Do you only log bugs or also help fix them?',
        answer: 'Both. I can diagnose issues, implement fixes, and handle the QA retest loop so the work moves forward instead of stopping at documentation.',
      },
      {
        question: 'Can you join a project close to launch?',
        answer: 'Yes. Short-notice QA and bug-fix support is often most valuable right before release when teams need rapid clarity and dependable execution.',
      },
    ],
    relatedProjectSlugs: ['qa-testing-resolution', 'ecommerce-ux-revamp'],
    relatedPostSlugs: ['website-qa-launch-checklist', 'ui-implementation-mistakes-that-cost-conversions'],
  },
]

export const services = baseServices.map((service) => ({
  ...service,
  ...(servicePageContent[service.slug] ?? {}),
}))

export const processSteps = [
  {
    title: 'Discovery',
    description: 'Clarify business goals, pain points, target pages, and the commercial outcome the project needs to support.',
  },
  {
    title: 'Strategy',
    description: 'Define the right platform, page hierarchy, content priorities, and conversion path.',
  },
  {
    title: 'Implementation',
    description: 'Build clean, responsive, scalable pages with quality-focused frontend execution.',
  },
  {
    title: 'Optimization',
    description: 'Improve speed, UX flow, trust signals, and high-friction sections before launch.',
  },
  {
    title: 'QA',
    description: 'Validate key journeys, responsive behavior, browser support, and release readiness.',
  },
  {
    title: 'Launch & Support',
    description: 'Ship with confidence and keep momentum through post-launch fixes, updates, and ongoing support.',
  },
]

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug)
}
