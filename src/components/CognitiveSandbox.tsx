import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Brain, Network, Zap, Play } from 'lucide-react';

export function CognitiveSandbox() {
  const [activeTab, setActiveTab] = useState('EEG CLASSIFIER');
  
  // SACC State
  const [saccSample, setSaccSample] = useState(0);

  // MARL State
  const [marlNoise, setMarlNoise] = useState(false);
  const [marlArch, setMarlArch] = useState('Standard DQN');

  // RL State
  const [rlBias, setRlBias] = useState('Loss-Averse');

  // EEG State
  const [eegTask, setEegTask] = useState('Resting State');
  const [eegModel, setEegModel] = useState('TRANSFORMER');

  const tabs = [
    { id: 'EEG CLASSIFIER', icon: Brain, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    { id: 'SACC SWITCHING', icon: Activity, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    { id: 'MARL TRUST', icon: Network, color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
    { id: 'RL BIASES', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' }
  ];

  const activeColorClass = tabs.find(t => t.id === activeTab)?.color || 'text-yellow-500';

  return (
    <div className="w-full bg-[#0d0f14] text-[#e0e2e6] rounded-xl overflow-hidden font-sans border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-2 h-2 rounded-full ${activeColorClass.replace('text-', 'bg-')}`}></span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${activeColorClass}`}>Interactive Lab</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-white/50">SEED-VIG & SACC SIMULATORS</span>
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-white mb-2">Computational Cognitive Sandbox</h3>
          <p className="text-sm text-white/60 max-w-xl">
            Interact directly with George's primary research focus areas. Toggle parameters, feed real text, and evaluate cognitive metrics in real-time.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold tracking-[0.1em] uppercase transition-colors ${
                  isActive 
                    ? `${tab.bg} ${tab.color} ${tab.border}` 
                    : 'text-white/50 hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon size={12} />
                {tab.id}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Sidebar */}
        <div className="lg:col-span-3 border-r border-white/10 p-6 md:p-8 flex flex-col gap-8 bg-white/[0.02]">
          {activeTab === 'EEG CLASSIFIER' && (
            <EEGLeft 
              activeTask={eegTask} 
              setActiveTask={setEegTask} 
              activeModel={eegModel} 
              setActiveModel={setEegModel} 
            />
          )}
          {activeTab === 'SACC SWITCHING' && <SACCLeft sample={saccSample} setSample={setSaccSample} />}
          {activeTab === 'MARL TRUST' && <MARLLeft noise={marlNoise} setNoise={setMarlNoise} arch={marlArch} setArch={setMarlArch} />}
          {activeTab === 'RL BIASES' && <RLLeft bias={rlBias} setBias={setRlBias} />}
        </div>

        {/* Main Display Area */}
        <div className="lg:col-span-9 p-6 md:p-8 flex flex-col relative bg-gradient-to-br from-[#0d0f14] to-[#0a0c10]">
          {activeTab === 'EEG CLASSIFIER' && (
            <EEGRight 
              activeTask={eegTask} 
              activeModel={eegModel} 
            />
          )}
          {activeTab === 'SACC SWITCHING' && <SACCRight sample={saccSample} />}
          {activeTab === 'MARL TRUST' && <MARLRight noise={marlNoise} arch={marlArch} />}
          {activeTab === 'RL BIASES' && <RLRight bias={rlBias} />}
        </div>
      </div>
    </div>
  );
}

// --- EEG CLASSIFIER ---
interface EEGLeftProps {
  activeTask: string;
  setActiveTask: (task: string) => void;
  activeModel: string;
  setActiveModel: (model: string) => void;
}

function EEGLeft({ activeTask, setActiveTask, activeModel, setActiveModel }: EEGLeftProps) {
  const tasks = [
    { id: 'Resting State', desc: 'MINIMAL COGNITIVE LOAD BASELINE' },
    { id: 'Cardiac LIME/SHAP', desc: 'ANALYZING EXPLAINABLE DECISION PATHS' },
    { id: 'Bilingual Code-Switch', desc: 'HIGH-DEMAND LANGUAGE TRANSITION' },
    { id: 'Visual N-Back Task', desc: 'DQN-ROBUSTNESS UNDER SEVERE LOAD' }
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500 mb-2">01. Active Cognitive Tasks</h4>
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className={`text-left p-4 rounded-lg border transition-all ${
              activeTask === task.id
                ? 'bg-white/10 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                : 'border-white/5 hover:bg-white/5 opacity-60'
            }`}
          >
            <div className="font-medium text-sm text-white mb-1">{task.id}</div>
            <div className="text-[9px] uppercase tracking-wider font-mono text-white/40">{task.desc}</div>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-auto">
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500 mb-2">02. Neural Model Selection</h4>
        <div className="grid grid-cols-3 gap-2">
          {['CNN', 'LSTM', 'TRANSFORMER'].map(model => (
            <button
              key={model}
              onClick={() => setActiveModel(model)}
              className={`py-3 text-[10px] font-bold tracking-wider uppercase rounded border transition-colors ${
                activeModel === model
                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
                  : 'border-white/10 text-white/50 hover:bg-white/5'
              }`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

interface EEGRightProps {
  activeTask: string;
  activeModel: string;
}

function EEGRight({ activeTask, activeModel }: EEGRightProps) {
  const [isStimulating, setIsStimulating] = useState(false);
  const trigger = () => {
    setIsStimulating(true);
    setTimeout(() => setIsStimulating(false), 2500);
  };

  const isHighLoad = activeTask !== 'Resting State' || isStimulating;
  
  // Realistically model power shift between Alpha and Beta waves
  const alphaPower = isHighLoad ? 18 : 84;
  const betaPower = isHighLoad ? 82 : 16;
  const estimateLoadWidth = isHighLoad ? '88%' : '12%';
  const estimateLoadText = isHighLoad ? 'High Task Load' : 'Minimal / Idle';
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-10">
        <div className="text-[10px] font-mono tracking-widest uppercase text-white/40">Seed-Vig Experimentation Engine</div>
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-emerald-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isStimulating ? 'animate-pulse' : ''}`}></span>
          System Status: Online
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-10 items-start mb-8">
        {/* Left Side: Electrode Map & Stimulation Trigger */}
        <div className="flex flex-col gap-6 items-center">
          <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center border border-white/5 rounded-full p-6 bg-white/[0.01]">
            <div className="absolute top-4 left-4 text-[9px] font-mono tracking-widest text-white/30">FRONTAL (Fz)</div>
            <div className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest text-white/30">OCCIPITAL (Oz)</div>
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              <path d="M 50 10 C 30 10 15 25 15 45 C 15 60 25 70 35 85 C 40 92 45 95 50 95 C 55 95 60 92 65 85 C 75 70 85 60 85 45 C 85 25 70 10 50 10 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <path d="M 50 10 L 50 95 M 20 40 L 80 40 M 25 60 L 75 60" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-12 h-12 border border-white/20 rounded bg-[#0a0c10] flex items-center justify-center transition-colors ${isStimulating ? 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' : ''}`}>
                <div className={`w-4 h-4 rounded-sm transition-colors ${isStimulating ? 'bg-yellow-500 animate-pulse' : 'bg-white/20'}`} />
              </div>
            </div>
          </div>

          <button onClick={trigger} className="w-full max-w-[240px] py-3.5 flex items-center justify-center gap-2 rounded text-[10px] font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Play size={12} /> Trigger Cognitive Stimulus
          </button>
        </div>

        {/* Right Side: Interactive Explanations of Alpha and Beta waves */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-end mb-2">
              <div className="text-[10px] font-mono tracking-widest uppercase text-white/50">Cognitive Load Estimate</div>
              <div className="text-[10px] font-mono tracking-widest text-white/50">{estimateLoadText}</div>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-white" animate={{ width: estimateLoadWidth }} />
            </div>
          </div>

          {/* Spectral Wave Explainer */}
          <div className="bg-[#0a0c10]/70 p-4 rounded-lg border border-white/5 space-y-4">
            <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 border-b border-white/5 pb-2">
              Spectral Band Analysis
            </div>
            
            {/* Alpha Wave Section */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-yellow-500 font-bold uppercase tracking-wide flex items-center gap-1.5">
                  Alpha Wave (8-12 Hz)
                </span>
                <span className="text-white/70 font-mono text-[9px]">{alphaPower}% Power</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-500/80" 
                  animate={{ width: `${alphaPower}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[8.5px] text-[#8a817c] leading-relaxed">
                  <strong className="text-white/50">Rest & Idle State:</strong> Spikes during resting baselines. Represents internal cognitive focus and sensory gating.
                </p>
                {/* Slow Wave Visualizer */}
                <svg className="h-3 w-16 overflow-visible opacity-40 shrink-0" viewBox="0 0 100 20">
                  <motion.path
                    d="M 0 10 Q 12.5 2, 25 10 T 50 10 T 75 10 T 100 10"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M 0 10 Q 12.5 2, 25 10 T 50 10 T 75 10 T 100 10",
                        "M 0 10 Q 12.5 18, 25 10 T 50 10 T 75 10 T 100 10",
                        "M 0 10 Q 12.5 2, 25 10 T 50 10 T 75 10 T 100 10"
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.8,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
            </div>

            {/* Beta Wave Section */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-orange-highlight font-bold uppercase tracking-wide flex items-center gap-1.5">
                  Beta Wave (12-30 Hz)
                </span>
                <span className="text-white/70 font-mono text-[9px]">{betaPower}% Power</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-orange-highlight" 
                  animate={{ width: `${betaPower}%` }}
                  transition={{ type: "spring", stiffness: 60 }}
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-[8.5px] text-[#8a817c] leading-relaxed">
                  <strong className="text-white/50">Active Cognition:</strong> Dominant during focus, language transitions, or analytical tasks.
                </p>
                {/* Fast Wave Visualizer */}
                <svg className="h-3 w-16 overflow-visible opacity-40 shrink-0" viewBox="0 0 100 20">
                  <motion.path
                    d="M 0 10 Q 5 2, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10"
                    fill="none"
                    stroke="#ff5722"
                    strokeWidth="1.5"
                    animate={{
                      d: [
                        "M 0 10 Q 5 2, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10",
                        "M 0 10 Q 5 18, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10",
                        "M 0 10 Q 5 2, 10 10 T 20 10 T 30 10 T 40 10 T 50 10 T 60 10 T 70 10 T 80 10 T 90 10 T 100 10"
                      ]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0c10] p-4 rounded-lg border border-white/5">
              <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 mb-1">Model Confidence ({activeModel})</div>
              <div className="text-lg font-mono text-white">
                {activeModel === 'TRANSFORMER' ? '91.4%' : activeModel === 'LSTM' ? '84.2%' : '79.6%'}
              </div>
            </div>
            <div className="bg-[#0a0c10] p-4 rounded-lg border border-white/5">
              <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 mb-1">Feature Map Trust</div>
              <div className={`text-xs font-mono mt-1 ${activeModel === 'TRANSFORMER' ? 'text-emerald-400' : 'text-yellow-500/80'}`}>
                {activeModel === 'TRANSFORMER' ? 'EXCELLENT' : 'OPTIMAL'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 leading-relaxed mt-auto">
        GEORGE'S FINDINGS: {activeModel === 'TRANSFORMER' ? 'Transformer attention mechanisms' : `${activeModel} networks`} map spectral patterns directly onto frontal electrode groupings, verifying neural substrates for cognitive switching. Overperforms other models on {activeTask.toLowerCase()}.
      </div>
    </div>
  );
}

// --- SACC SWITCHING ---
function SACCLeft({ sample, setSample }: any) {
  const samples = [
    { label: 'MONOLINGUAL CONTROL (ENGLISH)', text: 'Currently engaged in machine learning research and academic publication at the university.' },
    { label: 'MEDIUM SWITCH DENSITY', text: 'Currently engaged in machine learning research y colaborando con profesores on advanced projects.' },
    { label: 'HIGH COGNITIVE CONTROL (FREQUENT SWITCHES)', text: 'Collaborating con profesores en proyectos de inteligencia artificial utilizing neural processing models.' }
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500 mb-2">Interactive ACC Estimator</h4>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">Type a bilingual mixed-language sentence to simulate the Anterior Cingulate Cortex control costs. Switch between Spanish words to observe cost spikes.</p>
        
        <div className="p-4 bg-[#0a0c10] border border-white/5 rounded-lg text-sm text-white/90 min-h-[80px]">
          {samples[sample].text}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[9px] uppercase tracking-widest text-white/40">Live Lexical Parser</span>
          <span className="text-[9px] uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">+ INJECT CODE-SWITCH</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {samples[sample].text.split(' ').map((t, i) => (
            <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/70">{t}</span>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <div className="text-[9px] uppercase tracking-widest text-white/40 mb-4">Try High-Demand Case Samples:</div>
        <div className="flex flex-col gap-2">
          {samples.map((s, i) => (
            <button 
              key={i} 
              onClick={() => setSample(i)}
              className={`p-3 border rounded text-left transition-colors ${sample === i ? 'bg-white/10 border-white/20 shadow-md' : 'bg-[#0a0c10] border-white/5 hover:border-white/10 opacity-70'}`}
            >
              <div className="text-[9px] uppercase tracking-widest text-white/70 mb-1">{s.label}</div>
              <div className="text-xs text-white/40 truncate">{s.text}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SACCRight({ sample }: any) {
  const peaks = ['0.210', '0.650', '0.890'];
  const paths = ['Stable Monolingual Trajectory', 'Moderate Bilingual Transitions', 'High-Cost Cognitive Switching'];
  
  // Fake graph points depending on sample
  const points = [
    "0,20 10,21 20,20 30,22 40,18 50,17 60,18 70,17 80,18 90,22 100,20",
    "0,20 10,21 20,20 30,45 40,42 50,17 60,18 70,38 80,18 90,22 100,20",
    "0,20 10,40 20,35 30,45 40,60 50,55 60,70 70,65 80,40 90,22 100,20"
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-12">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Anterior Cingulate Cortex (SACC) Model</span>
        <span className="text-[10px] uppercase tracking-widest text-yellow-500">Trajectory Plot</span>
      </div>

      <div className="flex-1 relative border-b border-white/10 flex items-center mb-4 min-h-[150px]">
        <div className="absolute top-0 left-0 text-[9px] text-white/30 font-mono">1.0 SACC ACTIVATION</div>
        <svg className="w-full h-32" viewBox="0 0 100 80" preserveAspectRatio="none">
          <polyline points={points[sample]} fill="none" stroke="#f59e0b" strokeWidth="1" className="transition-all duration-500" />
          {points[sample].split(' ').map((p, i) => {
            const [x, y] = p.split(',');
            return <circle key={i} cx={x} cy={y} r="1.5" fill="#f59e0b" className="transition-all duration-500" />
          })}
        </svg>
      </div>
      
      <div className="flex justify-between mt-2 mb-12 font-mono">
        <span className="text-[9px] text-white/30">START</span>
        <span className="text-[9px] text-white/30">END OF SENTENCE</span>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-12">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Peak ACC Control Demand</div>
          <div className="text-sm font-mono text-yellow-500">{peaks[sample]} <span className="text-[10px] text-white/40">(SACC UNITS)</span></div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Switch Trajectory Path</div>
          <div className="text-sm font-mono text-emerald-400">{paths[sample]}</div>
        </div>
      </div>

      <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 leading-relaxed mt-auto">
        GEORGE'S INSIGHT: MULTILINGUAL BERT LAYERS VERIFY THAT CODE-SWITCHING IS NOT AN ABRUPT JUMP, BUT RATHER A SMOOTH CONTINUOUS ACTIVATION SHIFT ACROSS THE ANTERIOR CINGULATE CORTEX, PRESENTING SYMMETRICAL CONTROL COSTS.
      </div>
    </div>
  );
}

// --- MARL TRUST ---
function MARLLeft({ noise, setNoise, arch, setArch }: any) {
  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 mb-2">Partial Observability Model</h4>
        <p className="text-xs text-white/60 leading-relaxed mb-6">Evaluate multi-agent reinforcement learning (MARL) cooperation dynamics. Under noisy conditions, agents require memory to build stable trust hierarchies.</p>

        <div className="flex justify-between items-center p-5 bg-[#0a0c10] border border-white/5 rounded-lg mb-6">
          <div>
            <div className="text-sm text-white/90 mb-1">Noisy Environmental Observations</div>
            <div className="text-[9px] uppercase tracking-widest text-white/40">Simulate Sensory/Packet Loss</div>
          </div>
          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${noise ? 'bg-yellow-500' : 'bg-white/20'}`} onClick={() => setNoise(!noise)}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${noise ? 'left-6' : 'left-0.5'}`}></div>
          </div>
        </div>

        <button className="w-full py-3 bg-red-500/5 text-red-400 border border-red-500/20 rounded text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/10 transition-colors">
          Simulate Network Outage Spike
        </button>
      </div>

      <div className="mt-auto">
        <div className="text-[9px] uppercase tracking-widest text-white/40 mb-3">Agent Architecture</div>
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-4 border rounded cursor-pointer transition-colors ${arch === 'Standard DQN' ? 'bg-white/10 border-white/20' : 'bg-[#0a0c10] border-white/5 text-white/50 opacity-70'}`} onClick={() => setArch('Standard DQN')}>
            <div className="text-sm mb-1 text-white">Standard DQN</div>
            <div className="text-[8px] uppercase tracking-widest text-white/50">No Sequence Memory</div>
          </div>
          <div className={`p-4 border rounded cursor-pointer transition-colors ${arch === 'LSTM-DQN' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' : 'bg-[#0a0c10] border-white/5 text-white/50 opacity-70'}`} onClick={() => setArch('LSTM-DQN')}>
            <div className="text-sm mb-1 text-white">LSTM-DQN</div>
            <div className="text-[8px] uppercase tracking-widest text-white/50">LSTM Credit Assignment</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MARLRight({ noise, arch }: any) {
  const isFailed = noise && arch === 'Standard DQN';
  const coord = isFailed ? '28%' : '85%';
  const trust = isFailed ? '15%' : '74%';

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-12">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Social Hierarchies Real-Time Agent Map</span>
        <span className="text-[10px] uppercase tracking-widest text-emerald-400">State: Converged</span>
      </div>

      <div className="w-full h-48 border border-white/10 rounded bg-[#0a0c10] relative mb-12 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-20">
          {Array.from({length: 18}).map((_, i) => <div key={i} className="border-r border-b border-white/20"></div>)}
        </div>
        <svg className="absolute inset-0 w-full h-full">
          <line x1="20%" y1="40%" x2={isFailed ? "80%" : "40%"} y2={isFailed ? "20%" : "50%"} stroke={isFailed ? "#ef4444" : "#f59e0b"} strokeDasharray="4 4" strokeWidth="1" className="transition-all duration-700" />
          <line x1={isFailed ? "80%" : "40%"} y1={isFailed ? "20%" : "50%"} x2={isFailed ? "10%" : "30%"} y2={isFailed ? "80%" : "70%"} stroke={isFailed ? "#ef4444" : "#f59e0b"} strokeDasharray="4 4" strokeWidth="1" className="transition-all duration-700" />
          <line x1={isFailed ? "10%" : "30%"} y1={isFailed ? "80%" : "70%"} x2="20%" y2="40%" stroke={isFailed ? "#ef4444" : "#f59e0b"} strokeDasharray="4 4" strokeWidth="1" className="transition-all duration-700" />
        </svg>
        <div className="absolute w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-bold text-black shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-700" style={{left: 'calc(20% - 10px)', top: 'calc(40% - 10px)'}}>A1</div>
        <div className="absolute w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-bold text-black shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-700" style={{left: isFailed ? 'calc(80% - 10px)' : 'calc(40% - 10px)', top: isFailed ? 'calc(20% - 10px)' : 'calc(50% - 10px)'}}>A2</div>
        <div className="absolute w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] font-bold text-black shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-700" style={{left: isFailed ? 'calc(10% - 10px)' : 'calc(30% - 10px)', top: isFailed ? 'calc(80% - 10px)' : 'calc(70% - 10px)'}}>A3</div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 mb-3">Coordination Rate</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-2">
            <div className={`h-full rounded-full transition-all duration-700 ${isFailed ? 'bg-red-400' : 'bg-emerald-400'}`} style={{width: coord}}></div>
          </div>
          <div className={`text-xs font-mono ${isFailed ? 'text-red-400' : 'text-emerald-400'}`}>{coord}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-widest text-white/40 mb-3">Mutual Trust Index</div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mb-2">
            <div className={`h-full rounded-full transition-all duration-700 ${isFailed ? 'bg-red-400' : 'bg-emerald-400'}`} style={{width: trust}}></div>
          </div>
          <div className={`text-xs font-mono ${isFailed ? 'text-red-400' : 'text-emerald-400'}`}>{trust}</div>
        </div>
      </div>

      <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 leading-relaxed mt-auto">
        GEORGE'S FINDING: ROBUSTNESS TESTING PROVES THAT STANDARD DQN DROPS COORDINATION TO 28% UNDER PARTIAL OBSERVATION NOISE. LSTM-DQN VARIANTS BYPASS NOISE LIMITATIONS BY FORMING STABLE TEMPORAL CREDIT REPRESENTATIONS (P = 0.0034).
      </div>
    </div>
  );
}

// --- RL BIASES ---
function RLLeft({ bias, setBias }: any) {
  const biases = [
    { id: 'Normal', desc: 'Standard Epsilon-Greedy' },
    { id: 'Loss-Averse', desc: 'Penalizes Losses Heavily' },
    { id: 'Anchoring', desc: 'Overvalues Initial Results' },
    { id: 'Confirmation', desc: 'Ignores Conflicting Data' },
    { id: 'Optimistic', desc: 'Overestimates Initial Values' }
  ];

  return (
    <div className="flex flex-col gap-8 h-full">
      <div>
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-yellow-500 mb-2">Human-Like RL Agents</h4>
        <p className="text-xs text-white/60 leading-relaxed">Evaluate multi-armed bandit agents modeled with classic human cognitive biases to observe how irrational heuristic behaviors impact decision-making.</p>
      </div>

      <div>
        <div className="text-[9px] uppercase tracking-widest text-white/40 mb-3">Select Agent Bias Profile</div>
        <div className="grid grid-cols-2 gap-3">
          {biases.map(b => (
            <div key={b.id} className={`p-4 border rounded cursor-pointer transition-colors ${bias === b.id ? 'bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.05)]' : 'bg-[#0a0c10] border-white/5 opacity-70 hover:opacity-100 hover:border-white/10'}`} onClick={() => setBias(b.id)}>
              <div className={`text-sm mb-1 ${bias === b.id ? 'text-yellow-500' : 'text-white'}`}>{b.id}</div>
              <div className="text-[8px] uppercase tracking-widest text-white/40">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[10px] text-white/40 mt-[-10px] leading-relaxed">
        Inspired by Prospect Theory. Weighs failures ...
        <span className="text-yellow-500 ml-2 cursor-pointer opacity-80 hover:opacity-100">+ READ MORE</span>
      </div>

      <button className="w-full py-4 mt-auto bg-blue-900/20 text-blue-400 border border-blue-500/20 rounded text-[10px] uppercase tracking-widest font-bold hover:bg-blue-900/40 transition-colors">
        Inject Environmental Feedback Shock
      </button>
    </div>
  );
}

function RLRight({ bias }: any) {
  let win = '90%';
  let exp = '28%';
  
  if (bias === 'Normal') { win = '78%'; exp = '15%'; }
  if (bias === 'Anchoring') { win = '42%'; exp = '5%'; }
  if (bias === 'Confirmation') { win = '55%'; exp = '8%'; }
  if (bias === 'Optimistic') { win = '85%'; exp = '45%'; }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-16">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Multi-Armed Bandit Simulation</span>
        <span className="text-[10px] uppercase tracking-widest text-emerald-400">Status: Optimal Avoidance</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-12 mb-16">
        <div>
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/40 mb-3">
            <span>Win Rate (Reward Exploitation)</span>
            <span className="text-emerald-400 text-xs">{win}</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full transition-all duration-700 ease-out" style={{width: win}}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-white/40 mb-3">
            <span>Exploration Rate</span>
            <span className="text-blue-400 text-xs">{exp}</span>
          </div>
          <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out" style={{width: exp}}></div>
          </div>
        </div>
      </div>

      <div className="text-[9px] font-mono tracking-widest uppercase text-white/40 leading-relaxed mt-auto">
        GEORGE'S FINDING: LOSS AVERSION HELPS AGENTS DITCH LOW-REWARD ARMS FASTER, SPEEDING UP CONVERGENCE TO OPTIMAL STRATEGIES.
      </div>
    </div>
  );
}
