import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface SuperTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function SuperTextReveal({ text, className = "", delay = 0, once = false }: SuperTextRevealProps) {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobileOrTablet ? 0.05 : 0.03,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      y: "110%", 
      rotate: 4,
      opacity: 0,
    },
    visible: { 
      y: "0%", 
      rotate: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 150,
        damping: 18,
      }
    }
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
    >
      {words.map((word, wordIdx) => (
        <span 
          key={wordIdx} 
          className="inline-block overflow-hidden mr-[0.25em] py-[0.1em]"
        >
          {/* For non-mobile/tablet, we split to characters for a premium tactile feel */}
          {!isMobileOrTablet ? (
            <motion.span className="inline-block" variants={wordVariants}>
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  className="inline-block origin-bottom transition-all duration-300 select-none cursor-default hover:text-orange-highlight hover:-translate-y-1 hover:scale-110 hover:rotate-6 font-serif italic"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ) : (
            // On mobile/tablet, slide in the whole word nicely with a soft ease and slight tilt to be extremely smooth
            <motion.span 
              className="inline-block origin-bottom transition-colors duration-300 hover:text-orange-highlight active:text-orange-highlight"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

interface SuperParagraphRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SuperParagraphReveal({ text, className = "", delay = 0.1 }: SuperParagraphRevealProps) {
  // Animates sentences or lines with a graceful sweep and blur reduction
  return (
    <motion.span
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}
