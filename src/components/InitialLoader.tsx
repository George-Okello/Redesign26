import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, BrainCircuit, Network, Cpu, CheckCircle2, Zap, Radio } from 'lucide-react';
import { audio } from '../utils/audio';

interface InitialLoaderProps {
  onComplete: () => void;
}

/* -------------------------------------------------------------------------- */
/*  1. TERMINAL BOOT SEQUENCE LOADER (For First-Time Site Visitors)           */
/* -------------------------------------------------------------------------- */

interface BootSequenceLine {
  tag: string;
  text: string;
  colorClass: string;
  glowClass: string;
  delayMs: number;
}

const BOOT_SEQUENCE: BootSequenceLine[] = [
  {
    tag: "[SYSTEM.BOOT]",
    text: "INITIALIZING PRIMARY NEURAL PATHWAYS...",
    colorClass: "text-[#ff5a09]",
    glowClass: "shadow-[0_0_12px_rgba(255,90,9,0.4)]",
    delayMs: 250
  },
  {
    tag: "[OVERRIDE]",
    text: "ACCESSING COGNITIVE BIAS MATRICES...",
    colorClass: "text-[#39ff14]",
    glowClass: "shadow-[0_0_12px_rgba(57,255,20,0.3)]",
    delayMs: 950
  },
  {
    tag: "[SYNC]",
    text: "SYNCHRONIZING SWARM INTELLIGENCE PROTOCOLS...",
    colorClass: "text-[#00ffff]",
    glowClass: "shadow-[0_0_12px_rgba(0,255,255,0.3)]",
    delayMs: 1650
  },
  {
    tag: "[EXECUTE]",
    text: "CALIBRATING DYNAMIC TOPOLOGY ENGINE...",
    colorClass: "text-amber-400",
    glowClass: "shadow-[0_0_12px_rgba(251,191,36,0.3)]",
    delayMs: 2350
  },
  {
    tag: "[ONLINE]",
    text: "GEORGE OKELLO RESEARCH SYSTEM READY.",
    colorClass: "text-white font-bold",
    glowClass: "shadow-[0_0_15px_rgba(255,255,255,0.5)]",
    delayMs: 3050
  }
];

