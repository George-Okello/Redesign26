import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SuperTextReveal, SuperParagraphReveal } from './SuperTextReveal';
import { researchDomains } from '../data';

export function ResearchFocus() {
  const revealProps = useScrollReveal({ threshold: 0.1, yOffset: 30 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-shuffle
  useEffect(() => {
    if (hoveredIndex !== null || expandedIndex !== null) return; // Pause auto-shuffle when interacting
    
    let timeout: NodeJS.Timeout;

    const cycleRandomly = () => {
      setActiveIndex((current) => {
        // Weighted random jump: mostly 1 step, occasionally 2 or 3 for a non-linear feel
        const r = Math.random();
        let step = 1;
        if (r > 0.85) step = 3;
        else if (r > 0.6) step = 2;
        
        return (current + step) % researchDomains.length;
      });

      // Variable delay between 5.5 and 8.5 seconds for a more organic rhythm
      const nextDelay = 5500 + Math.random() * 3000;
      timeout = setTimeout(cycleRandomly, nextDelay);
    };

    const initialDelay = 5500 + Math.random() * 3000;
    timeout = setTimeout(cycleRandomly, initialDelay);

    return () => clearTimeout(timeout);
  }, [hoveredIndex, expandedIndex]);

  const handleCardClick = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      setActiveIndex(index);
      // Auto-Scroll to Focus
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Mouse wheel scroll to cycle active card (debounced/throttled)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isDesktop) return;

    let timeout: ReturnType<typeof setTimeout>;
    const handleWheel = (e: WheelEvent) => {
      // Allow normal page scroll, but subtly update the active index based on scroll direction
      if (Math.abs(e.deltaY) > 20) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (e.deltaY > 0) {
            setActiveIndex((current) => (current + 1) % researchDomains.length);
          } else {
            setActiveIndex((current) => (current - 1 + researchDomains.length) % researchDomains.length);
          }
        }, 50);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(timeout);
    };
  }, [isDesktop]);

  return (
    <section 
      id="research" 
      className="py-24 md:py-32 px-4 md:px-8 border-t border-[#1a1a1a]/10 bg-[#f4f2ee] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h2 className="text-sm font-mono tracking-[0.2em] text-[#8a817c] uppercase mb-4">
              <SuperTextReveal text="03 / Core Domains" />
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif italic text-[#1a1a1a] max-w-2xl">
              <SuperTextReveal text="Research Focus & Directions" delay={0.1} />
            </h3>
          </div>
          <p className="text-sm text-[#4a4a4a] max-w-xs leading-relaxed">
            <SuperParagraphReveal text="Exploring the intersection of artificial intelligence, complex systems, and social dynamics through continuous investigation." delay={0.2} />
          </p>
        </div>

        {/* Dynamic Card Container */}
        <div 
          ref={containerRef}
          className="relative h-[450px] md:h-[700px] w-full mt-10 flex justify-center perspective-1000 items-center md:items-end md:pb-12"
          {...revealProps}
        >
          {researchDomains.map((domain, index) => {
            const total = researchDomains.length;
            
            // --- DESKTOP FAN SPREAD LOGIC ---
            const rotation = (index - (total - 1) / 2) * 12;
            const isActiveDesktop = hoveredIndex !== null ? hoveredIndex === index : activeIndex === index;
            const isExpanded = expandedIndex === index;
            
            const desktopAnimate = {
              rotate: isExpanded ? 0 : (isActiveDesktop ? 0 : rotation),
              y: isExpanded ? -100 : (isActiveDesktop ? -80 : 0),
              x: isExpanded ? 0 : `calc(${(index - (total - 1) / 2) * 50}px)`,
              scale: isExpanded ? 1.1 : (isActiveDesktop ? 1.05 : 1),
              zIndex: isExpanded ? 60 : (isActiveDesktop ? 50 : index),
              opacity: expandedIndex !== null && !isExpanded ? 0.3 : 1
            };

            // --- MOBILE STACKED SHUFFLE LOGIC ---
            const offset = (index - activeIndex + total) % total;
            const isLeaving = offset === total - 1;
            
            const mobileAnimate = {
              y: isExpanded ? -60 : (isLeaving ? -40 : -offset * 25),
              x: isExpanded ? 0 : (isLeaving ? 150 : 0),
              rotate: isExpanded ? 0 : (isLeaving ? 8 : 0),
              scale: isExpanded ? 1.05 : (isLeaving ? 0.9 : 1 - (offset * 0.05)),
              zIndex: isExpanded ? 60 : (50 - offset),
              opacity: expandedIndex !== null && !isExpanded ? 0 : (isLeaving ? 0 : 1 - (offset * 0.15))
            };
            
            const Icon = domain.icon;

            return (
              <motion.div
                key={index}
                className="absolute w-[280px] md:w-[460px] h-[380px] md:h-[580px] cursor-pointer origin-bottom"
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => isDesktop && setHoveredIndex(index)}
                onMouseLeave={() => isDesktop && setHoveredIndex(null)}
                animate={isDesktop ? desktopAnimate : mobileAnimate as any}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 0.8
                }}
              >
                {/* Magazine Cover */}
                <div className={`w-full h-full rounded-xl overflow-hidden shadow-2xl relative bg-[#111] border group flex flex-col transition-colors duration-500 ${isExpanded ? 'border-orange-500/50' : 'border-[#222]/50'}`}>
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={domain.bgImage} 
                      alt={domain.title}
                      className={`w-full h-full object-cover transition-all duration-700 mix-blend-lighten ${isExpanded ? 'opacity-80 scale-105' : 'opacity-60'}`}
                    />
                    <div className={`absolute inset-0 transition-opacity duration-700 ${isExpanded ? 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/90' : 'bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/80'}`}></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 md:p-8 text-white/90">
                    <div className="absolute top-5 right-5 md:top-8 md:right-8 z-20">
                      {Icon && <Icon className={`w-5 h-5 md:w-6 md:h-6 text-white/50 transition-all duration-500 ${isExpanded ? 'text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.5)]' : ''}`} strokeWidth={1.5} />}
                    </div>
                    {/* Header Top */}
                    <div className="text-center space-y-4 pt-6 md:pt-4">
                      <h4 className={`font-serif tracking-wide uppercase leading-tight drop-shadow-xl text-white transition-all duration-500 ${isExpanded ? 'text-4xl md:text-5xl text-orange-50' : 'text-3xl md:text-5xl'}`}>
                        {domain.title}
                      </h4>
                      <div className="text-[9px] md:text-[11px] font-sans tracking-widest uppercase text-white/80 font-bold mb-2">
                        {domain.series}
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1 text-[7px] md:text-[9px] text-[#b0a8a0] font-sans tracking-widest uppercase border-y border-white/10 py-2">
                        <span>{domain.focus}</span>
                      </div>
                      <div className={`pt-2 text-left space-y-1 transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="text-[9px] md:text-[11px] text-orange-400/90 font-serif italic max-w-[90%] leading-relaxed mt-2">
                          <span className="font-bold text-orange-400 not-italic uppercase text-[8px] md:text-[9px] tracking-wider mr-1">ABSTRACT:</span>
                          {domain.description}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Area */}
                    <div className="flex flex-col justify-end h-full w-full pb-2">
                      <div className="flex justify-between items-end mb-3">
                        {/* Feature badge */}
                        <div className={`border text-[7px] md:text-[9px] font-sans px-2.5 py-1 rounded-sm uppercase tracking-widest backdrop-blur-md transition-colors duration-500 ${isExpanded ? 'bg-orange-500/20 border-orange-500/50 text-orange-300' : 'bg-[#111]/80 border-orange-500/30 text-orange-400'}`}>
                          {isExpanded ? 'Full Abstract' : 'Featured Issue'}
                        </div>
                        <div className="text-right">
                           <div className="text-[7px] md:text-[8px] text-[#b0a8a0] font-sans uppercase tracking-[0.2em] mb-1">
                             ISSN 2631-5084
                           </div>
                        </div>
                      </div>
                      
                      {/* Footer Title abstract */}
                      <div className="text-[8px] md:text-[9px] font-mono uppercase tracking-[0.15em] text-[#8a817c] border-t border-white/10 pt-3 text-center md:text-left flex justify-between">
                        <span>{domain.series}</span>
                        <span>{domain.issue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

