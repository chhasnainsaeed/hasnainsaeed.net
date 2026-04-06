import { FiArrowRight, FiLayers, FiMessageSquare, FiShield, FiZap } from 'react-icons/fi'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import Reveal from '../components/ui/Reveal'
import ButtonLink from '../components/ui/ButtonLink'
import ProfilePortrait from '../components/ui/ProfilePortrait'
import Seo from '../seo/Seo'
import { getStaticPageMetadata } from '../seo/metadata'
import { createBreadcrumbSchema, createPersonSchema, createWebPageSchema } from '../seo/schema'
import { routes } from '../utils/routes'
import { siteConfig } from '../utils/site'

const heroStats = [
  { value: '6+', label: 'Years in freelance delivery' },
  { value: '4', label: 'Core platforms' },
  { value: '1:1', label: 'Direct collaboration' },
  { value: '24h', label: 'Typical first reply' },
]

const deliveryLanes = [
  {
    number: '01',
    icon: FiLayers,
    title: 'Approved direction turned into real front-end execution.',
    description:
      'A lot of projects already know what the page should say and how it should feel. The hard part is carrying that into production without losing hierarchy, spacing, and finish quality.',
  },
  {
    number: '02',
    icon: FiShield,
    title: 'QA and launch confidence treated as part of the craft.',
    description:
      'Responsive cleanup, edge-case checking, interaction polish, and pre-launch review are built into the delivery instead of being pushed to the very end.',
  },
  {
    number: '03',
    icon: FiMessageSquare,
    title: 'Communication kept direct so decisions move faster.',
    description:
      'You work with me directly from first reply through delivery, which usually means less ambiguity, fewer handoff gaps, and a calmer project rhythm.',
  },
]

const timeline = [
  {
    year: '2020',
    title: 'Started freelancing with WordPress implementation work.',
    note: 'The early focus was clean business-site delivery, content structure, and getting pages live without rough edges.',
  },
  {
    year: '2022',
    title: 'Expanded into Shopify refinements and ecommerce work.',
    note: 'That brought more landing-page execution, storefront cleanup, and conversion-aware front-end decisions into the mix.',
  },
  {
    year: '2023',
    title: 'Added Webflow for sharper startup and marketing builds.',
    note: 'The work increasingly centered on preserving design intent while still delivering practical, production-ready pages.',
  },
  {
    year: '2024',
    title: 'QA became a clearer part of the delivery standard.',
    note: 'Projects needed more than implementation alone. They needed polish, consistency, and stronger launch preparation.',
  },
  {
    year: '2025+',
    title: 'Now focused on multi-platform implementation with premium finish quality.',
    note: 'Today the role is part builder, part finisher, and part technical partner for teams that want the site to feel genuinely ready.',
  },
]

const fitItems = [
  'Redesigns that already have direction but need strong production work',
  'Live sites that feel rough in responsive behavior or finish quality',
  'Near-launch projects that need QA, cleanup, and calmer delivery',
]

const platformRows = [
  {
    name: 'Shopify',
    summary: 'Theme sections, landing pages, storefront refinement, and frontend work that supports a cleaner buying experience.',
    note: 'Best for ecommerce builds that need sharper execution without overcomplicating the theme.',
  },
  {
    name: 'WordPress',
    summary: 'Service pages, marketing websites, structured content builds, and practical implementation for teams that need clarity and control.',
    note: 'Good fit when the site needs structure, polish, and dependable updates over time.',
  },
  {
    name: 'Webflow',
    summary: 'Marketing pages and startup sites where design precision, motion restraint, and visual finish matter in production.',
    note: 'Ideal when the live site needs to feel as considered as the original concept.',
  },
  {
    name: 'WooCommerce',
    summary: 'Commerce-oriented page work, UX refinement, and technical cleanup around shopping flows and content presentation.',
    note: 'Useful when the goal is steadier buying flows and a more trustworthy storefront feel.',
  },
]

const modeChips = ['Independent partner', 'Build + QA', 'Launch support', 'Async friendly']

