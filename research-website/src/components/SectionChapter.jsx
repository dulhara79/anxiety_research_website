export default function SectionChapter({ index, label, title, children, className = '' }) {
  return (
    <header className={'section-chapter ' + className}>
      <div className="chapter-index">{index}</div>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </header>
  )
}
