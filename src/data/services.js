// Edit service descriptions, timelines, and deliverables as your offers evolve.
const baseServices = [
  {
    id: 'wordpress',
    slug: 'wordpress-development',
    title: 'Custom WordPress Development',
    seoLabel: 'custom WordPress development',
    metaTitle: 'Hire WordPress Developer in Pakistan | Custom WordPress Development',
    metaDescription:
      'Hire a WordPress developer in Pakistan for custom WordPress development, cleaner builds, better editing flow, stronger performance, and QA-backed launch support.',
    icon: 'WP',
    eyebrow: 'Flexible CMS Builds',
    summary: 'Custom WordPress websites built for speed, content flexibility, and long-term scalability.',
    intro:
      'Custom WordPress development for businesses that need a WordPress developer for hire in Pakistan, with clean frontend execution, dependable CMS structure, and a setup that stays easy to manage after launch.',
    image: '/images/project-designinc-cover.jpg',
    keywords: [
      'custom wordpress development',
      'wordpress developer for hire',
      'hire wordpress developer pakistan',
      'freelance wordpress developer pakistan',
      'wordpress website build',
    ],
    includes: ['Theme setup or custom implementation', 'CMS structuring', 'Performance optimization', 'Plugin compatibility'],
    deliverables: ['Responsive pages', 'Admin-ready backend', 'Technical QA pass'],
    painPoints: ['A WordPress site that feels dated, slow, or hard to update safely', 'Theme or plugin combinations that create layout bugs and fragile editing experiences'],
    outcomes: ['A cleaner build with better editing flow', 'Stronger performance foundations and fewer avoidable conflicts'],
    workflow: ['Review the current setup and business goals', 'Define the page structure and CMS needs', 'Implement the build and validate the key user flows'],
    idealFor: 'Service businesses, agencies, and corporate websites',
    timeline: '1-4 weeks',
    addons: ['Ongoing maintenance', 'Content migration', 'Technical SEO cleanup'],
    relatedProjects: ['mapx-development-wordpress-site', 'design-inc-palm-beach-interior-design-site', 'next-day-shower-glass-palm-beach-site'],
    relatedPosts: ['wordpress-speed-tips', 'website-maintenance-priorities', 'technical-seo-launch-checklist'],
    faq: [
      { question: 'Can you improve an existing WordPress site instead of rebuilding it?', answer: 'Yes. I often improve existing WordPress sites when the foundation is still usable but the UX, speed, or editing experience needs work.' },
      { question: 'Can you help after launch?', answer: 'Yes. Ongoing WordPress support, content updates, and technical cleanup can be handled as follow-on work.' },
    ],
  },
  {
    id: 'shopify',
    slug: 'shopify-store-development',
    title: 'Shopify Store Development',
    seoLabel: 'Shopify store development',
    metaTitle: 'Freelance Shopify Developer in Pakistan | Shopify Store Development',
    metaDescription:
      'Shopify store development from a freelance Shopify developer in Pakistan for US and international brands that need stronger UX, reusable sections, and launch-ready QA.',
    icon: 'SF',
    eyebrow: 'Conversion-Focused Ecommerce',
    summary: 'Shopify storefront builds and customizations focused on conversion and clean UX.',
    intro:
      'Shopify store development from a freelance Shopify developer in Pakistan for US and international brands that need polished storefront UX, stronger product discovery, and fewer conversion blockers.',
    image: '/images/project-feyre-cover.png',
    keywords: [
      'shopify store development',
      'freelance shopify developer pakistan',
      'hire shopify developer pakistan',
      'shopify expert pakistan',
      'shopify storefront customization',
    ],
    includes: ['Theme customization', 'Product page optimization', 'Checkout improvements', 'App conflict resolution'],
    deliverables: ['Conversion-focused storefront', 'Reusable custom sections', 'Pre-launch QA'],
    painPoints: ['A Shopify theme that feels generic or inconsistent across buying flows', 'Theme and app changes that introduced bugs, slowdowns, or hard-to-maintain code'],
    outcomes: ['A cleaner storefront experience with stronger CTA flow', 'Reusable sections that make merchandising and campaign updates easier'],
    workflow: ['Review the storefront and the key conversion blockers', 'Map the most important shopping journeys', 'Implement, refine, and QA the updated experience'],
    idealFor: 'D2C brands and e-commerce founders',
    timeline: '2-6 weeks',
    addons: ['Retention flows', 'A/B test setup', 'Store speed optimization'],
    relatedProjects: ['bebano-shopify-fashion-storefront', 'feyre-shopify-luxury-fashion-storefront'],
    relatedPosts: ['shopify-optimization-playbook', 'technical-seo-launch-checklist'],
    faq: [
      { question: 'Can you customize an existing Shopify theme?', answer: 'Yes. A lot of Shopify work is about improving an existing theme so it fits the catalog, brand, and conversion goals better.' },
      { question: 'Do you only work on full stores?', answer: 'No. I also take on product page, collection page, UX cleanup, and troubleshooting work when that is the main bottleneck.' },
    ],
  },
  {
    id: 'webflow',
    slug: 'webflow-development',
    title: 'Webflow Developer for Hire',
    seoLabel: 'Webflow development',
    metaTitle: 'Webflow Developer for Hire for USA Teams | Hasnain Saeed',
    metaDescription:
      'Webflow development from a Webflow developer for hire for USA teams, startups, and brands that need polished implementation, stronger CMS structure, and smoother launch readiness.',
    icon: 'WF',
    eyebrow: 'Polished Webflow Execution',
    summary: 'Premium Webflow implementations for startups and personal brands.',
    intro:
      'Webflow development from a Webflow developer for hire for USA, UK, and Canada clients who need polished implementation, smoother CMS editing, and a launch-ready experience that still feels deliberate on mobile.',
    image: '/images/project-apex-cover.jpg',
    keywords: [
      'webflow development',
      'webflow developer for hire usa',
      'hire webflow developer',
      'webflow developer pakistan',
      'webflow cms build',
    ],
    includes: ['Pixel-perfect implementation', 'CMS collections', 'Animation polish', 'Responsive refinement'],
    deliverables: ['Production-ready Webflow site', 'Component style guide', 'Launch QA checklist'],
    painPoints: ['A design that still needs trustworthy Webflow implementation', 'An almost-finished Webflow site that still feels rough on mobile or during launch review'],
    outcomes: ['A cleaner Webflow build with consistent layout behavior', 'A CMS setup that supports publishing without unnecessary confusion'],
    workflow: ['Clarify the page system and CMS model', 'Implement layouts, sections, and collection-driven content', 'Refine interactions and run launch QA'],
    idealFor: 'SaaS teams, creators, and campaign landing pages',
    timeline: '1-3 weeks',
    addons: ['Localization setup', 'Integrations', 'Content publishing support'],
    relatedProjects: ['apex-tuition-australia-tutoring-site', 'aquifercfo-fractional-finance-website', 'aquifer-growth-commerce-operations-site'],
    relatedPosts: ['webflow-best-practices', 'technical-seo-launch-checklist', 'landing-page-ui-implementation'],
    faq: [
      { question: 'Can you build in Webflow from an existing design?', answer: 'Yes. I regularly translate existing layouts into clean Webflow builds while tightening the responsive behavior and CMS structure.' },
      { question: 'Can you improve an existing Webflow site instead of starting over?', answer: 'Yes. Refinement, page additions, and quality cleanup are often the most practical next step for an existing Webflow project.' },
    ],
  },
  {
    id: 'landing-pages',
    slug: 'landing-page-design-build',
    title: 'Landing Page Design and Build',
    seoLabel: 'landing page design and build',
    metaTitle: 'Landing Page Design & Build | Hasnain Saeed',
    metaDescription:
      'Landing page design and build services for campaigns, launches, and lead generation pages that need stronger messaging, CTA flow, and responsive polish.',
    icon: 'LP',
    eyebrow: 'Campaign-Ready Landing Pages',
    summary: 'Conversion-oriented landing pages optimized for paid and organic traffic.',
    intro: 'I design and build focused landing pages for campaigns, offers, and launches where message clarity, trust, and fast execution matter more than bloated page counts.',
    image: '/images/project-pixeltrue-cover.png',
    keywords: ['landing page design', 'landing page build service', 'conversion landing page'],
    includes: ['Offer-first structure', 'Clear CTA strategy', 'Trust element blocks', 'Responsive optimization'],
    deliverables: ['Launch-ready landing page', 'Copy structure recommendations', 'Performance QA'],
    painPoints: ['Traffic is being sent to pages that are too generic or too weak on CTA clarity', 'An offer needs a focused page without waiting on a full website project'],
    outcomes: ['A stronger offer page with clearer hierarchy and CTA placement', 'A page that is easier to use across mobile and desktop'],
    workflow: ['Clarify the offer, audience, and conversion goal', 'Shape the page around the strongest CTA path', 'Build, refine, and QA the final page'],
    idealFor: 'Campaigns, product launches, and lead generation',
    timeline: '5-10 days',
    addons: ['Heatmap tracking', 'A/B variant setup'],
    relatedProjects: ['apex-tuition-australia-tutoring-site', 'pixeltrue-unlimited-design-subscription-site', 'aquifercfo-fractional-finance-website'],
    relatedPosts: ['landing-page-ui-implementation', 'webflow-best-practices'],
    faq: [
      { question: 'Can you help if the copy is still rough?', answer: 'Yes. I can help structure the page around the offer and suggest stronger content hierarchy even if the final copy is still being refined.' },
      { question: 'Can you optimize an existing landing page instead of making a new one?', answer: 'Yes. If the offer is already established, improving the current page is often the fastest route to better clarity and stronger performance.' },
    ],
  },
  {
    id: 'optimization',
    slug: 'website-optimization-bug-fixing',
    title: 'Website Optimization and Bug Fixing',
    seoLabel: 'website optimization and bug fixing',
    metaTitle: 'Website Optimization & Bug Fixing | Hasnain Saeed',
    metaDescription:
      'Website optimization and bug fixing for teams dealing with slow pages, unstable layouts, broken interactions, or frontend performance bottlenecks.',
    icon: 'OP',
    eyebrow: 'Performance and Stability',
    summary: 'Performance cleanups, technical troubleshooting, and UX-focused improvements.',
    intro: 'I help teams clean up slow, unstable, or inconsistent websites by finding the technical bottlenecks, fixing the highest-impact issues, and improving the parts users feel most.',
    image: '/images/project-mapx-cover.png',
    keywords: ['website optimization service', 'bug fixing service', 'website speed optimization'],
    includes: ['Speed audit', 'Issue diagnosis', 'UI fixes', 'Script and asset optimization'],
    deliverables: ['Audit report', 'Fix implementation', 'Before/after benchmark summary'],
    painPoints: ['Pages feel slow, interactions break, or the UI behaves inconsistently across devices', 'A website has accumulated bugs after updates or quick fixes over time'],
    outcomes: ['A clearer picture of what is slowing the site down', 'Fixes applied to the highest-priority bugs and performance bottlenecks'],
    workflow: ['Audit the live site and identify the highest-impact issues', 'Prioritize fixes across speed, layout, and scripts', 'Implement and validate the changes against the reported problems'],
    idealFor: 'Sites with slow speed, broken interactions, or visual inconsistencies',
    timeline: '3-14 days',
    addons: ['Monitoring setup', 'Monthly optimization sprint'],
    relatedProjects: ['mapx-development-wordpress-site', 'suave-florida-website-revamp', 'pixeltrue-unlimited-design-subscription-site'],
    relatedPosts: ['website-maintenance-priorities', 'wordpress-speed-tips', 'technical-seo-launch-checklist'],
    faq: [
      { question: 'Can you work from a list of existing bugs?', answer: 'Yes. I can work from a client-provided bug list, but I also usually identify related issues during the review that are worth fixing in the same pass.' },
      { question: 'Can optimization be done without redesigning the whole site?', answer: 'Yes. Most optimization work is about improving the current foundation instead of replacing it unnecessarily.' },
    ],
  },
  {
    id: 'ui-implementation',
    slug: 'ui-ux-implementation',
    title: 'UI/UX Implementation',
    seoLabel: 'UI implementation',
    metaTitle: 'UI Implementation Services | Hasnain Saeed',
    metaDescription:
      'UI implementation services for teams that need design-to-code delivery, responsive polish, reusable components, and reliable frontend execution.',
    icon: 'UI',
    eyebrow: 'Design-to-Code Delivery',
    summary: 'Converting design files into clean, responsive interfaces with consistent behavior.',
    intro: 'I turn approved designs into frontend experiences that feel polished in the browser, not just in the mockup, with attention to responsive behavior, spacing, and interaction quality.',
    image: '/images/project-pixeltrue-platform.png',
    keywords: ['ui implementation service', 'frontend implementation', 'design to code'],
    includes: ['Design-to-code implementation', 'Interaction polish', 'Responsive behavior', 'Accessibility alignment'],
    deliverables: ['Pixel-accurate frontend', 'Reusable component structure', 'Cross-browser QA'],
    painPoints: ['A finished design still needs dependable implementation from someone who cares about detail', 'Frontend work is shipping inconsistently across breakpoints and browsers'],
    outcomes: ['A frontend that matches the intended visual direction more closely', 'Cleaner reusable structures that are easier to extend'],
    workflow: ['Review the source designs and states', 'Translate layouts into reusable components', 'Refine responsive behavior and validate the UI before handoff'],
    idealFor: 'Teams that need dependable front-end execution',
    timeline: '1-4 weeks',
    addons: ['Design system cleanup', 'Micro-interaction tuning'],
    relatedProjects: ['pixeltrue-unlimited-design-subscription-site', 'suave-florida-website-revamp', 'apex-tuition-australia-tutoring-site'],
    relatedPosts: ['landing-page-ui-implementation', 'qa-launch-checklist'],
    faq: [
      { question: 'Can you work from Figma or another design tool?', answer: 'Yes. I can work from existing design files and focus on translating them into stable, responsive frontend output.' },
      { question: 'Do you handle responsive behavior too?', answer: 'Yes. Responsive implementation is a core part of the work and not an afterthought.' },
    ],
  },
  {
    id: 'qa-testing',
    slug: 'qa-testing-documentation',
    title: 'QA Testing and Documentation',
    seoLabel: 'QA testing and documentation',
    metaTitle: 'Website QA Testing & Documentation | Hasnain Saeed',
    metaDescription:
      'QA testing and documentation for websites and web apps that need clearer bug reporting, release validation, and stronger launch confidence.',
    icon: 'QA',
    eyebrow: 'Release Confidence',
    summary: 'Structured testing support to reduce release risk and improve product quality.',
    intro: 'I provide practical QA support for websites and web apps that need clearer test coverage, better bug reporting, and more confidence before release.',
    image: '/images/project-mapx-inquiry.png',
    keywords: ['qa testing service', 'website qa testing', 'release qa support'],
    includes: ['Test scenario mapping', 'Functional testing', 'Bug logging with severity', 'Retest validation'],
    deliverables: ['QA report', 'Issue tracker updates', 'Release readiness checklist'],
    painPoints: ['Releases are shipping with preventable issues because testing is inconsistent or rushed', 'Teams need bugs documented clearly so fixes are faster and less ambiguous'],
    outcomes: ['A clearer view of blocking bugs and release risk', 'More actionable bug reports and retest validation'],
    workflow: ['Map the priority flows and devices that need coverage', 'Run structured testing and document issues clearly', 'Retest fixes and summarize release readiness'],
    idealFor: 'Web apps, e-commerce teams, and active product squads',
    timeline: 'Ongoing or sprint-based',
    addons: ['Regression suites', 'Release support'],
    relatedProjects: ['apex-tuition-australia-tutoring-site', 'pixeltrue-unlimited-design-subscription-site', 'aquifer-growth-commerce-operations-site'],
    relatedPosts: ['qa-launch-checklist', 'website-maintenance-priorities'],
    faq: [
      { question: 'Do you only test websites you built?', answer: 'No. I often join projects specifically to test and document issues before launch or during active delivery.' },
      { question: 'Can you log bugs inside our existing workflow?', answer: 'Yes. I can adapt to the team workflow and document issues in the format or tracker the team already uses.' },
    ],
  },
  {
    id: 'seo-ready',
    slug: 'seo-ready-website-setup',
    title: 'SEO-ready Website Setup',
    seoLabel: 'technical SEO setup',
    metaTitle: 'Technical SEO Setup Services | Hasnain Saeed',
    metaDescription:
      'Technical SEO setup services for websites that need better crawlability, metadata structure, sitemap support, and launch-ready indexing foundations.',
    icon: 'SEO',
    eyebrow: 'Search-Ready Foundations',
    summary: 'Technical SEO foundations integrated during build for stronger search readiness.',
    intro: 'I set up websites so they are easier to crawl, easier to understand, and better prepared for indexing from the start, without pretending technical SEO alone replaces real content strategy.',
    image: '/images/project-mapx-sectors.png',
    keywords: ['technical seo setup', 'seo-ready website', 'website indexing setup'],
    includes: ['Meta structure setup', 'Semantic hierarchy', 'Performance baseline', 'Indexing checks'],
    deliverables: ['SEO-ready architecture', 'Metadata framework', 'Launch checklist'],
    painPoints: ['A site is launching without the technical basics needed for clean indexing', 'Metadata, canonicals, headings, and crawl paths are inconsistent or missing'],
    outcomes: ['A cleaner technical foundation for search engines to crawl', 'Fewer preventable indexing problems at launch'],
    workflow: ['Review the site structure and metadata needs', 'Implement crawl-friendly page setup and supporting files', 'Validate sitemap, robots, and indexing intent'],
    idealFor: 'Businesses wanting search visibility from day one',
    timeline: 'Add-on to any build',
    addons: ['On-page SEO pass', 'Schema setup'],
    relatedProjects: ['mapx-development-wordpress-site', 'aquifer-growth-commerce-operations-site', 'aquifercfo-fractional-finance-website'],
    relatedPosts: ['technical-seo-launch-checklist', 'website-maintenance-priorities', 'webflow-best-practices'],
    faq: [
      { question: 'Do you do full SEO campaigns?', answer: 'This service focuses on technical readiness during build and launch. It gives the site a stronger base, but it does not replace broader content or authority work.' },
      { question: 'Does this include sitemap and robots setup?', answer: 'Yes. Technical crawl-readiness checks, metadata framework, and indexing-support files are part of the implementation.' },
    ],
  },
]

