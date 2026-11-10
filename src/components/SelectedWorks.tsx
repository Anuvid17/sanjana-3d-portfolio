import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import ProjectModal from './ProjectModal';
import { ArrowRight } from 'lucide-react';

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="bg-bg py-16 md:py-24 relative overflow-hidden">
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
                SELECTED WORK
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary mb-3">
              Building <span className="font-display italic text-text-primary">Intelligent Solutions</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-xl">
              A collection of AI-powered applications and research projects exploring intelligent systems, automation, and real-world problem solving.
            </p>
          </div>

          {/* Desktop "View all work" button */}
          <div className="hidden md:inline-flex shrink-0">
            <a
              href="#explorations"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-muted hover:text-text-primary bg-surface/80 hover:bg-surface border border-white/10 hover:border-white/25 transition-all cursor-pointer shadow-sm hover:scale-105"
            >
              <span>View All Explorations</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className={`${project.colSpan} group relative rounded-3xl overflow-hidden border border-stroke bg-surface cursor-pointer select-none`}
            >
              {/* Media Container */}
              <div className={`w-full ${project.aspectRatio} relative overflow-hidden`}>
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Halftone Pattern Overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

                {/* Default Scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-0 bg-bg/75 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-300 flex items-center justify-center p-6 text-center">
                  {/* Floating Action Pill */}
                  <div className="inline-flex items-center gap-2 bg-surface hover:bg-white/10 text-text-primary border border-white/20 hover:border-white/40 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xl transition-all">
                    <span>View — </span>
                    <span className="font-display italic text-sm sm:text-base text-white">
                      {project.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70 ml-1" />
                  </div>
                </div>

                {/* Content Overlay pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col justify-end pointer-events-none group-hover:opacity-20 transition-opacity duration-300">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium tracking-wide text-text-primary/80 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-200/90 font-medium line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
