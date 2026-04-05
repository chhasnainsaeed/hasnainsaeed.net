import { siteConfig } from '../../utils/site'

export default function ProfilePortrait({ className = '', showCaption = true }) {
  return (
    <figure className={`overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.03] ${className}`}>
      <img
        src={siteConfig.headshotImage}
        alt={`${siteConfig.name}, ${siteConfig.jobTitle} from ${siteConfig.location}`}
        className="aspect-square w-full object-cover object-top"
        loading="lazy"
      />
      {showCaption ? (
        <figcaption className="border-t border-white/10 p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Direct Collaboration</p>
          <p className="mt-3 text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-orange-200">{siteConfig.jobTitle}</p>
          <p className="mt-3 text-sm leading-7 text-zinc-300">
            Based in {siteConfig.location}, working directly with clients across {siteConfig.serviceMarkets.join(', ')}.
          </p>
        </figcaption>
      ) : null}
    </figure>
  )
}
