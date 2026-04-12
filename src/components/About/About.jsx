import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiLayers, FiZap, FiCpu, FiAward, FiTrendingUp } from 'react-icons/fi'
import Core3D from '../Core3D/Core3D'
import styles from './About.module.css'

const highlights = [
  { icon: <FiCode size={24} />, title: 'Clean Code', desc: 'Writing maintainable, scalable code that follows best practices', color: '#34d399' },
  { icon: <FiLayers size={24} />, title: 'Full Stack', desc: 'Frontend to backend — React, Flask, Node.js & more', color: '#22d3ee' },
  { icon: <FiCpu size={24} />, title: 'Security / AI', desc: 'Building secure intelligent apps with robust encryption & monitoring', color: '#a78bfa' },
  { icon: <FiZap size={24} />, title: 'Performance', desc: 'Fast, optimized apps with modern tooling', color: '#34d399' },
  { icon: <FiAward size={24} />, title: 'Hackathons', desc: 'Hacktoberfest, Robowar & university competitions', color: '#22d3ee' },
  { icon: <FiTrendingUp size={24} />, title: 'Open Source', desc: 'Actively contributing to the dev community', color: '#f472b6' },
]

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: '5+', label: 'Technologies' },
  { value: '3+', label: 'Hackathons' },
  { value: '2+', label: 'Years Coding' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className={styles.about}>
      <div className={styles.bgGrid} />
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get to know me better
        </motion.p>

        <div className={styles.content}>
          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className={styles.bioHeading}>
              A passionate <span>developer</span> building the future with code
            </h3>
            <p className={styles.bio}>
              I'm a Computer Science & Engineering undergraduate at
              Chandigarh University, Mohali — originally from Patna, Bihar.
              I have a deep passion for creating IMPACTFUL and SECURE digital experiences,
              specializing in secure AI-powered web applications — from 
              production-ready voting portals with biometric verification to 
              intelligent chatbots — blending modern frontend frameworks with 
              robust security architectures.
            </p>
            <p className={styles.bio}>
              Beyond code, I thrive in competitive environments — from university
              robowar competitions to hackathons like Hacktoberfest. I believe in
              writing code that's not just functional, but elegant and meaningful.
            </p>
            <p className={styles.bio}>
              Currently exploring network security, ethical hacking, and full-stack secure
              applications. Always open to collaborating on projects that push
              boundaries and make a real-world impact.
            </p>

            <Core3D />

            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <a
              href="/Ankit_CV_CU.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ marginTop: '32px' }}
            >
              Download Resume
            </a>
          </motion.div>

          <motion.div
            className={styles.highlights}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className={styles.highlightCard}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className={styles.iconWrap} style={{ '--card-accent': item.color }}>
                  {item.icon}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
