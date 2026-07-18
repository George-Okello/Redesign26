import React, { useEffect, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

export function FooterGlobe() {
  const globeEl = useRef<GlobeMethods | undefined>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGlobeReady = () => {
    if (globeEl.current) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.enableZoom = false;
      
      // Keep rotation smooth and responsive to drag
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

      // Point camera to Nairobi initially
      globeEl.current.pointOfView({ lat: 10, lng: 20, altitude: 2.3 }, 1000);
    }
  };

  const NDB_LOCATIONS = [
    { lat: -1.2921, lng: 36.8219, name: 'Nairobi' },
    { lat: 41.6991, lng: -86.2390, name: 'South Bend' },
    { lat: 3.1390, lng: 101.6869, name: 'Kuala Lumpur' },
    { lat: 48.2082, lng: 16.3738, name: 'Vienna' }
  ];

  const ARCS = [
    { startLat: -1.2921, startLng: 36.8219, endLat: 41.6991, endLng: -86.2390, color: ['#00ffff', '#ff00ff'] },
    { startLat: 41.6991, startLng: -86.2390, endLat: 48.2082, endLng: 16.3738, color: ['#ff00ff', '#00ffff'] },
    { startLat: 48.2082, startLng: 16.3738, endLat: 3.1390, endLng: 101.6869, color: ['#00ffff', '#ff00ff'] },
    { startLat: 3.1390, startLng: 101.6869, endLat: -1.2921, endLng: 36.8219, color: ['#ff00ff', '#00ffff'] },
    { startLat: -1.2921, startLng: 36.8219, endLat: 48.2082, endLng: 16.3738, color: ['#ff00ff', '#00ffff'] },
    { startLat: 41.6991, startLng: -86.2390, endLat: 3.1390, endLng: 101.6869, color: ['#00ffff', '#ff00ff'] }
  ];

  if (!isMounted) return <div className="w-[300px] h-[300px]" />;

  return (
    <div className="w-[300px] h-[300px] cursor-grab active:cursor-grabbing flex items-center justify-center relative overflow-hidden rounded-full">
      <Globe
        ref={globeEl}
        width={300}
        height={300}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeReady={handleGlobeReady}
        pointsData={NDB_LOCATIONS}
        pointAltitude={0.05}
        pointColor={() => '#ff5722'}
        pointRadius={0.6}
        arcsData={ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitude={0.2}
        atmosphereColor="#00ffff"
        atmosphereAltitude={0.15}
      />
    </div>
  );
}
