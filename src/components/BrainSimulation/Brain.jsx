import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
 * Procedural holographic brain.
 *
 * This is a visual simulation for the hackathon prototype.
 * It does NOT represent a real anatomical MRI reconstruction.
 */

function generateHemispherePoints(count = 2400) {
  const points = new Float32Array(count * 3)

  let seed = 42

  // Deterministic pseudo-random generator so the shape is stable across renders
  function random() {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  for (let i = 0; i < count; i++) {
    const hemisphere = i % 2 === 0 ? -1 : 1

    const theta = random() * Math.PI * 2
    const phi = Math.acos(2 * random() - 1)

    // Ellipsoid base
    let x = Math.sin(phi) * Math.cos(theta)
    let y = Math.cos(phi)
    let z = Math.sin(phi) * Math.sin(theta)

    // Brain-like proportions
    x *= 1.35
    y *= 1.05
    z *= 1.12

    // Separate left/right hemispheres
    x = hemisphere * (Math.abs(x) * 0.82 + 0.12)

    /*
     * Cortical folds — multiple overlapping sine waves produce
     * irregular gyri/sulci-like surface structure.
     */
    const fold1 = Math.sin(theta * 7.0 + phi * 4.0)
    const fold2 = Math.sin(theta * 13.0 - phi * 6.0)
    const fold3 = Math.cos(theta * 5.0 + phi * 9.0)

    const folds = 1 + 0.055 * fold1 + 0.035 * fold2 + 0.025 * fold3

    x *= folds
    y *= folds
    z *= folds

    // Flatten underside slightly
    if (y < -0.25) {
      y *= 0.88
    }

    // Central longitudinal fissure
    const fissure = Math.max(0, 1 - Math.abs(x) / 0.34)
    x += hemisphere * fissure * 0.08

    // Slight organic asymmetry
    z += Math.sin(y * 4 + theta) * 0.025

    const i3 = i * 3
    points[i3] = x
    points[i3 + 1] = y
    points[i3 + 2] = z
  }

  return points
}

function generateCorticalThreads(count = 650) {
  const points = new Float32Array(count * 3)

  let seed = 777

  function random() {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  for (let i = 0; i < count; i++) {
    const hemisphere = i % 2 === 0 ? -1 : 1

    const theta = random() * Math.PI * 2
    let y = random() * 2 - 1

    const width = Math.sqrt(Math.max(0, 1 - y * y))

    let x = Math.cos(theta) * width
    let z = Math.sin(theta) * width

    x *= 1.35
    y *= 1.05
    z *= 1.12

    x = hemisphere * (Math.abs(x) * 0.82 + 0.12)

    const depth = 0.03 + random() * 0.09
    x += x > 0 ? depth : -depth
    z += depth * Math.sin(theta * 4)

    const i3 = i * 3
    points[i3] = x
    points[i3 + 1] = y
    points[i3 + 2] = z
  }

  return points
}

function TumorCluster({ scanProgress = 0 }) {
  const tumorRef = useRef()
  const glowRef = useRef()

  const tumorPoints = useMemo(() => {
    const count = 180
    const points = new Float32Array(count * 3)

    let seed = 91
    function random() {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    // Simulated lesion position — intentionally exaggerated for visualization.
    const center = new THREE.Vector3(0.42, 0.18, 0.28)

    for (let i = 0; i < count; i++) {
      const radius = Math.pow(random(), 0.45) * 0.22
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      const x = center.x + Math.sin(phi) * Math.cos(theta) * radius
      const y = center.y + Math.cos(phi) * radius * 0.85
      const z = center.z + Math.sin(phi) * Math.sin(theta) * radius

      const i3 = i * 3
      points[i3] = x
      points[i3 + 1] = y
      points[i3 + 2] = z
    }

    return points
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (tumorRef.current) {
      const pulse = 1 + Math.sin(time * 3.2) * 0.08
      tumorRef.current.scale.setScalar(pulse)
      tumorRef.current.rotation.y += 0.003
    }

    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.07 + Math.sin(time * 2.5) * 0.025 + scanProgress * 0.0015
    }
  })

  return (
    <group>
      {/* Tumor particle cluster */}
      <points ref={tumorRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={tumorPoints.length / 3}
            array={tumorPoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff5c8a"
          size={0.045}
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Tumor glow */}
      <mesh ref={glowRef} position={[0.42, 0.18, 0.28]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial
          color="#ff3f78"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

export default function Brain({ scanProgress = 0 }) {
  const groupRef = useRef()
  const particlesRef = useRef()
  const threadsRef = useRef()
  const materialRef = useRef()
  const threadMaterialRef = useRef()

  const positions = useMemo(() => generateHemispherePoints(3000), [])
  const threadPositions = useMemo(() => generateCorticalThreads(850), [])

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      // Slow holographic rotation
      groupRef.current.rotation.y += delta * 0.12
      // Floating effect
      groupRef.current.position.y = Math.sin(time * 0.7) * 0.055

      // Gentle mouse parallax
      const targetX = state.pointer.y * 0.12
      const targetZ = state.pointer.x * 0.12
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.025
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.025
    }

    if (materialRef.current) {
      const pulse = 0.72 + Math.sin(time * 2.0) * 0.16
      materialRef.current.size = 0.026 * pulse
      materialRef.current.opacity = 0.72 + Math.sin(time * 1.3) * 0.12
    }

    if (threadMaterialRef.current) {
      threadMaterialRef.current.opacity = 0.24 + Math.sin(time * 1.7) * 0.05
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = Math.sin(time * 0.25) * 0.015
    }

    if (threadsRef.current) {
      threadsRef.current.rotation.y = Math.sin(time * 0.2) * 0.018
    }
  })

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Main holographic neural cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color="#4ff3e0"
          size={0.026}
          sizeAttenuation
          transparent
          opacity={0.78}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Cortical thread layer */}
      <points ref={threadsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={threadPositions.length / 3}
            array={threadPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={threadMaterialRef}
          color="#8b7fff"
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.25}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Outer holographic brain boundary */}
      <mesh scale={[1.02, 0.94, 0.98]}>
        <sphereGeometry args={[1.38, 32, 20]} />
        <meshBasicMaterial color="#4ff3e0" wireframe transparent opacity={0.045} depthWrite={false} />
      </mesh>

      {/* Simulated tumor / lesion */}
      <TumorCluster scanProgress={scanProgress} />

      {/* Verification core */}
      <mesh scale={0.28}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#8b7fff"
          transparent
          opacity={0.025 + scanProgress * 0.001}
          wireframe
        />
      </mesh>
    </group>
  )
}
