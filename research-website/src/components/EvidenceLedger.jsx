import StatusBadge from './StatusBadge'

export default function EvidenceLedger({ records }) {
  return (
    <div className="evidence-ledger">
      <div className="evidence-ledger-head"><span>Component</span><span>Measure / setting</span><span>Result</span><span>Interpretation</span></div>
      {records.map((record, index) => {
        const unavailable = record.status === 'unavailable' || record.value == null
        return (
          <article className="evidence-ledger-row" key={record.component + record.metric + index} data-status={record.status}>
            <span className="evidence-component">{record.component}</span>
            <div><strong>{record.metric}</strong><small>{record.context}</small></div>
            <b>{unavailable ? 'Unavailable' : record.value}</b>
            <div className="evidence-interpretation">
              <StatusBadge status={record.status} label={record.status === 'experimental' ? 'EXPERIMENTAL / EXCLUDED' : record.status.toUpperCase()} />
              <p>{record.note}</p>
              {record.limitation && <em>{record.limitation}</em>}
            </div>
          </article>
        )
      })}
    </div>
  )
}
