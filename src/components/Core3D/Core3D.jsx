import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, OrbitControls, Icosahedron } from '@react-three/drei'
import { useInView } from 'framer-motion'
import styles from './Core3D.module.css'

function AdvancedCore() {
  const coreRef = useRef()
  const ringRef1 = useRef()
  const ringRef2 = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3
      coreRef.current.rotation.x = t * 0.1
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.2
      ringRef1.current.rotation.y = t * 0.1
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = t * -0.1
      ringRef2.current.rotation.y = t * 0.3
    }
  })

  return (
    <group>
      {/* Ambient data particles - reduced count for performance */}
      <Sparkles count={60} scale={5} size={1.5} speed={0.3} opacity={0.4} color="#38bdf8" />

      {/* Floating Interactive Core Structure */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={coreRef}>
          {/* Inner core - reduced detail */}
          <Icosahedron args={[1, 0]} scale={1}>
            <meshStandardMaterial 
              color="#0f172a" 
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.9}
            />
          </Icosahedron>

          {/* Outer wireframe - reduced detail */}
          <Icosahedron args={[1.2, 1]}>
            <meshStandardMaterial 
              color="#38bdf8" 
              wireframe={true} 
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </Icosahedron>
        </group>

        {/* Orbiting Data Rings - reduced geometry detail */}
        <group ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.8, 0.008, 8, 40]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
          </mesh>
          <mesh position={[1.8, 0, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
          </mesh>
        </group>

        <group ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <mesh>
            <torusGeometry args={[2.2, 0.008, 8, 40]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={1} />
          </mesh>
          <mesh position={[-2.2, 0, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2} />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export default function Core3D() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '200px' })

  return (
    <div className={styles.coreContainer} ref={containerRef}>
      {isInView && (
        <Canvas 
          camera={{ position: [0, 0, 6], fov: 45 }} 
          dpr={1} 
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={3} color="#a855f7" />
          <pointLight position={[10, -10, 10]} intensity={3} color="#38bdf8" />
          
          <AdvancedCore />
          
          {/* Allow users to click and drag the orb! */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.5} />
        </Canvas>
      )}

    </div>
  )
}
