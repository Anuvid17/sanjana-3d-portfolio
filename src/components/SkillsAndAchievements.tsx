import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES, ACHIEVEMENTS, PERSONAL_INFO } from '../data/portfolioData';
import {
  Trophy,
  Code2,
  Cpu,
  Sparkles,
  Terminal,
  Award,
  ExternalLink,
  CheckCircle2,
  Box,
  Layers,
  Brain,
  ShieldCheck,
  Download,
  FileText,
  Eye,
} from 'lucide-react';
import { downloadFile } from '../utils/downloadHelper';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Programming Languages': <Terminal className="w-4 h-4 text-sky-400" />,
  'Machine Learning & Deep Learning': <Cpu className="w-4 h-4 text-sky-400" />,
  'Generative AI': <Sparkles className="w-4 h-4 text-sky-400" />,
  'Computer Vision': <Code2 className="w-4 h-4 text-sky-400" />,
  'Tools & Frameworks': <Terminal className="w-4 h-4 text-sky-400" />,
};

interface SkillsAndAchievementsProps {
  onOpen3D?: () => void;
  onOpenPdfViewer?: (docType: 'resume' | 'technical-profile') => void;
}

export default function SkillsAndAchievements({ onOpen3D, onOpenPdfViewer }: SkillsAndAchievementsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map((c) => c.title)];

  const displayedCategories =
    activeCategory === 'All'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="bg-bg pt-10 sm:pt-14 pb-16 md:pb-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              TECHNOLOGIES & EXPERTISE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary mb-3">
            Tools I <span className="font-display italic text-text-primary">Build With</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-xl">
            A comprehensive overview of programming paradigms, machine learning models, neural architectures, and software engineering toolchains.
          </p>
        </motion.div>

        {/* 3D Portfolio & Recruiter Placement Drive Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-surface/90 via-surface/70 to-sky-950/20 border border-sky-400/30 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-400/30 text-xs font-semibold text-sky-300">
                <Box className="w-3.5 h-3.5 text-sky-400" />
                <span>TECHNICAL PROFILE & 3D RECRUITER LAB</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display italic text-text-primary">
                Interactive 3D Portfolio for Internship & Placement Drives
              </h3>
              <p className="text-xs sm:text-sm text-text-primary/80 leading-relaxed">
                Prepared as part of the technical profile for upcoming recruitment rounds. Visualizes my full AI stack, neural architectures, reinforcement learning models, and real-time computer vision benchmarks in an interactive 3D spatial canvas.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-sky-200/90 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  3D Spatial Visualizer
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  93.17% Dice Surgical AI
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  9.21 BCA CGPA
                </span>
              </div>
            </div>

            {/* Download Documents & 3D Lab CTAs */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
              {onOpenPdfViewer && (
                <button
                  onClick={() => onOpenPdfViewer('technical-profile')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/25 text-muted hover:text-text-primary transition-all cursor-pointer"
                  title="View Technical Profile in app"
                >
                  <Eye className="w-3.5 h-3.5 text-white/80" />
                  <span>View Profile</span>
                </button>
              )}

              <button
                onClick={() => downloadFile(PERSONAL_INFO.technicalProfilePdf, 'Sanjana_R_Technical_Profile.pdf')}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-black/30"
                title="Download FacePrep Technical Profile (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>Technical Profile (PDF)</span>
              </button>

              {onOpenPdfViewer && (
                <button
                  onClick={() => onOpenPdfViewer('resume')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/25 text-muted hover:text-text-primary transition-all cursor-pointer"
                  title="View Resume in app"
                >
                  <Eye className="w-3.5 h-3.5 text-white/80" />
                  <span>View Resume</span>
                </button>
              )}

              <button
                onClick={() => downloadFile(PERSONAL_INFO.resumePdf, 'Sanjana_R_Resume.pdf')}
                className="inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-black/30"
                title="Download Official Resume (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>Resume (PDF)</span>
              </button>

              <button
                onClick={() => {
                  if (onOpen3D) onOpen3D();
                  else {
                    const el = document.getElementById('3d-portfolio');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/25 text-muted hover:text-text-primary transition-all cursor-pointer"
                title="Explore 3D Neural Architecture"
              >
                <Layers className="w-3.5 h-3.5 text-white/80" />
                <span>3D Lab</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Technical Profile Key Areas of Expertise */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-sky-300 font-semibold mb-4">
            <Brain className="w-4 h-4 text-sky-400" />
            <span>Technical Areas of Expertise</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAL_INFO.recruiterHighlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-surface/40 border border-stroke hover:border-white/20 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-white/60 mb-2.5" />
                <h4 className="text-sm font-semibold text-text-primary mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills with Clean Luxury Palette */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                activeCategory === cat
                  ? 'bg-white/20 text-white border-white/40 shadow-md shadow-black/40'
                  : 'bg-surface/50 text-muted border-white/10 hover:text-text-primary hover:bg-surface/80 hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {displayedCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-3xl p-6 sm:p-7 bg-surface/40 hover:bg-surface border border-stroke hover:border-text-primary/30 transition-all duration-300"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute -inset-[1px] rounded-3xl accent-gradient opacity-0 group-hover:opacity-20 transition-opacity blur-[1px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-stroke/60">
                  <div className="w-8 h-8 rounded-lg bg-bg border border-stroke flex items-center justify-center">
                    {CATEGORY_ICONS[cat.title] || <Cpu className="w-4 h-4 text-sky-400" />}
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide text-text-primary">
                    {cat.title}
                  </h3>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1.5 rounded-full bg-bg/90 border border-stroke text-text-primary/90 hover:border-sky-400/40 hover:text-sky-200 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verified Achievements */}
        <div className="rounded-3xl p-6 sm:p-10 bg-surface/30 border border-stroke relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-sky-300 font-medium mb-6">
            <Trophy className="w-4 h-4 text-sky-400" />
            <span>Honors & Recognitions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-bg/80 border border-stroke/70 relative group hover:border-text-primary/30 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-surface border border-stroke flex items-center justify-center text-sky-400 mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-medium text-text-primary mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