export function TerminalBootLoader({ onComplete }: InitialLoaderProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hexLine, setHexLine] = useState("0x000000");
  const isCompletedRef = useRef(false);

  const handleSkip = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    audio.playClick();
    setProgress(100);
    setVisibleCount(BOOT_SEQUENCE.length);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 200);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Hex noise generator
    const hexInterval = setInterval(() => {
      const hex = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 16).toString(16).toUpperCase()
      ).join('');
      setHexLine(`0x${hex}`);
    }, 60);

    // Sequential line reveals
    const timers: NodeJS.Timeout[] = [];
    BOOT_SEQUENCE.forEach((item, index) => {
      const t = setTimeout(() => {
        setVisibleCount(index + 1);
        audio.playHover();
      }, item.delayMs);
      timers.push(t);
    });

    // Progress counter
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 4.5 + 2;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.floor(currentProgress));
    }, 45);

    // Completion timeout
    const completeTimer = setTimeout(() => {
      if (!isCompletedRef.current) {
        isCompletedRef.current = true;
        audio.playClick();
        setTimeout(() => {
          document.body.style.overflow = 'unset';
          onComplete();
        }, 350);
      }
    }, 3600);

    // Keypress listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(hexInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleSkip}
      className="fixed inset-0 z-[300] bg-[#050507] text-white flex flex-col items-center justify-between py-10 px-6 cursor-pointer select-none overflow-hidden"
    >
      {/* CRT scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,1) 50%)`,
          backgroundSize: '100% 4px'
        }}
      />

      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-white/40 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5a09] animate-pulse" />
          <span className="font-bold text-white uppercase tracking-widest">SYSTEM_BOOT_SEQUENCE</span>
        </div>
        <div className="flex items-center gap-6 text-[9px]">
          <span className="text-white/30 hidden sm:inline">MEM_ADDR: {hexLine}</span>
          <span className="text-[#39ff14] font-bold">STATUS: INITIALIZING</span>
        </div>
      </div>

      {/* Center Console Lines */}
      <div className="relative z-20 w-full max-w-3xl my-auto flex flex-col items-center justify-center space-y-4 font-mono text-[11px] sm:text-[13px] md:text-[14px] tracking-[0.18em] leading-relaxed">
        <AnimatePresence>
          {BOOT_SEQUENCE.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-2 text-center"
            >
              <span className={`${item.colorClass} font-bold drop-shadow-md`}>
                {item.tag}
              </span>
              <span className="text-white/90">
                {item.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {visibleCount < BOOT_SEQUENCE.length && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="text-[#ff5a09] text-base font-bold mt-2"
          >
            █
          </motion.span>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center gap-4 pt-4 border-t border-white/10">
        <div className="w-full max-w-md h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ff5a09] via-[#39ff14] to-[#00ffff] shadow-[0_0_8px_rgba(255,90,9,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full max-w-md flex justify-between items-center text-[9px] font-mono tracking-widest text-white/40">
          <span>{progress.toString().padStart(3, '0')}% LOADED</span>
          <span className="text-white/30 uppercase">[ CLICK OR SPACE TO SKIP ]</span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  2. NEURAL LINK SIMULATION LOADER (For Page Reloads & Returning Visitors)   */
/* -------------------------------------------------------------------------- */

interface NeuralStage {
  id: string;
  name: string;
  metric: string;
  icon: React.ElementType;
  domainName: string;
}

const NEURAL_STAGES: NeuralStage[] = [
  {
    id: "01",
    name: "Synaptic Core",
    metric: "Latent Dim 1024D",
    icon: BrainCircuit,
    domainName: "NEURAL MESH RE-CONNECT"
  },
  {
    id: "02",
    name: "Quantum Matrix",
    metric: "Tensor Space Calibrated",
    icon: Radio,
    domainName: "NON-LINEAR GEOMETRY"
  },
  {
    id: "03",
    name: "Signal Pipeline",
    metric: "Multi-Threaded Bus",
    icon: Network,
    domainName: "HIGH-FREQUENCY TELEMETRY"
  },
  {
    id: "04",
    name: "Cognitive Engine",
    metric: "Weights Synchronized",
    icon: Cpu,
    domainName: "INTERACTIVE CANVAS READY"
  }
];

export function NeuralLinkLoader({ onComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [subText, setSubText] = useState("Re-establishing Neural Link...");
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
  const [hexLine, setHexLine] = useState("");
  const isCompletedRef = useRef(false);

  const lastAudioMilestone = useRef(-1);

  const handleAccelerate = () => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    audio.playClick();
    setProgress(100);
    setTimeout(() => {
      document.body.style.overflow = 'unset';
      onComplete();
    }, 200);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Hex telemetry generator
    const hexInterval = setInterval(() => {
      const hex = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 16).toString(16).toUpperCase()
      ).join('');
      setHexLine(hex);
    }, 70);

    // Dynamic Telemetry log generator
    const telemetryInterval = setInterval(() => {
      const snippets = [
        `[CACHE_HIT] Synaptic Mesh Topology -> Fast Restore`,
        `[TENSOR_BUS] Attention Matrix Synced @ 60 FPS`,
        `[LATENT_VECTOR] 1024D Subspace Re-Hydrated`,
        `[NEURAL_GATE] Activation Threshold: 100% Operational`,
        `[SIMULATION_CORE] Real-Time Agent Nodes Calibrated`
      ];

      const newLog = snippets[Math.floor(Math.random() * snippets.length)];
      setTelemetryLog((prev) => [newLog, ...prev.slice(0, 2)]);
    }, 350);

    // Fast progress loop for reloads
    let current = 0;
    const progressInterval = setInterval(() => {
      const increment = Math.max(3, (100 - current) * 0.15 + Math.random() * 5);
      current = Math.min(100, current + increment);

      const rounded = Math.floor(current);
      setProgress(rounded);

      const stageIdx = Math.min(3, Math.floor((rounded / 100) * 4));
      setActiveStageIndex(stageIdx);

      const milestone = Math.floor(rounded / 25);
      if (milestone > lastAudioMilestone.current) {
        lastAudioMilestone.current = milestone;
        audio.playHover();
      }

      if (rounded < 25) {
        setSubText(`Re-synchronizing ${NEURAL_STAGES[0].name}...`);
      } else if (rounded < 50) {
        setSubText(`Restoring ${NEURAL_STAGES[1].name}...`);
      } else if (rounded < 75) {
        setSubText(`Linking ${NEURAL_STAGES[2].name}...`);
      } else if (rounded < 99) {
        setSubText(`Warming ${NEURAL_STAGES[3].name}...`);
      } else {
        setSubText("Neural Link Active. Ready.");
      }

      if (current >= 100) {
        clearInterval(progressInterval);
        if (!isCompletedRef.current) {
          isCompletedRef.current = true;
          audio.playClick();
          setTimeout(() => {
            document.body.style.overflow = 'unset';
            onComplete();
          }, 300);
        }
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleAccelerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(hexInterval);
      clearInterval(telemetryInterval);
      clearInterval(progressInterval);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.03 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleAccelerate}
      className="fixed inset-0 z-[300] bg-[#fcfaf7] flex flex-col items-center justify-between py-8 px-6 pointer-events-auto select-none overflow-hidden cursor-pointer"
    >
      {/* Tech Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Laser Scanner */}
      <motion.div
        animate={{ y: ['-5vh', '105vh'] }}
        transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
        className="absolute top-0 left-0 right-0 h-[1.5px] bg-orange-highlight/40 shadow-[0_0_15px_rgba(255,90,9,0.5)] z-0 pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 w-full max-w-4xl flex justify-between items-center text-[9px] font-mono tracking-widest text-[#8a817c] border-b border-[#1a1a1a]/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-highlight animate-pulse" />
          <span className="font-bold text-[#1a1a1a] uppercase tracking-[0.2em]">NEURAL LINK RE-SYNC</span>
          <span className="text-[#1a1a1a]/30">|</span>
          <span className="hidden sm:inline">CACHE_HIT</span>
        </div>
        <div className="flex items-center gap-4 text-[8px] sm:text-[9px]">
          <span>ADDR: 0x{hexLine}</span>
          <span className="text-orange-highlight font-bold">LATENCY: 0.4ms</span>
        </div>
      </div>

      {/* Center Core */}
      <div className="relative z-10 w-full max-w-xl my-auto flex flex-col items-center justify-center">
        {/* Animated Synaptic Ring Canvas Graphic */}
        <div className="relative flex justify-center items-center w-40 h-40 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 border-[0.5px] border-[#1a1a1a]/20 rounded-full border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            className="absolute inset-2 border-[0.5px] border-orange-highlight/30 rounded-full"
          />

          {NEURAL_STAGES.map((stage, idx) => {
            const angle = (idx * 90) * (Math.PI / 180);
            const radius = 68;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isLoaded = progress >= (idx + 1) * 25 || progress === 100;

            return (
              <motion.div
                key={stage.id}
                style={{ x, y }}
                animate={{ scale: isLoaded ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold font-mono transition-colors duration-300 border ${
                  isLoaded
                    ? 'bg-orange-highlight border-orange-highlight text-white shadow-[0_0_10px_rgba(255,90,9,0.7)]'
                    : 'bg-[#fcfaf7] border-[#1a1a1a]/20 text-[#8a817c]'
                }`}
              >
                {isLoaded ? <CheckCircle2 className="w-3 h-3" /> : stage.id}
              </motion.div>
            );
          })}

          <div className="flex flex-col items-center justify-center z-20">
            <motion.span
              key={progress}
              className="text-3xl font-serif italic font-bold tracking-tight text-[#1a1a1a]"
            >
              {progress}%
            </motion.span>
            <span className="text-[7.5px] font-mono tracking-[0.2em] text-orange-highlight uppercase font-bold mt-0.5 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" /> FAST LINK
            </span>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mb-5">
          {NEURAL_STAGES.map((stage, idx) => {
            const isCurrent = activeStageIndex === idx && progress < 100;
            const isCompleted = progress >= (idx + 1) * 25 || progress === 100;
            const StageIcon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`p-2 rounded-lg border transition-all duration-300 flex flex-col gap-0.5 backdrop-blur-sm ${
                  isCompleted
                    ? 'bg-orange-highlight/5 border-orange-highlight/40 text-[#1a1a1a]'
                    : isCurrent
                    ? 'bg-white border-[#1a1a1a]/30 shadow-sm text-[#1a1a1a]'
                    : 'bg-white/40 border-[#1a1a1a]/10 text-[#8a817c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[7.5px] font-mono font-bold tracking-wider opacity-70">
                    STAGE_{stage.id}
                  </span>
                  <StageIcon className={`w-3 h-3 ${isCompleted || isCurrent ? 'text-orange-highlight' : 'text-[#8a817c]'}`} />
                </div>
                <div className="text-[9.5px] font-bold font-sans tracking-tight truncate">
                  {stage.name}
                </div>
                <div className="text-[7.5px] font-mono text-[#4a4a4a] truncate">
                  {isCompleted ? `✓ Ready` : isCurrent ? `> ${stage.domainName}` : `[PENDING]`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full flex gap-[3px] h-[3px] relative overflow-hidden mb-3">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full rounded-full transition-all duration-75 ${
                progress > (i * 3.57)
                  ? 'bg-orange-highlight shadow-[0_0_5px_rgba(255,90,9,0.6)]'
                  : 'bg-[#1a1a1a]/10'
              }`}
            />
          ))}
        </div>

        {/* Live SubText */}
        <div className="h-4 overflow-hidden flex justify-center items-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={subText}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a] font-serif italic flex items-center gap-1.5"
            >
              <Sparkles className="w-2.5 h-2.5 text-orange-highlight" />
              {subText}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Log Stream */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-[#1a1a1a]/10 gap-2">
        <div className="flex flex-col gap-0.5 text-[8px] font-mono text-[#8a817c] w-full sm:w-auto overflow-hidden">
          {telemetryLog.slice(0, 2).map((log, index) => (
            <div key={index} className="truncate opacity-90 flex items-center gap-1.5">
              <span className="text-orange-highlight font-bold">{">"}</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

        <div className="text-[8px] font-mono uppercase tracking-widest text-[#1a1a1a]/50 hover:text-orange-highlight transition-colors flex items-center gap-1 shrink-0">
          <span>[ CLICK OR SPACE TO SKIP ]</span>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  3. TOP-LEVEL DISPATCHER: InitialLoader                                    */
/* -------------------------------------------------------------------------- */

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  // Check if browser has recorded a previous visit in this session or localStorage
  const [isReturningVisitor, setIsReturningVisitor] = useState<boolean>(() => {
    try {
      return (
        sessionStorage.getItem('okello_has_visited') === 'true' ||
        localStorage.getItem('okello_has_visited') === 'true'
      );
    } catch {
      return false;
    }
  });

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem('okello_has_visited', 'true');
      localStorage.setItem('okello_has_visited', 'true');
    } catch {
      // ignore storage blocks
    }
    onComplete();
  };

  if (isReturningVisitor) {
    return <NeuralLinkLoader onComplete={handleLoaderComplete} />;
  }

  return <TerminalBootLoader onComplete={handleLoaderComplete} />;
}