const serviceEnhancements = {
  wordpress: {
    startingPrice: '$699+',
    startingPriceValue: 699,
    pricingNote:
      'Most WordPress brochure sites and structured service websites start from $699+, with larger page counts, migrations, or custom functionality scoped separately.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'WordPress development here is not limited to installing a theme and handing over login details. The work usually includes planning the page structure, tightening the frontend implementation, shaping an editing flow that makes sense for the client, and reducing the plugin or theme friction that tends to create problems later. That makes the site easier to publish on, easier to update safely, and more dependable once traffic and content changes start hitting the live build.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service is a strong fit for service businesses, agencies, and professional brands that want a site they can actually manage after launch. Some clients need a new build from the ground up. Others already have a WordPress site but are dealing with heavy templates, confusing editing screens, slow pages, or repeated layout bugs. In both cases, the goal is the same: build a cleaner content foundation without making the backend harder to own.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'A typical WordPress project starts with reviewing the current content, page goals, and technical blockers. From there, I define the page structure, component approach, and CMS needs before moving into implementation. During the build, I pay attention to responsive behavior, plugin compatibility, editing clarity, and the parts of the site most likely to break once real content is added. That QA mindset matters just as much as the code itself.',
      },
      {
        heading: 'What results to expect',
        body:
          'The end result should feel easier to trust and easier to manage. Clients usually want clearer service pages, a better editing experience, cleaner structure for future content, and fewer issues caused by fragile theme or plugin combinations. It is also common to combine WordPress work with technical SEO cleanup, speed improvements, or ongoing maintenance so the site does not fall back into patchwork fixes right after launch.',
      },
    ],
  },
  shopify: {
    startingPrice: '$1,499+',
    startingPriceValue: 1499,
    pricingNote:
      'Most Shopify storefront work starts from $1,499+ when the goal is a real conversion-focused build or refinement pass, with larger catalogs and custom feature work scoped separately.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'Shopify work is rarely just about making a theme look nicer. It usually involves clarifying the buying journey, tightening the homepage and collection hierarchy, improving the product page, simplifying mobile interactions, and reducing the clutter that accumulates from rushed theme edits or too many apps. The goal is a storefront that feels easier to shop, easier to merchandise, and easier to keep consistent as the catalog and campaigns evolve.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This is a strong fit for D2C brands, product businesses, and founders who already have demand but can feel friction inside the store experience. Sometimes that friction shows up as generic layouts, inconsistent category discovery, weak product-page trust, or bugs introduced by app and theme changes over time. Other times the store is new, but it still needs a stronger structure before paid traffic or launch marketing starts pushing real buyers through it.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'Most Shopify projects begin by reviewing the current storefront, the main conversion blockers, and the highest-value customer paths. From there, I map the priorities around collection browsing, product-page UX, merchandising clarity, reusable sections, and responsive behavior. Implementation is followed by QA across the important shopping flows so the work is not only visually cleaner, but also steadier in the browser where trust and hesitation actually happen.',
      },
      {
        heading: 'What results to expect',
        body:
          'A strong Shopify outcome usually looks like clearer merchandising, a more trustworthy product-detail experience, and reusable theme sections that make ongoing updates less painful. The store should feel more deliberate from homepage to cart, not more complicated. If needed, this work can also connect with speed cleanup, app conflict resolution, or post-launch optimization so the storefront keeps improving instead of slipping back into reactive fixes.',
      },
    ],
  },
  webflow: {
    startingPrice: '$1,499+',
    startingPriceValue: 1499,
    pricingNote:
      'Most polished Webflow marketing builds and CMS-driven landing sites start from $1,499+, with heavier animation systems, localization, or larger content models scoped separately.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'Webflow development here is focused on turning approved direction into a production-ready site that still feels sharp once real content, breakpoints, and launch pressure are involved. That usually means building clean sections, consistent CMS structure, responsive layouts, restrained interactions, and a content model that is easy to manage later. The aim is not just a pretty build in the designer, but a live website that stays coherent across the pages people actually use.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service works best for startups, SaaS teams, personal brands, and campaign-led businesses that care about design quality but also need reliability. Some projects start from finished layouts in Figma. Others are already built in Webflow but still need refinement because mobile behavior feels rough, forms have not been checked properly, or the CMS setup is creating publishing friction. In both cases, the focus is on clarity, polish, and launch confidence.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'A typical Webflow engagement starts with clarifying the page system, the CMS requirements, and the highest-priority conversion actions. I then implement the layouts, build the reusable sections, and refine the responsive behavior so content lengths and real images do not quietly break the design. Before handoff or launch, I review forms, section spacing, interactions, and key browser/device states so the final build feels considered instead of rushed.',
      },
      {
        heading: 'What results to expect',
        body:
          'Clients usually want a Webflow build that feels premium, stays easy to publish on, and does not fall apart the moment traffic arrives. That means better CMS organization, more consistent layout behavior, smoother navigation, stronger CTA flow, and fewer launch surprises. When combined with technical SEO setup or landing-page strategy, the result is a site that is easier for both people and search engines to understand.',
      },
    ],
  },
  'landing-pages': {
    startingPrice: '$699+',
    startingPriceValue: 699,
    pricingNote:
      'Focused landing pages typically start from $699+, depending on how much copy structure, design direction, tracking setup, and testing support are needed.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'Landing-page work is about building a page around one offer, one audience, and one clear next step. Instead of spreading the message across a generic website structure, the page is organized to move someone from attention into trust and then into action. That includes the section order, CTA placement, proof blocks, mobile hierarchy, and the details that make the page feel easier to scan when the traffic is coming from ads, email, or search.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This is useful for launches, service campaigns, lead-generation offers, waiting lists, and focused product pages where clarity matters more than page count. A lot of businesses already have a main website, but the current pages are too broad to support a high-intent offer properly. A stronger landing page gives the campaign a cleaner path to conversion without waiting for a full redesign of the rest of the site.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'The process normally starts with the offer itself: who it is for, what should happen on the page, and where the current message is losing people. From there, I shape the page around the strongest CTA path, decide what proof or reassurance should show up before the form or button, and then implement the final layout with responsive and performance checks. Even a short page still needs serious discipline if it is supposed to convert under real traffic.',
      },
      {
        heading: 'What results to expect',
        body:
          'A good landing page should reduce confusion fast. Clients usually expect stronger message hierarchy, more visible trust cues, better CTA placement, and a page that feels easier to use on mobile. It should also be easier to test, easier to send traffic to, and easier to connect with analytics or A/B work later. In practical terms, the page should feel more focused, not just more decorated.',
      },
    ],
  },
  optimization: {
    startingPrice: 'Quote based',
    pricingNote:
      'Optimization and bug-fixing work is usually scoped after reviewing the live site, because the right price depends on the number of issues, the platform, and whether the work is a focused sprint or a wider cleanup pass.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'Website optimization and bug fixing is about finding the issues users actually feel, then solving them in the order that matters most. That can include slow pages, unstable layouts, broken mobile interactions, script conflicts, UI regressions, or frontend issues that have built up after repeated quick fixes. The goal is not to chase vanity metrics alone, but to improve how the site behaves where trust, usability, and conversion are being damaged.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service is designed for teams with a live website that technically works, but still feels rough in the places that matter. That might be a marketing site with recurring layout issues, a store suffering from app and theme conflicts, or a service website where mobile behavior and page speed are undermining lead quality. It is especially useful when a full rebuild would be excessive, but leaving the current problems in place is costing time and confidence.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'The work typically starts with an audit of the live experience, the reported issues, and the highest-priority user journeys. After that, I group the problems by impact across performance, layout, interactions, and technical conflicts, then implement fixes in a sequence that actually stabilizes the site. Validation matters here because bug-fixing without retesting is how regressions survive into production, especially on responsive pages and script-heavy templates.',
      },
      {
        heading: 'What results to expect',
        body:
          'The best outcome is not just a cleaner Lighthouse score or a shorter bug list. It is a site that feels more stable, easier to navigate, and less likely to break on the pages that drive leads or sales. Clients usually expect clearer diagnostics, stronger before-and-after visibility, and fixes applied where users were already feeling friction. If needed, the work can continue as a recurring optimization sprint rather than a one-time patch.',
      },
    ],
  },
  'ui-implementation': {
    startingPrice: '$1,499+',
    startingPriceValue: 1499,
    pricingNote:
      'UI implementation projects usually start from $1,499+ when the goal is clean design-to-code delivery across multiple responsive sections, reusable components, and QA review.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'UI implementation is where approved design direction gets translated into a real interface that still holds up in the browser. That includes spacing systems, responsive layout behavior, content states, interactions, accessibility basics, and reusable component structure. The point is not only to make the page look visually close to the design, but to make sure it behaves consistently once real content, edge cases, and cross-browser review enter the picture.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service is ideal for teams that already have design files, a component system, or a visual direction, but need someone to carry it into production with care. It is also useful when the live frontend feels close, but not close enough: inconsistent spacing, weak mobile hierarchy, unstable components, or handoff gaps are making the experience feel less premium than intended. That is often where trust drops, even when the design itself is strong.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'Projects usually begin with reviewing the source designs, the priority states, and the most important breakpoints. I then translate the layouts into reusable frontend structure, refine the interactions where needed, and test the responsive behavior so the UI still feels intentional on smaller screens. During QA, I pay special attention to typography, spacing rhythm, form behavior, and the sections where users are most likely to judge the brand quickly.',
      },
      {
        heading: 'What results to expect',
        body:
          'Clients normally want a frontend that feels more finished, more consistent, and easier to extend later. That means cleaner visual alignment, steadier responsive behavior, reusable components, and fewer surprises between the design file and the live environment. When the implementation quality is right, the page does not just look polished. It also communicates that the business behind it pays attention to detail.',
      },
    ],
  },
  'qa-testing': {
    startingPrice: 'Quote based',
    pricingNote:
      'QA support is usually scoped per sprint, release cycle, or ongoing workflow because the right price depends on the number of flows, devices, and reporting depth involved.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'QA testing and documentation is about reducing release risk before users find the problems first. That includes mapping the important journeys, running structured checks across the right devices and browsers, logging issues clearly, and retesting fixes instead of assuming they are resolved. On many projects, the real value is not just bug discovery. It is giving the team a cleaner way to prioritize what is blocking launch readiness and what is safe to ship.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service fits active product teams, ecommerce businesses, agencies, and launch-stage websites that cannot afford unclear bug reporting or rushed testing. It is especially useful when internal QA is inconsistent, the project is near release, or several contributors are making changes at once and the team needs a tighter validation pass. Clear QA becomes even more valuable when the site has forms, carts, dynamic content, or multi-step user journeys.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'The engagement normally starts by identifying the flows that actually matter most, such as lead capture, product browsing, cart behavior, checkout, booking, or onboarding. I then test those flows with structured coverage, log issues with reproducible detail, and group them by severity so the team can make decisions faster. Once fixes are shipped, the retest step confirms whether the real problem is gone and whether any adjacent regressions were introduced.',
      },
      {
        heading: 'What results to expect',
        body:
          'Clients usually expect stronger release confidence, clearer issue tracking, and less ambiguity about what is still blocking launch. They also get better visibility into how the product behaves for actual users instead of only relying on assumptions from staging review. When QA is handled well, the whole delivery process becomes calmer because the fix loop gets shorter and the risks are easier to see before they reach production.',
      },
    ],
  },
  'seo-ready': {
    startingPrice: '$699+',
    startingPriceValue: 699,
    pricingNote:
      'Technical SEO setup usually starts from $699+ when added to a build or cleanup project, with broader on-page content work and authority growth handled separately.',
    detailSections: [
      {
        heading: 'What this service actually covers',
        body:
          'SEO-ready website setup focuses on the technical and structural work that helps search engines crawl the site cleanly and understand what each page is about. That includes titles, descriptions, headings, canonicals, schema, sitemap support, robots setup, internal linking basics, and launch checks around indexation intent. It is intentionally practical: the goal is to remove preventable technical mistakes without pretending that metadata alone replaces content depth or authority.',
      },
      {
        heading: 'Who this work is best for',
        body:
          'This service is best for businesses launching a new site, rebuilding an existing one, or cleaning up a site that has weak technical foundations. It is especially helpful when the site has several service pages, case studies, or blog posts that need clearer structure before marketing pushes harder on search. It also works well as an add-on for WordPress, Shopify, or Webflow builds that want to start with cleaner crawlability instead of fixing those basics later.',
      },
      {
        heading: 'How the engagement usually runs',
        body:
          'The work usually begins with reviewing the page structure, the URL behavior, and the metadata coverage on the routes that matter most commercially. From there, I tighten the on-page setup, supporting files, structured data, and internal link paths so the site sends more consistent signals. The final step is verifying how the built output actually renders, because SEO checks are only useful if the live version of the site matches the implementation plan.',
      },
      {
        heading: 'What results to expect',
        body:
          'A strong outcome here means fewer technical blockers when Google or Bing first discover the site. Clients usually expect cleaner page-level metadata, better crawl support, stronger page-type clarity, and fewer preventable launch mistakes around canonicals, schema, or indexing files. This work improves readiness, not magic rankings. It gives the site a better foundation so later content, internal linking, and authority efforts are not fighting unnecessary technical confusion.',
      },
    ],
  },
}

export const services = baseServices.map((service) => ({
  ...service,
  ...serviceEnhancements[service.id],
}))

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug)
}

export function getServiceById(id) {
  return services.find((service) => service.id === id)
}

export const processSteps = [
  {
    title: 'Discovery',
    description: 'Clarify business goals, current pain points, and priority outcomes.',
  },
  {
    title: 'Strategy',
    description: 'Define platform direction, page priorities, and conversion flow.',
  },
  {
    title: 'Design / Structure',
    description: 'Map layout hierarchy and UI sections for trust and clarity.',
  },
  {
    title: 'Development',
    description: 'Implement clean, responsive, and scalable frontend architecture.',
  },
  {
    title: 'QA Testing',
    description: 'Run checklist-based validation and fix critical release issues.',
  },
  {
    title: 'Launch & Support',
    description: 'Deploy smoothly with post-launch monitoring and support.',
  },
]
