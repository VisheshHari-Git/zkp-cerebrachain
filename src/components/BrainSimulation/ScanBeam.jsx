import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// A thin glowing plane that sweeps top-to-bottom through the brain volume
// while `active` is true, simulating an MRI scan pass.
export default function ScanBeam({ active }) {
  const beamRef = useRef()

  useFrame((state) => {
    if (!beamRef.current) return
    if (active) {
      beamRef.current.visible = true
      const t = (Math.sin(state.clock.elapsedTime * 1.1) + 1) / 2 // 0..1
      beamRef.current.position.y = -2.2 + t * 4.4
    } else {
      beamRef.current.visible = false
    }
  })

  return (
    <mesh ref={beamRef} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.2, 4.2]} />
      <meshBasicMaterial color="#4ff3e0" transparent opacity={0.15} />
    </mesh>
  )
}
