// Schematic of C2's graph: one node per (day, segment) cell, with edges between
// adjacent segments within a day and the same segment on consecutive days.
const SEGMENTS = ["Morning", "Afternoon", "Evening", "Night"];
const DAYS = 7;
const X0 = 86;
const Y0 = 44;
const DX = 74;
const DY = 46;

const x = (d) => X0 + d * DX;
const y = (s) => Y0 + s * DY;

export default function GraphDiagram() {
  const within = [];
  const across = [];
  for (let d = 0; d < DAYS; d++) {
    for (let s = 0; s < SEGMENTS.length; s++) {
      if (s < SEGMENTS.length - 1) within.push([d, s]);
      if (d < DAYS - 1) across.push([d, s]);
    }
  }

  return (
    <figure className="graph-diagram">
      <svg
        viewBox="0 0 640 250"
        role="img"
        aria-label="Graph of daily time segments: each node is one day and segment, connected to the next segment in the same day and to the same segment on the next day."
      >
        {SEGMENTS.map((label, s) => (
          <text key={label} className="gd-label" x="8" y={y(s) + 4}>
            {label}
          </text>
        ))}
        {Array.from({ length: DAYS }, (_, d) => (
          <text key={d} className="gd-day" x={x(d)} y="18" textAnchor="middle">
            Day {d + 1}
          </text>
        ))}
        {within.map(([d, s]) => (
          <line
            key={`w${d}-${s}`}
            className="gd-edge gd-edge--within"
            x1={x(d)} y1={y(s)} x2={x(d)} y2={y(s + 1)}
          />
        ))}
        {across.map(([d, s]) => (
          <line
            key={`a${d}-${s}`}
            className="gd-edge gd-edge--across"
            x1={x(d)} y1={y(s)} x2={x(d + 1)} y2={y(s)}
          />
        ))}
        {Array.from({ length: DAYS }, (_, d) =>
          SEGMENTS.map((_, s) => (
            <circle key={`n${d}-${s}`} className="gd-node" cx={x(d)} cy={y(s)} r="7" />
          ))
        )}
        <text className="gd-more" x="610" y={y(1.5) + 4} textAnchor="middle">
          … 28 days
        </text>
      </svg>
      <figcaption>
        <span className="gd-key gd-key--within" /> Adjacent segments within a day
        <span className="gd-key gd-key--across" /> Same segment, consecutive days
        <span className="gd-note">
          Each node carries 80 features: 40 behavioural values + 40 missingness indicators.
        </span>
      </figcaption>
    </figure>
  );
}
