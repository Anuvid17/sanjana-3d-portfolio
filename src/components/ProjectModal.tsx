import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock background body scroll strictly while project modal is active
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-none"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
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
          className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[88vh] flex flex-col overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header image banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
            <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/80 border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Category badge */}
            <div className="absolute bottom-4 left-6 sm:left-8">
              <span className="text-xs uppercase tracking-widest text-sky-300 font-medium bg-black/40 px-3 py-1 rounded-full border border-sky-400/20 backdrop-blur-md">
                {project.category}
              </span>
            </div>
          </div>

          {/* Modal Content - strictly self-contained scrolling */}
          <div
            className="p-6 sm:p-8 overflow-y-auto overscroll-contain flex-1 space-y-6"
            style={{ overscrollBehavior: 'contain' }}
            onWheel={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-1">
                {project.title}
              </h2>
              <p className="text-sm text-sky-200/80 font-medium">
                {project.subtitle}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-bg border border-stroke text-text-primary/90"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {project.description}
            </p>

            {/* Performance Metrics if available */}
            {project.metrics && (
              <div className="p-4 rounded-2xl bg-bg border border-stroke">
                <div className="text-xs text-muted uppercase tracking-widest mb-3 font-medium flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" />
                  <span>Empirical Performance Benchmarks</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-surface/60 p-3 rounded-xl border border-stroke/50 text-center"
                    >
                      <div className="text-xl font-display text-text-primary tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-[11px] text-muted tracking-tight mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Engineering Contributions */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-muted font-medium mb-3">
                Key Contributions & Architecture
              </h3>
              <ul className="space-y-2.5">
                {project.keyContributions.map((contribution, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* External Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium bg-bg border border-stroke hover:border-text-primary/40 text-text-primary transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3 text-muted" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
