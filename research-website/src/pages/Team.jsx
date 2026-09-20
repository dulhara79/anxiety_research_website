import { people, supervisors } from '../data/research'

export default function Team() {
  return (
    <main className="internal shell">
      <header className="page-intro">
        <p className="eyebrow">Research team</p>
        <h1>People behind the framework.</h1>
        <p>
          Research ownership is shown by component so visitors can understand who is responsible for each stream without turning the page into a corporate staff directory.
        </p>
      </header>

      <section className="team-section">
        <div className="team-section-head">
          <span>01</span>
          <h2>Researchers</h2>
        </div>
        <div className="team-grid">
          {people.map(([name, id, focus], index) => (
            <article key={id}>
              <span className="person-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{id}</small>
                <h3>{name}</h3>
                <p>{focus}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-section supervision">
        <div className="team-section-head">
          <span>02</span>
          <h2>Supervision</h2>
        </div>
        <div className="team-grid">
          {supervisors.map(([name, role, affiliation], index) => (
            <article key={name}>
              <span className="person-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <small>{role}</small>
                <h3>{name}</h3>
                <p>{affiliation}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
