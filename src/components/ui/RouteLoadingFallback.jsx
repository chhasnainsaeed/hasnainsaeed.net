export default function RouteLoadingFallback() {
  return (
    <section className="section-pad py-16 sm:py-20">
      <div className="section-wrap">
        <div className="premium-card p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Loading</p>
          <p className="mt-3 text-sm text-zinc-300">Preparing the next page...</p>
        </div>
      </div>
    </section>
  )
}
