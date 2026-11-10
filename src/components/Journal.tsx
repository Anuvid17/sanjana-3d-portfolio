import { useState } from 'react';
import { motion } from 'framer-motion';
import { JOURNALS } from '../data/portfolioData';
import { JournalItem } from '../types/portfolio';
import JournalModal from './JournalModal';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function Journal() {
  const [selectedJournal, setSelectedJournal] = useState<JournalItem | null>(null);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                THOUGHTS & INSIGHTS
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary mb-3">
              Exploring <span className="font-display italic text-text-primary">Artificial Intelligence</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-xl">
              Thoughts, discoveries, and explorations across the rapidly evolving world of AI.
            </p>
          </div>

          {/* Desktop "View all" button */}
          <div className="hidden md:inline-flex shrink-0">
            <a
              href="#explorations"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-muted hover:text-text-primary bg-surface/80 hover:bg-surface border border-white/10 hover:border-white/25 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>All Insights</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Journal Entries as Horizontal Pills */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          {JOURNALS.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedJournal(entry)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 md:px-8 bg-surface/30 hover:bg-surface border border-stroke hover:border-text-primary/30 rounded-[28px] sm:rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-black/20"
            >
              {/* Left Zone: Topic index & Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Index / Icon */}
                <div className="w-10 h-10 rounded-full bg-bg border border-stroke flex items-center justify-center shrink-0 text-muted group-hover:text-white group-hover:border-white/30 transition-colors">
                  <Sparkles className="w-4 h-4" />
                </div>

                {/* Title & Topic */}
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-normal text-text-primary group-hover:text-white transition-colors truncate">
                    {entry.title}
                  </h3>
                  <div className="text-xs text-muted mt-0.5 flex items-center gap-2">
                    <span className="text-sky-300/80">{entry.topic}</span>
                  </div>
                </div>
              </div>

              {/* Right Zone: Metadata & Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-5 shrink-0 text-xs text-muted pt-2 sm:pt-0 border-t sm:border-t-0 border-stroke/40">
                <span className="tabular-nums font-mono text-[11px] text-muted">
                  {entry.readTime}
                </span>
                <span className="hidden md:inline">·</span>
                <span className="text-[11px]">{entry.date}</span>

                {/* Arrow Action */}
                <div className="w-8 h-8 rounded-full bg-bg border border-stroke/80 flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-text-primary/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <JournalModal
        item={selectedJournal}
        onClose={() => setSelectedJournal(null)}
      />
    </section>
  );
}
