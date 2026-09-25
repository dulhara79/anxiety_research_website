import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

export default function ArchitectureScene({ stages = [], motion }) {
  const root = useRef()
  const nodes = useMemo(() => stages.map((stage, index) => ({
    stage,
    position: [-3.5 + index * .88, ((index % 3) - 1) * .52, -index * .36],
  })), [stages])

  useFrame(() => {
    if (!root.current) return
    const progress = motion?.progress?.get?.() ?? .5
    root.current.position.x = (progress - .5) * -1.15
    root.current.position.z = (progress - .5) * .9
    root.current.rotation.y = (progress - .5) * .045
  })

  return <group ref={root} position={[.2,0,0]}>
    {nodes.map((node, index) => <group key={node.stage} position={node.position}>
      <mesh>
        <boxGeometry args={[.58,.42,.14]}/>
        <meshPhysicalMaterial {...glassMaterialProps(index === 5 ? spatialPalette.teal : index === 6 ? spatialPalette.cyan : spatialPalette.mist, index === 5 || index === 6 ? .34 : .2)}/>
      </mesh>
      <mesh position={[0,0,.09]}><circleGeometry args={[.035,16]}/><meshBasicMaterial color={index === 5 ? spatialPalette.teal : spatialPalette.ink} transparent opacity={.56}/></mesh>
    </group>)}
    {nodes.slice(0,-1).map((node,index) => <Line key={`edge-${node.stage}`} points={[node.position,nodes[index+1].position]} color={spatialPalette.teal} transparent opacity={.28} lineWidth={1}/>) }
    <Line points={[[2.55,-1.25,-2.9],[3.2,-1.48,-3.2],[3.65,-1.65,-3.45]]} color={spatialPalette.peach} transparent opacity={.48} lineWidth={1.15}/>
  </group>
}
