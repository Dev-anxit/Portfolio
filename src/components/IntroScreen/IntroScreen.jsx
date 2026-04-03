import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './IntroScreen.module.css';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

function ScrambledText({ text, delay = 0, duration = 2000, className }) {
  const [display, setDisplay] = useState(text.replace(/./g, '_'));

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < delay) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const runTime = progress - delay;
      const completion = Math.min(runTime / duration, 1);
      
      const lockCount = Math.floor(completion * text.length);

      let currentScramble = '';
      for (let i = 0; i < text.length; i++) {
        if (i < lockCount || text[i] === ' ') {
          currentScramble += text[i];
        } else {
          currentScramble += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(currentScramble);

      if (completion < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [text, delay, duration]);

  return <span className={className}>{display}</span>;
}

export default function IntroScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Exact 4.5-second unique boot sequence timing
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1200); 
    }, 4500); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
           className={styles.introContainer}
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
           transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Stunning Photorealistic Cinematic Background */}
          <div className={styles.imageBackgroundWrapper}>
            <motion.img 
              src="/intro_bg.png" 
              alt="Cyber AI Brain Core"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.25, opacity: 0.6 }}
              transition={{ duration: 5, ease: "easeOut" }}
              className={styles.cinematicBgImage}
            />
            <div className={styles.heavyVignette} />
          </div>

          {/* Cyberpunk 3D perspective grid */}
          <div className={styles.gridOverlay} />
          
          <div className={styles.centerBox}>
            <div className={styles.scrambleWrap}>
              <ScrambledText 
                text="SYSTEM BOOT SEQUENCE" 
                delay={200} 
                duration={1000} 
                className={styles.smallText} 
              />
            </div>
            
            <div className={styles.scrambleWrap}>
              <ScrambledText 
                text="ANKIT YADAV" 
                delay={1200} 
                duration={2000} 
                className={styles.mainText} 
              />
            </div>

            <div className={styles.scrambleWrap}>
              <ScrambledText 
                text="AI NEURAL PROTOCOLS VERIFIED." 
                delay={3000} 
                duration={1000} 
                className={styles.subText} 
              />
            </div>
          </div>
          
          {/* Hacker terminal scanline effect */}
          <motion.div 
            className={styles.scanline}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

           <motion.div 
            className={styles.progressContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div 
              className={styles.progressBar}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.2, ease: "circOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
