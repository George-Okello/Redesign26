import { useEffect, useRef } from 'react';
import { useAnimation, useInView, useScroll, useTransform, Variants } from 'motion/react';

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  yOffset?: number;
  once?: boolean;
  threshold?: number;
}

export function useScrollReveal({
  delay = 0,
  duration = 0.5,
  yOffset = 20,
  once = true,
  threshold = 0.1,
}: ScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  // Track the scroll of this section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // When section is far from view (near 0 or 1), blur and fade it.
  // Full focus is between 0.2 and 0.8.
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35]);
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [8, 0, 0, 8]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      transition: {
        duration,
        ease: 'easeOut',
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Fast and smooth cubic bezier
      },
    },
  };

  const animationProps = {
    ref,
    initial: 'hidden',
    animate: controls,
    variants,
    style: { 
      opacity,
      filter,
      willChange: 'transform, opacity, filter' 
    }, // Mobile hardware acceleration with filter & opacity
  };

  return animationProps;
}
