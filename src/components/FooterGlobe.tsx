import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

const NDB_LOCATIONS = [
  { lat: -1.2921, lng: 36.8219, name: 'Nairobi', desc: 'Strathmore University' },
  { lat: 41.6991, lng: -86.2390, name: 'South Bend', desc: 'University of Notre Dame' },
  { lat: 48.2082, lng: 16.3738, name: 'Vienna', desc: 'Central European University' },
  { lat: 3.1390, lng: 101.6869, name: 'Kuala Lumpur', desc: 'Asia Pacific University' }
];

const ARCS = [
  { startLat: -1.2921, startLng: 36.8219, endLat: 41.6991, endLng: -86.2390, color: ['#00ffff', '#ff00ff'] },
  { startLat: 41.6991, startLng: -86.2390, endLat: 48.2082, endLng: 16.3738, color: ['#ff00ff', '#00ffff'] },
  { startLat: 48.2082, startLng: 16.3738, endLat: 3.1390, endLng: 101.6869, color: ['#00ffff', '#ff00ff'] },
  { startLat: 3.1390, startLng: 101.6869, endLat: -1.2921, endLng: 36.8219, color: ['#ff00ff', '#00ffff'] },
  { startLat: -1.2921, startLng: 36.8219, endLat: 48.2082, endLng: 16.3738, color: ['#ff00ff', '#00ffff'] },
  { startLat: 41.6991, startLng: -86.2390, endLat: 3.1390, endLng: 101.6869, color: ['#00ffff', '#ff00ff'] }
];

export function FooterGlobe() {
  const globeEl = useRef<GlobeMethods | undefined>();
  const [isMounted, setIsMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % NDB_LOCATIONS.length;
        if (globeEl.current) {
          const target = NDB_LOCATIONS[next];
          // Fly to the next node smoothly over 2.2 seconds
          globeEl.current.pointOfView(
            { lat: target.lat, lng: target.lng, altitude: 2.1 },
            2200
          );
        }
        return next;
      });
    }, 6000); // Orbit and focus on each location for 6 seconds

    return () => clearInterval(interval);
  }, [isMounted]);

  const handleGlobeReady = () => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = false; // Disable standard autoRotate to prioritize node-to-node flight
      controls.enableZoom = false;
      
      // Keep rotation smooth and responsive to drag
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Point camera to first location (Nairobi) initially
      const target = NDB_LOCATIONS[0];
      globeEl.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 2.1 }, 1000);
    }
  };

  if (!isMounted) return <div className="w-[300px] h-[300px]" />;

  const activeLoc = NDB_LOCATIONS[currentIndex];

  return (
    <div className="w-[300px] h-[300px] cursor-grab active:cursor-grabbing flex flex-col items-center justify-center relative overflow-hidden rounded-full">
      <Globe
        ref={globeEl}
        width={300}
        height={300}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeReady={handleGlobeReady}
        pointsData={NDB_LOCATIONS}
        pointAltitude={0.06}
        pointColor={() => '#ff5722'}
        pointRadius={0.7}
        
        // Dynamic pulsing rings on the active node
        ringsData={[activeLoc]}
        ringColor={() => '#00ffff'}
        ringMaxRadius={6}
        ringPropagationSpeed={3}
        ringRepeatNum={2}

        arcsData={ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitude={0.2}
        atmosphereColor="#00ffff"
        atmosphereAltitude={0.15}
      />
      
      {/* Absolute overlay showing current focus coordinates */}
      <div className="absolute bottom-6 bg-[#121110]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 font-mono text-[7px] text-[#fcfaf7] pointer-events-none tracking-widest text-center select-none flex flex-col gap-0.5 min-w-[140px] shadow-lg">
        <span className="text-orange-highlight font-bold uppercase text-[6px]">
          [focus: {activeLoc.name.toLowerCase()}]
        </span>
        <span className="text-[#8a817c]/80 lowercase">
          {activeLoc.desc.toLowerCase()}
        </span>
        <span className="text-[#8a817c]/50 text-[6px]">
          {activeLoc.lat.toFixed(4)}°, {activeLoc.lng.toFixed(4)}°
        </span>
      </div>
    </div>
  );
}
