import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

export default function HeroSpatialField({ quality, motion }) {
  const group = useRef()
  const particles = useMemo(() => {
    const count = Math.max(36, quality?.particles || 64)
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = 0.5 + Math.random() * 5.4
      data[i * 3 + 1] = -2.5 + Math.random() * 5
      data[i * 3 + 2] = -2 + Math.random() * 3.5
    }
    return data
  }, [quality?.particles])

  const curves = useMemo(() => [0, 1, 2, 3].map((row) => Array.from({ length: 9 }, (_, i) => {
    const x = -1.2 + i * 0.72
    return [x, -1.35 + row * 0.78 + Math.sin(i * 0.9 + row) * 0.22, -0.8 - row * 0.28 + Math.cos(i) * 0.08]
  })), [])

  useFrame(({ clock }) => {
    if (!group.current) return
    const px = motion?.pointer?.x?.get?.() || 0
    const py = motion?.pointer?.y?.get?.() || 0
    const t = quality?.animated ? clock.getElapsedTime() : 0
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.025, 0.035)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.018, 0.035)
    group.current.position.y = Math.sin(t * 0.18) * 0.04
  })

  return <group ref={group} position={[1.8, 0, 0]}>
    {curves.map((points, index) => <Line key={index} points={points} color={[spatialPalette.teal, spatialPalette.cyan, spatialPalette.lavender, spatialPalette.peach][index]} transparent opacity={0.34 - index * 0.035} lineWidth={1.1}/>) }
    {[0, 1, 2].map((index) => <mesh key={index} position={[1.2 + index * 1.25, 0.6 - index * 0.55, -1.3 - index * 0.4]} rotation={[0.2, -0.18 + index * 0.08, 0.06 * index]}>
      <planeGeometry args={[2.4, 1.15, 1, 1]}/>
      <meshPhysicalMaterial {...glassMaterialProps([spatialPalette.mist, spatialPalette.teal, spatialPalette.lavender][index], 0.075)} side={THREE.DoubleSide}/>
    </mesh>)}
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[particles, 3]}/></bufferGeometry>
      <pointsMaterial size={0.028} color={spatialPalette.cyan} transparent opacity={0.42} depthWrite={false}/>
    </points>
  </group>
}
