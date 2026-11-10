import { motion, AnimatePresence } from 'framer-motion';
import { ExplorationItem } from '../types/portfolio';
import { X, Sparkles } from 'lucide-react';

interface ExplorationsLightboxProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export default function ExplorationsLightbox({
  item,
  onClose,
}: ExplorationsLightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
        >
          {/* Large Image Showcase */}
          <div className="relative aspect-square sm:aspect-[4/3] w-full overflow-hidden bg-bg">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/40" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sky-300 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{item.category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
