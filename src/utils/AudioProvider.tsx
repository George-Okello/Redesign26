import { useEffect, useRef } from 'react';
import { audio } from './audio';

export function AudioProvider() {
  const currentHoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getInteractiveElement = (target: HTMLElement) => {
      return target.closest('a') || 
             target.closest('button') || 
             target.closest('[role="button"]') || 
             target.closest('[role="tab"]') ||
             target.closest('.cursor-pointer') ||
             target.closest('[data-sound]');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const interactiveEl = getInteractiveElement(e.target as HTMLElement) as HTMLElement | null;
      if (interactiveEl && interactiveEl !== currentHoverRef.current) {
        currentHoverRef.current = interactiveEl;
        
        const soundType = interactiveEl.getAttribute('data-sound');
        if (soundType === 'subtle') {
          audio.playSubtleHover();
        } else if (soundType === 'expand' || soundType === 'card') {
          audio.playCardExpand();
        } else {
          audio.playHover();
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (currentHoverRef.current) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!currentHoverRef.current.contains(relatedTarget)) {
          currentHoverRef.current = null;
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const el = getInteractiveElement(e.target as HTMLElement) as HTMLElement | null;
      if (el) {
        const soundType = el.getAttribute('data-sound');
        if (soundType === 'toggle' || el.getAttribute('role') === 'tab') {
          audio.playToggle();
        } else {
          audio.playClick();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Subtle spatial panning based on cursor position (-1 left to +1 right)
      const pan = (e.clientX / window.innerWidth) * 2 - 1;
      audio.setAmbientPan(pan);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}

