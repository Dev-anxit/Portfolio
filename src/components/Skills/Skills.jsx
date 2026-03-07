import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact, SiJavascript, SiHtml5, SiCsswizardry, SiNodedotjs,
  SiPython, SiGit, SiMongodb, SiTailwindcss, SiTypescript,
  SiNextdotjs, SiFigma, SiTensorflow, SiFlask, SiArduino, SiDocker
} from 'react-icons/si'
import styles from './Skills.module.css'

const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <SiCsswizardry />, color: '#1572B6' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend & AI',
    skills: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
      { name: 'Flask', icon: <SiFlask />, color: '#ffffff' },
      { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#F05032' },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'Arduino', icon: <SiArduino />, color: '#00979D' },
      { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.bgOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
      </div>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Skills & Tools
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Technologies I work with
        </motion.p>

        <div className={styles.categories}>
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className={styles.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + ci * 0.15 }}
            >
              <h3 className={styles.catTitle}>{cat.title}</h3>
              <div className={styles.grid}>
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + ci * 0.15 + i * 0.06 }}
                    whileHover={{ scale: 1.1, y: -6 }}
                    style={{ '--skill-color': skill.color }}
                  >
                    <div className={styles.iconGlow} />
                    <div className={styles.icon} style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className={styles.label}>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
