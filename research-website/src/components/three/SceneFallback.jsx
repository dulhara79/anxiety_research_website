const dots = Array.from({ length: 9 }, (_, i) => i)

export default function SceneFallback({ variant = 'context', className = '' }) {
  if (variant === 'context') {
    return <div className={`spatial-fallback spatial-fallback--context ${className}`.trim()} aria-hidden="true">
      <img className="context-longitudinal-art context-wave-path" src="/media/context-longitudinal-field.svg" alt="" loading="lazy" decoding="async"/>
    </div>
  }

  return <div className={`spatial-fallback spatial-fallback--${variant} ${className}`.trim()} aria-hidden="true">
    <div className="fallback-field">
      <i/><i/><i/>
      {dots.map((dot) => <span key={dot} style={{ '--dot': dot }}/>) }
    </div>
  </div>
}
