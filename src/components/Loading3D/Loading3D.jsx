import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, TorusKnot } from '@react-three/drei'
import styles from './Loading3D.module.css'

function AdvancedLoader() {
  const knotRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.5
      knotRef.current.rotation.y = t * 0.8
    }
  })

  return (
    <group>
      {/* Hyper-speed data particles effect - reduced for performance */}
      <Sparkles count={150} scale={10} size={2} speed={1.5} opacity={0.6} color="#00f0ff" />
      <Sparkles count={80} scale={7} size={4} speed={0.8} opacity={0.4} color="#a855f7" />

      <Float speed={4} rotationIntensity={2} floatIntensity={2}>
        {/* Intricate core - reduced detail (100, 16 instead of 200, 32) */}
        <TorusKnot ref={knotRef} args={[1.5, 0.4, 100, 16]} scale={1}>
          <meshStandardMaterial 
            color="#0f172a" 
            wireframe={true} 
            emissive="#00f0ff"
            emissiveIntensity={2}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </TorusKnot>

        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7" 
            emissiveIntensity={1.5} 
            transparent 
            opacity={0.85} 
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function Loading3D() {
  return (
    <div className={styles.loadingContainer}>
      <Canvas 
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, 0, -10]} intensity={4} color="#a855f7" />
        <pointLight position={[10, -5, 10]} intensity={4} color="#00f0ff" />
        <AdvancedLoader />
      </Canvas>
    </div>
  )
}

