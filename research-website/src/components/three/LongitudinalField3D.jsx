import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

const layerColors = [spatialPalette.teal, spatialPalette.cyan, spatialPalette.lavender, spatialPalette.mist]

export default function LongitudinalField3D({ quality, motion }) {
  const root = useRef()
  const layers = useRef([])
  const points = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    x: -3.2 + i * 0.39,
    y: Math.sin(i * 0.72) * 0.55 + ((i % 4) - 1.5) * 0.12,
    z: -0.6 - (i % 4) * 0.42,
    color: i === 14 ? spatialPalette.peach : layerColors[i % layerColors.length],
  })), [])
  const traces = useMemo(() => [0, 1, 2, 3].map((row) => Array.from({ length: 10 }, (_, i) => [
    -3.4 + i * 0.76,
    -0.7 + row * 0.42 + Math.sin(i * 0.8 + row) * 0.2,
    -0.35 - row * 0.48,
  ])), [])

  useFrame(() => {
    const progress = motion?.progress?.get?.() ?? 0.5
    if (root.current) {
      root.current.rotation.y = (progress - 0.5) * 0.08
      root.current.position.x = (progress - 0.5) * 0.22
    }
    layers.current.forEach((mesh, index) => {
      if (!mesh) return
      mesh.position.z = -0.55 - index * (0.35 + progress * 0.28)
      mesh.rotation.z = (index - 1.5) * 0.025 * (1 - progress)
    })
  })

  return <group ref={root} position={[0.45, 0.05, 0]}>
    {layerColors.map((color, index) => <mesh key={color} ref={(node) => { layers.current[index] = node }} position={[0.2 + index * 0.18, -0.15 + index * 0.12, -0.55 - index * 0.42]} rotation={[0.02, -0.08, 0]}>
      <planeGeometry args={[6.9, 2.5, 12, 5]}/>
      <meshPhysicalMaterial {...glassMaterialProps(color, 0.06 + index * 0.014)} side={THREE.DoubleSide}/>
    </mesh>)}
    {traces.map((trace, index) => <Line key={index} points={trace} color={layerColors[index]} transparent opacity={0.48 - index * 0.055} lineWidth={1.25}/>) }
    <Line points={Array.from({ length: 8 }, (_, i) => [-1.1 + i * 0.68, -0.95 + i * 0.11 + Math.sin(i) * 0.16, -0.7 - i * 0.09])} color={spatialPalette.peach} transparent opacity={0.68} lineWidth={1.35}/>
    {points.map((point, index) => <mesh key={index} position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[index % 5 === 0 ? 0.075 : 0.047, 14, 14]}/>
      <meshStandardMaterial color={point.color} transparent opacity={0.82}/>
    </mesh>)}
    {quality?.tier === 'high' && points.slice(0, 9).map((point, index) => <mesh key={`halo-${index}`} position={[point.x, point.y, point.z - 0.02]}>
      <ringGeometry args={[0.1, 0.115, 24]}/>
      <meshBasicMaterial color={point.color} transparent opacity={0.2} side={THREE.DoubleSide}/>
    </mesh>)}
  </group>
}
