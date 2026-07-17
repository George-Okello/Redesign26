import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { NetworkBackground } from './components/NetworkBackground';
import { Hero, About, InteractiveLab, Publications, Projects, KaggleSection, Notes, SwarmSection, Contact } from './sections';

const RESEARCH_QUESTIONS = [
  "Can AI Be Human in Thought?",
  "How do networks optimize latency under failure?",
  "What emerges from multi-agent cooperation?",
  "Mapping attention to neural substrates",
  "Reinforcement learning with cognitive biases"
];

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Publications", href: "#research" },
  { label: "Simulations", href: "#lab" },
  { label: "Implementations", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

function Header() {
  const [qIndex, setQIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setQIndex((prev) => (prev + 1) % RESEARCH_QUESTIONS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.3, 0, 0.1, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const linkVariants = {
    closed: { y: 30, opacity: 0, rotate: 2 },
    open: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 bg-[#fcfaf7]/90 backdrop-blur-md border-b border-[#1a1a1a]/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold text-[#1a1a1a]">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 hover:text-orange-highlight transition-all duration-300 relative z-50 group">
            <div className="flex items-center justify-center w-5 h-5 border border-[#1a1a1a] group-hover:border-orange-highlight rounded-full transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] group-hover:bg-orange-highlight animate-pulse transition-colors duration-300"></span>
            </div>
            <span className="font-sans font-bold tracking-widest">George Okello</span>
          </a>
          
          {/* Rotating Research Questions (Hidden on small mobile, visible on iPad and Desktop) */}
          <div className="hidden sm:flex flex-1 justify-center overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[#8a817c] italic font-serif lowercase tracking-widest text-[11px] text-center max-w-md truncate"
              >
                "{RESEARCH_QUESTIONS[qIndex]}"
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                className="hover:text-orange-highlight transition-colors duration-300 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-[#1a1a1a] hover:opacity-75 transition-opacity focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Fly-In / Fly-Out Mobile & iPad Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[#fcfaf7] pt-28 px-6 md:px-12 pb-12 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            {/* Ambient Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
              <span className="font-serif italic text-[18vw]">Okello</span>
            </div>

            <div className="relative z-10 flex flex-col justify-center flex-grow max-w-lg mx-auto w-full">
              <div className="text-[10px] tracking-[0.25em] text-[#8a817c] uppercase font-bold mb-6 border-b border-[#1a1a1a]/10 pb-2 w-fit">
                Navigation Index
              </div>

              {/* Dynamic Fly-In Links list */}
              <div className="flex flex-col gap-6 md:gap-8">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="overflow-hidden py-1">
                    <motion.div variants={linkVariants}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-3xl md:text-4xl font-serif italic text-[#1a1a1a] hover:text-orange-highlight transition-colors flex items-center justify-between group"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </span>
                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-orange-highlight transition-all duration-300 text-[#8a817c]" />
                      </a>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Drawer Footer with rotating queries / status */}
            <motion.div 
              variants={linkVariants}
              className="relative z-10 mt-12 pt-6 border-t border-[#1a1a1a]/10 text-center max-w-lg mx-auto w-full flex flex-col gap-4 text-[10px] md:text-xs text-[#8a817c] tracking-widest uppercase font-mono"
            >
              <div className="flex justify-center items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#1a1a1a] animate-pulse" />
                <span>Explorations in Complex Systems</span>
              </div>
              <div className="text-[9px] opacity-70">
                Nairobi, Kenya • Click outside or select a path to exit
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  useEffect(() => {
    // Revert/cleanup dark mode completely
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.remove('theme-transition');
    localStorage.removeItem('theme-preference');
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen bg-[#fcfaf7] selection:bg-[#1a1a1a]/10 overflow-x-hidden text-[#1a1a1a]">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-orange-highlight origin-left z-[100]" 
        style={{ scaleX }} 
      />
      <NetworkBackground />
      <Header />
      <main className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-24 pt-32">
        <Hero />
        <About />
        <InteractiveLab />
        <Publications />
        <Projects />
        <KaggleSection />
        <Notes />
        <SwarmSection />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-[#1a1a1a]/10 py-8 bg-[#1a1a1a] text-[#fcfaf7] px-6 md:px-12 text-[9px] uppercase tracking-[0.4em] mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <span>© {new Date().getFullYear()} George Okello. Nairobi, Kenya.</span>
          <span className="opacity-50">Explorations in Complex Systems</span>
        </div>
      </footer>
    </div>
  );
}
