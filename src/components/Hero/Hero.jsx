import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowDownCircle } from 'react-icons/fi'
import styles from './Hero.module.css'

const roles = [
  'Full Stack Developer',
  'AI / ML Enthusiast',
  'Robotics Builder',
  'Open Source Contributor',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.textBlock}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className={styles.greeting}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Ankit Kumar
          </motion.h1>

          <motion.div
            className={styles.roleWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                className={styles.title}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.5 }}
              >
                {roles[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            CSE Undergraduate passionate about building AI-powered web apps,
            competitive robotics, and open-source projects.
          </motion.p>

          <motion.div
            className={styles.cta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <a href="#projects" className="btn-primary">
              View My Work
            </a>
            {/* Resume download */}
            <a
              href="/Ankit-Resume.pdf"
              download="Ankit_Kumar_Resume.pdf"
              className="btn-outline"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <a
              href="https://github.com/Dev-anxit"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="GitHub"
            >
              <FiGithub size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/ankit-kumar-baa77a285/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="LinkedIn"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/anxit_yadv/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <FiInstagram size={22} />
            </a>
            <a
              href="mailto:ankitkryadav6672@gmail.com"
              className={styles.socialIcon}
              aria-label="Email"
            >
              <FiMail size={22} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.imageBlock}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarGlow} />
            <img
              src="https://avatars.githubusercontent.com/u/137592934?v=4"
              alt="Ankit Kumar"
              className={styles.avatarImg}
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className={styles.scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
      >
        <FiArrowDownCircle size={28} />
      </motion.a>
    </section>
  )
}
