import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './CommandPalette.module.css';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on '/' or Cmd/Ctrl + K
      if ((e.key === '/') || (e.key === 'k' && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={styles.palette}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <input 
                autoFocus 
                placeholder="Type a command or navigate..." 
                className={styles.input} 
              />
              <span className={styles.escTip}>ESC</span>
            </div>
            
            <div className={styles.commands}>
              <button onClick={() => handleNav('home')}>🏠 Home Terminal</button>
              <button onClick={() => handleNav('about')}>👨‍💻 About Protocol</button>
              <button onClick={() => handleNav('skills')}>⚡ Skill Matrix</button>
              <button onClick={() => handleNav('ai-vr-showcase')}>🧠 AI Systems</button>
              <button onClick={() => handleNav('projects')}>🚀 Live Projects</button>
              <button onClick={() => handleNav('contact')}>📬 Network Link (Contact)</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
