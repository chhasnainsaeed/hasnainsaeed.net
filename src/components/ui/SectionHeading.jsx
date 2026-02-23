export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[0.25em] text-orange-300/85">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-zinc-300 sm:text-lg">{description}</p> : null}
    </div>
  )
}
