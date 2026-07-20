import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Github, Linkedin, Mail, Database, ArrowRight, GraduationCap, Award, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Target, Lightbulb, HelpCircle, ArrowUp, Globe, Cpu, Layers, Wifi, BookOpen } from 'lucide-react';
import { publications, industryProjects, awards, AwardItem } from './data';
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

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
  maxTranslate?: number;
  key?: React.Key;
}

function MagneticCard({ children, className = "", maxRotate = 4, maxTranslate = 8 }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set((mouseX / (width / 2)) * maxTranslate);
    y.set((mouseY / (height / 2)) * maxTranslate);
    rotateX.set(-(mouseY / (height / 2)) * maxRotate);
    rotateY.set((mouseX / (width / 2)) * maxRotate);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
      topPill: "Neural Signal Processing",
      question: "How can we deploy efficient, interpretable cognitive load monitoring on edge devices?",
      subtitle: "A comparative study of lightweight CNN and Transformer models on EEG data.",
      currentFocus: {
        title: "Edge Deployment",
        desc: "Low-latency brain-computer interfaces"
      },
      selectedInquiry: {
        title: "Attention Mechanisms",
        desc: "Interpreting transformer temporal patterns"
      }
    },
    {
      topPill: "Cognitive Modeling",
      question: "What cognitive control processes govern bilingual language transitions?",
      subtitle: "Computational simulation of code-switching using multilingual BERT representations.",
      currentFocus: {
        title: "Neural Trajectories",
        desc: "Continuous transitions in representational space"
      },
      selectedInquiry: {
        title: "Switch Costs",
        desc: "Symmetric control demands across languages"
      }
    },
    {
      topPill: "Reinforcement Learning",
      question: "How do recurrent RL architectures compare under degraded, noisy observation settings?",
      subtitle: "Evaluating LSTM-augmented DQNs in visually occluded working memory tasks.",
      currentFocus: {
        title: "Observation Noise",
        desc: "Resilience in partially observable environments"
      },
      selectedInquiry: {
        title: "Memory Capacity",
        desc: "Temporal credit assignment under constraints"
      }
    },
    {
      topPill: "Affective Computing",
      question: "Can CNN-based emotion recognition systems generalize across culturally diverse populations?",
      subtitle: "Developing culturally robust facial expression recognition architectures.",
      currentFocus: {
        title: "Cultural Fairness",
        desc: "Mitigating demographic bias in emotion AI"
      },
      selectedInquiry: {
        title: "Attention Fusion",
        desc: "Multi-scale features for expression nuances"
      }
    },
    {
      topPill: "Behavioral AI",
      question: "What happens when reinforcement learning agents exhibit human cognitive biases?",
      subtitle: "Simulating loss aversion, anchoring, and optimism in a multi-armed bandit problem.",
      currentFocus: {
        title: "Cognitive Biases",
        desc: "Loss aversion, anchoring, and confirmation bias"
      },
      selectedInquiry: {
        title: "Exploration Strategies",
        desc: "How optimism bias accelerates learning"
      }
    },
    {
      topPill: "Multi-Agent Systems",
      question: "How do social hierarchies and trust naturally emerge in AI populations?",
      subtitle: "Computational modelling of trust dynamics using multi-agent reinforcement learning.",
      currentFocus: {
        title: "Emergent Social Structures",
        desc: "Decentralized interactions forming hierarchies"
      },
      selectedInquiry: {
        title: "Network Constraints",
        desc: "Role of sparsity and logarithmic growth"
      }
    },
    {
      topPill: "Federated Learning",
      question: "How to make Federated Learning equitable in infrastructure-constrained environments?",
      subtitle: "A framework for improving asynchronous federated learning in resource-constrained networks.",
      currentFocus: {
        title: "Infrastructure Resilience",
        desc: "Addressing loadshedding in Sub-Saharan Africa"
      },
      selectedInquiry: {
        title: "Drift-Corrected Aggregation",
        desc: "Realigning stale gradients"
      }
    },
    {
      topPill: "Multimodal Fusion",
      question: "How does multimodal fusion accuracy hold up under deployment constraints?",
      subtitle: "Proposing a reporting norm to bridge the gap between multimodal fusion research and MLOps.",
      currentFocus: {
        title: "Deployment Vacuum",
        desc: "Bridging research benchmarks and MLOps"
      },
      selectedInquiry: {
        title: "Constraint-Aware Evaluation",
        desc: "Measuring accuracy against missing modalities"
      }
    },
    {
      topPill: "Neuro-Symbolic AI",
      question: "How to combine fairness and formal verification in neuro-symbolic AI?",
      subtitle: "A review of neuro-symbolic architectures for verifiable decision-making in high-stakes domains.",
      currentFocus: {
        title: "Verifiable Decision-Making",
        desc: "High-stakes domains like healthcare & finance"
      },
      selectedInquiry: {
        title: "Fairness by Design",
        desc: "Building safety into the architecture"
      }
    },
    {
      topPill: "Cultural Preservation",
      question: "How to preserve indigenous cultural heritage using Large Language Models?",
      subtitle: "Developing a CHAT-informed conversational agent to preserve the Kenyan traditional game Bano.",
      currentFocus: {
        title: "Digital Mediation",
        desc: "Balancing embodied knowledge and AI"
      },
      selectedInquiry: {
        title: "CHAT Framework",
        desc: "Evaluating Cultural Preservation Effectiveness"
      }
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
      className="min-h-[100vh] flex flex-col items-center justify-center pt-20 relative w-full"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-[#1a1a1a]/5 border border-[#1a1a1a]/10 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-[#8a817c]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-highlight animate-pulse" />
            {content[currentIdx].topPill}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <div className="min-h-[160px] md:min-h-[220px] flex flex-col items-center justify-center mb-8 max-w-5xl w-full">
        <AnimatePresence mode="wait">
          <motion.h1 
            key={currentIdx}
            initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif italic font-light tracking-tight leading-[1.05] text-[#1a1a1a] text-center"
          >
            {content[currentIdx].question}
          </motion.h1>
        </AnimatePresence>
      </div>
      
      <div className="min-h-[60px] max-w-2xl w-full mb-16 text-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentIdx}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light"
          >
            {content[currentIdx].subtitle}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bottom Cards */}
      <div className="absolute -bottom-16 left-[50%] w-screen -translate-x-1/2 flex justify-between items-end pb-0 px-4 md:px-12 lg:px-20 pointer-events-none z-20">
        {/* Current Focus - Left */}
        <div className="hidden md:block w-72 lg:w-80 border border-[#1a1a1a]/5 rounded-xl p-8 bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative overflow-hidden text-left pointer-events-auto hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-orange-highlight to-orange-highlight/10" />
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-orange-highlight mb-4">Current Focus</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 15, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-base font-bold text-[#1a1a1a] mb-2 leading-snug">{content[currentIdx].currentFocus.title}</h3>
              <p className="text-sm text-[#8a817c] italic leading-relaxed">{content[currentIdx].currentFocus.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8a817c] text-center w-full md:w-auto absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center">
          <span className="mb-6 opacity-60">SCROLL</span>
          <div className="w-[1px] h-24 bg-gradient-to-b from-[#1a1a1a]/0 via-[#1a1a1a]/10 to-[#1a1a1a]/0 relative overflow-hidden">
            <motion.div
              className="w-full h-[150%] bg-gradient-to-b from-orange-highlight/0 via-orange-highlight to-orange-highlight/0 absolute top-0 left-0"
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Selected Inquiry - Right */}
        <div className="hidden md:block w-72 lg:w-80 border border-[#1a1a1a]/5 rounded-xl p-8 bg-white/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] relative overflow-hidden text-right pointer-events-auto hover:shadow-[0_16px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
          <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-orange-highlight to-orange-highlight/10" />
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-orange-highlight mb-4">Selected Inquiry</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 15, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -15, filter: "blur(4px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-base font-bold text-[#1a1a1a] mb-2 leading-snug">{content[currentIdx].selectedInquiry.title}</h3>
              <p className="text-sm text-[#8a817c] italic leading-relaxed">{content[currentIdx].selectedInquiry.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

export function About() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      id="about"
      className="pt-56 pb-24 max-w-4xl"
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

      {/* Core Research Areas/Domains */}
      <div className="mb-24">
        <h3 className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-[0.25em] mb-8">Active Research Domains</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Network Science",
            "Computational Neuroscience",
            "Cognitive Science & Behavioral AI",
            "Neural Signal Processing (EEG-Based)",
            "Bilingual Language Dynamics",
            "Multi-Agent Reinforcement Learning",
            "Interpretable & Explainable AI",
            "Complex Adaptive Systems"
          ].map((area, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <motion.div
                animate={{ y: [0, (idx % 2 === 0 ? -4 : 4), 0] }}
                transition={{ 
                  duration: 4 + (idx % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: idx * 0.2
                }}
                whileHover={{ scale: 1.05, rotate: (idx % 2 === 0 ? 1 : -1) }}
                whileTap={{ scale: 0.95 }}
                className="relative group px-5 py-3 bg-[#fcfaf7] hover:bg-[#1a1a1a] text-[#4a4a4a] hover:text-[#fcfaf7] active:bg-[#1a1a1a] active:text-[#fcfaf7] border border-[#1a1a1a]/10 hover:border-[#1a1a1a] active:border-[#1a1a1a] rounded-full text-[10px] uppercase tracking-widest font-semibold transition-colors duration-500 cursor-default flex items-center gap-3 select-none shadow-sm hover:shadow-lg active:shadow-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/20 group-hover:bg-orange-highlight group-active:bg-orange-highlight transition-colors duration-500" />
                <span className="relative z-10">{area}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={staggerContainer} className="flex flex-col gap-12 border-t border-[#1a1a1a]/10 pt-16">
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 md:gap-8 group">
          <div className="md:w-1/4 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] pt-2 transition-colors group-hover:text-[#1a1a1a]">Principle I</div>
          <div className="md:w-3/4 text-[#1a1a1a]">
            <h3 className="text-2xl font-serif italic mb-3">Intelligence is Collective</h3>
            <p className="text-sm text-[#4a4a4a] leading-relaxed">Cognition does not exist in a vacuum. It is fundamentally networked, emerging from the dynamic interplay between agents, environments, and information streams.</p>
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
      className="py-16 w-full mx-auto max-w-7xl xl:max-w-none"
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
      <motion.div 
        variants={fadeUp}
        className="w-[100vw] relative left-1/2 -translate-x-1/2 px-4 md:px-8 lg:px-8 xl:px-8 2xl:px-12"
      >
        <div className="mx-auto w-full max-w-[1920px]">
          <CognitiveBiasSimulation />
        </div>
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
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const publicationsPerPage = 5;

  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = publications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(publications.length / publicationsPerPage);

  useEffect(() => {
    if (currentPage > 1) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.section 
      id="research"
      ref={sectionRef}
      className="py-24 max-w-4xl"
      {...revealProps}
    >
      <div className="mb-20">
        <h2 className="text-[10px] font-bold text-[#1a1a1a] mb-8 uppercase tracking-[0.3em]">
          <SuperTextReveal text="Research Journey" />
        </h2>
      </div>
      
      <div className="space-y-12">
        {currentPublications.map((pub, i) => {
          const isExpanded = expandedId === i;
          return (
            <motion.div 
              key={i} 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <div 
                className="cursor-pointer"
                onClick={() => toggleExpand(i)}
              >
                <h3 className="text-3xl md:text-4xl font-serif italic text-[#1a1a1a] group-hover:text-orange-highlight transition-colors duration-300 leading-tight">
                  {pub.hookQuestion}
                </h3>
                <div className="flex items-center gap-3 mt-5 mb-4">
                  <div className="w-8 h-[1px] bg-orange-highlight/50"></div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a817c] font-bold">
                    By {pub.authors} • {pub.year}
                  </p>
                </div>
                <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-serif">
                  {pub.summary}
                </p>
                <div className="flex gap-4 mt-6 text-[10px] uppercase tracking-widest font-bold text-orange-highlight">
                  <span>{isExpanded ? "Close Story" : "Read the Story & Open Questions →"}</span>
                </div>
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 mt-8 border-t border-[#1a1a1a]/10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                      <div className="md:col-span-7 space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c]">Behind the Paper</h4>
                        <p className="text-base md:text-lg text-[#1a1a1a] font-serif leading-relaxed">
                          <span className="float-left text-3xl mr-2 mt-1 font-bold text-orange-highlight leading-none">{pub.behindThePaper.charAt(0)}</span>
                          {pub.behindThePaper.substring(1)}
                        </p>
                      </div>
                      <div className="md:col-span-5 bg-orange-highlight/[0.03] p-6 rounded-sm border border-orange-highlight/10 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-orange-highlight">The Unanswered Question</h4>
                          <p className="text-sm text-[#4a4a4a] leading-relaxed italic">
                            "{pub.unanswered}"
                          </p>
                        </div>
                        {pub.link && (
                          <div className="pt-4 mt-6 border-t border-orange-highlight/20">
                            <a 
                              href={pub.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] hover:text-orange-highlight transition-colors"
                            >
                              Read the Full Paper →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-24">
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
  
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set((mouseX / (width / 2)) * 6); // subtle translate
    y.set((mouseY / (height / 2)) * 6);
    rotateX.set(-(mouseY / (height / 2)) * 3); // subtle rotate
    rotateY.set((mouseX / (width / 2)) * 3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

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
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          x: smoothX,
          y: smoothY,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="relative overflow-hidden bg-[#f5f2ed] border border-[#1a1a1a]/10 hover:border-orange-highlight/20 transition-all duration-500 rounded-none shadow-sm min-h-[460px] flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
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
      </motion.div>
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
      <MagneticCard maxRotate={3} maxTranslate={6} className="w-full">
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
      </MagneticCard>
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

const fieldNotes = [
  {
    title: "On Modeling Human Irrationality",
    date: "October 2025",
    content: "What happens when you code an AI to hate losing more than it loves winning? By giving a standard reinforcement learning agent the human flaw of 'loss aversion' and dropping it into a multi-armed bandit problem, I expected a drop in performance. Surprisingly, the 'flawed' agent learned faster than the perfectly rational one. It turns out some of our cognitive biases aren't bugs, they're highly efficient heuristics for navigating uncertainty."
  },
  {
    title: "The Neural Geography of Language",
    date: "July 2025",
    content: "Is language switching a sudden jump or a continuous glide? By plotting the neural trajectories of a multilingual transformer moving between English and Spanish, I found no discrete jumps. The model glided smoothly through intermediate, mixed-language representational states. It suggests that code-switching isn't about flipping a switch; it's about navigating a continuous semantic space."
  },
  {
    title: "Cultural Blind Spots in Vision Models",
    date: "July 2025",
    content: "Facial expression recognition models boast 90%+ accuracy in the lab, but drop significantly when deployed across diverse populations. Training a CNN on a culturally balanced dataset revealed something critical: standard convolutional layers capture the pixels, but they miss the cultural nuance. Adding a spatial attention mechanism helped the model learn where different cultures express emotion, not just how."
  }
];

export function ArchivedFieldNotes() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  return (
    <motion.section 
      className="py-12 max-w-6xl mb-12"
      {...revealProps}
    >
      <div className="mb-12">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] font-bold border-b border-[#1a1a1a]/10 pb-2">
          <SuperTextReveal text="Archived Field Notes" />
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fieldNotes.map((note, idx) => (
          <MagneticCard key={idx} maxRotate={4} maxTranslate={8} className="relative">
            <motion.div 
              variants={fadeUp}
              className="border-t border-[#1a1a1a]/10 pt-6 group relative h-full"
            >
              <div className="absolute inset-0 bg-[#1a1a1a]/[0.03] -m-4 p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-serif italic text-[#1a1a1a] group-hover:text-orange-highlight transition-colors duration-300">
                    {note.title}
                  </h4>
                </div>
                <p className="text-sm text-[#4a4a4a] leading-relaxed mb-6">
                  {note.content}
                </p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[#8a817c]">
                  {note.date}
                </p>
              </div>
            </motion.div>
          </MagneticCard>
        ))}
      </div>
    </motion.section>
  );
}

function AgriIoTTokenVisualizer() {
  const iotNode = { x: 50, y: 100 };
  const llmAdvisor = { x: 150, y: 100 };
  const farmerWallet = { x: 250, y: 100 };

  return (
    <svg className="w-full h-full max-w-[300px]" viewBox="0 0 300 200">
      {/* Dashed connector lines */}
      <line
        x1={iotNode.x}
        y1={iotNode.y}
        x2={llmAdvisor.x}
        y2={llmAdvisor.y}
        stroke="#1a1a1a"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 4"
      />
      <line
        x1={llmAdvisor.x}
        y1={llmAdvisor.y}
        x2={farmerWallet.x}
        y2={farmerWallet.y}
        stroke="#1a1a1a"
        strokeWidth="1"
        strokeOpacity="0.15"
        strokeDasharray="4 4"
      />

      {/* IoT Soil Telemetry Pulse (Left -> Center) */}
      <motion.circle
        r="3.5"
        fill="#39ff14"
        initial={{ cx: iotNode.x, cy: iotNode.y }}
        animate={{
          cx: [iotNode.x, llmAdvisor.x],
          cy: [iotNode.y, llmAdvisor.y],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* LLM Advisory Pulse (Center -> Right) */}
      <motion.circle
        r="3"
        fill="#ff5a09"
        initial={{ cx: llmAdvisor.x, cy: llmAdvisor.y }}
        animate={{
          cx: [llmAdvisor.x, farmerWallet.x],
          cy: [llmAdvisor.y, farmerWallet.y],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut"
        }}
      />

      {/* Reward Tokens floating (Center -> Right, curved/bouncy float) */}
      <motion.circle
        r="4.5"
        fill="#ffea00"
        stroke="#ff5a09"
        strokeWidth="0.5"
        initial={{ cx: llmAdvisor.x, cy: llmAdvisor.y }}
        animate={{
          cx: [llmAdvisor.x, (llmAdvisor.x + farmerWallet.x) / 2, farmerWallet.x],
          cy: [llmAdvisor.y, llmAdvisor.y - 30, farmerWallet.y],
          scale: [0.5, 1.2, 0.8],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.2,
          ease: "easeOut"
        }}
      />
      <motion.circle
        r="3"
        fill="#ffea00"
        stroke="#ff5a09"
        strokeWidth="0.5"
        initial={{ cx: llmAdvisor.x, cy: llmAdvisor.y }}
        animate={{
          cx: [llmAdvisor.x, (llmAdvisor.x + farmerWallet.x) / 2, farmerWallet.x],
          cy: [llmAdvisor.y, llmAdvisor.y + 20, farmerWallet.y],
          scale: [0.5, 1, 0.6],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.4,
          ease: "easeOut"
        }}
      />

      {/* IoT Sensor Node (Left) */}
      <g>
        <motion.circle
          cx={iotNode.x}
          cy={iotNode.y}
          r="10"
          fill="#fff"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          whileHover={{ scale: 1.15 }}
        />
        {/* Tiny solar panel on top */}
        <rect x={iotNode.x - 7} y={iotNode.y - 14} width="14" height="4" fill="#1a1a1a" rx="1" />
        <line x1={iotNode.x} y1={iotNode.y - 10} x2={iotNode.x} y2={iotNode.y} stroke="#1a1a1a" strokeWidth="1" />
        <circle cx={iotNode.x} cy={iotNode.y} r="3" fill="#39ff14" />
        {/* Radiating wave */}
        <motion.circle
          cx={iotNode.x}
          cy={iotNode.y}
          r="16"
          fill="none"
          stroke="#39ff14"
          strokeWidth="0.5"
          initial={{ opacity: 0.6, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.4 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </g>

      {/* LLM Advisory Core Node (Center) */}
      <g>
        <motion.rect
          x={llmAdvisor.x - 15}
          y={llmAdvisor.y - 15}
          width="30"
          height="30"
          rx="6"
          fill="#1a1a1a"
          stroke="#ff5a09"
          strokeWidth="1.5"
          animate={{
            strokeWidth: [1.5, 2.5, 1.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <text x={llmAdvisor.x} y={llmAdvisor.y + 3} textAnchor="middle" className="text-[7px] font-mono font-bold fill-white">
          AGRI-LLM
        </text>
      </g>

      {/* Farmer Wallet/App Node (Right) */}
      <g>
        <motion.circle
          cx={farmerWallet.x}
          cy={farmerWallet.y}
          r="12"
          fill="#fff"
          stroke="#1a1a1a"
          strokeWidth="1.5"
          whileHover={{ scale: 1.15 }}
        />
        {/* Draw tiny mobile device inside */}
        <rect x={farmerWallet.x - 4} y={farmerWallet.y - 7} width="8" height="14" rx="1" fill="#1a1a1a" />
        <rect x={farmerWallet.x - 3} y={farmerWallet.y - 5} width="6" height="10" fill="#fff" />
        {/* Tiny golden token on device */}
        <circle cx={farmerWallet.x} cy={farmerWallet.y} r="2" fill="#ffea00" stroke="#ff5a09" strokeWidth="0.5" />
      </g>

      {/* Labels */}
      <text x={iotNode.x} y={iotNode.y + 26} textAnchor="middle" className="text-[7px] font-mono font-bold uppercase tracking-wider fill-[#1a1a1a]">
        IoT Solar Sensor
      </text>
      <text x={iotNode.x} y={iotNode.y + 34} textAnchor="middle" className="text-[5.5px] font-mono fill-[#8a817c]">
        Soil, NPK, H2O
      </text>

      <text x={llmAdvisor.x} y={llmAdvisor.y - 22} textAnchor="middle" className="text-[7px] font-mono font-bold uppercase tracking-wider fill-[#1a1a1a]">
        Cognitive Advisory
      </text>
      <text x={llmAdvisor.x} y={llmAdvisor.y + 26} textAnchor="middle" className="text-[5.5px] font-mono fill-[#8a817c]">
        Prompt-to-Action
      </text>

      <text x={farmerWallet.x} y={farmerWallet.y + 26} textAnchor="middle" className="text-[7px] font-mono font-bold uppercase tracking-wider fill-[#1a1a1a]">
        Farmer Wallet App
      </text>
      <text x={farmerWallet.x} y={farmerWallet.y + 34} textAnchor="middle" className="text-[5.5px] font-mono fill-emerald-600 font-bold">
        +AgriTokens Earned
      </text>
    </svg>
  );
}

function AgriDecisionVisualizer() {
  const satellite = { x: 40, y: 100 };
  const engine = { x: 150, y: 100 };
  const gate = { x: 260, y: 100 };

  return (
    <svg className="w-full h-full max-w-[300px]" viewBox="0 0 300 200">
      {/* Background connection paths */}
      <path
        d={`M ${satellite.x} ${satellite.y} L ${engine.x} ${engine.y} L ${gate.x} ${gate.y}`}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeOpacity="0.1"
      />

      {/* Atmospheric climatology data waves */}
      <motion.path
        d="M 10 70 Q 25 80 40 70 T 70 70"
        fill="none"
        stroke="#ff5a09"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{
          d: [
            "M 10 70 Q 25 80 40 70 T 70 70",
            "M 10 80 Q 25 70 40 80 T 70 80",
            "M 10 70 Q 25 80 40 70 T 70 70"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 10 130 Q 25 140 40 130 T 70 130"
        fill="none"
        stroke="#ff5a09"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{
          d: [
            "M 10 130 Q 25 140 40 130 T 70 130",
            "M 10 120 Q 25 130 40 120 T 70 120",
            "M 10 130 Q 25 140 40 130 T 70 130"
          ]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Climatology Data packet flowing (Satellite -> NLP Engine) */}
      <motion.circle
        r="4"
        fill="#ff5a09"
        initial={{ cx: satellite.x, cy: satellite.y }}
        animate={{
          cx: [satellite.x, engine.x],
          cy: [satellite.y, engine.y],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeIn"
        }}
      />

      {/* SMS Packet flowing (NLP Engine -> SMS Gateway) */}
      <motion.circle
        r="3"
        fill="#1a1a1a"
        initial={{ cx: engine.x, cy: engine.y }}
        animate={{
          cx: [engine.x, gate.x],
          cy: [engine.y, gate.y],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 1.25,
          ease: "easeOut"
        }}
      />

      {/* Wireless signal expansion from SMS Gateway */}
      <motion.circle
        cx={gate.x}
        cy={gate.y}
        r="6"
        fill="none"
        stroke="#ff5a09"
        strokeWidth="0.5"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.circle
        cx={gate.x}
        cy={gate.y}
        r="6"
        fill="none"
        stroke="#ff5a09"
        strokeWidth="0.5"
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          delay: 0.66,
          ease: "easeOut"
        }}
      />

      {/* Satellite Node */}
      <g transform={`translate(${satellite.x}, ${satellite.y})`}>
        <circle cx="0" cy="0" r="10" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Draw custom little satellite panel representation */}
        <rect x="-14" y="-2" width="4" height="4" fill="#ff5a09" stroke="#1a1a1a" strokeWidth="0.5" />
        <rect x="10" y="-2" width="4" height="4" fill="#ff5a09" stroke="#1a1a1a" strokeWidth="0.5" />
      </g>

      {/* NLP Translation Engine Node */}
      <g>
        <rect x={engine.x - 14} y={engine.y - 14} width="28" height="28" rx="6" fill="#1a1a1a" stroke="#ff5a09" strokeWidth="1.5" />
        <text x={engine.x} y={engine.y + 3} textAnchor="middle" className="text-[7px] font-mono font-bold fill-white">
          NLP
        </text>
        {/* Neural nodes connections around the engine */}
        <circle cx={engine.x - 22} cy={engine.y} r="2" fill="#ff5a09" />
        <circle cx={engine.x + 22} cy={engine.y} r="2" fill="#ff5a09" />
      </g>

      {/* SMS Broadcast Tower Node */}
      <g>
        <circle cx={gate.x} cy={gate.y} r="10" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
        {/* Simple tower representation lines */}
        <line x1={gate.x} y1={gate.y - 6} x2={gate.x - 4} y2={gate.y + 6} stroke="#1a1a1a" strokeWidth="1" />
        <line x1={gate.x} y1={gate.y - 6} x2={gate.x + 4} y2={gate.y + 6} stroke="#1a1a1a" strokeWidth="1" />
        <line x1={gate.x - 3} y1={gate.y + 2} x2={gate.x + 3} y2={gate.y + 2} stroke="#1a1a1a" strokeWidth="0.7" />
        <circle cx={gate.x} cy={gate.y - 6} r="2" fill="#ff5a09" />
      </g>

      {/* Node Labels */}
      <text x={satellite.x} y={satellite.y + 26} textAnchor="middle" className="text-[7.5px] font-mono font-bold tracking-wider uppercase fill-[#1a1a1a]">
        Meteorological Core
      </text>
      <text x={engine.x} y={engine.y + 26} textAnchor="middle" className="text-[7.5px] font-mono font-bold tracking-wider uppercase fill-[#1a1a1a]">
        Socio-Translation Engine
      </text>
      <text x={gate.x} y={gate.y + 26} textAnchor="middle" className="text-[7.5px] font-mono font-bold tracking-wider uppercase fill-[#1a1a1a]">
        Cell Broadcast Node
      </text>
    </svg>
  );
}

export function GrantsAndAwards() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const activeAward = awards[activeIndex];

  const awardCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + idx * 0.12,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      }
    })
  };

  return (
    <motion.section 
      id="grants-awards"
      className="py-24 max-w-6xl w-full mx-auto px-6 md:px-0"
      {...revealProps}
    >
      {/* Title */}
      <div className="mb-16 border-b border-[#1a1a1a]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a] font-bold block mb-3">
            <SuperTextReveal text="Institutional Recognition" />
          </span>
          <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] tracking-tight">
            <SuperTextReveal text="Grants & Awards" delay={0.1} />
          </h2>
        </div>
        <p className="text-xs text-[#8a817c] font-mono tracking-widest max-w-xs uppercase leading-relaxed">
          Socio-technical systems research funded by global foundations and technological initiatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left column: Award list */}
        <div className="lg:col-span-5 space-y-4">
          {awards.map((award, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={idx}
                variants={awardCardVariants}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`group cursor-pointer p-6 border transition-all duration-500 rounded-xl relative overflow-hidden ${
                  isActive
                    ? 'bg-white border-[#1a1a1a] shadow-lg shadow-black/5'
                    : 'bg-[#fcfaf7]/50 border-[#1a1a1a]/5 hover:border-[#1a1a1a]/20 hover:bg-white/80'
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active glow accent */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-highlight transition-all duration-500 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />

                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-[#8a817c] font-bold flex items-center gap-1.5">
                      {award.organization} • {award.year}
                      {idx === 0 && (
                        <span className="bg-emerald-100 text-emerald-800 text-[8px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                          IoT + Token Model
                        </span>
                      )}
                    </span>
                    <h3 className={`text-xl font-serif italic transition-colors duration-300 ${
                      isActive ? 'text-orange-highlight' : 'text-[#1a1a1a] group-hover:text-orange-highlight'
                    }`}>
                      {award.title}
                    </h3>
                  </div>

                  {/* Dynamic interactive token reward badge on hover */}
                  <div className="relative flex items-center justify-center">
                    {/* Ripple shockwave */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{ scale: 2.2, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          className="absolute inset-0 rounded-full bg-amber-400 pointer-events-none"
                        />
                      )}
                    </AnimatePresence>

                    {/* Floating tokens collector text */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ y: 0, opacity: 0, scale: 0.7 }}
                          animate={{ y: -26, opacity: [0, 1, 1, 0], scale: [0.7, 1.1, 0.9] }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeOut"
                          }}
                          className="absolute bg-amber-400 text-black text-[7.5px] font-mono font-black px-1.5 py-0.5 rounded-md shadow-md border border-amber-500 flex items-center gap-0.5 z-20"
                        >
                          <span>★</span>
                          <span>+10</span>
                          <span className="text-[5px] font-bold">TOKENS</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Badge base */}
                    <div className={`p-2 rounded-full border transition-all duration-500 relative z-10 ${
                      isActive 
                        ? 'bg-orange-highlight/10 border-orange-highlight/20 text-orange-highlight shadow-sm' 
                        : 'bg-[#1a1a1a]/5 border-transparent text-[#8a817c] group-hover:text-amber-600 group-hover:border-amber-400/30 group-hover:bg-amber-500/10'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#4a4a4a] leading-relaxed mt-4 font-sans text-left line-clamp-2">
                  {award.description}
                </p>

                {award.website && (
                  <div className="mt-4 flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-bold text-[#8a817c] group-hover:text-orange-highlight transition-colors">
                    <span>Explore Initiative</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Immersive Context Display */}
        <div className="lg:col-span-7 bg-white border border-[#1a1a1a]/5 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
          {/* Subtle dotted background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 space-y-6 text-left"
            >
              {/* Header */}
              <div className="border-b border-[#1a1a1a]/5 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-highlight animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest font-mono text-orange-highlight font-extrabold">
                    Research Context Hub
                  </span>
                </div>
                <h3 className="text-2xl font-serif italic text-[#1a1a1a] leading-tight">
                  {activeAward.title}
                </h3>
                <p className="text-xs text-[#8a817c] font-sans mt-1">
                  Funded by <span className="font-semibold">{activeAward.organization}</span> • {activeAward.year}
                </p>
              </div>

              {/* Extended Narrative Context */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c]">The Socio-Technical Impact</h4>
                <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed font-serif">
                  {activeAward.extendedContext}
                </p>
              </div>

              {/* Interactive/Animated SVG Visualizer */}
              <div className="bg-[#fcfaf7] border border-[#1a1a1a]/5 rounded-xl p-4 md:p-6 overflow-hidden relative">
                <div className="absolute top-3 right-4 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[8px] font-mono uppercase text-emerald-600 tracking-widest">Active Simulation</span>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  {activeIndex === 0 ? (
                    <AgriIoTTokenVisualizer />
                  ) : (
                    <AgriDecisionVisualizer />
                  )}
                </div>

                <div className="mt-4 border-t border-[#1a1a1a]/5 pt-3 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-[#8a817c]">
                  <span>System: {activeIndex === 0 ? "Smart Agricultural IoT-Mesh" : "Socio-Technical Data Pipeline"}</span>
                  <span>Model: {activeIndex === 0 ? "Agri-LLM Advisory + Tokenomics Engine" : "Local Climatology NLP Engine"}</span>
                </div>
              </div>

              {/* Scientific Focus & Tech Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1a1a1a]/5">
                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-orange-highlight" />
                    <span>Scientific Focus</span>
                  </h4>
                  <p className="text-xs text-[#4a4a4a] leading-relaxed">
                    {activeAward.scientificFocus}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a817c] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-orange-highlight" />
                    <span>Key Architectural Pillars</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeAward.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[8.5px] uppercase tracking-wider font-bold text-[#1a1a1a] bg-[#fcfaf7] border border-[#1a1a1a]/5 px-2.5 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links & External Exploration */}
              {activeAward.website && (
                <div className="pt-4 border-t border-[#1a1a1a]/5 flex justify-end">
                  <motion.a
                    href={activeAward.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-orange-highlight text-white text-[9px] uppercase tracking-[0.2em] px-5 py-3 font-bold transition-all duration-300 rounded-lg shadow-sm"
                  >
                    <span>Verify Institutional Context</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
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
      <p className="text-sm text-[#4a4a4a] leading-relaxed mb-8">
        <SuperParagraphReveal text="I am always open to discussing research, collaboration opportunities, or interesting problems in network science and multi-agent systems." delay={0.2} />
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-16">
        <div className="flex flex-col gap-8 w-full md:w-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-highlight opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-highlight"></span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">
              Open to research collaborations
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
            <motion.a 
              href="mailto:georgeokelloouma@gmail.com" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between gap-8 bg-white border border-[#1a1a1a]/10 px-6 py-4 rounded-full shadow-sm hover:shadow-md hover:border-[#1a1a1a]/20 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f4f1eb] flex items-center justify-center group-hover:bg-orange-highlight/10 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-[#1a1a1a] group-hover:text-orange-highlight transition-colors duration-300" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">Email</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8a817c] group-hover:text-orange-highlight group-hover:-rotate-45 transition-all duration-300" />
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/georgeokelloouma" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-between gap-8 bg-white border border-[#1a1a1a]/10 px-6 py-4 rounded-full shadow-sm hover:shadow-md hover:border-[#1a1a1a]/20 transition-all duration-300 w-full sm:w-auto"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f4f1eb] flex items-center justify-center group-hover:bg-[#0077b5]/10 transition-colors duration-300">
                  <Linkedin className="w-4 h-4 text-[#1a1a1a] group-hover:text-[#0077b5] transition-colors duration-300" />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]">LinkedIn</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8a817c] group-hover:text-[#0077b5] group-hover:-rotate-45 transition-all duration-300" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
