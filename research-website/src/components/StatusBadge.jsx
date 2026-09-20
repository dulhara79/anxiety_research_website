export default function StatusBadge({ status, label }) {
  return <span className="status-badge" data-status={status}>{label}</span>
}
