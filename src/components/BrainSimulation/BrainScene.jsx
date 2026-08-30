import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import Brain from './Brain.jsx'
import ScanBeam from './ScanBeam.jsx'

function Loader() {
  return (
    <Html center>
      <span className="font-data text-xs text-signal/70">Loading holographic volume…</span>
    </Html>
  )
}

export default function BrainScene({ scanning = false, scanProgress = 0 }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#4ff3e0" />
      <pointLight position={[-3, -2, -3]} intensity={0.4} color="#8b7fff" />

      <Suspense fallback={<Loader />}>
        <Brain scanProgress={scanProgress} />
        <ScanBeam active={scanning} />
      </Suspense>
    </Canvas>
  )
}
