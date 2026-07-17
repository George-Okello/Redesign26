import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings2, 
  Activity, 
  BrainCircuit, 
  Network, 
  Sliders, 
  Compass, 
  Cpu, 
  Zap,
  Layers,
  Sparkles
} from 'lucide-react';

type ModelType = 
  | 'sunk_cost' 
  | 'confirmation' 
  | 'availability' 
  | 'eeg_cognitive_load' 
  | 'bilingual_switching' 
  | 'cooperative_networks';

interface Node {
  id: string;
  label: string;
  type: 'input' | 'process' | 'output';
  x: number;
  y: number;
  valKey: string | null;
}

export function CognitiveBiasSimulation() {
  const [activeBias, setActiveBias] = useState<ModelType>('sunk_cost');
  const [inputs, setInputs] = useState<Record<string, number>>({
    // Biases
    investment: 70,
    evidence: 30,
    priorBelief: 80,
    newInfo: 50,
    recentExposure: 85,
    baseRate: 20,
    // EEG Cognitive Load
    alphaWave: 45,
    betaWave: 75,
    taskComplexity: 65,
    // Bilingual Language Switching
    l2Dominance: 55,
    cognitiveInhibition: 65,
    // Cooperative Network Emergence
    mutualTrust: 60,
    payoffIncentive: 75,
    networkDensity: 50,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputsRef = useRef(inputs);
  inputsRef.current = inputs;

  const models = {
    sunk_cost: {
      category: "COGNITIVE BIAS",
      name: "Sunk Cost Fallacy",
      desc: "Simulates how prior investment biases decisions, causing rational actors to persist in failing behaviors to justify spent resources.",
      equation: "P(Continue) = (Investment × α) - (Evidence × β)",
      accentColor: "from-sky-500 to-blue-600",
      glowColor: "rgba(14, 165, 233, 0.3)",
      nodes: [
        { id: 'inv', label: 'Prior Investment', type: 'input', x: 18, y: 20, valKey: 'investment' },
        { id: 'evd', label: 'Negative Evidence', type: 'input', x: 18, y: 80, valKey: 'evidence' },
        { id: 'eval', label: 'Cognitive Evaluation Matrix', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_c', label: 'Probability to Continue', type: 'output', x: 82, y: 20, valKey: null },
        { id: 'out_a', label: 'Probability to Abandon', type: 'output', x: 82, y: 80, valKey: null },
      ] as Node[]
    },
    confirmation: {
      category: "COGNITIVE BIAS",
      name: "Confirmation Bias",
      desc: "Models how prior beliefs filter incoming evidence, prioritizing aligning facts while ignoring contrarian data feeds.",
      equation: "Assimilation = Prior Belief + (New Info × Filter Coeff)",
      accentColor: "from-purple-500 to-indigo-600",
      glowColor: "rgba(168, 85, 247, 0.3)",
      nodes: [
        { id: 'pb', label: 'Prior Belief Level', type: 'input', x: 18, y: 20, valKey: 'priorBelief' },
        { id: 'ni', label: 'New Evidence Congruence', type: 'input', x: 18, y: 80, valKey: 'newInfo' },
        { id: 'filter', label: 'Cognitive Assimilation Filter', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_acc', label: 'Accept & Assimilate', type: 'output', x: 82, y: 20, valKey: null },
        { id: 'out_rej', label: 'Reject / Rationalize Away', type: 'output', x: 82, y: 80, valKey: null },
      ] as Node[]
    },
    availability: {
      category: "COGNITIVE BIAS",
      name: "Availability Heuristic",
      desc: "Simulates memory retrieval bias, where recent exposure, fear, or sensory salience causes individuals to overestimate probability of risk.",
      equation: "Perceived Freq = Base Rate + (Recency × Salience)",
      accentColor: "from-amber-500 to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.3)",
      nodes: [
        { id: 'br', label: 'Statistical Base Rate', type: 'input', x: 18, y: 20, valKey: 'baseRate' },
        { id: 're', label: 'Recent Exposure / Fear', type: 'input', x: 18, y: 80, valKey: 'recentExposure' },
        { id: 'mem', label: 'Prefrontal Memory Retrieval', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_o', label: 'Overestimate Threat Risk', type: 'output', x: 82, y: 20, valKey: null },
        { id: 'out_u', label: 'Accurate Objective Assessment', type: 'output', x: 82, y: 80, valKey: null },
      ] as Node[]
    },
    eeg_cognitive_load: {
      category: "NEURO COMPENDIUM No. 1",
      name: "EEG Cognitive Load Classifier",
      desc: "Predicts cortical exhaustion index by assessing spectral frequency ratios (Beta/Alpha waves) against simulated task complexity.",
      equation: "Exhaustion = (Beta / Alpha) × Complexity + (Theta × Duration)",
      accentColor: "from-emerald-500 to-teal-600",
      glowColor: "rgba(16, 185, 129, 0.3)",
      nodes: [
        { id: 'alpha', label: 'Alpha Waves (8-12 Hz)', type: 'input', x: 18, y: 16, valKey: 'alphaWave' },
        { id: 'beta', label: 'Beta Waves (12-30 Hz)', type: 'input', x: 18, y: 50, valKey: 'betaWave' },
        { id: 'complexity', label: 'Task Complexity Load', type: 'input', x: 18, y: 84, valKey: 'taskComplexity' },
        { id: 'eeg_proc', label: 'Spectral Feature Integrator', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_exh', label: 'Cortical Exhaustion Index', type: 'output', x: 82, y: 25, valKey: null },
        { id: 'out_res', label: 'Available Mental Reserve', type: 'output', x: 82, y: 75, valKey: null },
      ] as Node[]
    },
    bilingual_switching: {
      category: "NEUROLINGUISTICS LAB",
      name: "Bilingual Language Switcher",
      desc: "Models cognitive pronunciation delay (latency) and executive prefrontal load as subjects switch back and forth between native L1 and non-dominant L2.",
      equation: "Switch Delay (ms) = 300 + (100 - Dominance) × 4.5 + Inhibition × 3.5",
      accentColor: "from-rose-500 to-pink-600",
      glowColor: "rgba(244, 63, 94, 0.3)",
      nodes: [
        { id: 'dom', label: 'L2 Dominance (%)', type: 'input', x: 18, y: 20, valKey: 'l2Dominance' },
        { id: 'inhib', label: 'Prefrontal Inhibition effort', type: 'input', x: 18, y: 80, valKey: 'cognitiveInhibition' },
        { id: 'broca', label: 'Broca\'s Area Language Selector', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_lat', label: 'Cognitive Latency Response', type: 'output', x: 82, y: 20, valKey: null },
        { id: 'out_act', label: 'Executive Prefrontal Activation', type: 'output', x: 82, y: 80, valKey: null },
      ] as Node[]
    },
    cooperative_networks: {
      category: "MULTI-AGENT SYSTEMS",
      name: "Emergent Network Topology",
      desc: "Simulates decentralized packet routing and data traversal. Adjust link reliability and pathfinding power to evaluate routing latency and pathfinding efficiency.",
      equation: "Efficiency % = Reliability × Power × Density",
      accentColor: "from-violet-500 to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.3)",
      nodes: [
        { id: 'trust', label: 'Node Link Trust (Reliability)', type: 'input', x: 18, y: 16, valKey: 'mutualTrust' },
        { id: 'payoff', label: 'Pathfinding Routing Power', type: 'input', x: 18, y: 50, valKey: 'payoffIncentive' },
        { id: 'dens', label: 'Network Cluster Density', type: 'input', x: 18, y: 84, valKey: 'networkDensity' },
        { id: 'coop_proc', label: 'Packet Router / Pathfinding Solver', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_coop', label: 'Pathfinding Efficiency', type: 'output', x: 82, y: 25, valKey: null },
        { id: 'out_def', label: 'Average Packet Latency', type: 'output', x: 82, y: 75, valKey: null },
      ] as Node[]
    }
  };

  const currentModel = models[activeBias];

  // Calculations
  let out1 = 0;
  let out2 = 0;
  let isMsUnit = false;

  if (activeBias === 'sunk_cost') {
    out1 = Math.min(100, Math.max(0, (inputs.investment * 0.8) - (inputs.evidence * 0.45) + 20));
    out2 = 100 - out1;
  } else if (activeBias === 'confirmation') {
    out1 = Math.min(100, Math.max(0, inputs.priorBelief * 0.65 + inputs.newInfo * 0.35));
    out2 = Math.min(100, Math.max(0, Math.abs(inputs.priorBelief - inputs.newInfo) * 1.3));
  } else if (activeBias === 'availability') {
    out1 = Math.min(100, Math.max(0, (inputs.recentExposure * 0.75) + (inputs.baseRate * 0.25)));
    out2 = 100 - out1;
  } else if (activeBias === 'eeg_cognitive_load') {
    const ratio = inputs.betaWave / Math.max(10, inputs.alphaWave);
    out1 = Math.min(100, Math.max(0, (ratio * 18) + (inputs.taskComplexity * 0.5) + 10));
    out2 = 100 - out1;
  } else if (activeBias === 'bilingual_switching') {
    isMsUnit = true;
    out1 = Math.min(950, Math.max(200, 300 + (100 - inputs.l2Dominance) * 4.5 + inputs.cognitiveInhibition * 3.5));
    out2 = Math.min(100, Math.max(0, (inputs.cognitiveInhibition * 0.65) + (inputs.l2Dominance * 0.35)));
  } else if (activeBias === 'cooperative_networks') {
    const reliability = inputs.mutualTrust / 100;
    const routing = inputs.payoffIncentive / 100;
    const density = inputs.networkDensity / 100;
    out1 = Math.min(100, Math.max(0, (inputs.mutualTrust * 0.4) + (inputs.payoffIncentive * 0.3) + (inputs.networkDensity * 0.3)));
    out2 = Math.min(500, Math.max(12, Math.round(350 / (0.2 + (reliability * 0.5) + (routing * 0.4)) + (density * 50))));
  }

  // Draw curves and flowing photons
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    
    // ResizeObserver ensures perfect resizing inside layouts
    const observer = new ResizeObserver(() => {
      resize();
    });
    observer.observe(canvas);

    let frame = 0;
    let animationId: number;

    const paths = [
      [ {x: 18, y: 16}, {x: 32, y: 25}, {x: 45, y: 20}, {x: 50, y: 50}, {x: 65, y: 25}, {x: 82, y: 25} ],
      [ {x: 18, y: 16}, {x: 32, y: 25}, {x: 50, y: 50}, {x: 68, y: 65}, {x: 82, y: 75} ],
      [ {x: 18, y: 50}, {x: 35, y: 60}, {x: 50, y: 50}, {x: 65, y: 25}, {x: 82, y: 25} ],
      [ {x: 18, y: 50}, {x: 50, y: 50}, {x: 68, y: 65}, {x: 82, y: 75} ],
      [ {x: 18, y: 84}, {x: 35, y: 70}, {x: 55, y: 80}, {x: 50, y: 50}, {x: 68, y: 65}, {x: 82, y: 75} ],
      [ {x: 18, y: 84}, {x: 55, y: 80}, {x: 50, y: 50}, {x: 65, y: 25}, {x: 82, y: 25} ]
    ];

    const particles: Array<{
      x: number;
      y: number;
      path: Array<{ x: number; y: number }>;
      currentSegment: number;
      segmentProgress: number;
      speed: number;
      color: string;
      size: number;
      jitter: number;
    }> = [];

    const drawLine = (ctx: CanvasRenderingContext2D, n1: Node, n2: Node, isInput: boolean) => {
      const x1 = (n1.x / 100) * canvas.width;
      const y1 = (n1.y / 100) * canvas.height;
      const x2 = (n2.x / 100) * canvas.width;
      const y2 = (n2.y / 100) * canvas.height;

      const cp1x = x1 + (x2 - x1) * 0.45;
      const cp1y = y1;
      const cp2x = x1 + (x2 - x1) * 0.55;
      const cp2y = y2;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
      
      // Cyber tethers
      ctx.strokeStyle = isInput ? 'rgba(14, 165, 233, 0.08)' : 'rgba(244, 63, 94, 0.08)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = isInput ? 'rgba(14, 165, 233, 0.25)' : 'rgba(244, 63, 94, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Flowing glowing Photons
      const numPhotons = 2;
      ctx.save();
      ctx.shadowBlur = 6;
      ctx.shadowColor = isInput ? '#0ea5e9' : '#f43f5e';
      ctx.fillStyle = isInput ? '#0ea5e9' : '#f43f5e';

      for (let i = 0; i < numPhotons; i++) {
        const speed = isInput ? 0.006 : 0.004;
        const t = ((frame * speed) + (i / numPhotons)) % 1.0;
        const mt = 1 - t;

        // Cubic Bezier math
        const px = mt*mt*mt * x1 + 3*mt*mt * t * cp1x + 3*mt * t*t * cp2x + t*t*t * x2;
        const py = mt*mt*mt * y1 + 3*mt*mt * t * cp1y + 3*mt * t*t * cp2y + t*t*t * x2;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (activeBias === 'cooperative_networks') {
        // --- Emergent Network Topology custom particle routing visualizer ---
        ctx.save();
        ctx.lineWidth = 1.2;
        paths.forEach(path => {
          ctx.beginPath();
          for (let idx = 0; idx < path.length - 1; idx++) {
            const pt1 = path[idx];
            const pt2 = path[idx+1];
            const x1 = (pt1.x / 100) * canvas.width;
            const y1 = (pt1.y / 100) * canvas.height;
            const x2 = (pt2.x / 100) * canvas.width;
            const y2 = (pt2.y / 100) * canvas.height;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)'; 
          ctx.stroke();
        });
        ctx.restore();

        // Draw auxiliary routing hubs
        const auxNodes = [
          { x: 32, y: 30 },
          { x: 35, y: 65 },
          { x: 45, y: 25 },
          { x: 55, y: 75 },
          { x: 65, y: 30 },
          { x: 68, y: 60 }
        ];
        auxNodes.forEach(node => {
          const nx = (node.x / 100) * canvas.width;
          const ny = (node.y / 100) * canvas.height;
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#8b5cf6';
          ctx.fill();
        });

        // Spawn packet particles influenced by routing power and density
        const currentInputs = inputsRef.current;
        const spawnInterval = Math.max(3, Math.round(25 - (currentInputs.payoffIncentive / 10) - (currentInputs.networkDensity / 15)));
        if (frame % spawnInterval === 0 && particles.length < 45) {
          const pathIdx = Math.floor(Math.random() * paths.length);
          const selectedPath = paths[pathIdx];
          
          const trustVal = currentInputs.mutualTrust; 
          const speedMultiplier = 0.5 + (currentInputs.payoffIncentive / 100) * 1.8;
          const particleSpeed = (0.012 + Math.random() * 0.015) * speedMultiplier;
          
          let color = '#a78bfa';
          if (trustVal > 70) {
            color = '#10b981'; // Green: extremely reliable/efficient path
          } else if (trustVal > 40) {
            color = '#38bdf8'; // Blue: stable path
          } else if (trustVal > 20) {
            color = '#f59e0b'; // Orange: high latency/packet congestion
          } else {
            color = '#f43f5e'; // Red: severe packet loss risks
          }

          particles.push({
            x: (selectedPath[0].x / 100) * canvas.width,
            y: (selectedPath[0].y / 100) * canvas.height,
            path: selectedPath,
            currentSegment: 0,
            segmentProgress: 0,
            speed: particleSpeed,
            color,
            size: 2.2 + Math.random() * 1.8,
            jitter: trustVal < 45 ? (50 - trustVal) / 10 : 0
          });
        }

        // Update and render particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.segmentProgress += p.speed;
          
          if (p.segmentProgress >= 1.0) {
            p.segmentProgress = 0;
            p.currentSegment++;
          }
          
          if (p.currentSegment >= p.path.length - 1) {
            particles.splice(i, 1);
            continue;
          }
          
          const startNode = p.path[p.currentSegment];
          const endNode = p.path[p.currentSegment + 1];
          
          const startX = (startNode.x / 100) * canvas.width;
          const startY = (startNode.y / 100) * canvas.height;
          const endX = (endNode.x / 100) * canvas.width;
          const endY = (endNode.y / 100) * canvas.height;
          
          p.x = startX + (endX - startX) * p.segmentProgress;
          p.y = startY + (endY - startY) * p.segmentProgress;
          
          if (p.jitter > 0) {
            p.x += (Math.random() - 0.5) * p.jitter;
            p.y += (Math.random() - 0.5) * p.jitter;
          }

          ctx.save();
          ctx.beginPath();
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      } else {
        // --- Standard tree visualizer for other models ---
        currentModel.nodes.forEach(node => {
          if (node.type === 'input') {
            const processNode = currentModel.nodes.find(n => n.type === 'process');
            if (processNode) drawLine(ctx, node, processNode, true);
          } else if (node.type === 'process') {
            currentModel.nodes.filter(n => n.type === 'output').forEach(outNode => {
              drawLine(ctx, node, outNode, false);
            });
          }
        });
      }

      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [currentModel]);

  return (
    <div className="bg-[#0c0d12] border border-[#fcfaf7]/10 rounded-2xl overflow-hidden shadow-2xl relative text-slate-100">
      {/* Top micro glowing progress track */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${currentModel.accentColor} opacity-80`}></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
        
        {/* Responsive Control Dock */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-[#fcfaf7]/10 bg-[#090a0d] p-6 flex flex-col relative z-20 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BrainCircuit className="w-5 h-5 text-sky-400 animate-pulse" />
              <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-slate-300">Lab Console V2.6</h3>
            </div>

            {/* Scrolling button array on mobile/iPad, stacked index sidebar on desktop */}
            <div className="flex flex-row overflow-x-auto lg:flex-col gap-2 -mx-6 px-6 lg:mx-0 lg:px-0 mb-6 lg:mb-0 pb-3 lg:pb-0 scrollbar-none snap-x select-none">
              {Object.entries(models).map(([key, model]) => {
                const isActive = activeBias === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveBias(key as ModelType)}
                    className={`flex-shrink-0 lg:w-full text-left px-4 py-3 text-[11px] tracking-wider uppercase transition-all duration-300 border-b-2 lg:border-b-0 lg:border-l-2 snap-center ${
                      isActive 
                        ? 'border-sky-400 bg-sky-500/10 font-bold text-sky-300' 
                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                    }`}
                  >
                    <div className="text-[9px] opacity-40 font-mono tracking-normal lowercase mb-0.5">{model.category}</div>
                    <div className="font-sans font-medium">{model.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block pt-6 border-t border-[#fcfaf7]/10">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> SYSTEM RESOLUTION
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">STABLE_COGNITION</div>
          </div>
        </div>

        {/* Simulator Chassis */}
        <div className="lg:col-span-9 p-6 md:p-10 relative flex flex-col justify-between">
          
          {/* Header Metadata */}
          <div className="mb-6 relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-sky-400 font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" /> Active Research Model
              </div>
              <h2 className="text-2xl md:text-3xl font-serif italic text-slate-100">{currentModel.name}</h2>
              <p className="text-xs md:text-sm text-slate-400 max-w-xl mt-2 leading-relaxed">{currentModel.desc}</p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px] text-sky-300 shadow-sm">
                <Settings2 className="w-3.5 h-3.5" /> {currentModel.equation}
              </div>
            </div>
          </div>

          {/* Swipe indicator for mobile only */}
          <div className="block lg:hidden text-center text-[9px] uppercase tracking-[0.15em] text-sky-400/70 mb-2 animate-pulse bg-sky-950/20 py-1.5 rounded border border-sky-900/30">
            ← Drag chassis horizontally to view active nodes →
          </div>

          {/* Node Map Area - horizontally scrollable on small screens to prevent squeezing */}
          <div className="flex-1 overflow-x-auto pb-4 scrollbar-thin select-none touch-pan-x -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="relative min-w-[750px] h-[460px] my-auto">
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
              />
              
              {currentModel.nodes.map((node) => {
                const isInput = node.type === 'input';
                const isProcess = node.type === 'process';
                const isOutput = node.type === 'output';
                
                const val = isInput && node.valKey ? inputs[node.valKey] : null;
                
                let displayVal = 0;
                let unit = '%';
                
                if (isOutput) {
                  if (activeBias === 'bilingual_switching') {
                    if (node.id === 'out_lat') {
                      displayVal = out1;
                      unit = ' ms';
                    } else {
                      displayVal = out2;
                      unit = '%';
                    }
                  } else if (activeBias === 'cooperative_networks') {
                    if (node.id === 'out_coop') {
                      displayVal = out1;
                      unit = '%';
                    } else {
                      displayVal = out2;
                      unit = ' ms';
                    }
                  } else {
                    displayVal = (node.id === 'out_c' || node.id === 'out_acc' || node.id === 'out_o' || node.id === 'out_exh') ? out1 : out2;
                  }
                }

                return (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className={`
                        relative bg-[#111319] border rounded-xl shadow-lg transition-colors p-4
                        ${isProcess 
                          ? 'w-24 h-24 rounded-full flex flex-col items-center justify-center border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-[#0d0f14] hover:border-sky-400' 
                          : 'w-48 border-slate-800 hover:border-slate-700'
                        }
                      `}
                    >
                      {/* Accent glow line on non-process nodes */}
                      {!isProcess && (
                        <div className={`absolute top-0 left-3 right-3 h-[2px] bg-gradient-to-r ${isInput ? 'from-sky-500 to-sky-400' : 'from-rose-500 to-rose-400'} opacity-75`}></div>
                      )}

                      {isProcess ? (
                        <div className="flex flex-col items-center gap-1">
                          <Cpu className="w-6 h-6 text-sky-400 animate-spin-slow" />
                          <span className="text-[8px] font-mono tracking-widest text-sky-300 uppercase">SOLVER</span>
                        </div>
                      ) : (
                        <div className="flex flex-col h-full justify-between">
                          <div className="text-[9px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">
                            {node.label}
                          </div>

                          {isInput && node.valKey && (
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="text-slate-600">0</span>
                                <span className="font-bold text-sky-400">{val}%</span>
                                <span className="text-slate-600">100</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={val || 0}
                                onChange={(e) => setInputs(prev => ({ ...prev, [node.valKey!]: parseInt(e.target.value) }))}
                                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 hover:accent-sky-300 transition-colors"
                              />
                            </div>
                          )}

                          {isOutput && (
                            <div className="mt-1">
                              <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-mono font-bold text-emerald-400 tracking-tight">
                                  {displayVal.toFixed(0)}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">{unit}</span>
                              </div>
                              
                              {/* Glowing progression rail */}
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                                <div 
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.4)] transition-all duration-300"
                                  style={{ width: `${Math.min(100, Math.max(0, isMsUnit ? (displayVal / 9.5) : displayVal))}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Touch instructions and informational footer */}
          <div className="mt-4 pt-4 border-t border-[#fcfaf7]/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-3 font-mono">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" /> SLIDER AND TOUCH GESTURES ACTIVE
            </span>
            <span>MODEL FRAMEWORK OVER INTERACTIVE BEZIER ARCS</span>
          </div>

        </div>
      </div>
    </div>
  );
}
