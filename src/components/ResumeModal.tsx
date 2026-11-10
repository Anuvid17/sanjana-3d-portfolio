import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  EXPERIENCES,
  EDUCATION_LIST,
  ACHIEVEMENTS,
  CERTIFICATIONS,
} from '../data/portfolioData';
import { downloadFile } from '../utils/downloadHelper';
import { X, Download, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Award, GraduationCap, Briefcase, Code, FileText, Eye, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPdfViewer?: (docType: 'resume' | 'technical-profile') => void;
}

export default function ResumeModal({ isOpen, onClose, onOpenPdfViewer }: ResumeModalProps) {
  const [downloadingResume, setDownloadingResume] = useState(false);
  const [downloadingProfile, setDownloadingProfile] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadResume = async () => {
    setDownloadingResume(true);
    await downloadFile(PERSONAL_INFO.resumePdf, 'Sanjana_R_Resume.pdf');
    setTimeout(() => setDownloadingResume(false), 2000);
  };

  const handleDownloadProfile = async () => {
    setDownloadingProfile(true);
    await downloadFile(PERSONAL_INFO.technicalProfilePdf, 'Sanjana_R_Technical_Profile.pdf');
    setTimeout(() => setDownloadingProfile(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-hidden overscroll-none"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#0d0d0e] border border-stroke rounded-3xl shadow-2xl z-10 max-h-[92vh] flex flex-col overflow-hidden"
        >
          {/* Top Modal Controls */}
          <div className="flex flex-wrap items-center justify-between p-4 sm:px-8 border-b border-stroke/60 bg-surface/50 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-sky-300 font-medium">
                Official Documents
              </span>
              <span className="text-muted hidden sm:inline">·</span>
              <span className="text-xs text-muted hidden sm:inline">Sanjana R</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {/* Button 1: Download Technical Profile */}
              <button
                onClick={handleDownloadProfile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                title="Download FacePrep Technical Profile (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>{downloadingProfile ? 'Downloading...' : 'Technical Profile (PDF)'}</span>
              </button>

              {/* Button 2: Download Resume */}
              <button
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                title="Download SDE & AI Resume (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-white/80" />
                <span>{downloadingResume ? 'Downloading...' : 'Resume (PDF)'}</span>
              </button>

              {/* In-App Viewer Trigger */}
              {onOpenPdfViewer && (
                <button
                  onClick={() => onOpenPdfViewer('resume')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-colors cursor-pointer"
                  title="Open Fullscreen PDF Viewer"
                >
                  <Eye className="w-3.5 h-3.5 text-white/80" />
                  <span className="hidden sm:inline">Open PDF Viewer</span>
                </button>
              )}

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-colors cursor-pointer"
                title="Print CV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content - isolated scroll */}
          <div
            className="p-6 sm:p-10 overflow-y-auto overscroll-contain flex-1 space-y-7 print:p-0 print:bg-white print:text-black"
            style={{ overscrollBehavior: 'contain' }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Direct Document Downloads Row */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface/80 border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
              <div className="space-y-0.5">
                <div className="text-xs uppercase tracking-widest text-sky-300 font-semibold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Verified Placement & SDE Documents</span>
                </div>
                <p className="text-xs text-muted">
                  Download or preview the official Technical Profile and Resume.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {onOpenPdfViewer && (
                  <button
                    onClick={() => onOpenPdfViewer('technical-profile')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Technical Profile</span>
                  </button>
                )}

                <button
                  onClick={handleDownloadProfile}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-white/80" />
                  <span>Download Technical Profile</span>
                </button>

                {onOpenPdfViewer && (
                  <button
                    onClick={() => onOpenPdfViewer('resume')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Resume</span>
                  </button>
                )}

                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-white/80" />
                  <span>Download Resume</span>
                </button>
              </div>
            </div>
            {/* Header info */}
            <div className="border-b border-stroke/60 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                {/* Profile Portrait */}
                <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border border-stroke/80 bg-surface shrink-0 shadow-md">
                  <img
                    src={PERSONAL_INFO.profilePhoto}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-display italic text-text-primary mb-1">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-sm font-medium text-sky-300 tracking-wide mb-2.5">
                    {PERSONAL_INFO.eyebrow}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3 text-sky-400" />
                      {PERSONAL_INFO.email}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-sky-400" />
                      {PERSONAL_INFO.phone}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {PERSONAL_INFO.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2 text-xs">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted hover:text-sky-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/{PERSONAL_INFO.githubUsername}</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted hover:text-sky-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>linkedin.com/in/sanjana-saraswathi</span>
                </a>
              </div>
            </div>

            {/* Recruiter & Placement Drive Technical Profile Box */}
            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-400/30 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-widest text-sky-300 font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  Technical Profile — Internship & Placement Drive Ready
                </span>
                <span className="text-[11px] px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  Verified Technical Credentials
                </span>
              </div>
              <p className="text-xs text-text-primary/90 leading-relaxed">
                Specialized in Deep Reinforcement Learning (PPO), Generative AI (RAG with ChromaDB & Gemini), and Computer Vision (U-Net & YOLO). Demonstrated track record with an academic score of <strong>9.21 CGPA</strong>, inter-college hackathon victory, and empirical medical vision benchmarks (93.17% Dice Score).
              </p>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-2">
                Professional Profile
              </h2>
              <p className="text-xs sm:text-sm text-text-primary/90 leading-relaxed">
                {PERSONAL_INFO.bio} Currently specializing in Artificial Intelligence and Generative AI at Alliance University, with proven ability in deep reinforcement learning, U-Net semantic segmentation, YOLO real-time vision architectures, and robust RAG vector pipelines.
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-sky-400" />
                <span>Technical Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="p-3 rounded-xl bg-surface/40 border border-stroke/50">
                    <span className="font-medium text-sky-200 block mb-1">
                      {cat.title}
                    </span>
                    <span className="text-muted leading-relaxed">
                      {cat.skills.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>Core Research & Technical Projects</span>
              </h2>
              <div className="space-y-4">
                {PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-surface/40 border border-stroke/50 space-y-2"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <span className="text-sm font-semibold text-text-primary mr-2">
                          {proj.title}
                        </span>
                        <span className="text-xs text-sky-300">
                          {proj.subtitle}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted">
                        {proj.tags.join(' · ')}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {proj.description}
                    </p>
                    <ul className="space-y-1 text-xs text-text-primary/80">
                      {proj.keyContributions.map((kc, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-1.5">
                          <span className="text-sky-400">▹</span>
                          <span>{kc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span>Experience</span>
              </h2>
              <div className="space-y-3">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface/40 border border-stroke/50">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-sm font-semibold text-text-primary">
                        {exp.role} — {exp.company}
                      </span>
                      <span className="text-xs text-muted font-mono">
                        {exp.period}
                      </span>
                    </div>
                    <span className="text-xs text-muted block mb-2">
                      {exp.location}
                    </span>
                    <ul className="space-y-1 text-xs text-text-primary/80">
                      {exp.contributions.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-sky-400">▹</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                <span>Education</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface/40 border border-stroke/50">
                    <div className="text-sm font-semibold text-text-primary mb-0.5">
                      {edu.degree}
                    </div>
                    {edu.specialization && (
                      <div className="text-xs text-sky-300 font-medium mb-1">
                        {edu.specialization}
                      </div>
                    )}
                    <div className="text-xs text-muted mb-1">
                      {edu.institution}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted font-mono pt-1">
                      <span>{edu.period}</span>
                      {edu.score && (
                        <span className="text-sky-200 font-semibold">{edu.score}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>Verified Professional Certifications (Coursera)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3 rounded-xl bg-surface/40 border border-stroke/50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] text-sky-300 font-medium">
                          {cert.issuer}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-text-primary mb-1">
                        {cert.title}
                      </h4>
                      {cert.verificationId && (
                        <div className="text-[10px] text-muted font-mono mb-2">
                          ID: {cert.verificationId}
                        </div>
                      )}
                    </div>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-white hover:text-sky-300 transition-colors pt-2 border-t border-stroke/40"
                    >
                      <span>Verify on Coursera</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Recognitions */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-muted font-semibold mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                <span>Honors & Recognitions</span>
              </h2>
              <ul className="space-y-1.5 text-xs text-text-primary/80">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">✓</span>
                    <div>
                      <span className="font-medium text-text-primary">
                        {ach.title}
                      </span>
                      <span className="text-muted ml-1.5">
                        — {ach.description}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
