import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

const states = [
  { name: 'strong', y: 1.15, color: spatialPalette.teal, end: 2.2, opacity: .78 },
  { name: 'stale', y: .58, color: spatialPalette.cyan, end: 2.05, opacity: .45 },
  { name: 'incomplete', y: 0, color: spatialPalette.lavender, end: 1.9, opacity: .38 },
  { name: 'unavailable', y: -.58, color: spatialPalette.mist, end: -.15, opacity: .28 },
  { name: 'excluded', y: -1.15, color: spatialPalette.peach, end: -.15, opacity: .52 },
]

export default function FusionScene({ quality, motion }) {
  const root = useRef()
  const paths = useMemo(() => states.map((state) => {
    const stops = state.name === 'strong' || state.name === 'stale' || state.name === 'incomplete'
      ? [[-3,state.y,0],[-1.1,state.y*.75,-.15],[.15,state.y*.35,-.28],[state.end,0,-.48]]
      : [[-3,state.y,0],[-1.15,state.y*.92,-.08],[state.end,state.y*.88,-.12]]
    return { ...state, points: stops }
  }), [])

  useFrame(() => {
    if (!root.current) return
    const progress = motion?.progress?.get?.() ?? .5
    root.current.rotation.y = (progress - .5) * .07
    root.current.position.x = (progress - .5) * .15
  })

  return <group ref={root}>
    {paths.map((path) => <group key={path.name}>
      <Line points={path.points} color={path.color} transparent opacity={path.opacity} lineWidth={path.name === 'excluded' ? 1.1 : 1.5}/>
      <mesh position={[-3,path.y,0]}><sphereGeometry args={[.09,14,14]}/><meshStandardMaterial color={path.color} transparent opacity={path.opacity}/></mesh>
    </group>)}
    <mesh position={[-.55,0,-.18]}><boxGeometry args={[.11,3.1,.28]}/><meshPhysicalMaterial {...glassMaterialProps(spatialPalette.mist,.18)}/></mesh>
    <mesh position={[2.3,0,-.52]}><icosahedronGeometry args={[.58,2]}/><meshPhysicalMaterial {...glassMaterialProps(spatialPalette.teal,.25)}/></mesh>
    {quality?.tier === 'high' && <mesh position={[2.3,0,-.55]}><sphereGeometry args={[.86,28,28]}/><meshBasicMaterial color={spatialPalette.cyan} transparent opacity={.035} depthWrite={false}/></mesh>}
  </group>
}
