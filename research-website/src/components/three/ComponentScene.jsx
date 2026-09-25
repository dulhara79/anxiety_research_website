import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import ModalityScene from './ModalityScene'
import { spatialPalette, glassMaterialProps } from './spatialMaterials'

const variants = { C1: 'physiology', C2: 'behaviour', C3: 'clinical', C4: 'context' }

function FusionCore({ animated }) {
  const group = useRef()
  useFrame(({ clock }) => {
    if (group.current && animated) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.05
  })
  return <group ref={group}>
    {[[-1.8,.9,spatialPalette.teal],[-1.8,.3,spatialPalette.cyan],[-1.8,-.3,spatialPalette.lavender],[-1.8,-.9,spatialPalette.peach]].map(([x,y,color],i) => <mesh key={i} position={[x,y,-i*.12]}><sphereGeometry args={[.09,16,16]}/><meshStandardMaterial color={color} transparent opacity={.72}/></mesh>)}
    <mesh position={[.75,0,-.5]}><icosahedronGeometry args={[.62,2]}/><meshPhysicalMaterial {...glassMaterialProps(spatialPalette.teal,.2)}/></mesh>
    <mesh position={[-.2,0,-.25]}><boxGeometry args={[.12,2.4,.12]}/><meshStandardMaterial color={spatialPalette.mist} transparent opacity={.32}/></mesh>
  </group>
}

export default function ComponentScene({ componentId = 'C1', quality }) {
  if (componentId === 'C4') return <FusionCore animated={Boolean(quality?.animated)}/>
  return <ModalityScene type={variants[componentId] || 'context'} quality={quality}/>
}
