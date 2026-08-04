import { useEffect, useRef } from 'react';
import { audio } from './audio';

export function AudioProvider() {
  const currentHoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getInteractiveElement = (target: HTMLElement) => {
      return target.closest('a') || 
             target.closest('button') || 
             target.closest('[role="button"]') || 
             target.closest('.cursor-pointer');
    };

    const handleMouseOver = (e: MouseEvent) => {
      const interactiveEl = getInteractiveElement(e.target as HTMLElement) as HTMLElement | null;
      if (interactiveEl && interactiveEl !== currentHoverRef.current) {
        currentHoverRef.current = interactiveEl;
        audio.playHover();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      // If we move out of the currently hovered interactive element
      if (currentHoverRef.current) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (!currentHoverRef.current.contains(relatedTarget)) {
          currentHoverRef.current = null;
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (getInteractiveElement(e.target as HTMLElement)) {
        audio.playClick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
