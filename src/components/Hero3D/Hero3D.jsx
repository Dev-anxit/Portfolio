import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useInView } from 'framer-motion'
import styles from './Hero3D.module.css'

function FloatingCrystal() {
  const meshRef = useRef()
  
  // Detail reduced for performance
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 3), [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) / 4
      meshRef.current.rotation.y = Math.sin(t / 4) / 4
      meshRef.current.rotation.z = Math.sin(t / 4) / 4
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={1}
          iridescence={0.5}
          roughness={0.15}
          transmission={1}
          ior={1.15}
          color="#ffffff"
          emissive="#a855f7"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Inner subtle glow for AI accent */}
      <mesh scale={0.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#38bdf8" 
          emissiveIntensity={2} 
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2, 0.05)
    state.camera.lookAt(0, 0, 0)
  })
}

export default function Hero3D() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { margin: '200px' })

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      {isInView && (
        <Canvas dpr={1}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={2} />
          
          <FloatingCrystal />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          
          <Rig />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      )}
    </div>
  )
}