export default function AboutPage() {
  const metadata = getStaticPageMetadata('about')
  const breadcrumbItems = [
    { name: 'Home', path: routes.home },
    { name: 'About', path: routes.about },
  ]

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
          createPersonSchema(),
          createWebPageSchema({
            path: routes.about,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            about: [siteConfig.name, siteConfig.jobTitle, ...siteConfig.corePlatforms],
          }),
          createBreadcrumbSchema(breadcrumbItems),
        ]}
      />

      <section className="section-pad pb-8 pt-12 sm:pt-16">
        <div className="section-wrap">
          <Reveal className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,115,0,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,77,45,0.16),transparent_32%),linear-gradient(180deg,#15161d_0%,#08090d_100%)] px-6 py-8 shadow-[0_30px_90px_rgba(0,0,0,0.36)] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="pointer-events-none absolute -right-10 top-0 h-56 w-56 rounded-full bg-orange-500/16 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(18rem,0.84fr)] lg:items-center lg:gap-8">
              <div>
                <Breadcrumbs items={breadcrumbItems} className="mb-5" />
                <p className="text-xs uppercase tracking-[0.28em] text-orange-300/90">About</p>
                <h1 className="mt-5 max-w-[19ch] text-balance text-[2.35rem] font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-[3rem] lg:text-[3.85rem]">
                  Freelance web developer with design discipline and QA built in.
                </h1>
                <p className="mt-5 max-w-[60ch] text-base leading-7 text-zinc-300 sm:text-[1.05rem]">
                  {siteConfig.authorBio} The goal is a live site that still feels polished, stable, and ready once real traffic hits.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink to={routes.contact}>Book Consultation</ButtonLink>
                  <ButtonLink to={routes.portfolio} variant="ghost">
                    View Portfolio
                  </ButtonLink>
                </div>
              </div>

              <div className="grid gap-4 lg:max-w-[26rem] lg:justify-self-end">
                <ProfilePortrait showCaption={false} />
                <div className="rounded-[1.9rem] border border-white/10 bg-black/20 p-5 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Working Style</p>
                  <p className="mt-3 text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                    Direct collaboration, cleaner execution, and QA built into delivery.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{siteConfig.directContactNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad pb-12 pt-4">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <Reveal className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,20,0.94),rgba(8,9,13,0.94))] p-7 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-orange-300/85">Operating Mode</p>
            <h2 className="mt-4 max-w-[20ch] text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.7rem]">
              Direct collaboration from first reply to launch-ready delivery.
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">{siteConfig.directContactNote}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-300">{siteConfig.timezoneNote}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {modeChips.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]" delay={0.06}>
            <div className="border-b border-white/10 px-6 py-5 sm:px-7">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Quick Snapshot</p>
              <p className="mt-3 text-lg font-semibold text-white">A compact view of how I usually work with clients.</p>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {heroStats.map((item) => (
                <div key={item.label} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 sm:p-6">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">{item.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-400">{item.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal className="lg:pt-6">
            <p className="text-xs uppercase tracking-[0.26em] text-orange-300/85">What The Work Is</p>
            <h2 className="mt-5 max-w-[18ch] text-balance text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[3rem]">
              Usually not a blank-slate build. Usually the finishing work that matters.
            </h2>
            <p className="mt-6 max-w-[58ch] text-sm leading-8 text-zinc-300 sm:text-base">
              Most clients already have momentum. The offer is clear, the platform is chosen, or the redesign direction already exists. What they need is
              somebody who can carry the implementation properly across design detail, responsive behavior, QA, and launch prep.
            </p>
            <p className="mt-4 max-w-[58ch] text-sm leading-8 text-zinc-300 sm:text-base">
              The strongest differentiator in my process is that the work stays direct. There is no handoff chain between strategy, implementation, and
              QA. I am usually the person reviewing the design, building the frontend, checking the responsive states, and validating the release details
              before the site goes live.
            </p>
            <p className="mt-4 max-w-[58ch] text-sm leading-8 text-zinc-300 sm:text-base">
              A recurring challenge I solve is the gap between "approved" and "actually ready." Plenty of websites look fine in a mockup or staging link,
              but start to feel rough once real content, real devices, and real launch pressure are involved. My role is to close that gap so the live
              version feels finished, trustworthy, and easier to grow.
            </p>
          </Reveal>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
            {deliveryLanes.map((item, index) => {
              const Icon = item.icon

              return (
                <Reveal
                  key={item.number}
                  delay={0.06 + index * 0.05}
                  className="grid gap-4 border-b border-white/10 p-6 last:border-b-0 sm:grid-cols-[78px_minmax(0,1fr)_48px] sm:items-start sm:p-7"
                >
                  <div>
                    <p className="text-3xl font-semibold tracking-[-0.05em] text-orange-300">{item.number}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.025em] text-white">{item.title}</h3>
                    <p className="mt-3 max-w-[60ch] text-sm leading-7 text-zinc-300">{item.description}</p>
                  </div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/20 bg-orange-400/10 text-orange-200">
                    <Icon className="h-5 w-5" />
                  </span>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,15,20,0.95),rgba(7,7,10,0.95))] p-7 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-orange-300/85">Timeline</p>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl">
                  How the role evolved
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                2020 to now
              </span>
            </div>

            <div className="relative mt-8 space-y-6 pl-8 before:absolute before:bottom-2 before:left-[11px] before:top-2 before:w-px before:bg-gradient-to-b before:from-orange-400/80 before:via-orange-300/35 before:to-transparent">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={0.08 + index * 0.05} className="relative">
                  <span className="absolute left-[-31px] top-2 h-5 w-5 rounded-full border border-orange-300/30 bg-orange-400/14 shadow-[0_0_0_6px_rgba(255,115,0,0.07)]" />
                  <p className="text-[11px] uppercase tracking-[0.2em] text-orange-200">{item.year}</p>
                  <h3 className="mt-2 text-balance text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-2 max-w-[58ch] text-sm leading-7 text-zinc-300">{item.note}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal className="relative overflow-hidden rounded-[2rem] border border-orange-300/18 bg-[linear-gradient(140deg,rgba(255,115,0,0.16),rgba(255,255,255,0.03),rgba(255,77,45,0.08))] p-7 sm:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-300/25 bg-black/10 text-orange-100">
                <FiZap className="h-5 w-5" />
              </span>
              <h2 className="mt-6 max-w-[18ch] text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                The best work happens when execution is treated like part of the strategy.
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-100/90">
                That means the final build is expected to read clearly, hold up across devices, and reduce the usual launch friction instead of adding to it.
              </p>
            </Reveal>

            <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 sm:p-8" delay={0.08}>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">Best Fit</p>
              <ul className="mt-5 space-y-4">
                {fitItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-200">
                    <FiArrowRight className="mt-1 h-4 w-4 shrink-0 text-orange-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm text-zinc-300">
                <strong className="text-white">{siteConfig.availability}</strong> for project-based builds, redesign implementation, and ongoing technical support.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="section-wrap">
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[48rem]">
              <p className="text-xs uppercase tracking-[0.24em] text-orange-300/85">Platforms</p>
              <h2 className="mt-4 max-w-[18ch] text-balance text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.95rem]">
                Same delivery standard across the platforms most clients already use.
              </h2>
            </div>
            <ButtonLink to={routes.services} variant="ghost">
              Explore Services
            </ButtonLink>
          </Reveal>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            {platformRows.map((item, index) => (
              <Reveal
                key={item.name}
                delay={0.06 + index * 0.05}
                className="grid gap-5 border-b border-white/10 p-6 last:border-b-0 sm:p-7 lg:grid-cols-[180px_minmax(0,1fr)_260px] lg:items-start"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Platform</p>
                  <h3 className="mt-3 text-balance text-2xl font-semibold leading-[1.12] tracking-[-0.02em] text-white">{item.name}</h3>
                </div>
                <p className="max-w-[62ch] text-sm leading-7 text-zinc-300">{item.summary}</p>
                <p className="text-sm leading-7 text-zinc-400">{item.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-18 pt-12">
        <div className="section-wrap">
          <Reveal className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,115,0,0.2),transparent_28%),linear-gradient(180deg,#15161d_0%,#09090c_100%)] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:p-10 lg:p-12">
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-orange-300/85">Next Step</p>
                <h2 className="mt-5 max-w-[18ch] text-balance text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.035em] text-white sm:text-[3rem]">
                  If the site already has direction, I can help carry the execution.
                </h2>
                <p className="mt-5 max-w-[60ch] text-sm leading-8 text-zinc-300 sm:text-base">
                  The strongest fit is work that needs premium implementation, QA-backed polish, and a reliable technical partner who can keep delivery
                  focused from start to finish.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <ButtonLink to={routes.contact}>Start a Project</ButtonLink>
                <ButtonLink to={routes.portfolio} variant="ghost">
                  Review Recent Work
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
