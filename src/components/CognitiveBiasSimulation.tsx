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
  Sparkles,
  AlertTriangle,
  Play,
  RefreshCw,
  Terminal,
  Check,
  X,
  Volume2,
  Tv
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
  const [selectedBilingualSentence, setSelectedBilingualSentence] = useState(0);
  const [sunkDecision, setSunkDecision] = useState<'continue' | 'abandon' | null>(null);
  const [sunkSimulating, setSunkSimulating] = useState(false);
  const [vividShark, setVividShark] = useState(false);
  const [vividPlane, setVividPlane] = useState(false);
  const [vividLottery, setVividLottery] = useState(false);
  const eegCanvasRef = useRef<HTMLCanvasElement | null>(null);
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
      name: "MARL Trust Emergence",
      desc: "Evaluates multi-agent reinforcement learning (MARL) cooperation dynamics. Under noisy conditions, agents require memory to build stable trust hierarchies.",
      equation: "Cooperation % = Trust × Memory × Density",
      accentColor: "from-violet-500 to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.3)",
      nodes: [
        { id: 'trust', label: 'Memory / Trust Level', type: 'input', x: 18, y: 16, valKey: 'mutualTrust' },
        { id: 'payoff', label: 'Cooperative Payoff Weight', type: 'input', x: 18, y: 50, valKey: 'payoffIncentive' },
        { id: 'dens', label: 'Agent Population Density', type: 'input', x: 18, y: 84, valKey: 'networkDensity' },
        { id: 'coop_proc', label: 'MARL Trust Hub / Decision Solver', type: 'process', x: 50, y: 50, valKey: null },
        { id: 'out_coop', label: 'Network Cooperation Efficiency', type: 'output', x: 82, y: 25, valKey: null },
        { id: 'out_def', label: 'System Convergence Latency', type: 'output', x: 82, y: 75, valKey: null },
      ] as Node[]
    }
  };

  const currentModel = models[activeBias];

  const getSliderDefinitions = () => {
    switch (activeBias) {
      case 'sunk_cost':
        return [
          { label: 'Prior Investment', desc: 'Spent resources (capital/time) bias decision towards continuity.' },
          { label: 'Negative Evidence', desc: 'Hard data showing project failure risks. Suppresses continuity.' }
        ];
      case 'confirmation':
        return [
          { label: 'Prior Belief Level', desc: 'Pre-existing conviction or filter strength when evaluating evidence.' },
          { label: 'New Evidence Congruence', desc: 'How well incoming evidence aligns with pre-existing beliefs.' }
        ];
      case 'availability':
        return [
          { label: 'Statistical Base Rate', desc: 'The objective underlying mathematical frequency of an event.' },
          { label: 'Recent Exposure / Fear', desc: 'Highly dramatic or sensational news causing perception inflation.' }
        ];
      case 'eeg_cognitive_load':
        return [
          { label: 'Alpha Waves', desc: 'Cortical rhythms (8-12 Hz) denoting relaxed, resting brain activity.' },
          { label: 'Beta Waves', desc: 'Cortical rhythms (12-30 Hz) reflecting active processing and mental stress.' },
          { label: 'Task Complexity Load', desc: 'Density of instructions and difficulty of logical processing.' }
        ];
      case 'bilingual_switching':
        return [
          { label: 'L2 Dominance (%)', desc: 'Proficiency in L2. Low dominance increases pause latency.' },
          { label: 'Prefrontal Inhibition', desc: 'Executive effort to suppress native L1 pathways during switching.' }
        ];
      case 'cooperative_networks':
        return [
          { label: 'Memory / Trust Level', desc: 'Ability of agents to remember and honor cooperation agreements.' },
          { label: 'Cooperative Payoff Weight', desc: 'Strategic incentive multiplier encouraging coalition formation.' },
          { label: 'Agent Population Density', desc: 'Crowding factor causing transaction bottlenecks and collision rate.' }
        ];
      default:
        return [];
    }
  };

  const getBilingualSegments = (dom: number, inhib: number, sentenceIndex: number) => {
    if (sentenceIndex === 0) {
      const seg1 = dom > 60 && inhib > 60 
        ? { word: "Quiero explicarte", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 60
        ? { word: "Quiero explain", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 Intrusion (No Inhibition)" }
        : dom <= 60 && inhib > 60
        ? { word: "Quiero... [300ms pause] ...explicar", lang: "L2", status: "hesitation", desc: "Lexical Search Pause" }
        : { word: "I want to explain", lang: "L1", status: "intrusion", desc: "L1 Dominant Retrieval" };

      const seg2 = dom > 60 && inhib > 50 
        ? { word: "mi investigación", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 50
        ? { word: "mi research", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 60 && inhib > 50
        ? { word: "mi... [450ms pause] ...trabajo", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "my research", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg3 = dom > 50 && inhib > 50 
        ? { word: "sobre las ondas cerebrales", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 50 && inhib <= 50
        ? { word: "sobre brain waves", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 Code-Switch" }
        : dom <= 50 && inhib > 50
        ? { word: "sobre... [500ms pause] ...ondas", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "on brain waves", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg4 = dom > 50 && inhib > 50 
        ? { word: "y los modelos cognitivos.", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 50 && inhib <= 50
        ? { word: "y cognitive models.", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 Code-Switch" }
        : dom <= 50 && inhib > 50
        ? { word: "y... [400ms pause] ...modelos.", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "and cognitive models.", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      return [seg1, seg2, seg3, seg4];
    } else if (sentenceIndex === 1) {
      const seg1 = dom > 60 && inhib > 60 
        ? { word: "Evaluar el aprendizaje", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 60
        ? { word: "Evaluating aprendizaje", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 Code-Switch" }
        : dom <= 60 && inhib > 60
        ? { word: "Evaluar... [550ms pause]", lang: "L2", status: "hesitation", desc: "Lexical Search Pause" }
        : { word: "Evaluating", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg2 = dom > 60 && inhib > 50 
        ? { word: "por refuerzo multi-agente", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 50
        ? { word: "por multi-agent reinforcement", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 60 && inhib > 50
        ? { word: "de... [400ms pause] ...refuerzo", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "multi-agent reinforcement learning", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg3 = dom > 50 && inhib > 50 
        ? { word: "bajo condiciones de ruido", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 50 && inhib <= 50
        ? { word: "bajo noisy conditions", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 50 && inhib > 50
        ? { word: "bajo... [450ms pause] ...ruido", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "under noisy conditions", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg4 = dom > 50 && inhib > 50 
        ? { word: "requiere memoria.", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 50 && inhib <= 50
        ? { word: "requires memory.", lang: "L1", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 50 && inhib > 50
        ? { word: "necesita... [350ms pause] ...memoria.", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "requires memory.", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      return [seg1, seg2, seg3, seg4];
    } else {
      const seg1 = dom > 60 && inhib > 50 
        ? { word: "Las ondas beta representan", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 50
        ? { word: "Beta waves representan", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 60 && inhib > 50
        ? { word: "Ondas beta... [400ms pause] ...representan", lang: "L2", status: "hesitation", desc: "Lexical Search" }
        : { word: "Beta waves represent", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg2 = dom > 60 && inhib > 50 
        ? { word: "el enfoque activo", lang: "L2", status: "fluent", desc: "Fluent L2 Production" }
        : dom > 60 && inhib <= 50
        ? { word: "el active focus", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 60 && inhib > 50
        ? { word: "el... [350ms pause] ...enfoque", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "active focus", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg3 = dom > 50 && inhib > 50 
        ? { word: "mientras que las ondas alfa aumentan", lang: "L2", status: "fluent", desc: "Fluent L2" }
        : dom > 50 && inhib <= 50
        ? { word: "mientras alpha waves spike", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 50 && inhib > 50
        ? { word: "mientras... [500ms pause] ...ondas alfa", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "while alpha waves spike", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      const seg4 = dom > 50 && inhib > 50 
        ? { word: "durante el estado de reposo.", lang: "L2", status: "fluent", desc: "Fluent L2" }
        : dom > 50 && inhib <= 50
        ? { word: "durante resting state.", lang: "L1/L2 Blend", status: "intrusion", desc: "L1 intrusion" }
        : dom <= 50 && inhib > 50
        ? { word: "durante... [450ms pause] ...reposo.", lang: "L2", status: "hesitation", desc: "Search Pause" }
        : { word: "during resting state.", lang: "L1", status: "intrusion", desc: "L1 Intrusion" };

      return [seg1, seg2, seg3, seg4];
    }
  };

  const getMarlSimState = (trust: number, weight: number, density: number) => {
    const logs = [];
    if (trust > 70) {
      logs.push({ tag: "STABLE CONSENSUS", text: "Multi-agent trust consensus secured. 98% mutual cooperation rate.", color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" });
      logs.push({ tag: "MEMORY FILTER", text: `Reciprocal altruism engine active. High trust (${trust}%) suppresses noise cascades.`, color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" });
    } else if (trust > 40) {
      logs.push({ tag: "NOISY CHANNEL", text: "Transient transaction failures detected due to noise. Standard memory filtering active.", color: "text-amber-400 border-amber-500/20 bg-amber-500/5" });
      logs.push({ tag: "CLUSTER AGENT", text: `Cooperative clusters stabilizing around Population Hubs (density: ${density}%).`, color: "text-sky-400 border-sky-500/20 bg-sky-500/5" });
    } else {
      logs.push({ tag: "TRUST COLLAPSE", text: "Severe trust collapse! Memory threshold insufficient to resolve prisoner's dilemma.", color: "text-rose-400 border-rose-500/20 bg-rose-500/5" });
      logs.push({ tag: "DEFECTION CASCADE", text: "Defection cascades triggered across 85% of active nodes. High routing retry overhead.", color: "text-rose-400 border-rose-500/20 bg-rose-500/5" });
    }

    if (weight > 70) {
      logs.push({ tag: "PAYOFF HIGH", text: `High cooperative payoff multiplier (${weight}%) encourages long-term coalition formatting.`, color: "text-purple-400 border-purple-500/20 bg-purple-500/5" });
    } else {
      logs.push({ tag: "SELFISH OPTIM", text: "Low reward incentive. Agents prioritize immediate local selfish exploitation.", color: "text-orange-400 border-orange-500/20 bg-orange-500/5" });
    }

    if (density > 65) {
      logs.push({ tag: "TOPOLOGY COLLUSION", text: `Dense cluster topology (${density} nodes/unit²). High packet collision hazard.`, color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5" });
    } else {
      logs.push({ tag: "DECENTRALIZED", text: "Sparse agent distribution. Network paths are highly decentralized and isolated.", color: "text-slate-400 border-white/5 bg-white/[0.01]" });
    }

    return logs;
  };

  const getConfirmationFilterHeadlines = (prior: number, filter: number) => {
    const isPro = prior > 50;
    const filterIntensity = filter;

    const headlines = [
      {
        original: "Independent peer review finds neuro-link algorithms decrease cognitive load by 35%.",
        type: "congruent_pro",
        dissonantExplanation: "DISMISSED: 'Sample size too small. Likely sponsored by neural tech giants to inflate valuations.'",
        congruentExplanation: "AMPLIFIED: 'Incontestable scientific proof of cortical optimization! Shared instantly with board.'"
      },
      {
        original: "Cybernetic audit records 24% exception rate in standard multi-agent planning networks.",
        type: "dissonant_pro",
        dissonantExplanation: "MUTED: 'Minor edge cases that are easily mitigated by the active prefrontal inhibition layer anyway.'",
        congruentExplanation: "AMPLIFIED: 'Exactly as expected. Decentralized networks are fundamentally chaotic and volatile.'"
      },
      {
        original: "Interactive user testing reveals marginal performance improvements with simplified dashboard layouts.",
        type: "neutral",
        dissonantExplanation: "DISREGARDED: 'Statistically insignificant user sample. Irrelevant findings.'",
        congruentExplanation: "INTEGRATED: 'Aligns perfectly with minimalist user ergonomics best practices.'"
      }
    ];

    return headlines.map(h => {
      let isCongruent = false;
      if (h.type === "congruent_pro") {
        isCongruent = isPro;
      } else if (h.type === "dissonant_pro") {
        isCongruent = !isPro;
      } else {
        isCongruent = Math.abs(prior - 50) < 30;
      }

      const isFilteredOut = !isCongruent && filterIntensity > 35;
      const isHighlyAmplified = isCongruent && filterIntensity > 60;

      return {
        text: h.original,
        isCongruent,
        status: isFilteredOut ? "MUTED / DISMISSED" : isHighlyAmplified ? "AMPLIFIED & INTEGRATED" : "STANDARD PASS",
        explanation: isFilteredOut ? h.dissonantExplanation : isHighlyAmplified ? h.congruentExplanation : "Processed with standard scientific objectivity.",
        severity: isFilteredOut ? "muted" : isHighlyAmplified ? "glowing" : "neutral"
      };
    });
  };

  const handleAvailabilityToggle = (type: 'shark' | 'plane' | 'lottery', active: boolean) => {
    if (type === 'shark') {
      setVividShark(active);
      if (active) {
        setInputs(prev => ({ ...prev, recentExposure: Math.min(100, prev.recentExposure + 35), baseRate: Math.max(5, prev.baseRate - 12) }));
      } else {
        setInputs(prev => ({ ...prev, recentExposure: Math.max(10, prev.recentExposure - 35) }));
      }
    } else if (type === 'plane') {
      setVividPlane(active);
      if (active) {
        setInputs(prev => ({ ...prev, recentExposure: Math.min(100, prev.recentExposure + 30), baseRate: Math.max(5, prev.baseRate - 8) }));
      } else {
        setInputs(prev => ({ ...prev, recentExposure: Math.max(10, prev.recentExposure - 30) }));
      }
    } else if (type === 'lottery') {
      setVividLottery(active);
      if (active) {
        setInputs(prev => ({ ...prev, recentExposure: Math.min(100, prev.recentExposure + 25) }));
      } else {
        setInputs(prev => ({ ...prev, recentExposure: Math.max(10, prev.recentExposure - 25) }));
      }
    }
  };

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

  // EEG Wave scope animation effect
  useEffect(() => {
    if (activeBias !== 'eeg_cognitive_load') return;
    const canvas = eegCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const drawWave = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.8;
      ctx.beginPath();

      const alphaAmp = inputs.alphaWave * 0.25;
      const betaAmp = inputs.betaWave * 0.12;
      const complexity = inputs.taskComplexity;

      for (let x = 0; x < canvas.width; x++) {
        // Superimpose Alpha (slow, resting state) and Beta (fast, alert processing)
        const yAlpha = Math.sin(x * 0.035 - offset * 0.04) * alphaAmp;
        const yBeta = Math.sin(x * 0.22 + offset * 0.25) * betaAmp * (0.4 + complexity / 100);
        const jitter = (Math.random() - 0.5) * (complexity * 0.08);

        const y = (canvas.height / 2) + yAlpha + yBeta + jitter;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Horizontal grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.25);
      ctx.lineTo(canvas.width, canvas.height * 0.25);
      ctx.moveTo(0, canvas.height * 0.5);
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.moveTo(0, canvas.height * 0.75);
      ctx.lineTo(canvas.width, canvas.height * 0.75);
      ctx.stroke();

      // Animated green laser scan pointer
      const scanX = (offset * 1.5) % canvas.width;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.fillRect(scanX - 15, 0, 15, canvas.height);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(scanX, 0, 2, canvas.height);

      offset++;
      animId = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => cancelAnimationFrame(animId);
  }, [activeBias, inputs.alphaWave, inputs.betaWave, inputs.taskComplexity]);

  return (
    <div className="bg-[#0c0d12] border border-[#fcfaf7]/10 rounded-2xl overflow-hidden shadow-2xl relative text-slate-100">
      {/* Top micro glowing progress track */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${currentModel.accentColor} opacity-80`}></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] md:min-h-[520px]">
        
        {/* Responsive Control Dock */}
        <div className="md:col-span-4 lg:col-span-3 xl:col-span-2 border-b md:border-b-0 md:border-r border-[#fcfaf7]/10 bg-[#090a0d] p-4 sm:p-5 md:p-6 flex flex-col relative z-20 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 lg:mb-6">
              <BrainCircuit className="w-5 h-5 text-sky-400 animate-pulse" />
              <h3 className="text-xs tracking-[0.2em] uppercase font-bold text-slate-300">Lab Console V2.6</h3>
            </div>

            {/* Responsive button array on mobile/iPad, stacked index sidebar on desktop */}
            <div className="flex flex-row overflow-x-auto md:flex-col gap-2 -mx-4 sm:-mx-5 px-4 sm:px-5 md:mx-0 md:px-0 mb-3 sm:mb-4 md:mb-0 pb-2 sm:pb-3 md:pb-0 select-none scrollbar-none snap-x touch-pan-x">
              {Object.entries(models).map(([key, model]) => {
                const isActive = activeBias === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveBias(key as ModelType)}
                    className={`flex-shrink-0 w-auto md:w-full text-left px-3 py-2 sm:px-4 sm:py-3 text-[10px] sm:text-[11px] tracking-wider uppercase transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 snap-center ${
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

          <div className="hidden md:block pt-6 border-t border-[#fcfaf7]/10">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-emerald-500" /> SYSTEM RESOLUTION
            </div>
            <div className="text-xs font-mono text-emerald-400 font-bold">STABLE_COGNITION</div>
          </div>
        </div>

        {/* Simulator Chassis */}
        <div className="md:col-span-8 lg:col-span-9 xl:col-span-10 p-4 sm:p-5 md:p-6 relative flex flex-col justify-between">
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 flex-1">
            <div className="flex-1 flex flex-col min-w-0">
            {/* Header Metadata */}
          <div className="mb-4 md:mb-5 relative z-10 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
              <div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-sky-400 font-bold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-sky-400" /> Active Research Model
                </div>
                <h2 className="text-2xl md:text-3xl font-serif italic text-slate-100">{currentModel.name}</h2>
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-400 max-w-xl mt-1 sm:mt-2 leading-relaxed">{currentModel.desc}</p>
              </div>
              
              <div className="flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-lg font-mono text-[10px] text-sky-300 shadow-sm">
                  <Settings2 className="w-3.5 h-3.5" /> {currentModel.equation}
                </div>
              </div>
            </div>

            {/* Dynamic Parameter/Slider Definitions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-800/80 pt-3.5">
              {getSliderDefinitions().map((def, index) => (
                <div key={index} className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-2.5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-sky-400">{def.label}</span>
                  <span className="text-[10px] leading-relaxed text-slate-400 font-sans">{def.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Swipe indicator for mobile only */}
          <div className="block md:hidden text-center text-[9px] uppercase tracking-[0.15em] text-sky-400/70 mb-2 animate-pulse bg-sky-950/20 py-1.5 rounded border border-sky-900/30">
            ← Drag chassis horizontally to view active nodes →
          </div>

          {/* Node Map Area - horizontally scrollable on small screens to prevent squeezing */}
          <div className="flex-1 overflow-x-auto pb-4 scrollbar-thin select-none touch-pan-x -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
            <div className="relative min-w-[550px] md:min-w-0 h-[340px] sm:h-[380px] md:h-[400px] my-auto w-full">
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
                        relative bg-[#111319]/95 backdrop-blur-sm border rounded-xl shadow-lg transition-colors p-2 sm:p-2.5 md:p-3
                        ${isProcess 
                          ? 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-[#0d0f14] hover:border-sky-400' 
                          : 'w-32 sm:w-40 md:w-44 lg:w-48 border-slate-800 hover:border-slate-700'
                        }
                      `}
                    >
                      {/* Accent glow line on non-process nodes */}
                      {!isProcess && (
                        <div className={`absolute top-0 left-3 right-3 h-[2px] bg-gradient-to-r ${isInput ? 'from-sky-500 to-sky-400' : 'from-rose-500 to-rose-400'} opacity-75`}></div>
                      )}

                      {isProcess ? (
                        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                          <Cpu className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-400 animate-spin-slow" />
                          <span className="text-[7px] md:text-[8px] font-mono tracking-widest text-sky-300 uppercase">SOLVER</span>
                        </div>
                      ) : (
                        <div className="flex flex-col h-full justify-between">
                          <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 mb-1 sm:mb-1.5 font-semibold leading-tight">
                            {node.label}
                          </div>
                          {isInput && node.valKey && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-[8px] sm:text-[10px] font-mono">
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
                            <div className="mt-0.5">
                              <div className="flex items-baseline gap-0.5 sm:gap-1">
                                <span className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-emerald-400 tracking-tight">
                                  {displayVal.toFixed(0)}
                                </span>
                                <span className="text-[8px] sm:text-[10px] font-mono text-slate-500">{unit}</span>
                              </div>
                              
                              {/* Glowing progression rail */}
                              <div className="w-full h-1 sm:h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1 sm:mt-1.5">
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
          </div>
          
          {/* Active Sandbox Simulator & Dynamic Diagnostic Panel */}
          <div className="xl:w-[450px] 2xl:w-[500px] flex-shrink-0 mt-5 sm:mt-8 xl:mt-0 border-t xl:border-t-0 xl:border-l border-[#fcfaf7]/10 pt-4 sm:pt-6 xl:pt-0 xl:pl-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-sky-400 font-bold mb-3 sm:mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Active Simulation Sandbox & Diagnostic Portal
            </div>
            
            {activeBias === 'eeg_cognitive_load' && (
              <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-1 gap-4 md:gap-6 bg-[#090a0d] border border-emerald-500/10 rounded-xl p-4 md:p-5 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Simulated EEG Waveform Scope */}
                <div className="md:col-span-7 lg:col-span-8 xl:col-span-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Prefrontal Cortex EEG Scope
                    </span>
                    <span className="text-[9px] text-slate-500 font-sans normal-case">Scanning Rate: 250 Hz</span>
                  </div>
                  
                  <div className="relative">
                    <canvas 
                      ref={eegCanvasRef} 
                      width={550} 
                      height={100} 
                      className="w-full bg-[#06070a] rounded-xl border border-emerald-500/15 shadow-[0_0_15px_rgba(16,185,129,0.03)]"
                    />
                    <div className="absolute top-2 left-3 flex gap-2">
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">ALPHA: {inputs.alphaWave}%</span>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">BETA: {inputs.betaWave}%</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    The oscilloscope shows real-time frequency synthesis: <strong className="text-emerald-400 font-medium">Alpha waves</strong> correspond to mental idle states, while <strong className="text-amber-400 font-medium">Beta waves</strong> represent focus. Higher complexity increases high-frequency beta jitter.
                  </p>
                </div>

                {/* Cognitive Diagnostics Dashboard */}
                <div className="md:col-span-5 lg:col-span-4 xl:col-span-1 flex flex-col justify-between bg-[#0c0e14] border border-emerald-500/10 rounded-xl p-3.5 md:p-4 space-y-3">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Cognitive Load Status</div>
                    {inputs.betaWave / Math.max(10, inputs.alphaWave) > 1.8 ? (
                      <div className="space-y-1.5">
                        <div className="text-amber-400 font-bold text-xs uppercase flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span> Hyper-Focused Beta Drive
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          Subject is experiencing high analytical load. Neurotransmitters are depleting as the prefrontal cortex processes information at peak frequency.
                        </p>
                      </div>
                    ) : inputs.alphaWave > 60 ? (
                      <div className="space-y-1.5">
                        <div className="text-emerald-400 font-bold text-xs uppercase flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Cortical Calming / Alpha State
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          Synchronized alpha wave bursts indicate deep mental recuperation. Available mental reserve is extremely high. Ideal for strategic oversight.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="text-slate-300 font-bold text-xs uppercase flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-slate-400"></span> Standard Alert Cognition
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          Healthy cortical balance. Steady allocation of energy is preventing premature cognitive burnout.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-emerald-500/10 space-y-1.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-500 font-sans">Exhaustion Probability</span>
                      <span className={`font-bold ${out1 > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>{out1.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${out1 > 70 ? 'bg-rose-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`}
                        style={{ width: `${out1}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeBias === 'cooperative_networks' && (
              <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-1 gap-4 md:gap-6 bg-[#090a0d] border border-violet-500/10 rounded-xl p-4 md:p-5 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Simulated Terminal logs */}
                <div className="md:col-span-7 lg:col-span-8 xl:col-span-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-violet-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-violet-400 animate-pulse" /> Multi-Agent Cooperative Ledger
                    </span>
                    <span className="text-[9px] text-slate-500">Protocol: Prisoner's Dilemma R-1</span>
                  </div>

                  <div className="bg-[#050609] border border-violet-500/15 rounded-xl p-3.5 font-mono text-[10.5px] space-y-2 min-h-[140px]">
                    {getMarlSimState(inputs.mutualTrust, inputs.payoffIncentive, inputs.networkDensity).map((log, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 p-1.5 rounded border ${log.color}`}>
                        <span className="font-bold opacity-75 shrink-0">[{log.tag}]</span>
                        <span className="leading-relaxed">{log.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Theoretical Parameters Details */}
                <div className="md:col-span-5 lg:col-span-4 xl:col-span-1 bg-[#0c0e14] border border-violet-500/10 rounded-xl p-3.5 md:p-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Network Architecture</div>
                    <div className="space-y-1">
                      <div className="text-violet-400 font-bold text-xs uppercase">Self-Organizing Clusters</div>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                        Under high mutual trust conditions, localized sub-graphs form self-defending coalitions that protect each other from rogue defectors.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-violet-500/10 flex justify-between text-[9px] text-slate-500">
                    <span>Active Hubs: ~{Math.round(inputs.networkDensity * 0.15 + 2)}</span>
                    <span>Throughput: {out1.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            )}

            {activeBias === 'sunk_cost' && (
              <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-1 gap-4 md:gap-6 bg-[#090a0d] border border-sky-500/10 rounded-xl p-4 md:p-5 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Sunk Cost Decision game */}
                <div className="md:col-span-7 lg:col-span-8 xl:col-span-1 space-y-3">
                  <div className="text-[10px] text-sky-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-sky-400" /> Executive Boardroom Decision Game
                  </div>

                  <div className="bg-[#06070a] border border-sky-500/15 rounded-xl p-3.5 md:p-4 space-y-2.5 md:space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-slate-500 font-sans">Accumulated Investment:</span>
                      <span className="text-sky-300 font-bold text-sm">${(inputs.investment * 10000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-slate-500 font-sans">Project Viability Evidence:</span>
                      <span className="text-rose-400 font-bold">{(100 - inputs.evidence)}% Negative Evidence</span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Decide project outcome:</span>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setSunkDecision('abandon');
                            setSunkSimulating(true);
                            setTimeout(() => setSunkSimulating(false), 800);
                          }}
                          className={`py-2 px-3 rounded-lg font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${
                            sunkDecision === 'abandon'
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30'
                          }`}
                        >
                          <X className="w-3.5 h-3.5" /> Abort / Cut Losses
                        </button>
                        <button
                          onClick={() => {
                            setSunkDecision('continue');
                            setSunkSimulating(true);
                            setTimeout(() => setSunkSimulating(false), 800);
                          }}
                          className={`py-2 px-3 rounded-lg font-bold border transition-all text-center flex items-center justify-center gap-1.5 ${
                            sunkDecision === 'continue'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5" /> Double Down
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sunk Cost Interactive Outcomes */}
                <div className="md:col-span-5 bg-[#0c0e14] border border-sky-500/10 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Simulated Outcome Probe</div>
                    
                    {sunkSimulating ? (
                      <div className="space-y-2 py-4 text-center">
                        <RefreshCw className="w-5 h-5 text-sky-400 animate-spin mx-auto" />
                        <span className="text-[10px] text-slate-500">PROBING RESIDUAL BUDGET MATRICES...</span>
                      </div>
                    ) : sunkDecision ? (
                      <div className="space-y-2 animate-fadeIn">
                        <div className={`text-xs font-bold uppercase flex items-center gap-1.5 ${sunkDecision === 'continue' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sunkDecision === 'continue' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />} 
                          {sunkDecision === 'continue' ? 'Commitment Persistence' : 'Rational Liquidation'}
                        </div>
                        <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                          {sunkDecision === 'continue' && inputs.evidence > 50 && (
                            `Disastrous outcome! You persistent because of the $${(inputs.investment * 10000).toLocaleString()} spent. The market has rejected the product, and you lose another $300k. Classic Sunk Cost Fallacy.`
                          )}
                          {sunkDecision === 'continue' && inputs.evidence <= 50 && (
                            `Risky persistency pays off. You spent an additional $200k to save the initial $${(inputs.investment * 10000).toLocaleString()}. High anxiety, but you escaped liquidation.`
                          )}
                          {sunkDecision === 'abandon' && inputs.investment > 60 && (
                            `Painful but intelligent choice! Reclaimed remaining resources and shifted developer efforts to profitable models. Reallocation nets a strategic rebound.`
                          )}
                          {sunkDecision === 'abandon' && inputs.investment <= 60 && (
                            `Swift rational assessment. Negligible capital sank. You avoided emotional escalation, moving to the next optimal venture.`
                          )}
                        </p>
                      </div>
                    ) : (
                      <div className="text-[10px] text-slate-500 font-sans leading-relaxed py-6 text-center italic">
                        Select a boardroom option to project outcome based on investment bias and evidence thresholds.
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-sky-500/10 text-[9.5px] font-sans text-slate-500 flex justify-between">
                    <span>Sunk Cost Bias: {out1.toFixed(0)}%</span>
                    {sunkDecision && (
                      <button onClick={() => setSunkDecision(null)} className="text-sky-400 hover:underline">Reset Game</button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeBias === 'confirmation' && (
              <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-1 gap-4 md:gap-6 bg-[#090a0d] border border-purple-500/10 rounded-xl p-4 md:p-5 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Simulated Social Media Feed */}
                <div className="md:col-span-7 lg:col-span-8 xl:col-span-1 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" /> Neural Filter News Feed
                    </span>
                    <span className="text-[9px] text-slate-500 font-sans normal-case">Filter Level: {inputs.priorBelief > 50 ? 'PRO-MODEL BIAS' : 'SKEPTIC BIAS'}</span>
                  </div>

                  <div className="space-y-2.5">
                    {getConfirmationFilterHeadlines(inputs.priorBelief, inputs.newInfo).map((h, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 md:p-3.5 rounded-xl border transition-all duration-300 ${
                          h.severity === 'glowing' 
                            ? 'bg-emerald-950/10 border-emerald-500/30 text-slate-200 shadow-[0_0_12px_rgba(16,185,129,0.02)]' 
                            : h.severity === 'muted'
                            ? 'bg-slate-900/40 border-slate-900 text-slate-600 opacity-35'
                            : 'bg-slate-900/70 border-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[9px] font-bold text-slate-500">INCOMING SIGNAL {idx+1}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            h.severity === 'glowing' 
                              ? 'bg-emerald-500/10 text-emerald-400' 
                              : h.severity === 'muted'
                              ? 'bg-rose-500/10 text-rose-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}>{h.status}</span>
                        </div>
                        <div className="text-xs font-sans font-medium mb-1">{h.text}</div>
                        <div className="text-[10px] italic text-purple-400 pl-3 border-l border-purple-500/30 leading-relaxed font-sans">
                          🧠 Brain's Interpretation: {h.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cognitive Filtration mechanics explanation */}
                <div className="md:col-span-5 lg:col-span-4 xl:col-span-1 bg-[#0c0e14] border border-purple-500/10 rounded-xl p-3.5 md:p-4 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Signal Filtration Math</div>
                    <div className="space-y-1.5">
                      <div className="text-purple-400 font-bold text-xs uppercase">Assimilation Overload</div>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                        Moving the <strong className="text-purple-300 font-medium">Cognitive Assimilation Filter</strong> slider upwards forces the brain to aggressively discard any scientific data that opposes prior belief schemas. Dissonant reports fade in readability.
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-500/10 flex justify-between text-[9.5px] text-slate-500">
                    <span>Assimilation Coeff: {out1.toFixed(0)}%</span>
                    <span>Dissonance Gap: {out2.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            )}

            {activeBias === 'availability' && (
              <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-1 gap-4 md:gap-6 bg-[#090a0d] border border-amber-500/10 rounded-xl p-4 md:p-5 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Interactive Toggles & Perceived vs Actual Risk Comparison */}
                <div className="md:col-span-7 lg:col-span-8 xl:col-span-1 space-y-3">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-amber-400" /> Sensational Media Headlines Console
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <span className="text-[9.5px] text-slate-500 uppercase font-bold tracking-wider">Select Media Alerts to feed your memory:</span>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => handleAvailabilityToggle('shark', !vividShark)}
                        className={`flex items-center justify-between p-2.5 md:p-3 rounded-lg border transition-all ${
                          vividShark 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-sans font-medium text-xs">
                          <span className="text-lg">🦈</span>
                          <div className="text-left">
                            <div>Shark Attack Coverage Saturated</div>
                            <div className="text-[9px] text-slate-500 font-mono normal-case">Vivid footage of great white shark on regional beach</div>
                          </div>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${vividShark ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                          {vividShark ? 'ACTIVE IN RETRIEVAL' : 'OFF'}
                        </div>
                      </button>

                      <button 
                        onClick={() => handleAvailabilityToggle('plane', !vividPlane)}
                        className={`flex items-center justify-between p-2.5 md:p-3 rounded-lg border transition-all ${
                          vividPlane 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-sans font-medium text-xs">
                          <span className="text-lg">✈️</span>
                          <div className="text-left">
                            <div>Sensational Flight Crash Incident</div>
                            <div className="text-[9px] text-slate-500 font-mono normal-case">High-salience footage of emergency airline landing</div>
                          </div>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${vividPlane ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                          {vividPlane ? 'ACTIVE IN RETRIEVAL' : 'OFF'}
                        </div>
                      </button>

                      <button 
                        onClick={() => handleAvailabilityToggle('lottery', !vividLottery)}
                        className={`flex items-center justify-between p-2.5 md:p-3 rounded-lg border transition-all ${
                          vividLottery 
                            ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-sans font-medium text-xs">
                          <span className="text-lg">🎰</span>
                          <div className="text-left">
                            <div>Vivid Lottery Winner Interview</div>
                            <div className="text-[9px] text-slate-500 font-mono normal-case">Winner declares: "If I did it, you can easily do it!"</div>
                          </div>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-bold ${vividLottery ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                          {vividLottery ? 'ACTIVE IN RETRIEVAL' : 'OFF'}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cognitive Risk Bias Gauge */}
                <div className="md:col-span-5 bg-[#0c0e14] border border-amber-500/10 rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Threat Assessment Analysis</div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-slate-400 font-sans">Objective Probability (Base Rate):</span>
                        <span className="text-emerald-400 font-bold">{inputs.baseRate}%</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] text-slate-400 font-sans">Your Brain's Perceived Threat:</span>
                        <span className="text-orange-400 font-bold">{out1.toFixed(0)}%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/[0.01] rounded-lg border border-white/5 text-[9.5px] text-slate-400 leading-relaxed font-sans">
                      {out1 > 70 ? (
                        "🧠 Neural availability pathways are saturated! Highly vivid, scary media clips have completely hijacked memory recall, making you perceive extremely rare accidents as high-probability risks."
                      ) : (
                        "Calm risk assessment. When sensational media is filtered out, perceived probability aligns much closer with historical statistical base rates."
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-amber-500/10 flex justify-between text-[9px] text-slate-500">
                    <span>Recency Bias weight: {inputs.recentExposure}%</span>
                    {(vividShark || vividPlane || vividLottery) && (
                      <button 
                        onClick={() => {
                          setVividShark(false);
                          setVividPlane(false);
                          setVividLottery(false);
                          setInputs(prev => ({ ...prev, recentExposure: 20, baseRate: 20 }));
                        }} 
                        className="text-amber-400 hover:underline"
                      >
                        Mute Media Alerts
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeBias === 'bilingual_switching' && (
              <div className="grid grid-cols-1 gap-4 bg-[#090a0d] border border-rose-500/10 rounded-xl p-4 text-xs font-mono text-slate-300 animate-fadeIn">
                
                {/* Simulated Speech Output Stream */}
                <div className="bg-[#0b0c10] border border-rose-500/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-rose-400 font-bold tracking-widest uppercase flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" /> Neurolinguistics Speech Stream (English ⇆ Spanish)
                      </div>
                      <div className="text-[9px] text-slate-500 font-sans normal-case">
                        Simulating dynamic lexical selection and speech synthesis of bilingual cognitive load.
                      </div>
                    </div>
                    {/* Sentence Tabs */}
                    <div className="flex gap-1 bg-[#12141c] p-1 rounded-lg border border-white/5 self-start sm:self-center">
                      {["Sentence A", "Sentence B", "Sentence C"].map((tab, idx) => (
                        <button
                          key={tab}
                          onClick={() => setSelectedBilingualSentence(idx)}
                          className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase transition-all duration-200 ${
                            selectedBilingualSentence === idx 
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Simulated Speech Output (Read Left to Right):</span>
                      <span className="text-[10px] font-mono text-rose-400">
                        Estimated Switch Overhead: <strong className="text-white">+{out1.toFixed(0)} ms</strong>
                      </span>
                    </div>

                    {/* Word Chips container - responsive grid to handle long text gracefully */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-[#11131a]/80 rounded-xl border border-white/5 relative items-start">
                      {getBilingualSegments(inputs.l2Dominance, inputs.cognitiveInhibition, selectedBilingualSentence).map((seg, idx) => {
                        let badgeBg = "";
                        let badgeText = "";
                        let borderStyle = "";
                        if (seg.status === "fluent") {
                          badgeBg = "bg-emerald-500/10";
                          badgeText = "text-emerald-200";
                          borderStyle = "border-emerald-500/20";
                        } else if (seg.status === "intrusion") {
                          badgeBg = "bg-rose-500/10";
                          badgeText = "text-rose-200";
                          borderStyle = "border-rose-500/20";
                        } else {
                          badgeBg = "bg-amber-500/20";
                          badgeText = "text-amber-100 drop-shadow-sm";
                          borderStyle = "border-amber-500/30";
                        }

                        return (
                          <div key={idx} className="flex flex-col gap-1.5 p-2.5 bg-white/[0.02] border border-white/5 rounded-lg w-full h-full justify-between">
                            <motion.div
                              layout
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.25 }}
                              className={`px-2 py-1.5 rounded border ${badgeBg} ${borderStyle} ${badgeText} font-sans font-semibold text-xs sm:text-[11px] lg:text-xs shadow-sm leading-relaxed`}
                            >
                              {seg.word}
                            </motion.div>
                            <span className="text-[9px] text-slate-500 font-mono tracking-wide px-0.5 leading-snug">
                              {seg.lang} • {seg.desc}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cognitive Diagnosis details */}
                  <div className="p-3 bg-white/[0.01] rounded-lg border border-white/5 text-[10px] text-slate-400 leading-relaxed flex flex-col gap-1 font-mono">
                    <span className="font-bold text-slate-300 uppercase tracking-widest text-[9px] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Cognitive Process Analysis:
                    </span>
                    <span className="normal-case">
                      {inputs.l2Dominance <= 35 && inputs.cognitiveInhibition <= 35 && (
                        "Low L2 dominance paired with low prefrontal inhibition results in heavy native language (L1) intrusion. The speaker relies entirely on English vocabulary and experiences low translation effort because native pathways are uninhibited."
                      )}
                      {inputs.l2Dominance > 70 && inputs.cognitiveInhibition <= 35 && (
                        "High L2 dominance allows Spanish vocabulary retrieval, but low prefrontal inhibition results in spontaneous 'Spanglish' code-switching. English concepts easily intrude because the brain's selection barrier is relaxed."
                      )}
                      {inputs.l2Dominance <= 35 && inputs.cognitiveInhibition > 70 && (
                        "High prefrontal inhibition successfully blocks English, but because L2 dominance is low, the speaker experiences severe 'lexical search search cost'. Speech is marked by massive cognitive pauses (350ms - 550ms) to retrieve words."
                      )}
                      {inputs.l2Dominance > 70 && inputs.cognitiveInhibition > 70 && (
                        "Optimal dual-language performance. High prefrontal inhibition perfectly suppresses English pathways, while high L2 dominance allows seamless and fluent Spanish articulation with zero hesitation."
                      )}
                      {((inputs.l2Dominance > 35 && inputs.l2Dominance <= 70) || (inputs.cognitiveInhibition > 35 && inputs.cognitiveInhibition <= 70)) && (
                        "Intermediate activation thresholds. Modest prefrontal effort is filtering L1 intrusion, resulting in a moderate switch latency of around " + out1.toFixed(0) + "ms. Some words require slight pauses to cross activation thresholds."
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            </div>
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
