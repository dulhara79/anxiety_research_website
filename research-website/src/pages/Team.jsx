import { people, supervisors } from '../data/teamData'

export default function Team(){
  return (
    <main className="internal shell">
      <header className="page-intro"><p className="eyebrow">TEAM</p><h1>Research ownership should be visible.</h1><p>Each researcher is connected to the stream they are responsible for; supervision remains separate.</p></header>
      <section className="people-section"><h2>Researchers</h2><div className="people-grid">{people.map((p,i)=><article key={p.id}><span>{String(i+1).padStart(2,'0')}</span><small>{p.id}</small><h3>{p.name}</h3><p>{p.focus}</p></article>)}</div></section>
      <section className="people-section"><h2>Supervision</h2><div className="people-grid">{supervisors.map((p,i)=><article key={p.name}><span>{String(i+1).padStart(2,'0')}</span><small>{p.role}</small><h3>{p.name}</h3><p>{p.affiliation}</p></article>)}</div></section>
    </main>
  )
}
