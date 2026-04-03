import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiInstagram, FiClock, FiCheckCircle, FiCopy } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import ParticleBackground from '../ParticleBackground/ParticleBackground'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailtoLink = `mailto:ankitkryadav6672@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`
    window.location.href = mailtoLink
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('ankitkryadav6672@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { icon: FiGithub, href: 'https://github.com/Dev-anxit', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ankit-kumar-baa77a285/', label: 'LinkedIn' },
    { icon: FiInstagram, href: 'https://www.instagram.com/anxit_yadv/', label: 'Instagram' },
  ]

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="contact" className={styles.contact}>
      <ParticleBackground />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <HiOutlineSparkles size={14} />
            <span>Let's Connect</span>
          </motion.span>
          <h2 className={styles.heading}>
            Get In <span className={styles.headingAccent}>Touch</span>
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or want to collaborate? I'd love to hear from you.
            <br />Let's turn ideas into reality.
          </p>

          <motion.div
            className={styles.availability}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className={styles.availDot} />
            <span>Available for freelance & opportunities</span>
          </motion.div>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.infoPanel}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.infoPanelInner}>
              <div className={styles.infoHeader}>
                <h3 className={styles.infoTitle}>Let's create something amazing</h3>
                <div className={styles.responseTime}>
                  <FiClock size={14} />
                  <span>Replies within 24 hrs</span>
                </div>
              </div>
              <p className={styles.infoDesc}>
                Whether it's a web app, AI project, or an exciting idea — I'm always open to discussing new opportunities.
              </p>

              <motion.div
                className={styles.infoItems}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                <motion.div className={styles.infoCard} variants={itemVariants} whileHover={{ x: 6 }}>
                  <div className={styles.infoIconWrap}>
                    <FiMail size={20} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <span className={styles.infoLabel}>Email</span>
                    <span className={styles.infoValue}>ankitkryadav6672@gmail.com</span>
                  </div>
                  <motion.button
                    className={styles.copyBtn}
                    onClick={copyEmail}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Copy email"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <FiCheckCircle size={16} />
                        </motion.span>
                      ) : (
                        <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <FiCopy size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>

                <motion.div className={styles.infoCard} variants={itemVariants} whileHover={{ x: 6 }}>
                  <div className={styles.infoIconWrap}>
                    <FiMapPin size={20} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <span className={styles.infoLabel}>Currently at</span>
                    <span className={styles.infoValue}>Chandigarh University, Mohali</span>
                  </div>
                </motion.div>

                <motion.div className={styles.infoCard} variants={itemVariants} whileHover={{ x: 6 }}>
                  <div className={styles.infoIconWrap}>
                    <FiMapPin size={20} />
                  </div>
                  <div className={styles.infoCardContent}>
                    <span className={styles.infoLabel}>Hometown</span>
                    <span className={styles.infoValue}>Patna, Bihar</span>
                  </div>
                </motion.div>
              </motion.div>

              <div className={styles.socialSection}>
                <span className={styles.socialLabel}>Find me on</span>
                <div className={styles.socialRow}>
                  {socials.map((s, i) => (
                    <motion.a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={s.label}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <s.icon size={20} />
                      <span className={styles.socialTooltip}>{s.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={styles.formPanel}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <p className={styles.formDesc}>Fill in the details and I'll get back to you.</p>
            </div>

            <div className={styles.inputGroup}>
              <label className={`${styles.label} ${focused === 'name' || formData.name ? styles.labelActive : ''}`}>Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                required
                className={styles.input}
              />
              <div className={styles.inputLine} />
            </div>
            <div className={styles.inputGroup}>
              <label className={`${styles.label} ${focused === 'email' || formData.email ? styles.labelActive : ''}`}>Your Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                className={styles.input}
              />
              <div className={styles.inputLine} />
            </div>
            <div className={styles.inputGroup}>
              <label className={`${styles.label} ${focused === 'message' || formData.message ? styles.labelActive : ''}`}>Your Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                required
                className={styles.input}
              />
              <div className={styles.inputLine} />
              {formData.message && (
                <span className={styles.charCount}>{formData.message.length} characters</span>
              )}
            </div>

            <motion.button
              type="submit"
              className={`${styles.submitBtn} ${sent ? styles.submitBtnSent : ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span
                    key="sent"
                    className={styles.btnContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <FiCheckCircle size={18} />
                    <span>Opening Mail Client...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    className={styles.btnContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span>Send Message</span>
                    <FiSend size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <p className={styles.formNote}>
              <FiMail size={12} />
              <span>This will open your default email client</span>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
