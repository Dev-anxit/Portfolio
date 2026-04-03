import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiHeart, FiArrowUp, FiMapPin, FiCode } from 'react-icons/fi'
import styles from './Footer.module.css'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { icon: FiGithub, href: 'https://github.com/Dev-anxit', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ankit-kumar-baa77a285/', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://www.instagram.com/anxit_yadv/', label: 'Instagram' },
  { icon: FiMail, href: 'mailto:ankitkryadav6672@gmail.com', label: 'Email' },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer className={styles.footer} ref={ref}>
      {/* Animated aurora glow top border */}
      <div className={styles.glowLine} aria-hidden="true">
        <div className={styles.glowPulse} />
      </div>

      {/* CTA Banner */}
      <motion.div
        className={styles.ctaBanner}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>READY TO BUILD THE FUTURE?</h3>
            <p className={styles.ctaDesc}>Looking to engineer next-generation Artificial Intelligence systems? Let's connect.</p>
          </div>
          <a href="#contact" className={styles.ctaBtn}>
            <span>INITIATE PROTOCOL</span>
            <FiArrowUp size={16} className={styles.ctaBtnIcon} />
          </a>
        </div>
      </motion.div>

      <div className={`container ${styles.footerContent}`}>
        <motion.div
          className={styles.topRow}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.brandCol}>
            <a href="#home" className={styles.logo}>
              &lt;Ankit /&gt;
            </a>
            <p className={styles.tagline}>
              Building digital experiences with code, creativity & caffeine.
            </p>
            <div className={styles.locationBadge}>
              <FiMapPin size={13} />
              <span>Chandigarh University, Mohali</span>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className={styles.navLink}>
                    <span className={styles.navDot} />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.socialCol}>
            <h4 className={styles.colTitle}>Connect</h4>
            <div className={styles.socials}>
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className={styles.socialIcon}
                  aria-label={s.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <s.icon size={18} />
                  <span className={styles.socialName}>{s.label}</span>
                </motion.a>
              ))}
            </div>

            <div className={styles.statusBadge}>
              <span className={styles.statusDot} />
              <span>Available for work</span>
            </div>
          </div>
        </motion.div>

        <div className={styles.bottomRow}>
          <p className={styles.copy}>
            <FiCode size={13} />
            <span>Designed & built with</span>
            <FiHeart size={12} className={styles.heart} />
            <span>by <strong>Ankit Kumar</strong></span>
            <span className={styles.divider}>&middot;</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </p>
          <a href="#home" className={styles.backToTop}>
            <span>Back to top</span>
            <div className={styles.backToTopIcon}>
              <FiArrowUp size={14} />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}
