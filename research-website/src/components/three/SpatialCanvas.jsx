import { Canvas } from '@react-three/fiber'

export default function SpatialCanvas({ children, className = '', camera = { position: [0, 0, 6], fov: 40 }, quality, pointerParallax = false, onReady }) {
  return <Canvas
    className={`spatial-canvas ${className}`.trim()}
    dpr={quality?.dpr || 1}
    camera={camera}
    frameloop={quality?.animated ? 'always' : 'demand'}
    gl={{ alpha: true, antialias: quality?.tier !== 'low', powerPreference: 'high-performance' }}
    onCreated={({ gl }) => {
      gl.setClearColor(0x000000, 0)
      onReady?.()
    }}
    data-pointer-parallax={pointerParallax ? 'true' : 'false'}
  >
    <ambientLight intensity={1.1}/>
    <hemisphereLight intensity={1.15} color="#f8fbfa" groundColor="#a8c9c5"/>
    <directionalLight position={[4, 6, 8]} intensity={1.7} color="#ffffff"/>
    <directionalLight position={[-5, -2, 4]} intensity={0.6} color="#c7d9ec"/>
    {children}
  </Canvas>
}
