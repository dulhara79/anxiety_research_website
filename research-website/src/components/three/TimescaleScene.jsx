import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

const planes = [
  { key: 'NOW', z: 0.2, color: spatialPalette.teal },
  { key: 'DAYS / WEEKS', z: -0.9, color: spatialPalette.cyan },
  { key: 'CLINICAL ENCOUNTERS', z: -2, color: spatialPalette.lavender },
  { key: 'BACKGROUND', z: -3.1, color: spatialPalette.peach },
]

export default function TimescaleScene({ motion }) {
  const group = useRef()

  useFrame(() => {
    if (!group.current) return
    const progress = motion?.progress?.get?.() ?? 0.5
    group.current.position.z = (progress - 0.45) * 1.25
    group.current.rotation.y = (progress - 0.5) * 0.055
  })

  return <group ref={group} position={[0.6, 0, 0]}>
    {planes.map((plane, index) => <group key={plane.key} position={[index * 0.32 - 0.5, (1.5 - index) * 0.23, plane.z]}>
      <mesh rotation={[0.04, -0.12, 0]}>
        <planeGeometry args={[5.8 - index * 0.35, 1.3, 1, 1]}/>
        <meshPhysicalMaterial {...glassMaterialProps(plane.color, 0.1)} side={THREE.DoubleSide}/>
      </mesh>
      {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[-2.2 + i * 0.72, Math.sin(i + index) * 0.18, 0.06]}>
        <sphereGeometry args={[0.04 + (i % 3) * 0.008, 12, 12]}/>
        <meshStandardMaterial color={plane.color} transparent opacity={0.6}/>
      </mesh>)}
    </group>)}
  </group>
}
