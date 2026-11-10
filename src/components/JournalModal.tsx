import { motion, AnimatePresence } from 'framer-motion';
import { JournalItem } from '../types/portfolio';
import { X, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';

interface JournalModalProps {
  item: JournalItem | null;
  onClose: () => void;
}

export default function JournalModal({ item, onClose }: JournalModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 text-xs text-muted mb-2">
                <span className="text-sky-300 font-medium">{item.topic}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTime}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary leading-snug">
                {item.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Overview */}
          <div className="p-4 rounded-2xl bg-bg border border-stroke/70">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted font-medium mb-2">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>Editorial Abstract</span>
            </div>
            <p className="text-sm text-text-primary/90 leading-relaxed">
              {item.summary}
            </p>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-muted font-medium">
              Key Engineering Insights
            </h3>
            <ul className="space-y-2.5">
              {item.takeaways.map((takeaway, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary/80"
                >
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom disclaimer */}
          <div className="pt-2 border-t border-stroke/50 flex items-center justify-between text-xs text-muted">
            <span>Research & Architecture Note</span>
            <button
              onClick={onClose}
              className="text-xs font-medium text-text-primary hover:text-white transition-colors cursor-pointer"
            >
              Done reading
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
