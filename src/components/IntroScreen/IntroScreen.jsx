import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './IntroScreen.module.css';

export default function IntroScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // 3.5 second sequence before dissolving
    const duration = 2800; // milliseconds to load to 100
    const interval = 20; // update speed
    let currentProgress = 0;

    const loader = setInterval(() => {
      currentProgress += (100 / (duration / interval));
      if (currentProgress >= 100) {
        setLoadingProgress(100);
        clearInterval(loader);
      } else {
        setLoadingProgress(Math.floor(currentProgress));
      }
    }, interval);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200); // Wait for exit animation to finish
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(loader);
    };
  }, [onComplete]);

  const text = "Welcome to my world".split(" ");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.introContainer}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(30px)", scale: 1.3 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Subtle slow background zoom */}
          <motion.div
            className={styles.bgGlow}
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 4, ease: "linear" }}
          />

          <motion.div className={styles.textContainer}>
            {text.map((word, i) => (
              <motion.span
                key={i}
                className={styles.word}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2, // Letter-by-letter staggering
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Loading Bar Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ marginTop: '3rem', width: '280px', textAlign: 'center', zIndex: 10 }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '12px', 
              color: 'var(--text-primary)', 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              letterSpacing: '1px',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}>
              <span>Loading... 🚀✨</span>
              <span style={{ color: 'var(--aurora-green)' }}>{loadingProgress}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--aurora-blue), var(--aurora-purple))', width: `${loadingProgress}%`, borderRadius: '2px' }}
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </motion.div>
          
          {/* Pulse effect ring */}
          <motion.div
            className={styles.pulseRing}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.8], opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
