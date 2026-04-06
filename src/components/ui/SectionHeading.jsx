export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-[52rem]">
      {eyebrow ? <p className="mb-3 text-xs uppercase tracking-[0.25em] text-orange-300/85">{eyebrow}</p> : null}
      <h2 className="max-w-[20ch] text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.75rem]">{title}</h2>
      {description ? <p className="mt-4 max-w-[62ch] text-base leading-7 text-zinc-300 sm:text-lg">{description}</p> : null}
    </div>
  )
}
