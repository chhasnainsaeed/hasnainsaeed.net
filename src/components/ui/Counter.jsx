export default function Counter({ value, suffix = '' }) {
  return (
    <span className="text-3xl font-bold text-white sm:text-4xl">
      {value}
      {suffix}
    </span>
  )
}
