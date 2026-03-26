import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import ScrollProgress from './components/ScrollProgress/ScrollProgress'
import CyberBackground from './components/CyberBackground/CyberBackground'
import AiAssistant from './components/AiAssistant/AiAssistant'
import AiShowcase from './components/AiShowcase/AiShowcase'
import CommandPalette from './components/CommandPalette/CommandPalette'
import ScrollReveal from './components/ScrollReveal/ScrollReveal'
import IntroScreen from './components/IntroScreen/IntroScreen'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [showApp, setShowApp] = useState(false);
  return (
    <>
      {!showApp && <IntroScreen onComplete={() => setShowApp(true)} />}

      <AnimatePresence>
        {showApp && (
          <motion.div
            key="main-app"
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <CommandPalette />
            <CyberBackground />
            <ScrollProgress />
            <Navbar />
            <main>
        <Hero />
        <ScrollReveal><About /></ScrollReveal>
        <ScrollReveal><Skills /></ScrollReveal>
        <ScrollReveal><AiShowcase /></ScrollReveal>
        <ScrollReveal><Projects /></ScrollReveal>
        <ScrollReveal><Certifications /></ScrollReveal>
        <ScrollReveal><Contact /></ScrollReveal>
            </main>
            <Footer />
            <AiAssistant />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
