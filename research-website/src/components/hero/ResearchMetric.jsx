export default function ResearchMetric({ icon: Icon, value, label }) {
  return (
    <div className="research-metric liquid-glass-light">
      <span className="metric-icon" aria-hidden="true"><Icon size={15} strokeWidth={1.7} /></span>
      <span className="metric-copy">
        <strong>{value}</strong>
        <small>{label}</small>
      </span>
    </div>
  )
}
