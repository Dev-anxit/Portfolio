import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiCpu } from 'react-icons/fi';

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "System initialized. I am Ankit's AI Assistant. How can I help you navigate this portfolio?", isAi: true }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  
  const predefined = {
    "About me": "Ankit is an incoming B.Tech CSE student, specializing in full-stack architecture, machine learning, and ethical hacking ecosystems.",
    "Skills": "He builds extensively with React, Node.js, Python, Three.js, and modern AI/ML pipelines.",
    "Projects": "Check the Live Projects section! He has built over 15 high-impact web, VR, and AI applications."
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages, isTyping]);

  const handleQuery = (query) => {
    setMessages(prev => [...prev, { text: query, isAi: false }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: predefined[query], isAi: true }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ 
              background: 'rgba(10, 14, 23, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid var(--glass-border)',
              borderRadius: '20px', padding: '1.5rem', width: '340px', marginBottom: '1rem',
              boxShadow: '0 20px 50px rgba(0,240,255,0.15)', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.8rem', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--aurora-green)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiCpu /> AI Terminal Active
              </span>
              <FiX style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setIsOpen(false)} />
            </div>
            
            <div ref={scrollRef} style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '180px', maxHeight: '250px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '10px' }}>
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: m.isAi ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} key={i}
                  style={{ 
                    alignSelf: m.isAi ? 'flex-start' : 'flex-end',
                    background: m.isAi ? 'rgba(0,240,255,0.1)' : 'var(--aurora-blue)',
                    color: m.isAi ? 'var(--text-primary)' : '#000',
                    padding: '8px 12px', borderRadius: '12px', fontSize: '0.9rem', maxWidth: '85%'
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ alignSelf: 'flex-start', background: 'rgba(0,240,255,0.1)', padding: '8px 12px', borderRadius: '12px' }}>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                </motion.div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              {Object.keys(predefined).map((key) => (
                <button 
                  key={key} 
                  onClick={() => handleQuery(key)}
                  disabled={isTyping}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: isTyping ? 'not-allowed' : 'pointer', transition: '0.2s' }}
                >
                  {key}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,240,255,0.4)', cursor: 'pointer', marginLeft: 'auto' }}
      >
        <FiMessageSquare color="#020202" size={24} />
      </motion.button>
    </div>
  );
}
