# Structured Data Strategy

This site uses modular JSON-LD helpers from `src/seo/schema.js`. The implementation is designed to stay aligned with visible page content and to avoid unsupported or spammy schema types.

## Core entity layer

- `Person`
  Applied on the homepage and About page for Hasnain Saeed as the visible personal brand entity.
- `ProfessionalService`
  Applied on the homepage, About page, Services page, and Contact page because those pages visibly present the freelance service business and contact path.
- `WebSite`
  Applied on the homepage as the root website entity for `hasnainsaeed.net`.

## Page layer

- `WebPage`
  Applied to the homepage, service detail pages, blog post pages, case study pages, packages page, and contact page.
- `ProfilePage`
  Applied to the About page because it is the main profile page for the personal brand and visibly centers on Hasnain Saeed.
- `CollectionPage`
  Applied to the Services index, Portfolio index, Blog archive, and Blog category pages because those pages are visible content collections.
- `BreadcrumbList`
  Applied on all index and detail pages that render visible breadcrumb navigation.

## Content layer

- `Service`
  Applied on each `/services/:slug` page and backed by visible service-specific content such as scope, audience, process, and FAQ.
- `Article`
  Applied on each `/blog/:slug` page and backed by visible article title, intro, sections, dates, and author context.
- `FAQPage`
  Applied only on pages with visible FAQ sections:
  homepage, Services, service detail pages, blog posts, Contact, and Packages.
- `CreativeWork`
  Applied on each portfolio case study page to represent the case study itself.

## Entity references and consistency

- Shared schema IDs are defined for:
  - website
  - person
  - professional service
- Detail pages reference their primary entities with stable `@id` values:
  - service pages reference `#service`
  - blog posts reference `#article`
  - case studies reference `#case-study`
  - page-level schemas reference `#webpage`

## sameAs policy

- `siteConfig.sameAs` exists in `src/utils/site.js`.
- No `sameAs` URLs are emitted right now because the current codebase does not contain real LinkedIn, GitHub, Upwork, or similar public profile URLs in visible site content.
- When those profiles are added to visible content, populate `siteConfig.sameAs` and the `Person` and `ProfessionalService` schemas will include them automatically.

## Files involved

- `src/seo/schema.js`
  Main schema helper library with reusable entity, page, content, breadcrumb, and FAQ builders.
- `src/utils/site.js`
  Source of shared brand/entity data including the future `sameAs` array.
- `src/pages/*.jsx`
  Page-level schema application using the shared helpers.
