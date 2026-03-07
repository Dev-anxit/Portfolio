import styles from './MeshBackground.module.css'

export default function MeshBackground() {
  return (
    <div className={styles.meshWrap} aria-hidden="true">
      {/* Starfield */}
      <div className={styles.stars} />
      <div className={styles.stars2} />
      <div className={styles.stars3} />

      {/* Aurora waves */}
      <div className={styles.aurora}>
        <div className={styles.auroraWave1} />
        <div className={styles.auroraWave2} />
        <div className={styles.auroraWave3} />
      </div>

      {/* Floating orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Subtle noise texture */}
      <div className={styles.noise} />
    </div>
  )
}
