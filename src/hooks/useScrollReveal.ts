import { useRef, MutableRefObject } from 'react';
import { TargetAndTransition, VariantLabels } from 'motion/react';

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  threshold?: number;
  externalRef?: MutableRefObject<any>;
}

export function useScrollReveal({
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  once = true,
  threshold = 0.15,
  externalRef
}: ScrollRevealOptions = {}) {
  const internalRef = useRef<HTMLElement>(null);
  const ref = externalRef || internalRef;

  const animationProps = {
    ref,
    initial: {
      opacity: 0,
      y: yOffset,
      filter: 'blur(8px)',
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    viewport: { once, amount: threshold },
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // very smooth custom cubic-bezier
    }
  };

  return animationProps;
}
