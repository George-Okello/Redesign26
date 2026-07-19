import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { NetworkBackground } from './components/NetworkBackground';
import { ScrollToTop } from './components/ScrollToTop';
import { FooterGlobe } from './components/FooterGlobe';
import { Hero, About, InteractiveLab, Publications, Projects, KaggleSection, Notes, ArchivedFieldNotes, SwarmSection, Contact } from './sections';

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

function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[200] h-full w-full opacity-[0.035] mix-blend-overlay">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

function InitialLoader({ onComplete }: { onComplete: () => void }) {
  const [subText, setSubText] = useState("Translating brain signals...");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const t1 = setTimeout(() => setSubText("Establishing neural links..."), 1200);
    const t2 = setTimeout(() => setSubText("Calibrating network weights..."), 2400);
    const t3 = setTimeout(() => setSubText("Accessing complex systems..."), 3600);

    const timer = setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 4500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] bg-[#fcfaf7] flex flex-col items-center justify-center pointer-events-auto select-none"
    >
      <div className="overflow-hidden mb-6">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-[#1a1a1a] flex items-center gap-3"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-3 h-3 border-2 border-[#1a1a1a]/20 border-t-orange-highlight rounded-full"
          />
          Initializing
        </motion.div>
      </div>
      <div className="w-48 md:w-64 h-[1px] bg-[#1a1a1a]/10 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-orange-highlight"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, delay: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="mt-6 h-4 overflow-hidden flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={subText}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[9px] uppercase tracking-widest text-[#8a817c] italic font-serif"
          >
            {subText}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showCredentials, setShowCredentials] = useState(false);

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
      <NoiseOverlay />
      
      <AnimatePresence>
        {loading && <InitialLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[3px] bg-orange-highlight origin-left z-[100]" 
          style={{ scaleX }} 
        />
        <NetworkBackground />
        <Header />
        <main className="relative z-10 mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1536px] px-6 md:px-12 lg:px-24 pt-32">
          <Hero />
          <About />
          <InteractiveLab />
          <Publications />
          <Projects />
          <KaggleSection />
          <Notes />
          <ArchivedFieldNotes />
          <SwarmSection />
          <Contact />
        </main>

        <footer className="relative z-10 border-t border-[#1a1a1a]/10 py-16 bg-[#1a1a1a] text-[#fcfaf7] px-6 md:px-12 text-[9px] uppercase tracking-[0.3em] mt-24 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left relative">
            <div className="flex flex-col md:flex-row items-center gap-12 z-10 w-full md:w-auto">
              <div className="-my-12">
                <FooterGlobe />
              </div>
              <div className="flex flex-col gap-4 flex-grow">
                <span className="text-[#fcfaf7] tracking-[0.4em] font-bold">© {new Date().getFullYear()} George Okello.</span>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-[#8a817c]/50 font-mono tracking-wider text-[7.5px] leading-relaxed">
                    <button 
                      onClick={() => setShowCredentials(!showCredentials)}
                      className="text-orange-highlight hover:opacity-80 transition-opacity font-bold tracking-wider cursor-pointer uppercase text-[7px]"
                    >
                      {showCredentials ? '[close_baselines.log]' : '[query_baselines.log]'}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showCredentials && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden w-full max-w-xl text-left"
                    >
                      <div className="bg-[#121110] text-[#fcfaf7] font-mono text-[9px] md:text-[10px] p-4 rounded-lg border border-white/5 space-y-2.5 shadow-2xl relative">
                        <div className="absolute top-3 right-3 text-[7.5px] text-[#8a817c] tracking-widest uppercase">
                          acc: verified
                        </div>
                        <div className="text-[#8a817c] flex items-center gap-2 uppercase tracking-widest text-[8px] mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-highlight animate-pulse" />
                          SYS.ACCREDITATIONS // CROSS-DOMAIN BASELINES & EXPERIMENTATION LOGS
                        </div>
                        <div className="border-t border-white/10 my-2" />
                        
                        {[
                          { 
                            code: "HW-03", 
                            title: "Certificate in Computer & Mobile Repair", 
                            narrative: "A hardware hobby for low-level diagnostic experiments. Used to salvage bricked electronics—most notably turning a dead Nokia E3 from complete e-waste into a fully functional device.",
                            link: { text: "view nokia e3 restore on youtube", url: "https://www.youtube.com/@georgeokello_" }
                          },
                          { 
                            code: "SEC-02", 
                            title: "Certificate in Cyber Security Analysis", 
                            narrative: "Studied to build a fundamental understanding of systemic vulnerability, threat modeling, and analyzing high-dimensional communication topologies." 
                          },
                          { 
                            code: "DS-01", 
                            title: "Certificate in Data Science", 
                            narrative: "The analytical substrate supporting every project on this site, translating raw simulation outputs into structured insights and visual logic." 
                          }
                        ].map((item, idx) => (
                          <div 
                            key={idx}
                            className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 flex flex-col gap-2"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-orange-highlight font-bold select-none text-[8.5px]">[{item.code}]</span>
                                <span className="text-[#fcfaf7] font-semibold uppercase tracking-wider text-[8.5px]">{item.title}</span>
                              </div>
                              <span className="text-[#8a817c] text-[7px] uppercase tracking-widest font-bold">applied baseline</span>
                            </div>
                            <p className="text-[#8a817c] text-[8.5px] leading-relaxed lowercase normal-case tracking-normal">
                              {item.narrative}
                            </p>
                            {item.link && (
                              <div className="mt-1">
                                <a 
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-orange-highlight hover:underline font-bold text-[7.5px] uppercase tracking-widest"
                                >
                                  <span>↳ {item.link.text}</span>
                                  <span className="text-[6.5px]">↗</span>
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <span className="opacity-50 z-10">Explorations in Complex Systems</span>
          </div>
        </footer>
        <ScrollToTop />
      </motion.div>
    </div>
  );
}
