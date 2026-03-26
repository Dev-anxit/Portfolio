import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiShield, FiCpu, FiEye } from 'react-icons/fi';
import styles from './AiShowcase.module.css';

const protocols = [
  {
    id: 'sec',
    icon: <FiShield size={32} />,
    title: "Cyber Security & Hacking 🛡️",
    desc: "Simulating adversarial attacks to fortify node defense mechanisms. Exploiting vulnerabilities in secure perimeters to build unbreakable architectures.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    color: "#a78bfa"
  },
  {
    id: 'ai',
    icon: <FiCpu size={32} />,
    title: "AI & Neural Networks 🧠",
    desc: "Training highly-optimized language models and deep learning engines. Focusing on generative intelligence and computer vision (Emotion Detection).",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    color: "#00f0ff"
  },
  {
    id: 'vr',
    icon: <FiEye size={32} />,
    title: "Virtual Reality Interfaces 👓",
    desc: "Crafting immersive 3D HUDs and intelligent digital environments that break the boundaries of 2D screens through pure WebGL and spatial mapping.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800",
    color: "#ec4899"
  }
];

export default function AiShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="ai-vr-showcase" className={styles.showcaseSection}>
      <div className="container" ref={ref}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Core System Protocols ⚡
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Operating environments and specialized domains
        </motion.p>
        
        <div className={styles.protocolGrid}>
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.id}
              className={styles.protocolCard}
              initial={{ opacity: 0, y: 50, rotateX: 20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2, type: 'spring' }}
              whileHover={{ y: -10, boxShadow: `0 20px 40px ${protocol.color}33`, borderColor: protocol.color }}
            >
              <div className={styles.imageOverlay}>
                <img src={protocol.image} alt={protocol.title} />
                <div className={styles.gradientMask} />
              </div>

              <div className={styles.cardContent}>
                <div className={styles.iconHolo} style={{ color: protocol.color }}>
                  {protocol.icon}
                  <div className={styles.iconGlow} style={{ backgroundColor: protocol.color }} />
                </div>
                <h3 className={styles.slideTitle}>{protocol.title}</h3>
                <p className={styles.slideDesc}>{protocol.desc}</p>
                <div className={styles.hoverLine} style={{ backgroundColor: protocol.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
