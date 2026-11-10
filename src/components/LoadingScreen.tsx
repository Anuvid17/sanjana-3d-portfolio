import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ['Intelligence', 'Innovation', 'Creativity'];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Cycling rotating words every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);
    return () => clearInterval(wordInterval);
  }, []);

  // RequestAnimationFrame counter from 000 to 100 over 2700ms
  useEffect(() => {
    const duration = 2700;

    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easeOutQuad
      const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      const currentVal = Math.floor(progress * 100);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCount);
      } else {
        setCount(100);
        // 400ms delay on complete
        const timer = setTimeout(() => {
          setIsFinishing(true);
          const finishTimer = setTimeout(() => {
            onComplete();
          }, 500);
          return () => clearTimeout(finishTimer);
        }, 400);
        return () => clearTimeout(timer);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateCount);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinishing ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none cursor-wait"
      aria-label="Loading portfolio"
    >
      {/* Top Bar / Label */}
      <div className="flex items-center justify-between w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          SANJANA R | PORTFOLIO
        </motion.div>
        <div className="text-[11px] text-muted tracking-widest uppercase hidden sm:block">
          AI & ML · SYSTEM READY
        </div>
      </div>

      {/* Center Rotating Words */}
      <div className="flex items-center justify-center my-auto overflow-hidden py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={WORDS[wordIndex]}
            initial={{ y: 30, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -30, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 text-center tracking-wide"
          >
            {WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Area: Counter & Progress */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="text-xs text-muted max-w-[200px] leading-relaxed hidden md:block">
            Initializing neural models, visual shaders, and interactive projects.
          </div>
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight ml-auto font-normal">
            {String(count).padStart(3, '0')}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="w-full h-[3px] bg-stroke/50 rounded-full overflow-hidden relative">
          <div
            className="h-full accent-gradient transition-transform duration-75 origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.45)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
