import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  SiReact, SiJavascript, SiHtml5, SiCsswizardry, SiNodedotjs,
  SiPython, SiGit, SiMongodb, SiTailwindcss, SiTypescript,
  SiNextdotjs, SiFigma, SiTensorflow, SiFlask, SiArduino, SiDocker
} from 'react-icons/si'
import styles from './Skills.module.css'

const skillCategories = [
  {
    title: 'Frontend Architecture 🎨',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB', level: 95 },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 92 },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 85 },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff', level: 88 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 96 },
      { name: 'HTML5/CSS3', icon: <SiHtml5 />, color: '#E34F26', level: 90 },
    ],
  },
  {
    title: 'Backend & AI Systems ⚙️',
    skills: [
      { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 90 },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 85 },
      { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00', level: 75 },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 88 },
      { name: 'Flask', icon: <SiFlask />, color: '#ffffff', level: 80 },
    ],
  },
  {
    title: 'DevOps & Tooling 🛠️',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#F05032', level: 92 },
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED', level: 70 },
      { name: 'Arduino', icon: <SiArduino />, color: '#00979D', level: 85 },
      { name: 'Figma', icon: <SiFigma />, color: '#F24E1E', level: 80 },
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
          Skill Matrix Framework 📊
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Analyzing active capabilities and proficiency levels...
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
                    whileHover={{ scale: 1.05, y: -4, boxShadow: `0 10px 30px ${skill.color}33`, borderColor: `${skill.color}66` }}
                    style={{ '--skill-color': skill.color }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.icon} style={{ color: skill.color }}>
                        {skill.icon}
                      </div>
                      <span className={styles.label}>{skill.name}</span>
                    </div>

                    <div className={styles.progressContainer}>
                      <div className={styles.progressLabels}>
                        <span>Proficiency</span>
                        <span style={{ color: skill.color }}>{skill.level}%</span>
                      </div>
                      <div className={styles.progressTrack}>
                        <motion.div
                          className={styles.progressFill}
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: 0.6 + (i * 0.1), ease: "easeOut" }}
                        />
                      </div>
                    </div>
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
