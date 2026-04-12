import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import styles from './ParticleBackground.module.css'

function ParticleField(props) {
  const ref = useRef()
  // Create an array of random points
  const sphere = useMemo(() => random.inSphere(new Float32Array(2000 * 3), { radius: 12 }), [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta / 20
      ref.current.rotation.y += delta / 30
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 3]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  )
}

export default function ParticleBackground() {
  return (
    <div className={styles.particleContainer}>
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 8], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
