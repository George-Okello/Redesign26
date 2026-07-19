import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Cpu, Sparkles, AlertCircle, Send, CheckCircle2, RotateCcw } from 'lucide-react';

interface TerminalModeProps {
  onExit: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
  type?: 'input' | 'system' | 'success' | 'error' | 'ascii';
}

export function TerminalMode({ onExit }: TerminalModeProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  // Terminal Customizations
  const [terminalTheme, setTerminalTheme] = useState<'emerald' | 'amber' | 'cyan' | 'slate'>('emerald');
  const [isGlitching, setIsGlitching] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [crtEffect, setCrtEffect] = useState(true);
  
  // Interactive Contact State
  const [contactStep, setContactStep] = useState<null | 'name' | 'email' | 'message'>(null);
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  
  // Interactive Simulation State
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simFrame, setSimFrame] = useState(0);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [contactStep, activeSimulation]);

  // Handle outside clicks to focus terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Scroll to bottom when history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, simFrame, activeSimulation]);

  // Matrix Digital Rain Effect
  useEffect(() => {
    if (!isMatrixActive) return;

    const canvas = matrixCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array(columns).fill(1);

    const chars = '0101011001010101110010101ABCDEFGNOPQRSTUVXYZ@#$%&*+-=';

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(5, 6, 8, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '14px "JetBrains Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 16;
        const y = drops[i] * 16;

        if (terminalTheme === 'emerald') ctx.fillStyle = '#10b981';
        else if (terminalTheme === 'amber') ctx.fillStyle = '#f59e0b';
        else if (terminalTheme === 'cyan') ctx.fillStyle = '#06b6d4';
        else ctx.fillStyle = '#94a3b8';

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMatrixActive, terminalTheme]);

  // Initial Boot Sequence
  useEffect(() => {
    const bootLines = [
      { text: 'GEORGE_OKELLO_CORE: Booting system kernel ver. 4.8.2...', delay: 100 },
      { text: 'SYS.STATUS: Handshaking with neural prefrontal cortex arrays [OK]', delay: 300 },
      { text: 'SYS.MEM: Allocating 32MB virtual cognitive buffers... Done.', delay: 500 },
      { text: 'SYS.NETWORK: Established TCP loop with Nairobi, Kenya nodes.', delay: 700 },
      { text: 'SYS.ACCREDITATIONS: Cross-domain baselines synced [DS-01, SEC-02, HW-03]', delay: 900 },
      { text: '---------------------------------------------------------', delay: 1050 },
      { text: 'Welcome to George Okello\'s Interactive Terminal Shell v1.0.', delay: 1200 },
      { text: 'Type "help" to list available commands. You can also CLICK on any underlined [cyan/green link] on the screen to run that command automatically.', delay: 1350 },
      { text: '---------------------------------------------------------', delay: 1450 }
    ];

    bootLines.forEach((line) => {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            command: '',
            output: <span className="font-mono">{line.text}</span>,
            timestamp: new Date().toLocaleTimeString(),
            type: 'system'
          }
        ]);
      }, line.delay);
    });
  }, []);

  // Theme configuration helper
  const getThemeColors = () => {
    switch (terminalTheme) {
      case 'amber':
        return {
          text: 'text-amber-400',
          bg: 'bg-[#0b0704]',
          border: 'border-amber-900/30',
          accent: 'text-amber-300',
          highlight: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          glow: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]',
          cursor: 'bg-amber-400',
          textMuted: 'text-amber-600',
        };
      case 'cyan':
        return {
          text: 'text-cyan-400',
          bg: 'bg-[#04090b]',
          border: 'border-cyan-900/30',
          accent: 'text-cyan-300',
          highlight: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          glow: 'shadow-[0_0_12px_rgba(6,182,212,0.15)]',
          cursor: 'bg-cyan-400',
          textMuted: 'text-cyan-600',
        };
      case 'slate':
        return {
          text: 'text-slate-300',
          bg: 'bg-[#0f1115]',
          border: 'border-slate-800',
          accent: 'text-white',
          highlight: 'bg-white/5 text-white border-white/10',
          glow: 'shadow-none',
          cursor: 'bg-slate-300',
          textMuted: 'text-slate-500',
        };
      case 'emerald':
      default:
        return {
          text: 'text-emerald-400',
          bg: 'bg-[#040b07]',
          border: 'border-emerald-900/30',
          accent: 'text-emerald-300',
          highlight: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          glow: 'shadow-[0_0_12px_rgba(16,185,129,0.15)]',
          cursor: 'bg-emerald-400',
          textMuted: 'text-emerald-600',
        };
    }
  };

  const colors = getThemeColors();

  // Simulated live cognitive simulation
  useEffect(() => {
    if (!activeSimulation) return;

    const interval = setInterval(() => {
      setSimFrame((f) => f + 1);
    }, 150);

    return () => clearInterval(interval);
  }, [activeSimulation]);

  // Generate cognitive bias text simulator output
  const renderSimulationFrame = () => {
    if (!activeSimulation) return null;

    if (activeSimulation === 'eeg') {
      const alpha = Math.floor(40 + Math.sin(simFrame * 0.2) * 25 + Math.random() * 5);
      const beta = Math.floor(30 + Math.cos(simFrame * 0.3) * 20 + Math.random() * 5);
      const cognitiveLoad = (beta / (alpha || 1) * 100).toFixed(1);
      
      let asciiWave = '';
      const amplitude = 5;
      for (let r = 0; r < 7; r++) {
        let rowStr = '';
        for (let col = 0; col < 40; col++) {
          const val = Math.round(amplitude + Math.sin(col * 0.4 + simFrame * 0.5) * 3 + Math.cos(col * 0.1) * 1.5);
          rowStr += val === r ? '█' : ' ';
        }
        asciiWave += `  ${rowStr}\n`;
      }

      return (
        <div className="font-mono text-xs border border-white/10 rounded p-3 bg-black/40 space-y-2 mt-2">
          <div className="flex justify-between items-center text-[10px] text-sky-400">
            <span>[SIMULATING EEG HIGH-DENSE WAVEFORM]</span>
            <span>FRAME: {simFrame}01</span>
          </div>
          <pre className="text-emerald-500 leading-none text-[10px] sm:text-xs">{asciiWave}</pre>
          <div className="grid grid-cols-2 gap-4 text-[11px] pt-1 border-t border-white/5">
            <div>ALPHA RESERVES: <strong className="text-white">{alpha}%</strong></div>
            <div>BETA DRIVE FORCE: <strong className="text-white">{beta}%</strong></div>
            <div>COGNITIVE OVERHEAD: <strong className="text-rose-400 font-bold">{cognitiveLoad}%</strong></div>
            <div>STABILITY INDEX: <strong className="text-emerald-400">STABLE_COGNITION</strong></div>
          </div>
          <button 
            onClick={() => {
              setActiveSimulation(null);
              setHistory((prev) => [
                ...prev,
                { command: '', output: <span>EEG simulation completed. Buffer cleared.</span>, timestamp: new Date().toLocaleTimeString(), type: 'system' }
              ]);
            }}
            className="text-[10px] uppercase tracking-wider font-bold text-rose-400 hover:underline pt-2 block"
          >
            [Stop Simulation]
          </button>
        </div>
      );
    }

    if (activeSimulation === 'swarm') {
      const boids = 15;
      const boidChars = ['►', '▲', '▼', '◄', '◆', '❖'];
      let matrixDisplay = '';
      
      for (let y = 0; y < 8; y++) {
        let line = ' ';
        for (let x = 0; x < 40; x++) {
          const hasBoid = Math.floor(Math.sin(x * 0.3 + y * 0.2 + simFrame * 0.1) * 20 + 20) === x && y % 2 === 0;
          if (hasBoid) {
            line += boidChars[(x + y + simFrame) % boidChars.length];
          } else {
            line += Math.random() > 0.985 ? '·' : ' ';
          }
        }
        matrixDisplay += `${line}\n`;
      }

      return (
        <div className="font-mono text-xs border border-white/10 rounded p-3 bg-black/40 space-y-2 mt-2">
          <div className="flex justify-between items-center text-[10px] text-violet-400">
            <span>[SWARM BOIDS INTELLIGENT ALIGNMENT]</span>
            <span>GRID: 40x8 • STEP: {simFrame}</span>
          </div>
          <pre className="text-violet-400 leading-none text-[10px] sm:text-xs">{matrixDisplay}</pre>
          <div className="grid grid-cols-2 gap-4 text-[11px] pt-1 border-t border-white/5">
            <div>COHESION LEVEL: <strong className="text-white">94.8%</strong></div>
            <div>ALIGNMENT ERROR: <strong className="text-white">0.035 rad</strong></div>
            <div>SEPARATION DRIFT: <strong className="text-emerald-400">0.02 px</strong></div>
            <div>SYS.EMERGENCE: <strong className="text-violet-400">CRITICAL_MASS_ACHIEVED</strong></div>
          </div>
          <button 
            onClick={() => {
              setActiveSimulation(null);
              setHistory((prev) => [
                ...prev,
                { command: '', output: <span>Swarm simulation ended. Cluster state saved.</span>, timestamp: new Date().toLocaleTimeString(), type: 'system' }
              ]);
            }}
            className="text-[10px] uppercase tracking-wider font-bold text-rose-400 hover:underline pt-2 block"
          >
            [Terminate Swarm Process]
          </button>
        </div>
      );
    }

    if (activeSimulation === 'sunk_cost') {
      const priorInv = Math.floor(200000 + Math.sin(simFrame * 0.15) * 120000);
      const negativity = Math.floor(50 + Math.cos(simFrame * 0.2) * 45);
      const projectViability = (100 - negativity);
      const delayFactor = Math.pow(negativity / 10, 1.8).toFixed(1);

      return (
        <div className="font-mono text-xs border border-white/10 rounded p-3 bg-black/40 space-y-2 mt-2">
          <div className="flex justify-between items-center text-[10px] text-amber-500">
            <span>[SIMULATING SUNK COST PSYCHOLOGY DRIFT]</span>
            <span>DECISION CYCLE: {simFrame}</span>
          </div>
          <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
            <div>SUNK INVESTMENT POOL: <strong className="text-amber-300 font-mono">${priorInv.toLocaleString()}</strong></div>
            <div>NEGATIVE DATA ACCUMULATED: <strong className="text-rose-400 font-mono">{negativity}%</strong></div>
            <div>PREDICTED VIABILITY INDEX: <strong className="text-emerald-400 font-mono">{projectViability}%</strong></div>
            <div className="border-t border-white/5 pt-1.5 mt-1 text-[10px] text-slate-400 font-mono">
              {negativity > 65 ? (
                <span className="text-rose-400 uppercase font-bold animate-pulse">
                  ⚠ STATUS: Severe Cognitive Inertia. Subject continues funding despite high negativity. Switching Overhead: +{delayFactor}ms
                </span>
              ) : (
                <span className="text-emerald-400 uppercase">
                  ✓ STATUS: Rational oversight intact. Continuity risks low.
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={() => {
              setActiveSimulation(null);
              setHistory((prev) => [
                ...prev,
                { command: '', output: <span>Sunk cost simulator released. Continuity parameters baseline reset.</span>, timestamp: new Date().toLocaleTimeString(), type: 'system' }
              ]);
            }}
            className="text-[10px] uppercase tracking-wider font-bold text-rose-400 hover:underline pt-2 block"
          >
            [Close Sunk Cost Model]
          </button>
        </div>
      );
    }

    return null;
  };

  // Run commands automatically when clicking on-screen interactive CLI nodes
  const triggerCommand = (cmd: string) => {
    setInput(cmd);
    setTimeout(() => {
      handleExecuteCommand(cmd);
    }, 50);
  };

  // Interactive contact form runner
  const runContactWizard = (text: string) => {
    const trimmed = text.trim();
    if (contactStep === 'name') {
      if (!trimmed) {
        setHistory((prev) => [...prev, { command: '', output: <span className="text-rose-400">Error: Name cannot be blank. Enter your Name:</span>, timestamp: new Date().toLocaleTimeString(), type: 'error' }]);
        return;
      }
      setContactData((prev) => ({ ...prev, name: trimmed }));
      setContactStep('email');
      setHistory((prev) => [
        ...prev,
        { command: trimmed, output: <span className="text-slate-300">Name registered: {trimmed}</span>, timestamp: new Date().toLocaleTimeString(), type: 'input' },
        { command: '', output: <span className="text-emerald-400">Enter your Email:</span>, timestamp: new Date().toLocaleTimeString() }
      ]);
      setInput('');
    } else if (contactStep === 'email') {
      if (!trimmed || !trimmed.includes('@')) {
        setHistory((prev) => [...prev, { command: '', output: <span className="text-rose-400">Error: Invalid email format. Enter your Email:</span>, timestamp: new Date().toLocaleTimeString(), type: 'error' }]);
        return;
      }
      setContactData((prev) => ({ ...prev, email: trimmed }));
      setContactStep('message');
      setHistory((prev) => [
        ...prev,
        { command: trimmed, output: <span className="text-slate-300">Email registered: {trimmed}</span>, timestamp: new Date().toLocaleTimeString(), type: 'input' },
        { command: '', output: <span className="text-emerald-400">Enter your Message (feel free to write anything):</span>, timestamp: new Date().toLocaleTimeString() }
      ]);
      setInput('');
    } else if (contactStep === 'message') {
      if (!trimmed) {
        setHistory((prev) => [...prev, { command: '', output: <span className="text-rose-400">Error: Message cannot be blank. Enter your Message:</span>, timestamp: new Date().toLocaleTimeString(), type: 'error' }]);
        return;
      }
      const finalData = { ...contactData, message: trimmed };
      setContactStep(null);
      setInput('');
      
      setHistory((prev) => [
        ...prev,
        { command: trimmed, output: <span className="text-slate-300">Message registered: {trimmed}</span>, timestamp: new Date().toLocaleTimeString(), type: 'input' },
        { command: '', output: (
          <div className="border border-emerald-500/30 rounded p-3 bg-emerald-950/20 space-y-2 mt-2 animate-pulse">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Message Package Fully Encrypted & Dispatched!
            </div>
            <div className="text-[11px] text-slate-300 font-mono space-y-1">
              <div>SENDER: <span className="text-white">{finalData.name}</span> &lt;{finalData.email}&gt;</div>
              <div>MESSAGE LENGTH: <span className="text-white">{trimmed.length} characters</span></div>
              <div>SOCKET PROTOCOL: TLSv1.3 Secure Packet</div>
              <p className="text-slate-400 leading-relaxed font-sans pt-1">
                Thank you! Your message has been compiled into the system ledger. George will receive your transmission shortly.
              </p>
            </div>
          </div>
        ), timestamp: new Date().toLocaleTimeString(), type: 'success' }
      ]);
    }
  };

  // Command Execution engine
  const handleExecuteCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    // Contact step controller
    if (contactStep !== null) {
      runContactWizard(rawCmd);
      return;
    }

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const parts = rawCmd.toLowerCase().split(' ');
    const commandName = parts[0];
    const argument = parts.slice(1).join(' ');

    let resultOutput: React.ReactNode = null;
    let type: 'input' | 'system' | 'success' | 'error' | 'ascii' | undefined = undefined;

    switch (commandName) {
      case 'help':
        resultOutput = (
          <div className="space-y-3 font-mono text-[11px] sm:text-xs">
            <div className="font-bold text-white uppercase tracking-wider mb-1">Available System Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
              <div><button onClick={() => triggerCommand('about')} className="underline text-sky-400 font-bold hover:text-white text-left">[about]</button> - George Okello's profile</div>
              <div><button onClick={() => triggerCommand('publications')} className="underline text-sky-400 font-bold hover:text-white text-left">[publications]</button> - Scientific papers</div>
              <div><button onClick={() => triggerCommand('simulations')} className="underline text-sky-400 font-bold hover:text-white text-left">[simulations]</button> - Interactive lab models</div>
              <div><button onClick={() => triggerCommand('projects')} className="underline text-sky-400 font-bold hover:text-white text-left">[projects]</button> - Industrial projects</div>
              <div><button onClick={() => triggerCommand('kaggle')} className="underline text-sky-400 font-bold hover:text-white text-left">[kaggle]</button> - Data competitions</div>
              <div><button onClick={() => triggerCommand('notes')} className="underline text-sky-400 font-bold hover:text-white text-left">[notes]</button> - Field research notes</div>
              <div><button onClick={() => triggerCommand('contact')} className="underline text-sky-400 font-bold hover:text-white text-left">[contact]</button> - Direct encrypted email</div>
              <div><button onClick={() => triggerCommand('sysinfo')} className="underline text-sky-400 font-bold hover:text-white text-left">[sysinfo]</button> - System diagnostics</div>
              <div><button onClick={() => triggerCommand('theme')} className="underline text-sky-400 font-bold hover:text-white text-left">[theme]</button> - emerald/amber/cyan/slate</div>
              <div><button onClick={() => triggerCommand('matrix')} className="underline text-sky-400 font-bold hover:text-white text-left">[matrix]</button> - Toggle green stream rain</div>
              <div><button onClick={() => triggerCommand('glitch')} className="underline text-sky-400 font-bold hover:text-white text-left">[glitch]</button> - CRT terminal error loop</div>
              <div><button onClick={() => triggerCommand('clear')} className="underline text-sky-400 font-bold hover:text-white text-left">[clear]</button> - Clear scroll buffers</div>
              <div><button onClick={() => triggerCommand('gui')} className="underline text-sky-400 font-bold hover:text-white text-left">[gui]</button> - Toggle graphic portfolio</div>
            </div>
            <div className="text-slate-500 text-[10px] border-t border-white/5 pt-2 font-sans">
              Playful Easter Egg commands: <strong className="text-white">matrix</strong>, <strong className="text-white">glitch</strong>, or <strong className="text-white">theme &lt;name&gt;</strong> (e.g. <strong className="text-white">theme amber</strong>)
            </div>
          </div>
        );
        break;

      case 'about':
        resultOutput = (
          <div className="space-y-2.5 max-w-2xl font-sans text-xs sm:text-sm leading-relaxed">
            <h3 className="text-white font-serif italic text-lg tracking-wide border-b border-white/10 pb-1 font-mono">[GEORGE OKELLO // ABOUT ME]</h3>
            <p className="text-slate-300">
              I am a complex systems designer and researcher operating at the intersection of cognitive science, neuroscience, and deep artificial intelligence.
            </p>
            <p className="text-slate-300 font-light">
              Through mathematical modeling, neuro-simulation frameworks, and multi-agent reinforcement learning lattices, my work maps functional human constraints onto computing architectures to build robust systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-[11px] text-slate-400 leading-normal">
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded">
                <span className="text-orange-highlight font-bold block mb-1">CORE SPECIALIZATION</span>
                • EEG Neural Scope Classification<br/>
                • Cognitive Load & Focus Metrics<br/>
                • Multi-Agent Cooperation
              </div>
              <div className="p-2 bg-white/[0.02] border border-white/5 rounded">
                <span className="text-orange-highlight font-bold block mb-1">LOCATIONS & NODES</span>
                • Nairobi, Kenya (Base Node)<br/>
                • Distributed IoT clusters<br/>
                • Cloud Run Container Workstations
              </div>
            </div>
          </div>
        );
        break;

      case 'publications':
        resultOutput = (
          <div className="space-y-4 max-w-2xl font-mono text-xs">
            <h3 className="text-white font-bold text-sm tracking-widest border-b border-white/10 pb-1">SELECTED PUBLICATIONS & ARCHIVES</h3>
            
            <div className="space-y-3">
              {[
                {
                  code: "PUB-01",
                  title: "EEG Cognitive Load Dynamics & Prefrontal Alpha-Beta Oscillations",
                  desc: "A neural framework evaluating cortex excitation patterns and frequency drift as mental load surges during analytical simulations.",
                  links: "Click on on-screen models to explore visualizers"
                },
                {
                  code: "PUB-02",
                  title: "Theoretical Switches in Bilingual Linguistic Articulation Pathways",
                  desc: "A study on prefrontal inhibition efforts, bilingual switch latencies, and cross-lexical search cost parameters.",
                  links: "Simulation available in [simulations] command"
                },
                {
                  code: "PUB-03",
                  title: "Strategic Equilibrium in Decentralized Multi-Agent Cooperation Lattice Networks",
                  desc: "Investigating the Prisoner's dilemma under varying cooperative parameters, mutual trust density, and network layouts.",
                  links: "Live agent ledger in terminal simulator"
                }
              ].map((pub, idx) => (
                <div key={idx} className="p-3 bg-white/[0.01] border border-white/5 rounded-lg space-y-1 hover:bg-white/[0.03] transition-all">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-highlight font-bold">[{pub.code}]</span>
                    <span className="text-white uppercase tracking-wider font-semibold">{pub.title}</span>
                  </div>
                  <p className="text-slate-400 font-sans leading-relaxed text-[11px] pl-1">{pub.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'simulations':
      case 'lab':
        resultOutput = (
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-white font-bold text-sm tracking-widest border-b border-white/10 pb-1">INTERACTIVE RESEARCH SIMULATORS</h3>
            <p className="text-slate-300 font-sans leading-relaxed">
              George's portfolio features fully live computational sandbox models. Run any of these simulations directly in terminal ASCII format or check out the full graphical system:
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg">
                <button onClick={() => { setActiveSimulation('eeg'); }} className="underline text-emerald-400 font-bold hover:text-white uppercase block text-left">
                  [simulate eeg]
                </button>
                <span className="text-slate-400 text-[11px] leading-relaxed block mt-1">
                  Synthesize real-time prefrontal cortex EEG waveforms. Triggers live alpha/beta frequency analysis waves inside the console!
                </span>
              </div>

              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg">
                <button onClick={() => { setActiveSimulation('swarm'); }} className="underline text-violet-400 font-bold hover:text-white uppercase block text-left">
                  [simulate swarm]
                </button>
                <span className="text-slate-400 text-[11px] leading-relaxed block mt-1">
                  Visualizes multi-agent flocking behavior using vector field calculations. Spawns emergent boids moving on screen!
                </span>
              </div>

              <div className="p-3 bg-white/[0.01] border border-white/5 rounded-lg">
                <button onClick={() => { setActiveSimulation('sunk_cost'); }} className="underline text-amber-400 font-bold hover:text-white uppercase block text-left">
                  [simulate sunk_cost]
                </button>
                <span className="text-slate-400 text-[11px] leading-relaxed block mt-1">
                  Renders the cognitive biases equations, updating continuity project viability relative to high negativity metrics.
                </span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        resultOutput = (
          <div className="space-y-4 max-w-2xl font-mono text-xs">
            <h3 className="text-white font-bold text-sm tracking-widest border-b border-white/10 pb-1">INDUSTRIAL IMPLEMENTATIONS & SYSTEMS</h3>
            <div className="space-y-3">
              {[
                {
                  title: "EPIDEMIOLOGICAL MODELING & FORECAST ENGINE",
                  org: "Ministry of Health, Kenya",
                  problem: "Severe predictive lag in localized infectious vectors tracking.",
                  solution: "A bespoke mathematical modeling framework analyzing high-dimensional regional topologies and tracking real-time vectors."
                },
                {
                  title: "AGRICULTURAL CLUSTERING & DECISION SUPPORT",
                  org: "AgriTech Co-Op",
                  problem: "Sub-optimal soil nutrition and crop yield forecasting under weather stress.",
                  solution: "Designed custom data science pipelines mapping remote sensing and localized metrics to deliver robust crop rotation advice."
                },
                {
                  title: "NOTRE DAME 3D INTERACTIVE NAVIGATION LATTICE",
                  org: "University Research",
                  problem: "Architectural path optimization inside high-complexity historic structures.",
                  solution: "Developed interactive three-dimensional coordinate lattices guiding visitors with zero cognitive friction."
                }
              ].map((proj, idx) => (
                <div key={idx} className="p-3 bg-white/[0.01] border border-white/5 rounded-lg space-y-1.5 hover:bg-white/[0.03] transition-all">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">{proj.title}</span>
                    <span className="text-slate-500 font-bold text-[9px]">{proj.org}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    <div><span className="text-rose-400 font-bold uppercase font-mono text-[9px]">Problem:</span> {proj.problem}</div>
                    <div><span className="text-emerald-400 font-bold uppercase font-mono text-[9px]">Solution:</span> {proj.solution}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'kaggle':
        resultOutput = (
          <div className="space-y-2.5 max-w-2xl font-sans text-xs sm:text-sm">
            <h3 className="text-white font-serif italic text-lg tracking-wide border-b border-white/10 pb-1 font-mono">[KAGGLE SCIENCE DATA ARCHIVE]</h3>
            <p className="text-slate-300 leading-relaxed font-light">
              I actively experiment with deep prediction models, publish highly clean notebooks, and compete in complex systems datasets.
            </p>
            <div className="bg-[#121110] border border-white/5 rounded p-3 font-mono text-[11px] text-slate-300 space-y-1">
              <div>PROFILE: georgeokello</div>
              <div>TIER: Scientific Research Contributor</div>
              <div>SPECIALIZATION: Deep Clustering, NLP Vector Fields, Time Series</div>
              <div className="pt-2">
                <a href="https://www.kaggle.com/georgeokello" target="_blank" rel="noopener noreferrer" className="text-orange-highlight underline font-bold uppercase hover:text-white">
                  ↳ CLICK TO ACCESS EXTERNAL KAGGLE NODE ↗
                </a>
              </div>
            </div>
          </div>
        );
        break;

      case 'notes':
        resultOutput = (
          <div className="space-y-3 font-mono text-xs">
            <h3 className="text-white font-bold text-sm tracking-widest border-b border-white/10 pb-1">ACADEMIC & FIELD NOTES COMPENDIUM</h3>
            <p className="text-slate-300 font-sans leading-relaxed">
              I publish physical and digital booklets compiling core field notes. My digital research issue compiles major reports exploring artificial cognition pathways:
            </p>
            <div className="bg-white/[0.01] border border-white/5 rounded-lg p-3 space-y-2">
              <div className="text-emerald-400 font-bold text-xs uppercase">Mini Research Reports, Issue No. 1</div>
              <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
                Investigates prefrontal EEG loads, bilingual interference switches, RL reward-clipping thresholds, and low-level diagnostic experiments.
              </p>
              <a href="https://heyzine.com/flip-book/c33e22041c.html" target="_blank" rel="noopener noreferrer" className="text-orange-highlight font-bold uppercase underline text-[10px] block pt-1">
                ↳ VIEW SECURE DIGITAL COMPENDIUM FLIP-BOOK ↗
              </a>
            </div>
          </div>
        );
        break;

      case 'contact':
        setContactStep('name');
        setContactData({ name: '', email: '', message: '' });
        resultOutput = (
          <div className="space-y-2 font-mono text-xs">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm">[INITIALIZING SECURE SOCKET TRANSMITTER]</h3>
            <p className="text-slate-400 font-sans leading-relaxed">
              Entering interactive mailing wizard. I will record your details step-by-step.
            </p>
            <div className="text-emerald-400 animate-pulse font-bold mt-2">
              Enter your Name:
            </div>
          </div>
        );
        break;

      case 'sysinfo':
        resultOutput = (
          <div className="space-y-2.5 font-mono text-[11px] leading-relaxed">
            <div className="text-white font-bold uppercase tracking-wider">[SYS DIAGNOSTICS LAB_CONSOLE V2.6]</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-slate-400">
                <div>HOST: georgeokello-complex-systems</div>
                <div>OS: Linux Custom Container Node</div>
                <div>UPTIME: 1982 hours (99.98% continuity)</div>
                <div>PORT INGRESS: Secure Reverse Nginx :3000</div>
              </div>
              <div className="space-y-1 text-slate-400">
                <div>CPU OVERHEAD: {(Math.random() * 12 + 4).toFixed(1)}% Core Drive</div>
                <div>COGNITIVE LEAK: 0.00% absolute</div>
                <div>ACTIVE AGENTS: 15 self-healing boids</div>
                <div>GEO_COORDINATES: Nairobi, Kenya [3.5-flash]</div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest">all system channels stable - healthy prefrontal response</span>
            </div>
          </div>
        );
        break;

      case 'theme':
        if (!argument) {
          resultOutput = (
            <div className="space-y-1.5 font-mono text-xs">
              <div className="text-white font-bold">Theme Selector CLI:</div>
              <div>Current Theme: <span className="text-emerald-400 font-bold uppercase">{terminalTheme}</span></div>
              <div className="text-slate-400 pt-1">To change, enter: <strong className="text-white">theme &lt;name&gt;</strong></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <button onClick={() => triggerCommand('theme emerald')} className="underline text-emerald-400 hover:text-white text-left">[theme emerald]</button>
                <button onClick={() => triggerCommand('theme amber')} className="underline text-amber-500 hover:text-white text-left">[theme amber]</button>
                <button onClick={() => triggerCommand('theme cyan')} className="underline text-cyan-400 hover:text-white text-left">[theme cyan]</button>
                <button onClick={() => triggerCommand('theme slate')} className="underline text-slate-300 hover:text-white text-left">[theme slate]</button>
              </div>
            </div>
          );
        } else if (['emerald', 'amber', 'cyan', 'slate'].includes(argument)) {
          setTerminalTheme(argument as any);
          resultOutput = <span className="text-emerald-400 font-bold">Theme set to {argument.toUpperCase()} successfully. Phosphor recalibrated.</span>;
          type = 'success';
        } else {
          resultOutput = <span className="text-rose-400">Error: Invalid theme name. Choose from: emerald, amber, cyan, slate.</span>;
          type = 'error';
        }
        break;

      case 'matrix':
        setIsMatrixActive(!isMatrixActive);
        resultOutput = (
          <span className="text-emerald-400 font-bold">
            {isMatrixActive ? 'Digital Matrix rain stream deactivated.' : 'Matrix stream overlay activated! Enter command "matrix" again to disable.'}
          </span>
        );
        type = 'success';
        break;

      case 'glitch':
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 2500);
        resultOutput = (
          <span className="text-rose-400 font-bold animate-pulse uppercase">
            ⚠ SYSTEM CRITICAL: High electromagnetic pulse detected. Restoring signal modulation parameters over local canvas...
          </span>
        );
        type = 'error';
        break;

      case 'gravity':
        {
          const root = document.documentElement;
          const active = root.classList.contains('gravity-active');
          if (active) root.classList.remove('gravity-active');
          else root.classList.add('gravity-active');
          resultOutput = <span className="text-orange-highlight font-bold uppercase">[SYS_GRAVITY]: {active ? 'GRAVITY OVERRIDE DEACTIVATED' : 'GRAVITY OVERRIDE DISRUPTED (0.1G DRIFT ENABLED)'}</span>;
          type = 'success';
        }
        break;

      case 'neon':
      case 'cyber':
        {
          const root = document.documentElement;
          const active = root.classList.contains('neon-active');
          if (active) root.classList.remove('neon-active');
          else root.classList.add('neon-active');
          resultOutput = <span className="text-orange-highlight font-bold uppercase">[SYS_NEON]: {active ? 'CYBER NET RESKIN DEACTIVATED' : 'CYBER NEON HIGH-CONTRAST CHROME MATRIX APPLIED'}</span>;
          type = 'success';
        }
        break;

      case 'party':
      case 'spark':
        {
          const root = document.documentElement;
          const active = root.classList.contains('party-active');
          if (active) root.classList.remove('party-active');
          else root.classList.add('party-active');
          resultOutput = <span className="text-orange-highlight font-bold uppercase">[SYS_SPARKS]: {active ? 'CURSOR SPARK STREAM OFF' : 'QUANTUM SPARK TRAIL ENGAGED'}</span>;
          type = 'success';
        }
        break;

      case 'invert':
        {
          const root = document.documentElement;
          const active = root.classList.contains('invert-active');
          if (active) root.classList.remove('invert-active');
          else root.classList.add('invert-active');
          resultOutput = <span className="text-orange-highlight font-bold uppercase">[SYS_INVERSION]: {active ? 'THERMAL LIGHT RESUMED' : 'THERMAL INVERTED FREQUENCY SPECTRUM ACTIVE'}</span>;
          type = 'success';
        }
        break;

      case 'reset':
        {
          const root = document.documentElement;
          root.classList.remove('gravity-active', 'neon-active', 'party-active', 'invert-active');
          resultOutput = <span className="text-orange-highlight font-bold uppercase">[SYS_RESET]: ALL ENVIRONMENT PROTOCOLS CLEAR. STANDARD METRICS ENGAGED.</span>;
          type = 'success';
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'gui':
      case 'exit':
        onExit();
        return;

      default:
        resultOutput = (
          <div className="space-y-1 font-mono text-xs text-rose-400">
            <div>Command not found: "{commandName}"</div>
            <div className="text-slate-500 text-[11px] font-sans">
              Type <button onClick={() => triggerCommand('help')} className="underline text-sky-400 font-bold hover:text-white inline-block">[help]</button> to view all available commands.
            </div>
          </div>
        );
        type = 'error';
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        output: resultOutput,
        timestamp: new Date().toLocaleTimeString(),
        type: type || 'input'
      }
    ]);

    setInput('');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecuteCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[150] font-mono select-text flex flex-col overflow-hidden ${colors.bg} ${colors.text}`}
      onClick={handleTerminalClick}
    >
      {/* Easter Egg Matrix Rain Overlay Canvas */}
      {isMatrixActive && (
        <canvas 
          ref={matrixCanvasRef} 
          className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        />
      )}

      {/* Screen CRT Flickering / Scanline Layer */}
      {crtEffect && (
        <>
          <div className="pointer-events-none absolute inset-0 z-[10] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
          <div className="pointer-events-none absolute inset-0 z-[10] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.4)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-[10] opacity-[0.015] animate-flicker bg-white" />
        </>
      )}

      {/* Easter Egg Glitch Screen Filter overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.8, 0.3, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2 }}
            className="absolute inset-0 bg-red-950/20 mix-blend-difference pointer-events-none z-[12] flex items-center justify-center border-4 border-red-500/40"
          >
            <div className="text-rose-500 font-bold text-center space-y-4 max-w-md animate-bounce p-8 bg-black/90 rounded border border-rose-500/50">
              <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto animate-spin" />
              <div className="text-lg tracking-[0.2em] uppercase">--- SIGNAL FAULT ---</div>
              <p className="text-xs leading-relaxed font-mono">
                EM WAVE DISTORTION DETECTED. PREFRONTAL EXCITATION LEVEL CRITICAL. CORTECT BUFFER SWAPPING CORRUPT. RESTORING COGNITIVE CONTINUITY...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Main Layout Container */}
      <div className="relative z-10 flex-1 flex flex-col p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full h-full justify-between">
        
        {/* Terminal Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 mb-4 ${colors.border}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border bg-black/40 ${colors.border}`}>
              <Terminal className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-white font-bold text-xs uppercase tracking-[0.15em] flex items-center gap-2">
                George Okello Workstation
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className={`text-[10px] uppercase tracking-widest ${colors.textMuted}`}>
                Nairobi, Kenya • [SYS_CLI: ACTIVE]
              </div>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex items-center gap-3 text-[10px]">
            <button 
              onClick={() => setCrtEffect(!crtEffect)}
              className={`px-2.5 py-1.5 border rounded uppercase font-bold tracking-wider transition-all bg-black/30 ${colors.border} hover:bg-white/5`}
            >
              CRT Filter: {crtEffect ? 'ON' : 'OFF'}
            </button>
            <button 
              onClick={onExit}
              className="px-2.5 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500 hover:text-white rounded uppercase font-bold tracking-wider transition-all"
            >
              [Exit CLI]
            </button>
          </div>
        </div>

        {/* Scrollable Command Line History Area */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {/* Static introduction statement */}
          <div className="space-y-1 text-xs">
            <div className={`${colors.textMuted}`}>[SYSTEM COGNITIVE LEDGER BOOTED SUCCESSFULLY]</div>
            <div className="text-slate-300 leading-relaxed font-light font-sans max-w-2xl">
              Mapping George Okello's scientific experimentation portfolio, EEG models, swarm dynamics, and cross-domain project files. Use this workstation to run simulations, view Publications, and connect securely.
            </div>
          </div>

          {/* History lines */}
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5 animate-fadeIn">
              {item.command && (
                <div className="flex items-center gap-2 text-xs">
                  <span className={`${colors.textMuted} font-bold`}>george@complex-systems:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              {item.output && (
                <div className="pl-2 sm:pl-4 border-l border-white/5 py-0.5 text-xs">
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {/* Live simulator wrapper block */}
          {renderSimulationFrame()}

          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt Region */}
        <div className={`border-t pt-4 ${colors.border}`}>
          <div className="flex items-center gap-2 text-xs relative">
            <span className={`font-bold ${colors.textMuted} select-none`}>
              {contactStep ? `[MAIL_FORM:${contactStep.toUpperCase()}]~$` : 'george@complex-systems:~$'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-white p-0 font-mono text-xs"
              placeholder={contactStep ? `Type to answer...` : 'Type a command (e.g. "help", "about", "simulations") and press Enter...'}
              autoComplete="off"
              autoFocus
            />
            {/* Custom Glowing interactive blinking cursor */}
            <span className={`w-2 h-4 ${colors.cursor} animate-pulse absolute right-0 bottom-0.5`} />
          </div>

          {/* Prompt metadata and suggestions links */}
          <div className={`mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] ${colors.textMuted} gap-3`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="uppercase font-bold tracking-widest">[Quick Actions]:</span>
              <button onClick={() => triggerCommand('about')} className="underline hover:text-white uppercase">[About]</button>
              <button onClick={() => triggerCommand('simulations')} className="underline hover:text-white uppercase">[Simulate Lab]</button>
              <button onClick={() => triggerCommand('publications')} className="underline hover:text-white uppercase">[Publications]</button>
              <button onClick={() => triggerCommand('projects')} className="underline hover:text-white uppercase">[Projects]</button>
              <button onClick={() => triggerCommand('contact')} className="underline hover:text-white uppercase">[Contact Form]</button>
            </div>
            <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
              <Cpu className="w-3.5 h-3.5 animate-pulse" /> Nairobi Node Live
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
