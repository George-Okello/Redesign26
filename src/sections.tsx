import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail, Database, ArrowRight, GraduationCap, Award, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Target, Lightbulb, HelpCircle } from 'lucide-react';
import { publications, industryProjects } from './data';
import { useScrollReveal } from './hooks/useScrollReveal';
import { SwarmSimulation } from './components/SwarmSimulation';
import { CognitiveBiasSimulation } from './components/CognitiveBiasSimulation';
import { SuperTextReveal, SuperParagraphReveal } from './components/SuperTextReveal';

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function useMobileDevice() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobileOrTablet;
}

export function Hero() {
  const content = [
    {
      question: "How do we efficiently decode cognitive load from neural signals?",
      topics: ["Cognitive Neuroscience", "EEG Analysis", "Transformers"]
    },
    {
      question: "What are the simulated neural patterns of bilingual language switching?",
      topics: ["Cognitive Control", "Multilingual NLP", "Neural Representations"]
    },
    {
      question: "How robust are recurrent reinforcement learning agents under noisy observations?",
      topics: ["Reinforcement Learning", "Partial Observability", "Memory Architectures"]
    },
    {
      question: "Can artificial intelligence simulate human cognitive biases?",
      topics: ["Cognitive Biases", "Decision Making", "Multi-Armed Bandits"]
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % content.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      style={{ y, opacity }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-[80vh] flex flex-col justify-center max-w-4xl pt-20"
    >
      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4 items-center mb-8 text-[10px] uppercase tracking-[0.3em] font-bold text-[#8a817c] min-h-[20px]">
        <span className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] animate-pulse" />
          CURRENT FOCUS
        </span>
        <span className="hidden sm:inline opacity-50 shrink-0">•</span>
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.5 }}
            className="hidden sm:flex flex-wrap gap-3 sm:gap-4 items-center"
          >
            {content[currentIdx].topics.map((topic, i) => (
              <span key={topic} className="flex gap-3 sm:gap-4 items-center">
                <span className="whitespace-nowrap">{topic}</span>
                {i < content[currentIdx].topics.length - 1 && <span className="opacity-50">•</span>}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <div className="min-h-[160px] md:min-h-[220px] flex items-center mb-8">
        <AnimatePresence mode="wait">
          <motion.h1 
            key={currentIdx}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif italic font-light tracking-tight leading-[1.1] text-[#1a1a1a]"
          >
            {content[currentIdx].question}
          </motion.h1>
        </AnimatePresence>
      </div>
      
      <motion.p variants={fadeUp} className="text-sm text-[#4a4a4a] max-w-2xl leading-relaxed">
        A digital research repository exploring complex systems, cognitive modeling, and artificial intelligence.
      </motion.p>
    </motion.section>
  );
}

export function About() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="about"
      className="py-24 max-w-4xl"
      {...revealProps}
    >
      <h2 className="text-[10px] font-bold text-[#1a1a1a] mb-8 uppercase tracking-[0.3em]">
        <SuperTextReveal text="Theoretical Foundations" />
      </h2>
      
      <div className="space-y-6 text-base md:text-lg text-[#4a4a4a] leading-relaxed mb-16">
        <p>
          <SuperParagraphReveal text="I have a habit of wandering into questions that don’t have obvious answers. Why do some ideas spread while others disappear? Why do groups cooperate or fall apart? What makes intelligence emerge from a collection of simple interactions?" />
        </p>
        <p>
          <SuperParagraphReveal delay={0.2} text="Most of my work is an excuse to explore those questions from different angles. Sometimes that means building AI systems, sometimes it means writing research, and sometimes it means disappearing down a rabbit hole that starts with one paper and ends fifty tabs later." />
        </p>
      </div>

      <motion.div variants={staggerContainer} className="flex flex-col gap-12 border-t border-[#1a1a1a]/10 pt-16">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
          <div className="md:w-1/4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] pt-2 transition-colors group-hover:text-[#1a1a1a]">Principle I</div>
          <div className="md:w-3/4 text-[#1a1a1a]">
            <h3 className="text-2xl font-serif italic mb-3">Intelligence is Collective</h3>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">Cognition does not exist in a vacuum. It is fundamentally networked—emerging from the dynamic interplay between agents, environments, and information streams.</p>
          </div>
        </motion.div>
        
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
          <div className="md:w-1/4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] pt-2 transition-colors group-hover:text-[#1a1a1a]">Principle II</div>
          <div className="md:w-3/4 text-[#1a1a1a]">
            <h3 className="text-2xl font-serif italic mb-3">Complexity from Simplicity</h3>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">Rather than top-down control, robust systems emerge from simple, localized rules. By understanding these micro-interactions, we can predict and model macro-level phenomena.</p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
          <div className="md:w-1/4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] pt-2 transition-colors group-hover:text-[#1a1a1a]">Principle III</div>
          <div className="md:w-3/4 text-[#1a1a1a]">
            <h3 className="text-2xl font-serif italic mb-3">Constraints Breed Robustness</h3>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">Whether in resource-constrained federated learning networks or the human brain under cognitive load, limitation is the primary catalyst for adaptive, intelligent behavior.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export function InteractiveLab() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="lab"
      className="py-24 max-w-[1200px] w-full mx-auto"
      {...revealProps}
    >
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-[10px] font-bold text-[#1a1a1a] mb-4 uppercase tracking-[0.3em]">
          <SuperTextReveal text="03 / Interactive Lab" />
        </h2>
        <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-4">
          <SuperTextReveal text="Cognitive Architecture Sandbox" delay={0.1} />
        </h3>
        <p className="text-sm text-[#4a4a4a] leading-relaxed max-w-2xl">
          <SuperParagraphReveal text="A visual laboratory mapping the predictable irrationality of cognitive architectures. Interact with dynamic decision trees modeling well-documented cognitive biases." delay={0.2} />
        </p>
      </div>
      <motion.div variants={fadeUp}>
        <CognitiveBiasSimulation />
      </motion.div>
    </motion.section>
  );
}

export function SwarmSection() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="swarm"
      className="py-24 max-w-[1200px] w-full mx-auto"
      {...revealProps}
    >
      <div className="mb-12">
        <h2 className="text-[10px] font-bold text-[#1a1a1a] mb-4 uppercase tracking-[0.3em]">
          <SuperTextReveal text="04 / Current Obsession" />
        </h2>
        <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-4">
          <SuperTextReveal text="Fluid Systems Visualizer" delay={0.1} />
        </h3>
        <p className="text-sm text-[#4a4a4a] max-w-2xl leading-relaxed">
          <SuperParagraphReveal text="Exploring complex adaptive systems, cellular automata, and swarm intelligence algorithms visually. Click inside the viewport to interact directly with the flocking agents." delay={0.2} />
        </p>
      </div>
      <motion.div variants={fadeUp}>
        <SwarmSimulation />
      </motion.div>
    </motion.section>
  );
}

export function Publications() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobileOrTablet = useMobileDevice();
  const publicationsPerPage = 5;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(publications.length / publicationsPerPage);

  return (
    <motion.section 
      id="research"
      ref={sectionRef}
      className="py-24 max-w-4xl"
      {...revealProps}
    >
      <h2 className="text-[10px] font-bold text-[#1a1a1a] mb-12 uppercase tracking-[0.3em]">
        <SuperTextReveal text="Selected Publications" />
      </h2>
      <div className="space-y-6">
        {currentPublications.map((pub, i) => {
          const slideOffset = (i % 2 !== 0) ? 40 : -40;
          const cardAnim = isMobileOrTablet ? {
            initial: { opacity: 0, x: slideOffset, filter: "blur(6px)" },
            whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
            viewport: { once: false, amount: 0.1 },
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          } : { variants: fadeUp };
          return (
            <motion.a 
              key={i} 
              href={pub.link || "#"}
              target={pub.link ? "_blank" : undefined}
              rel={pub.link ? "noopener noreferrer" : undefined}
              className={`group relative flex flex-col gap-2 pt-6 border-t border-[#1a1a1a]/10 hover:border-orange-highlight/30 hover:bg-orange-highlight/[0.02] transition-all duration-300 -mx-6 px-6 ${pub.link ? 'cursor-pointer' : 'cursor-default'}`}
              {...cardAnim}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-serif italic text-[#1a1a1a] group-hover:text-orange-highlight transition-colors duration-300 flex items-center gap-2">
                  <span>{pub.title}</span>
                  {pub.link && <ArrowUpRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />}
                </h3>
                <span className="text-[10px] uppercase tracking-widest bg-[#1a1a1a] group-hover:bg-orange-highlight text-white px-2 py-0.5 mt-1 whitespace-nowrap transition-colors duration-300">
                  {pub.status}
                </span>
              </div>
              {pub.summary && (
                <p className="text-sm text-[#4a4a4a] leading-relaxed mb-2">
                  {pub.summary}
                </p>
              )}
              <div className="flex items-center gap-4 text-[11px] text-[#6a6a6a] pb-6">
                <span>{pub.authors}</span>
                <span>—</span>
                <span>{pub.year}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-[#1a1a1a]/10 hover:border-orange-highlight/40 hover:text-orange-highlight rounded-full transition-all duration-300 bg-[#fdfcfb] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#8a817c]">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-[#1a1a1a]/10 hover:border-orange-highlight/40 hover:text-orange-highlight rounded-full transition-all duration-300 bg-[#fdfcfb] disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.section>
  );
}

export function Projects() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTOPLAY_DURATION = 8000; // 8 seconds per slide
  const STEPS = 100;

  // Custom short titles for the tabs to keep layout clean and modern
  const shortTitles = [
    "3D Campus Game",
    "Epidemiological Modeling",
    "National Data Warehouse",
    "Agricultural Support Engine"
  ];

  // Handle slide changing
  const changeSlide = (newIdx: number, dir: number) => {
    setDirection(dir);
    setActiveIdx(newIdx);
    setProgress(0);
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % industryProjects.length;
    changeSlide(nextIdx, 1);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + industryProjects.length) % industryProjects.length;
    changeSlide(prevIdx, -1);
  };

  // Autoplay Logic
  useEffect(() => {
    if (isPlaying && !isHovered) {
      const stepTime = AUTOPLAY_DURATION / STEPS;
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, stepTime);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, isHovered, activeIdx]);

  const activeProject = industryProjects[activeIdx];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(6px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <motion.section 
      id="projects"
      className="py-24 max-w-5xl relative"
      {...revealProps}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-[0.3em] mb-3">
            <SuperTextReveal text="Industry Implementations" />
          </h2>
          <p className="text-xs text-[#8a817c] uppercase tracking-widest font-bold">
            Interactive Presentation • Slide {activeIdx + 1} of {industryProjects.length}
          </p>
        </div>

        {/* Autoplay Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a]/10 hover:border-orange-highlight/40 px-3 py-1.5 rounded-full bg-[#fdfcfb] transition-all duration-300 group"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 text-orange-highlight animate-pulse" />
                <span className="text-[#4a4a4a] group-hover:text-orange-highlight transition-colors">Autoplay On</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#8a817c] group-hover:text-orange-highlight transition-colors" />
                <span className="text-[#8a817c] group-hover:text-orange-highlight transition-colors">Autoplay Off</span>
              </>
            )}
          </button>

          {/* Manual Arrow Nav */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2 border border-[#1a1a1a]/10 hover:border-orange-highlight/40 hover:text-orange-highlight rounded-full transition-all duration-300 bg-[#fdfcfb]"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 border border-[#1a1a1a]/10 hover:border-orange-highlight/40 hover:text-orange-highlight rounded-full transition-all duration-300 bg-[#fdfcfb]"
              aria-label="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Row for Desktop / Large Tablet */}
      <div className="hidden md:flex items-center gap-2 border-b border-[#1a1a1a]/10 pb-px mb-8 relative">
        {shortTitles.map((title, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={idx}
              onClick={() => changeSlide(idx, idx > activeIdx ? 1 : -1)}
              className={`relative py-4 px-6 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                isActive ? 'text-orange-highlight' : 'text-[#8a817c] hover:text-[#1a1a1a]'
              }`}
            >
              <span className="mr-2 opacity-55">0{idx + 1}.</span>
              {title}
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-orange-highlight z-10"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Project Slide Frame */}
      <div 
        className="relative overflow-hidden bg-[#f5f2ed] border border-[#1a1a1a]/10 hover:border-orange-highlight/20 transition-all duration-500 rounded-none shadow-sm min-h-[460px] flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Delicate animated timer bar at top of card */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#1a1a1a]/5 z-10 overflow-hidden">
            <motion.div 
              className="h-full bg-orange-highlight origin-left"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}

        {/* Translucent background image */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeProject.backgroundImage}
              src={activeProject.backgroundImage}
              alt=""
              className="w-full h-full object-cover filter saturate-[0.55] contrast-[1.05] brightness-[1.02]"
              referrerPolicy="no-referrer"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </AnimatePresence>
          {/* Subtle warm wash and gradient overlay to guarantee extreme legibility */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f2ed] via-[#f5f2ed]/50 to-transparent" />
        </div>

        <div className="p-8 md:p-12 flex-grow relative z-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-8"
            >
              {/* Header */}
              <div>
                <span className="inline-block text-[10px] uppercase tracking-widest font-extrabold text-orange-highlight mb-2">
                  {activeProject.organization}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif italic text-[#1a1a1a] tracking-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Grid: Problem, Objective, Solution */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#1a1a1a]/10">
                
                {/* Problem */}
                <div className="flex flex-col gap-3 group/item">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-highlight/10 border border-orange-highlight/20 text-orange-highlight">
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1a1a1a]">
                      The Problem
                    </h4>
                  </div>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed">
                    {activeProject.problem}
                  </p>
                </div>

                {/* Objective */}
                <div className="flex flex-col gap-3 group/item">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-highlight/10 border border-orange-highlight/20 text-orange-highlight">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1a1a1a]">
                      The Objective
                    </h4>
                  </div>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed">
                    {activeProject.objective}
                  </p>
                </div>

                {/* Solution */}
                <div className="flex flex-col gap-3 group/item">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-highlight/10 border border-orange-highlight/20 text-orange-highlight">
                      <Lightbulb className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#1a1a1a]">
                      The Solution
                    </h4>
                  </div>
                  <p className="text-sm text-[#4a4a4a] leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Metadata & Indicators */}
        <div className="px-8 md:px-12 py-6 border-t border-[#1a1a1a]/5 bg-[#fdfcfb]/40 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex flex-wrap gap-2">
            {activeProject.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[9px] uppercase tracking-widest font-bold text-[#8a817c] border border-[#1a1a1a]/5 px-2.5 py-1 bg-white hover:text-orange-highlight hover:border-orange-highlight/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {industryProjects.map((_, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={idx}
                  onClick={() => changeSlide(idx, idx > activeIdx ? 1 : -1)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-5 bg-orange-highlight' : 'w-1.5 bg-[#8a817c]/30 hover:bg-[#1a1a1a]/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function KaggleSection() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="kaggle"
      className="py-16 max-w-5xl w-full mx-auto px-6 md:px-0"
      {...revealProps}
    >
      <motion.div 
        variants={fadeUp}
        className="relative w-full overflow-hidden bg-[#1d1b18] border border-[#1a1a1a] p-8 md:p-12 group flex flex-col md:flex-row md:items-center justify-between gap-8 transition-shadow duration-300 hover:shadow-xl"
      >
        {/* Subtle decorative grid background for contrast */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fcfaf7_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Left Side Content */}
        <div className="relative z-10 flex-grow max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fcfaf7]/10 text-[#fcfaf7]/90 border border-[#fcfaf7]/10">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#c8c2bc] font-bold">
                More Explorations
              </p>
            </div>
          </div>

          <h3 className="text-3xl md:text-4xl font-serif italic text-[#fcfaf7] mb-4 tracking-tight">
            <SuperTextReveal text="Data Science & Competitions" />
          </h3>
          
          <p className="text-[#c8c2bc] text-sm md:text-base leading-relaxed font-sans font-light">
            <SuperParagraphReveal text="While my selected major works are detailed above, I also actively experiment with datasets, build predictive models, and share notebooks on Kaggle. Explore my other exploratory data analyses and competition entries." />
          </p>
        </div>

        {/* Right Side Button */}
        <div className="relative z-10 flex-shrink-0 self-start md:self-center">
          <motion.a
            href="https://www.kaggle.com/georgeokello"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group/btn inline-flex items-center gap-3 border border-[#fcfaf7]/20 bg-[#fcfaf7]/5 hover:bg-orange-highlight hover:border-orange-highlight text-[#fcfaf7] hover:text-white text-[10px] uppercase tracking-[0.2em] px-8 py-5 rounded-none font-bold transition-all duration-300"
          >
            <Database className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
            <span>Explore Kaggle Notebooks</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function Notes() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="magazine"
      className="py-24 max-w-6xl"
      {...revealProps}
    >
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-4 flex flex-col justify-center">
           <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] mb-4 font-bold border-b border-[#1a1a1a]/10 pb-2 w-fit">
             <SuperTextReveal text="Research Compendium" />
           </span>
           <h3 className="text-3xl md:text-4xl font-serif italic mb-6 leading-tight text-[#1a1a1a]">
             <SuperTextReveal text="Mini Research Reports, Issue No. 1" delay={0.1} />
           </h3>
           <p className="text-[#4a4a4a] text-sm leading-relaxed mb-8">
             <SuperParagraphReveal text="A personal compilation of research adventures investigating the intersection of cognitive science, neuroscience, and AI. Explore exploratory projects on EEG cognitive load classification, bilingual language switching, RL agent robustness, and more." delay={0.2} />
           </p>
           <a 
             href="https://heyzine.com/flip-book/c33e22041c.html" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[10px] uppercase tracking-widest font-bold border border-[#1a1a1a] px-6 py-4 hover:bg-orange-highlight hover:text-white hover:border-orange-highlight transition-all duration-300 flex items-center justify-between w-full max-w-[280px]"
           >
             <span>Read Digital Issue</span>
             <ArrowUpRight className="w-4 h-4" />
           </a>
        </div>
        <div className="lg:col-span-8 bg-[#f5f2ed] border border-[#1a1a1a]/10 p-2 md:p-6 aspect-[4/3] lg:aspect-auto lg:h-[650px] shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
           <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <span className="font-serif italic text-9xl">No. 1</span>
           </div>
           <iframe 
             allow="clipboard-write" 
             scrolling="no" 
             className="w-full h-full relative z-10 rounded shadow-md border border-[#1a1a1a]/5 bg-white" 
             src="https://heyzine.com/flip-book/c33e22041c.html">
           </iframe>
        </div>
      </motion.div>
    </motion.section>
  );
}

export function Contact() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="contact"
      className="py-32 max-w-3xl"
      {...revealProps}
    >
      <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a] mb-8">
        <SuperTextReveal text="Contact" />
      </h2>
      <h2 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-[#1a1a1a] mb-8">
        <SuperTextReveal text="Let's explore questions together." delay={0.1} />
      </h2>
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-12">
        <SuperParagraphReveal text="I am always open to discussing research, collaboration opportunities, or interesting problems in network science and multi-agent systems." delay={0.2} />
      </p>
      <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold">
        <a href="mailto:georgeokelloouma@gmail.com" className="group flex items-center gap-2 text-[#1a1a1a] hover:text-orange-highlight hover:border-orange-highlight transition-colors duration-300 pb-1 border-b border-[#1a1a1a]/20">
          <Mail className="w-4 h-4 text-[#8a817c] group-hover:text-orange-highlight transition-colors duration-300" />
          <span>Email</span>
        </a>
        <a href="https://www.linkedin.com/in/georgeokelloouma" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[#1a1a1a] hover:text-orange-highlight hover:border-orange-highlight transition-colors duration-300 pb-1 border-b border-[#1a1a1a]/20">
          <Linkedin className="w-4 h-4 text-[#8a817c] group-hover:text-orange-highlight transition-colors duration-300" />
          <span>LinkedIn</span>
        </a>
      </div>
    </motion.section>
  );
}
