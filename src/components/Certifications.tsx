import { motion } from 'framer-motion';
import { CERTIFICATIONS, PERSONAL_INFO } from '../data/portfolioData';
import { CertificationItem } from '../types/portfolio';
import { downloadFile } from '../utils/downloadHelper';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Download,
  Eye,
  Brain,
  Cpu,
  GraduationCap,
  Code2,
} from 'lucide-react';

interface CertificationsProps {
  onOpenPdfViewer?: (docType: 'resume' | 'technical-profile') => void;
}

const CERT_ICONS: Record<string, React.ReactNode> = {
  'genai-for-everyone': <Sparkles className="w-5 h-5 text-sky-400" />,
  'reinforcement-learning': <Brain className="w-5 h-5 text-indigo-400" />,
  'ml-python-stats': <Cpu className="w-5 h-5 text-emerald-400" />,
  'data-analysis-python': <Code2 className="w-5 h-5 text-amber-400" />,
  'java-programming-ibm': <GraduationCap className="w-5 h-5 text-blue-400" />,
};

export default function Certifications({ onOpenPdfViewer }: CertificationsProps) {
  const handleDownload = async (url: string, filename: string) => {
    await downloadFile(url, filename);
  };

  return (
    <section id="certifications" className="bg-bg py-16 md:py-24 border-t border-stroke/50 relative overflow-hidden">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                VERIFIED CREDENTIALS · COURSERA & INDUSTRY
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-text-primary mb-3">
              Professional <span className="font-display italic text-text-primary">Certifications</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-xl">
              Accredited credentials and specialized certifications in Generative AI, Reinforcement Learning, Machine Learning, Data Analytics, and Software Engineering from leading global institutions.
            </p>
          </div>

          {/* Quick PDF Access Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenPdfViewer && (
              <button
                onClick={() => onOpenPdfViewer('technical-profile')}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-white/80" />
                <span>View Technical Profile</span>
              </button>
            )}

            {onOpenPdfViewer && (
              <button
                onClick={() => onOpenPdfViewer('resume')}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 text-white/80" />
                <span>View Resume</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12">
          {CERTIFICATIONS.map((cert: CertificationItem, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl p-6 sm:p-7 bg-surface/40 hover:bg-surface border border-stroke hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-black/20"
            >
              <div>
                {/* Top Badge: Institution & Verification Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-bg border border-stroke flex items-center justify-center shrink-0">
                      {CERT_ICONS[cert.id] || <Award className="w-4 h-4 text-sky-400" />}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-text-primary block leading-tight">
                        {cert.issuer}
                      </span>
                      <span className="text-[10px] text-muted uppercase tracking-wider font-mono">
                        {cert.platform}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-white transition-colors mb-2.5 leading-snug">
                  {cert.title}
                </h3>

                {/* Verification ID */}
                {cert.verificationId && (
                  <div className="text-[11px] text-muted font-mono mb-4 flex items-center gap-1">
                    <span>Credential ID:</span>
                    <span className="text-zinc-300 font-semibold">{cert.verificationId}</span>
                  </div>
                )}

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-bg border border-stroke text-muted font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Verification Link Button */}
              <div className="pt-4 border-t border-stroke/50 flex items-center justify-between">
                <span className="text-xs text-muted">Coursera Accredited</span>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-sky-300 transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placement & Download Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-6 sm:p-8 bg-surface/60 border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-1.5 max-w-xl">
            <div className="text-xs uppercase tracking-widest text-sky-300 font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              <span>Official Recruiter & Placement Documents</span>
            </div>
            <h4 className="text-base sm:text-lg font-display italic text-text-primary">
              Download Sanjana&apos;s Verified Technical Profile & Resume
            </h4>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Complete documentation including academic scores (9.21 BCA CGPA), internship at TechSaksham (AICTE/Microsoft/SAP), published AI architectures, and verified credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleDownload(PERSONAL_INFO.technicalProfilePdf, 'Sanjana_R_Technical_Profile.pdf')}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-white/80" />
              <span>Download Technical Profile (PDF)</span>
            </button>

            <button
              onClick={() => handleDownload(PERSONAL_INFO.resumePdf, 'Sanjana_R_Resume.pdf')}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-white/80" />
              <span>Download Resume (PDF)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
