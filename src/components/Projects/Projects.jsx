import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import styles from './Projects.module.css'

const projects = [
  {
    title: 'Ehan AI — Chatbot 🤖',
    description:
      'A full-stack AI chatbot with streaming FastAPI backend and React frontend. Features real-time token-by-token responses and memory integration.',
    tags: ['React', 'Python', 'FastAPI', 'Anthropic', 'Vercel'],
    liveUrl: 'https://chat-ui-lake-nu.vercel.app/',
    githubUrl: 'https://github.com/Dev-anxit/ai-chatbot',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    theme: 'ai',
  },
  {
    title: 'Emotion Detector CNN 👁️',
    description:
      'A Deep Learning Computer Vision model that analyzes human faces to predict and classify emotional states accurately in real-time.',
    tags: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
    liveUrl: null,
    githubUrl: 'https://github.com/Dev-anxit/Emotion_Detector',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    theme: 'ml',
  },
  {
    title: 'Scientific Calculator Engine 🧮',
    description:
      'A high-performance algorithmic calculator capable of executing complex mathematical expressions, trigonometry, and calculus simulation.',
    tags: ['C++', 'Algorithms', 'Math', 'CLI'],
    liveUrl: null,
    githubUrl: 'https://github.com/Dev-anxit/Scientific-Calculator',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    theme: 'sys',
  },
  {
    title: 'Secure Voting System 🗳️',
    description:
      'A tamper-proof digital voting infrastructure built with secure cryptographic hashing mechanisms to guarantee election integrity.',
    tags: ['C++', 'Security', 'Cryptography', 'Hashing'],
    liveUrl: null,
    githubUrl: 'https://github.com/Dev-anxit/voting-system',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    theme: 'sys',
  },
]

function ProjectCardItem({ project, index, isInView }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={styles.cardInnerWrap}
      >
        <div className={styles.wallpaperOverlay}>
          {project.image ? (
            <img src={project.image} alt={project.title} className={styles.wallpaperImg} />
          ) : (
            <div className={`${styles.placeholder} ${styles[`ph_${project.theme}`]}`} />
          )}
          <div className={styles.wallpaperGradient} />
        </div>

        <div className={styles.cardContent} style={{ transform: 'translateZ(30px)' }}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>

          <div className={styles.tags} style={{ transform: 'translateZ(40px)' }}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.links} style={{ transform: 'translateZ(50px)' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
              <FiGithub size={20} />
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveBtn}>
                <FiExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}

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
          Featured Projects 📁
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
            <ProjectCardItem key={project.title} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
