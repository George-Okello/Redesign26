import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText((prev) => 
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3; // Controls speed of decryption
      }, 30);
    };

    // Small delay before starting decryption
    const timeout = setTimeout(animate, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
