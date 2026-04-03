import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import styles from './NeuralMesh.module.css'

function Starfield(props) {
  const ref = useRef()
  const sphere = random.inSphere(new Float32Array(1500), { radius: 10 }) // Increased radius to cover screen

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#38bdf8"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  )
}

export default function NeuralMesh() {
  return (
    <div className={styles.meshContainer}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Starfield />
      </Canvas>
    </div>
  )
}
