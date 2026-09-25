import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

function PhysiologyGeometry({ animated }) {
  const group = useRef()
  const points = useMemo(() => Array.from({ length: 32 }, (_, i) => {
    const x = -2.4 + i * 0.155
    const y = Math.sin(i * 0.72) * 0.28 + Math.sin(i * 0.19) * 0.12
    return [x, y, 0]
  }), [])
  useFrame(({ clock }) => {
    if (group.current && animated) group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.35) * 0.025
  })
  return <group ref={group}><Line points={points} color={spatialPalette.teal} transparent opacity={0.75} lineWidth={1.6}/><Line points={points.map(([x,y,z]) => [x,y * 0.55 - 0.45,z - 0.35])} color={spatialPalette.cyan} transparent opacity={0.42} lineWidth={1.1}/></group>
}

function BehaviourGeometry({ animated }) {
  const group = useRef()
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, i) => [
    -2 + (i % 6) * 0.78,
    -1 + Math.floor(i / 6) * 0.86 + Math.sin(i) * 0.14,
    -0.3 - (i % 4) * 0.18,
  ]), [])
  useFrame(({ clock }) => {
    if (group.current && animated) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.04
  })
  return <group ref={group}>{nodes.map((node, i) => <mesh key={i} position={node}><sphereGeometry args={[0.055,12,12]}/><meshStandardMaterial color={i % 4 === 0 ? spatialPalette.lavender : spatialPalette.cyan} transparent opacity={0.75}/></mesh>)}{[0,1,2].map((row) => <Line key={row} points={nodes.slice(row * 6, row * 6 + 6)} color={spatialPalette.mist} transparent opacity={0.28} lineWidth={1}/>)}</group>
}

function ClinicalGeometry({ animated }) {
  const group = useRef()
  useFrame(({ clock }) => {
    if (group.current && animated) group.current.position.y = Math.sin(clock.getElapsedTime() * 0.28) * 0.035
  })
  return <group ref={group}>{Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[-0.2 + (i % 2) * 0.45, 1.25 - i * 0.34, -0.12 * i]} rotation={[0.02, -0.08, (i % 3 - 1) * 0.015]}><planeGeometry args={[3.8 - (i % 3) * 0.45, 0.15]}/><meshPhysicalMaterial {...glassMaterialProps(i % 3 === 0 ? spatialPalette.lavender : spatialPalette.mist, 0.22)}/></mesh>)}</group>
}

function ContextGeometry({ animated }) {
  const group = useRef()
  useFrame(({ clock }) => {
    if (group.current && animated) group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.16) * 0.025
  })
  return <group ref={group}>{[0,1,2,3].map((i) => <mesh key={i} position={[0.15 * i, (i - 1.5) * 0.35, -i * 0.42]} rotation={[0.08, -0.14, 0.04 * (i - 1.5)]}><planeGeometry args={[4.6 - i * 0.35, 1.05]}/><meshPhysicalMaterial {...glassMaterialProps([spatialPalette.teal,spatialPalette.mist,spatialPalette.lavender,spatialPalette.peach][i], 0.11)}/></mesh>)}</group>
}

export default function ModalityScene({ type = 'context', quality }) {
  const animated = Boolean(quality?.animated)
  if (type === 'physiology') return <PhysiologyGeometry animated={animated}/>
  if (type === 'behaviour') return <BehaviourGeometry animated={animated}/>
  if (type === 'clinical') return <ClinicalGeometry animated={animated}/>
  return <ContextGeometry animated={animated}/>
}
