import { researchStates } from '../../data/research'

const keys = ['overview', 'c1', 'c2', 'c3', 'c4']

export default function ResearchStateNav({ activeKey, onSelect, disabled }) {
  return (
    <nav className="experience-state-nav" aria-label="Research stages">
      {keys.map((key) => {
        const state = researchStates[key]
        const active = key === activeKey
        return (
          <button
            key={key}
            type="button"
            className={active ? 'state-nav-item active' : 'state-nav-item'}
            onClick={() => onSelect(key)}
            disabled={disabled}
            aria-current={active ? 'step' : undefined}
          >
            <span>{state.id}</span><strong>{state.shortName}</strong>
          </button>
        )
      })}
    </nav>
  )
}
