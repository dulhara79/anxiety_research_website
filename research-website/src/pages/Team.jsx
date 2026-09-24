import { people, supervisors } from '../data/research'

function Directory({title,items}){return <section className="people-directory"><h2>{title}</h2>{items.map(([name,idOrRole,focus])=><article key={`${name}-${idOrRole}`}><span>{idOrRole}</span><h3>{name}</h3><p>{focus}</p></article>)}</section>}
export default function Team(){return <main className="internal-page paper-page"><header className="page-hero shell-wide paper-hero"><p className="eyebrow">06 / PEOPLE</p><h1>Research team</h1><p>Identity is carried through typography and research responsibility. No generated or stock portraits are used.</p></header><div className="shell-wide people-layout"><Directory title="Researchers" items={people}/><Directory title="Supervision" items={supervisors}/></div></main>}
