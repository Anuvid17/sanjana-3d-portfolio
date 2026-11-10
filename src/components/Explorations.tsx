import { useState } from 'react';
import { motion } from 'framer-motion';
import { EXPLORATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { ExplorationItem } from '../types/portfolio';
import ExplorationsLightbox from './ExplorationsLightbox';
import { Github, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Explorations() {
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  const leftItems = EXPLORATIONS.slice(0, 3);
  const rightItems = EXPLORATIONS.slice(3, 6);

  const handleGitHubClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    window.open(PERSONAL_INFO.githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="explorations"
      className="relative bg-bg py-16 md:py-24 overflow-hidden border-t border-stroke/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-10 lg:px-14 relative z-10">
        {/* Responsive 3-Column Layout: Left 3 Cards — Centered Heading Block — Right 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: 3 Cards */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 order-2 lg:order-1">
            {leftItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                onClick={() => setSelectedItem(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="group relative aspect-square max-w-[280px] sm:max-w-[300px] mx-auto rounded-3xl overflow-hidden border border-white/10 bg-surface cursor-pointer shadow-xl transition-all duration-500 hover:scale-105 hover:border-sky-400/40 hover:rotate-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] uppercase tracking-widest text-sky-300 font-medium block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Column: The "Beyond Algorithms" Heading Block right in the visual center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 text-center px-4 py-8 lg:py-12 order-1 lg:order-2 flex flex-col items-center justify-center"
          >
            {/* Center Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-sky-400 uppercase tracking-[0.3em] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                EXPLORATIONS
              </span>
              <div className="w-8 h-px bg-stroke" />
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary mb-5 leading-tight">
              Beyond <span className="font-display italic text-text-primary">Algorithms</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-sm mx-auto mb-8 leading-relaxed">
              Exploring ideas, experimenting with emerging technologies, and discovering new possibilities through AI.
            </p>

            {/* Clean Neutral GitHub Button */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGitHubClick}
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-medium text-text-primary hover:text-white bg-surface/85 hover:bg-white/10 border border-white/15 hover:border-white/30 shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 cursor-pointer select-none hover:scale-105 active:scale-95"
              aria-label="Explore Sanjana's GitHub profile"
            >
              <Github className="w-4 h-4 text-white/80" />
              <span>Explore My GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Right Column: 3 Cards */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 order-3">
            {rightItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (idx + 3) * 0.12 }}
                onClick={() => setSelectedItem(item)}
                style={{ transform: `rotate(${item.rotation}deg)` }}
                className="group relative aspect-square max-w-[280px] sm:max-w-[300px] mx-auto rounded-3xl overflow-hidden border border-white/10 bg-surface cursor-pointer shadow-xl transition-all duration-500 hover:scale-105 hover:border-sky-400/40 hover:rotate-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] uppercase tracking-widest text-sky-300 font-medium block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <ExplorationsLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
