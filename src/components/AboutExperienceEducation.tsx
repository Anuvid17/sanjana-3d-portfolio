import { motion } from 'framer-motion';
import { EXPERIENCES, EDUCATION_LIST, PERSONAL_INFO } from '../data/portfolioData';
import { downloadFile } from '../utils/downloadHelper';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Sparkles, Award, Download, Eye } from 'lucide-react';

interface AboutExperienceEducationProps {
  onOpenPdfViewer?: (docType: 'resume' | 'technical-profile') => void;
}

export default function AboutExperienceEducation({ onOpenPdfViewer }: AboutExperienceEducationProps) {
  return (
    <section id="about" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* About Section: Professional Portrait + Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          {/* Portrait Column (lg:col-span-5) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Ambient soft glow behind portrait */}
            <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-sky-600/20 via-sky-400/10 to-transparent blur-xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative rounded-[32px] overflow-hidden border border-stroke/80 bg-surface shadow-2xl">
              {/* Photo Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg">
                <img
                  src={PERSONAL_INFO.profilePhoto}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle scrim at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 halftone-overlay opacity-10 mix-blend-multiply pointer-events-none" />

                {/* Status Pill floating on top */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{PERSONAL_INFO.status}</span>
                </div>
              </div>

              {/* Caption Card below portrait */}
              <div className="p-5 bg-surface/90 border-t border-stroke/60 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-display italic text-text-primary">
                    {PERSONAL_INFO.name}
                  </h3>
                  <span className="text-[11px] text-sky-300 font-mono">MCA AI '27</span>
                </div>
                <div className="text-xs text-muted flex items-center justify-between">
                  <span>AI/ML & Generative AI</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-400" />
                    <span>Bengaluru, India</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prose & Background Narrative (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                BACKGROUND & PHILOSOPHY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary leading-tight">
              Driven by Curiosity. Built with{' '}
              <span className="font-display italic text-text-primary">Intelligence.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted font-light leading-relaxed">
              <p>
                I am currently pursuing a Master of Computer Applications specializing in{' '}
                <span className="text-text-primary font-normal">
                  Artificial Intelligence and Generative AI
                </span>{' '}
                at Alliance University, Bengaluru. I am passionate about developing intelligent
                applications using Machine Learning, Natural Language Processing, Large Language
                Models, Computer Vision, and Reinforcement Learning.
              </p>
              <p>
                I enjoy combining technical knowledge with creative problem-solving to build
                practical AI-powered solutions that create tangible real-world impact.
              </p>
            </div>

            {/* Quick credentials pill row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-surface/50 border border-stroke flex items-start gap-3">
                <GraduationCap className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-text-primary">
                    BCA Distinction
                  </div>
                  <div className="text-[11px] text-muted">
                    9.21 CGPA · University of Mysore
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-surface/50 border border-stroke flex items-start gap-3">
                <Award className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-text-primary">
                    Hackathon Winner
                  </div>
                  <div className="text-[11px] text-muted">
                    Inter-College Coding Competitions
                  </div>
                </div>
              </div>
            </div>

            {/* Official Downloads Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {onOpenPdfViewer && (
                <button
                  onClick={() => onOpenPdfViewer('technical-profile')}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/25 text-muted hover:text-text-primary transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Technical Profile</span>
                </button>
              )}

              <button
                onClick={() => downloadFile(PERSONAL_INFO.technicalProfilePdf, 'Sanjana_R_Technical_Profile.pdf')}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                title="Download FacePrep Technical Profile (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>Technical Profile (PDF)</span>
              </button>

              {onOpenPdfViewer && (
                <button
                  onClick={() => onOpenPdfViewer('resume')}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-medium bg-surface/70 hover:bg-surface border border-white/10 hover:border-white/25 text-muted hover:text-text-primary transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>
              )}

              <button
                onClick={() => downloadFile(PERSONAL_INFO.resumePdf, 'Sanjana_R_Resume.pdf')}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md"
                title="Download SDE & AI Resume (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>Resume (PDF)</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 2-Column Split: Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Experience Timeline (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-sky-300 font-medium pb-2 border-b border-stroke/60">
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span>Work Experience</span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-2 before:top-3 before:bottom-3 before:w-px before:bg-stroke">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative group"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-bg border-2 border-sky-400 group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-3xl bg-surface/40 hover:bg-surface border border-stroke transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted mb-4">
                      <span>{exp.company}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {exp.contributions.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary/80"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400/80 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Education Cards (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-sky-300 font-medium pb-2 border-b border-stroke/60">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>Academic Foundation</span>
            </div>

            <div className="space-y-6">
              {EDUCATION_LIST.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-3xl bg-surface/40 hover:bg-surface border border-stroke transition-all duration-300 relative group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-text-primary">
                        {edu.degree}
                      </h3>
                      {edu.specialization && (
                        <div className="text-xs text-sky-300 font-medium mt-0.5">
                          Specialization: {edu.specialization}
                        </div>
                      )}
                    </div>

                    <div className="text-xs px-3 py-1 rounded-full bg-bg border border-stroke text-muted font-mono">
                      {edu.period}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-muted mb-4">
                    {edu.institution}
                  </p>

                  {edu.score && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-950/40 border border-sky-400/30 text-sky-200 text-xs font-semibold mb-4 tabular-nums">
                      <span>{edu.score}</span>
                    </div>
                  )}

                  {edu.highlights && (
                    <ul className="space-y-1.5 text-xs text-text-primary/70">
                      {edu.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-stroke" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
