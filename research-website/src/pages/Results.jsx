import EvidenceLedger from '../components/EvidenceLedger'
import { evidenceRecords, unavailableEvidenceExample } from '../data/evidenceData'

export default function Results(){
  return (
    <main className="internal shell">
      <header className="page-intro"><p className="eyebrow">EVIDENCE</p><h1>Evidence with provenance, setting and limitation.</h1><p>The page intentionally avoids a leaderboard-style display. The question is not only what number was obtained, but under what evaluation and whether it is eligible to influence the current system.</p></header>
      <EvidenceLedger records={[...evidenceRecords, unavailableEvidenceExample]}/>
      <section className="evidence-callout"><p className="eyebrow">CURRENT VALIDATION GATE</p><h2>C2 is experimental / excluded from active fusion.</h2><p>The final GLOBEM GATv2 result was not distinguishable from chance under the project’s held-out evaluation. Its current active fusion weight is <strong>0.0</strong>.</p></section>
    </main>
  )
}
