export const spatialPalette = {
  pearl: '#f3f6f4',
  teal: '#78b7b5',
  cyan: '#8cc9d3',
  mist: '#b7d2de',
  lavender: '#b8b4dd',
  peach: '#e3a487',
  ink: '#10201f',
}

export const glassMaterialProps = (color = spatialPalette.teal, opacity = 0.3) => ({
  color,
  transparent: true,
  opacity,
  roughness: 0.58,
  metalness: 0,
  depthWrite: false,
})
