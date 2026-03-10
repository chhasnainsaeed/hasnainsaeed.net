# Internal Linking Strategy

## Objective

Use internal links to make the site easier to crawl, easier to understand topically, and easier for buyers to move from discovery into service evaluation.

## Important Pages

### Pillar pages

- `/`
  Primary brand and commercial entry point.
- `/services`
  Main service hub and gateway into service-specific landing pages.
- `/services/shopify-development`
- `/services/wordpress-development`
- `/services/webflow-development`
- `/services/woocommerce-development`
- `/services/website-speed-optimization`
- `/services/website-maintenance-support`
- `/services/figma-to-website-development`
- `/services/bug-fixing-qa-support`
  Core commercial pages.
- `/portfolio`
  Proof hub.
- `/blog`
  Content hub.
- `/about`
  Entity and trust hub.
- `/contact`
  Conversion hub.

### Supporting pages

- `/portfolio/:slug`
  Case studies that route authority into related services and insights.
- `/blog/category/:slug`
  Topic-cluster hubs that reinforce service relevance.
- `/blog/:slug`
  Supporting informational pages that feed service and proof pages.
- `/packages`
  Secondary commercial page.

## Topic Relationship Map

### Ecommerce growth cluster

- Pillars:
  Shopify Development, WooCommerce Development
- Supporting proof:
  Shopify and ecommerce case studies
- Supporting content:
  Ecommerce Growth & Store Optimization category
- Main purpose:
  Connect store UX, performance, and conversion work back to commercial ecommerce services.

### Service website and redesign cluster

- Pillars:
  WordPress Development, Webflow Development, Figma to Website Development
- Supporting proof:
  WordPress and Webflow case studies
- Supporting content:
  Conversion & Service Website Strategy and Design-to-Development categories
- Main purpose:
  Connect planning, design handoff, and lead-generation implementation back to platform builds.

### Performance and support cluster

- Pillars:
  Website Speed Optimization, Website Maintenance & Support, Bug Fixing & QA Support
- Supporting proof:
  Optimization and QA case studies
- Supporting content:
  Performance, Maintenance & QA category
- Main purpose:
  Connect live-site problem solving to technical support services.

## Linking Rules

- Every hub page should link down into its relevant detail pages and across into the nearest proof or insight pages.
- Every service page should link to:
  related services,
  related case studies,
  related blog posts,
  services hub,
  portfolio hub,
  contact page.
- Every case study should link to:
  closest service pages,
  supporting articles,
  portfolio hub,
  contact page.
- Every blog post should link to:
  related services,
  related case studies,
  topic-cluster hub,
  blog hub,
  contact page.
- Contact page should link back to:
  service hub,
  selected service pages,
  selected case studies,
  planning and support content.
- Footer should include:
  core pages,
  core services,
  proof and planning links.

## Anchor Guidance

- Use natural anchors tied to user intent, not repeated exact-match keyword strings.
- Favor mixed anchors such as:
  "Plan a WordPress build",
  "Review ecommerce UX proof",
  "Read performance and QA guidance",
  "Browse all case studies".
- Keep links contextual and clustered instead of overloading single paragraphs with many links.

## Implemented In Code

- Central relationship map:
  `src/utils/internalLinks.js`
- Reusable rendering component:
  `src/components/ui/InternalLinkSection.jsx`
- Applied to:
  homepage,
  portfolio hub,
  blog hub,
  contact page,
  service detail pages,
  case study pages,
  blog post pages,
  footer.
