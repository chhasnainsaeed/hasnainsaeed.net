import ButtonLink from './ButtonLink'

export default function PackageCard({ pack }) {
  return (
    <article
      className={`premium-card relative flex h-full flex-col p-7 ${
        pack.popular ? 'border-orange-400/45 bg-orange-500/[0.08]' : ''
      }`}
    >
      {pack.popular ? (
        <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold text-black">
          Most Popular
        </span>
      ) : null}
      <h3 className="text-2xl font-semibold text-white">{pack.name}</h3>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">Best For</p>
      <p className="mt-1 text-sm text-zinc-200">{pack.idealFor}</p>
      <p className="mt-2 text-3xl font-bold text-gradient">{pack.price}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-400">{pack.pages}</p>
      <p className="mt-1 text-xs text-zinc-400">Timeline: {pack.timeline}</p>
      <ul className="mt-5 space-y-2 text-sm text-zinc-200">
        {pack.features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <ButtonLink to="/contact" className="mt-7 w-full text-center">
        Book Consultation
      </ButtonLink>
      <p className="mt-3 text-center text-xs text-zinc-400">No long-term lock-in. Clear scope before start.</p>
    </article>
  )
}
