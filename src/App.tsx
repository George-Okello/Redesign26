import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { NetworkBackground } from './components/NetworkBackground';
import { ScrollToTop } from './components/ScrollToTop';
import { FooterGlobe } from './components/FooterGlobe';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { TerminalMode } from './components/TerminalMode';
import { Hero, About, InteractiveLab, Publications, Projects, GrantsAndAwards, KaggleSection, Notes, ArchivedFieldNotes, SwarmSection, Contact } from './sections';

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

interface HeaderProps {
  onActivateTerminal: () => void;
}

function Header({ onActivateTerminal }: HeaderProps) {
  const [qIndex, setQIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLogoClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        onActivateTerminal();
        return 0;
      }
      return next;
    });
  };

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
          
          {/* Logo (Easter Egg: Click 5 times to activate terminal) */}
          <a 
            href="#" 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:text-orange-highlight transition-all duration-300 relative z-50 group"
          >
            <div className="flex items-center justify-center w-5 h-5 border border-[#1a1a1a] group-hover:border-orange-highlight rounded-full transition-colors duration-300">
              <span 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  logoClicks > 0 ? 'bg-orange-highlight animate-ping' : 'bg-[#1a1a1a] group-hover:bg-orange-highlight animate-pulse'
                }`}
                style={{
                  animationDuration: logoClicks > 0 ? `${Math.max(0.15, 1.2 - logoClicks * 0.25)}s` : undefined
                }}
              />
            </div>
            <span className="font-sans font-bold tracking-widest">
              {logoClicks > 0 ? `George Okello [${logoClicks}/5]` : 'George Okello'}
            </span>
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
  const [isTerminalActive, setIsTerminalActive] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [typedSequence, setTypedSequence] = useState("");

  // Site Easter Egg States
  const [gravityMode, setGravityMode] = useState(false);
  const [neonMode, setNeonMode] = useState(false);
  const [partyMode, setPartyMode] = useState(false);
  const [invertMode, setInvertMode] = useState(false);
  const [showHUD, setShowHUD] = useState(false);

  useEffect(() => {
    // Revert/cleanup dark mode completely
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.remove('theme-transition');
    localStorage.removeItem('theme-preference');

    // Easter egg welcome message in console
    console.log(
      "%c[SYS] Welcome to George Okello's Complex Systems Gateway.%c\nSecret inputs detected: Try typing 'glitch', 'gravity', 'neon', 'party', 'invert', or 'terminal' anywhere on the page to trigger subterranean protocols.",
      "color: #ff5a09; font-weight: bold; font-size: 14px;",
      "color: #8a817c; font-size: 11px;"
    );
  }, []);

  // Sync Easter Eggs to HTML document root classes
  useEffect(() => {
    const root = document.documentElement;
    if (gravityMode) root.classList.add('gravity-active');
    else root.classList.remove('gravity-active');
  }, [gravityMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (neonMode) root.classList.add('neon-active');
    else root.classList.remove('neon-active');
  }, [neonMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (partyMode) root.classList.add('party-active');
    else root.classList.remove('party-active');
  }, [partyMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (invertMode) root.classList.add('invert-active');
    else root.classList.remove('invert-active');
  }, [invertMode]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // ESC key to reset all easter eggs
      if (e.key === "Escape") {
        setGravityMode(false);
        setNeonMode(false);
        setPartyMode(false);
        setInvertMode(false);
        setShowHUD(false);
        return;
      }

      if (key.length === 1 && /^[a-z]$/.test(key)) {
        setTypedSequence((prev) => {
          const next = (prev + key).slice(-12);
          
          if (next.endsWith("glitch")) {
            setGlobalGlitch(true);
            setTimeout(() => {
              setGlobalGlitch(false);
              setIsTerminalActive(true);
            }, 2200);
            return "";
          }
          
          if (next.endsWith("terminal")) {
            setIsTerminalActive(true);
            return "";
          }

          if (next.endsWith("gravity")) {
            setGravityMode((prev) => !prev);
            setShowHUD(true);
            return "";
          }

          if (next.endsWith("neon") || next.endsWith("matrix")) {
            setNeonMode((prev) => !prev);
            setShowHUD(true);
            return "";
          }

          if (next.endsWith("party") || next.endsWith("confetti")) {
            setPartyMode((prev) => !prev);
            setShowHUD(true);
            return "";
          }

          if (next.endsWith("invert")) {
            setInvertMode((prev) => !prev);
            setShowHUD(true);
            return "";
          }

          if (next.endsWith("reset")) {
            setGravityMode(false);
            setNeonMode(false);
            setPartyMode(false);
            setInvertMode(false);
            setShowHUD(false);
            return "";
          }
          
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
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
      <SmoothScroll />
      <CustomCursor />
      
      <AnimatePresence>
        {loading && <InitialLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {isTerminalActive && (
          <TerminalMode onExit={() => setIsTerminalActive(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {globalGlitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0.9, 1] }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-red-950/30 mix-blend-difference pointer-events-none border-8 border-red-500/50 flex flex-col items-center justify-center font-mono text-rose-500 p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_6px] pointer-events-none" />
            <div className="absolute inset-0 bg-red-500/5 mix-blend-color-burn pointer-events-none animate-pulse" />
            
            <div className="bg-black/95 border border-rose-500/50 p-8 rounded shadow-2xl max-w-md text-center space-y-4">
              <span className="w-12 h-12 border border-rose-500 flex items-center justify-center rounded-full text-2xl mx-auto animate-spin">⚡</span>
              <h4 className="text-sm font-bold tracking-[0.25em] uppercase">SYSTEM GLITCH INTRUSION</h4>
              <p className="text-[10px] leading-relaxed text-rose-400">
                CRITICAL BUFFER OVERFLOW. DETECTED SEQUENCE: "GLITCH". FORCING SYSTEM COGNITIVE DOWNSHIFT. REDIRECTING TERMINAL PIPELINE...
              </p>
              <div className="text-[9px] text-slate-500 animate-pulse uppercase">
                re-modulating frequency spectrum in 2000ms
              </div>
            </div>
          </motion.div>
        )}
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
        <Header onActivateTerminal={() => setIsTerminalActive(true)} />
        <main className="relative z-10 mx-auto max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1536px] px-6 md:px-12 lg:px-24 pt-32">
          <Hero />
          <About />
          <InteractiveLab />
          <Publications />
          <Projects />
          <GrantsAndAwards />
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
                    <span className="text-[#8a817c]/20 select-none">•</span>
                    <button 
                      onClick={() => setShowHUD(!showHUD)}
                      className="hover:text-orange-highlight transition-colors font-bold tracking-wider cursor-pointer uppercase text-[7px]"
                    >
                      {showHUD ? '[close_subroutines.sys]' : '[subterranean_subroutines.sys]'}
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

        {/* Subterranean Secrets HUD Control Panel */}
        <AnimatePresence>
          {(gravityMode || neonMode || partyMode || invertMode || showHUD) && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className={`fixed bottom-24 left-6 md:left-8 z-[150] max-w-[280px] sm:max-w-xs w-full backdrop-blur-lg border rounded-xl p-5 shadow-2xl font-mono text-[9px] md:text-[10px] transition-all duration-500 ${
                neonMode 
                  ? 'bg-[#060608]/95 border-[#39ff14]/30 text-[#39ff14] shadow-[#39ff14]/5' 
                  : 'bg-white/80 border-[#1a1a1a]/10 text-[#1a1a1a] shadow-black/5'
              }`}
            >
              <div className={`flex items-center justify-between border-b pb-3 mb-3 ${neonMode ? 'border-[#39ff14]/15' : 'border-[#1a1a1a]/10'}`}>
                <div className="flex items-center gap-2 font-bold tracking-widest text-orange-highlight">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>[SUBTERRANEAN_HUD]</span>
                </div>
                <button
                  onClick={() => {
                    setGravityMode(false);
                    setNeonMode(false);
                    setPartyMode(false);
                    setInvertMode(false);
                    setShowHUD(false);
                  }}
                  className={`hover:text-orange-highlight transition-colors uppercase tracking-widest text-[8px] border px-1.5 py-0.5 rounded cursor-pointer ${
                    neonMode ? 'border-[#39ff14]/25' : 'border-[#1a1a1a]/15'
                  }`}
                >
                  [reset]
                </button>
              </div>

              <p className={`text-[8.5px] mb-3 tracking-wider leading-relaxed ${neonMode ? 'text-[#39ff14]/70' : 'text-slate-500'}`}>
                System subroutines active. Toggle environmental constraints or parameters below:
              </p>

              <div className="space-y-1.5">
                {[
                  { id: "gravity", label: "gravity_override", value: gravityMode, setter: setGravityMode },
                  { id: "neon", label: "cyber_neon_reskin", value: neonMode, setter: setNeonMode },
                  { id: "party", label: "spark_particle_trail", value: partyMode, setter: setPartyMode },
                  { id: "invert", label: "color_inversion", value: invertMode, setter: setInvertMode }
                ].map((item) => (
                  <label 
                    key={item.id}
                    className={`flex items-center justify-between p-2 rounded border border-transparent transition-all duration-200 cursor-pointer group ${
                      neonMode 
                        ? 'hover:bg-[#39ff14]/5 hover:border-[#39ff14]/10' 
                        : 'hover:bg-[#1a1a1a]/5 hover:border-[#1a1a1a]/5'
                    }`}
                  >
                    <span className="tracking-widest uppercase text-[8.5px]">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={item.value}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-200 ${
                      item.value 
                        ? 'bg-orange-highlight border-orange-highlight' 
                        : neonMode 
                          ? 'border-[#39ff14]/40 group-hover:border-[#39ff14]' 
                          : 'border-[#1a1a1a]/30 group-hover:border-orange-highlight'
                    }`}>
                      {item.value && <span className="w-1 h-1 rounded-full bg-white animate-pulse" />}
                    </div>
                  </label>
                ))}
              </div>

              <div className={`mt-3 pt-3 border-t text-[7.5px] flex justify-between items-center ${
                neonMode ? 'border-[#39ff14]/15 text-[#39ff14]/50' : 'border-[#1a1a1a]/5 text-slate-400'
              }`}>
                <span>ESC to reset / close</span>
                <button 
                  onClick={() => setIsTerminalActive(true)}
                  className="text-orange-highlight hover:underline cursor-pointer uppercase font-bold tracking-wider"
                >
                  [open_cli]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Translucent Floating Terminal CLI Button */}
        <motion.button
          onClick={() => setIsTerminalActive(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 left-6 md:left-8 z-40 font-mono text-[9px] uppercase tracking-[0.2em] bg-white/70 hover:bg-[#ff5a09] text-[#1a1a1a] hover:text-white px-4 py-3 border border-[#1a1a1a]/10 hover:border-[#ff5a09]/20 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(255,90,9,0.15)] group"
          aria-label="Open Terminal CLI"
        >
          <Terminal className="w-3.5 h-3.5 text-orange-highlight group-hover:text-white transition-colors duration-300 animate-pulse" />
          <span className="font-bold">[_terminal_cli]</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
