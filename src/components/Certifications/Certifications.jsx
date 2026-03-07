import { motion, useInView } from 'framer-motion'
import { useRef, useCallback, useState } from 'react'
import { FiExternalLink, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from './Certifications.module.css'

const certifications = [
  {
    title: 'Full Stack Web Developer',
    issuer: 'LinkedIn Learning',
    file: '/certificates/CertificateOfCompletion_Become a FullStack Web Developer.pdf',
    image: '/cert-images/fullstack-webdev.png',
  },
  {
    title: 'Programmer Foundations',
    issuer: 'LinkedIn Learning',
    file: '/certificates/CertificateOfCompletion_Become a Programmer Foundations.pdf',
    image: '/cert-images/programmer-foundations.png',
  },
  {
    title: 'LinkedIn Certificate',
    issuer: 'LinkedIn',
    file: '/certificates/Linkedin certificate.pdf',
    image: '/cert-images/linkedin-cert.png',
  },
  {
    title: 'CyberPeace Certificate',
    issuer: 'CyberPeace Foundation',
    file: '/certificates/Ankit_CyberPeace_certificate.pdf',
    image: '/cert-images/cyberpeace.png',
  },
  {
    title: 'Python',
    issuer: 'Coursera',
    file: '/certificates/Python courseraa certificate.pdf',
    image: '/cert-images/coursera-python.png',
  },
  {
    title: 'Coursera Certification',
    issuer: 'Coursera',
    file: '/certificates/Ankit_coursera_jan2026.pdf',
    image: '/cert-images/coursera-2026.png',
  },
  {
    title: 'Coursera — January 2026',
    issuer: 'Coursera',
    file: '/certificates/Coursera january _2026.pdf',
    image: '/cert-images/coursera-jan-2026.png',
  },
  {
    title: 'Coursera Certification',
    issuer: 'Coursera',
    file: '/certificates/Coursera_jan_2026.pdf',
    image: '/cert-images/coursera-cert.png',
  },
  {
    title: 'Java',
    issuer: 'Coursera',
    file: '/certificates/Coursera_jan_2026_java.pdf',
    image: '/cert-images/coursera-java.png',
  },
  {
    title: 'Operating Systems',
    issuer: 'Coursera',
    file: '/certificates/Coursera_jan_2026_os.pdf',
    image: '/cert-images/coursera-os.png',
  },
  {
    title: 'University Courses',
    issuer: 'Chandigarh University',
    file: '/certificates/Ankit-Kumar-24BCS11081-Courses.pdf',
    image: '/cert-images/university-courses.png',
  },
  {
    title: 'Code Relay 2.0 — AI Fest',
    issuer: 'AI Fest',
    file: '/certificates/Code-relay2.0-AI-FEST.jpg',
    image: '/cert-images/code-relay-ai-fest.jpg',
  },
]

function CertCard({ cert }) {
  return (
    <a
      href={cert.file}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img src={cert.image} alt={cert.title} className={styles.image} loading="lazy" />
        <div className={styles.imageOverlay}>
          <FiExternalLink size={20} />
          <span>View Certificate</span>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{cert.title}</h3>
        <p className={styles.issuer}>{cert.issuer}</p>
      </div>
    </a>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  const trackRef = useRef(null)
  const resumeTimer = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [scrollDir, setScrollDir] = useState(null)

  const scroll = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return

    // Clear any pending resume timer
    if (resumeTimer.current) clearTimeout(resumeTimer.current)

    const cardWidth = 324
    const computedStyle = getComputedStyle(track)
    const matrix = new DOMMatrix(computedStyle.transform)
    const currentX = matrix.m41

    // Calculate limits
    const containerWidth = track.parentElement.offsetWidth
    const totalWidth = track.scrollWidth / 2 // half because items are duplicated
    const minScroll = -(totalWidth)
    const maxScroll = 0

    let newX = direction === 'left' ? currentX + cardWidth : currentX - cardWidth

    // Clamp within bounds
    if (newX > maxScroll) newX = maxScroll
    if (newX < minScroll) newX = minScroll

    // Don't move if already at the limit
    if (newX === currentX) return

    track.style.animation = 'none'
    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    track.style.transform = `translateX(${newX}px)`

    // Trigger button pulse animation
    setScrollDir(direction)
    setTimeout(() => setScrollDir(null), 400)

    // Resume auto-scroll after 4 seconds
    resumeTimer.current = setTimeout(() => {
      track.style.transition = ''
      track.style.animation = ''
      track.style.transform = ''
    }, 4000)
  }, [])

  return (
    <section id="certifications" className={styles.certifications}>
      <div className="container" ref={ref}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Courses & credentials I've earned
        </motion.p>
      </div>

      <div className={styles.scrollWrapper}>
        <button
          className={`${styles.navBtn} ${styles.navLeft} ${scrollDir === 'left' ? styles.navPulse : ''}`}
          onClick={() => scroll('left')}
          aria-label="Previous certificate"
        >
          <FiChevronLeft size={22} />
        </button>

        <motion.div
          className={styles.marqueeContainer}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.marqueeTrack} ref={trackRef}>
            {certifications.map((cert, i) => (
              <CertCard key={`a-${i}`} cert={cert} />
            ))}
            {certifications.map((cert, i) => (
              <CertCard key={`b-${i}`} cert={cert} />
            ))}
          </div>
        </motion.div>

        <button
          className={`${styles.navBtn} ${styles.navRight} ${scrollDir === 'right' ? styles.navPulse : ''}`}
          onClick={() => scroll('right')}
          aria-label="Next certificate"
        >
          <FiChevronRight size={22} />
        </button>
      </div>
    </section>
  )
}
