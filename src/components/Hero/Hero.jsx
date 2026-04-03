import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiMapPin, FiBriefcase } from 'react-icons/fi'
import Hero3D from '../Hero3D/Hero3D'
import styles from './Hero.module.css'

export default function Hero() {
  const subtitleText = "Artificial Intelligence Engineer | Frontend Developer | Tech Explorer"

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.4 }
    }
  }

  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" }
  }

  return (
    <section id="home" className={styles.hero}>
      {/* 3D background halo - moved to be a decorative side element for a classy look */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', right: '5%', top: '0', zIndex: 0, opacity: 0.8 }}>
        <Hero3D />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Text block contents... */}
          <motion.p 
            className={styles.greeting}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hi! I'm
          </motion.p>
          
          <motion.h1 
            className={styles.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ANKIT YADAV
          </motion.h1>

          <motion.h2 
            className={styles.subtitle}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitleText.split("").map((char, index) => (
              <motion.span key={index} variants={charVariants}>{char}</motion.span>
            ))}
          </motion.h2>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            Creating AI-powered solutions. Building modern web experiences.<br/>
            Solving real-world problems with technology.
          </motion.p>

          <motion.div 
            className={styles.pills}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.7 }}
          >
            <span className={styles.pill}>AI Enthusiast</span>
            <span className={styles.pill}>Machine Learning Engineer</span>
            <span className={styles.pill}>Deep Learning Expert</span>
            <span className={styles.pill}>Computer Vision Researcher</span>
            <span className={styles.pill}>Developer</span>
          </motion.div>

          <motion.div 
            className={styles.infoCards}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.9 }}
          >
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}><FiMapPin color="#ef4444" /> <span className={styles.cardLabel}>Location</span></div>
              <p className={styles.cardValue}>Patna, Bihar</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}><FiBriefcase color="#a855f7" /> <span className={styles.cardLabel}>Expertise</span></div>
              <p className={styles.cardValue}>AI/ML, Problem Solving</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📞 <span className={styles.cardLabel}>Contact</span></div>
              <p className={styles.cardValue}>ankitkryadav6672@gmail.com</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.socialSections}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.1 }}
          >
            <div className={styles.socialGroup}>
              <span className={styles.socialLabel}>Connect with me</span>
              <div className={styles.socialIcons}>
                <a href="https://www.linkedin.com/in/ankit-kumar-baa77a285/" target="_blank" rel="noreferrer"><FiLinkedin size={24} /></a>
                <a href="mailto:ankitkryadav6672@gmail.com"><FiMail size={24} /></a>
                <a href="https://www.instagram.com/anxit_yadv/" target="_blank" rel="noreferrer"><FiInstagram size={24} /></a>
              </div>
            </div>
            
            <div className={styles.socialGroup}>
              <span className={styles.socialLabel}>See what I'm doing</span>
              <div className={styles.socialIcons}>
                <a href="https://github.com/Dev-anxit" target="_blank" rel="noreferrer"><FiGithub size={24} /></a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageBlock}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <img
            src={`/profile.png?v=${Date.now()}`}
            alt="Ankit Yadav"
            className={styles.avatarImg}
            style={{ position: 'relative', zIndex: 1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
