import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TopologyGraphProps {
  activeNodeIndex?: number | null;
}

export function TopologyGraph({ activeNodeIndex }: TopologyGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 250;

    // Clear previous
    d3.select(containerRef.current).selectAll("*").remove();

    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // Generate random nodes
    const numNodes = 25;
    const nodes = Array.from({ length: numNodes }, (_, i) => ({
      id: i,
      group: i % 4, // 4 domains
      radius: Math.random() * 4 + 2
    }));

    // Generate random links
    const links = Array.from({ length: 40 }, () => ({
      source: Math.floor(Math.random() * numNodes),
      target: Math.floor(Math.random() * numNodes),
      value: Math.random()
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(30))
      .force("charge", d3.forceManyBody().strength(-30))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 2));

    const link = svg.append("g")
      .attr("stroke", "#1a1a1a")
      .attr("stroke-opacity", 0.1)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => {
        if (activeNodeIndex !== null && activeNodeIndex !== undefined && d.group === activeNodeIndex) {
          return "#ff5a09"; // orange-highlight
        }
        return "#1a1a1a";
      })
      .attr("opacity", d => {
        if (activeNodeIndex !== null && activeNodeIndex !== undefined && d.group !== activeNodeIndex) {
          return 0.2;
        }
        return 0.6;
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => Math.max(d.radius, Math.min(width - d.radius, d.x)))
        .attr("cy", (d: any) => Math.max(d.radius, Math.min(height - d.radius, d.y)));
    });

    return () => {
      simulation.stop();
    };
  }, [activeNodeIndex]);

  return (
    <div className="absolute inset-0 z-0 flex flex-col items-center justify-center opacity-40 md:opacity-60 transition-opacity duration-500 pointer-events-none">
      <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-highlight animate-pulse" />
        Live Neural Topology
      </div>
      <p className="text-center text-[9px] md:text-[10px] text-[#4a4a4a] max-w-lg mb-8 uppercase tracking-widest leading-relaxed px-4">
        Visualizing real-time semantic relationships and cross-disciplinary knowledge clusters across the core research domains.
      </p>
      <div ref={containerRef} className="w-full max-w-4xl h-[300px]" />
      
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-6 text-[8px] font-mono uppercase tracking-widest text-[#8a817c]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-highlight"></span> Active Domain
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1a1a1a]"></span> Connected Node
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/20"></span> Latent Cluster
        </div>
      </div>
    </div>
  );
}
