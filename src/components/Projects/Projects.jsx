import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import styles from './Projects.module.css'

const projects = [
  {
    title: 'AI Chatbot',
    description:
      'An AI-powered chatbot application built with JavaScript and Python, deployed on Appwrite. Engage in intelligent conversations with a sleek, responsive interface.',
    tags: ['JavaScript', 'Python', 'CSS', 'Appwrite'],
    liveUrl: 'https://ehan-ai.appwrite.network/',
    githubUrl: 'https://github.com/Dev-anxit/ai-chatbot',
    image: null,
    theme: 'ai',
  },
  {
    title: 'Emotion Detector',
    description:
      'A Convolutional Neural Network (CNN) model utilizing TensorFlow, Keras, and Haar cascades to accurately identify and classify human emotions in real-time.',
    tags: ['Python', 'Jupyter Notebook', 'TensorFlow', 'Keras', 'CNN'],
    liveUrl: null,
    githubUrl: 'https://github.com/Dev-anxit/Emotion_Detector',
    image: null,
    theme: 'ml',
  },
  {
    title: 'Voting System',
    description:
      'A secure and efficient digital voting system built with C/C++ for transparent and tamper-proof elections, featuring a Qt-based interface.',
    tags: ['C++', 'C', 'QMake', 'Makefile'],
    liveUrl: null,
    githubUrl: 'https://github.com/Dev-anxit/voting-system',
    image: null,
    theme: 'sys',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className={styles.projects}>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Some things I've built
        </motion.p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className={styles.cardImage}>
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className={`${styles.placeholder} ${styles[`ph_${project.theme}`]}`}>
                    <span>{project.title.slice(0, 2).toUpperCase()}</span>
                  </div>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                    aria-label="View source code"
                  >
                    <FiGithub size={20} />
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      aria-label="View live project"
                    >
                      <FiExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
