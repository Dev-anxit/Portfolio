import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, MeshTransmissionMaterial, Float, OrbitControls } from '@react-three/drei'
import { useInView } from 'framer-motion'
import * as THREE from 'three'

function PulsingCore() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]}>
      <meshStandardMaterial 
        color="#38bdf8" 
        emissive="#38bdf8" 
        emissiveIntensity={4} 
        toneMapped={false}
      />
    </Sphere>
  )
}

function GlassShell() {
  const meshRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4
      meshRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.9, 1]} />
      <meshPhysicalMaterial
        roughness={0.1}
        transmission={0.9}
        thickness={0.5}
        transparent
        opacity={0.3}
        color="#ffffff"
        emissive="#38bdf8"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export default function Chat3D() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '200px' })

  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none', background: 'transparent' }} ref={containerRef}>
      {isInView && (
        <Canvas 
          camera={{ position: [0, 0, 3], fov: 40 }} 
          dpr={1} 
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#a855f7" />
          <Float speed={4} rotationIntensity={1} floatIntensity={1}>
            <PulsingCore />
            <GlassShell />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      )}

    </div>
  )
}
