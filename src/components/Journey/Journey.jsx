import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiBookOpen, FiAward, FiCode, FiCpu } from 'react-icons/fi'
import styles from './Journey.module.css'

const journeyData = [
  {
    id: 1,
    title: "B.E. Computer Science Engineering",
    organization: "Chandigarh University, Mohali",
    date: "Current",
    description: "Specializing in software engineering algorithms, data structures, and foundational computing architecture. Maintaining a strong focus on advanced programming paradigms.",
    icon: FiBookOpen,
    color: "var(--aurora-blue)"
  },
  {
    id: 2,
    title: "AI & Neural Networks Exploration",
    organization: "Independent & IBM",
    date: "Jan 2026",
    description: "Deep dive into Artificial Intelligence, neural protocols, and Introduction to Software Engineering. Obtained extensive certification in next-gen tech methodologies.",
    icon: FiCpu,
    color: "var(--aurora-green)"
  },
  {
    id: 3,
    title: "Cyber Security & Systems",
    organization: "CyberPeace Foundation",
    date: "Recent",
    description: "Mastered fundamental concepts in information security, ethical standards, and bypass mitigation strategies to ensure secure coding environments.",
    icon: FiCode,
    color: "var(--aurora-purple)"
  },
  {
    id: 4,
    title: "Code Relay 2.0 AI Fest",
    organization: "AI Fest",
    date: "Recent",
    description: "Participated in cutting-edge AI relay competitions, developing rapid prototypes and engaging with state-of-the-art machine learning deployments.",
    icon: FiAward,
    color: "var(--aurora-pink)"
  }
]

export default function Journey() {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Makes the glowing line draw as user scrolls down
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="journey" className={styles.journeySection} ref={containerRef}>
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className={styles.titleWrapper}
        >
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">Education, experiences, and major milestones</p>
        </motion.div>

        <div className={styles.timeline}>
          {/* Background Track */}
          <div className={styles.lineTrack} />
          {/* Animated Glow Line */}
          <motion.div 
            className={styles.lineGlow} 
            style={{ height: lineHeight }} 
          />

          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <div key={item.id} className={`${styles.node} ${isEven ? styles.nodeLeft : styles.nodeRight}`}>
                <motion.div 
                  className={styles.iconBox}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1, type: "spring" }}
                  style={{ borderColor: item.color, color: item.color, boxShadow: `0 0 15px ${item.color}40` }}
                >
                  <item.icon size={20} />
                </motion.div>

                <motion.div 
                  className={styles.contentCard}
                  initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className={styles.dateBadge} style={{ color: item.color }}>
                    {item.date}
                  </span>
                  <h3 className={styles.nodeTitle}>{item.title}</h3>
                  <h4 className={styles.orgName}>{item.organization}</h4>
                  <p className={styles.nodeDesc}>{item.description}</p>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
