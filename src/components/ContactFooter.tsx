import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/portfolioData';
import { downloadFile } from '../utils/downloadHelper';
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from 'lucide-react';

interface ContactFooterProps {
  onOpenContactModal: () => void;
  onOpenPdfViewer?: (docType: 'resume' | 'technical-profile') => void;
}

export default function ContactFooter({ onOpenContactModal, onOpenPdfViewer }: ContactFooterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Background HLS Video (flipped vertically scale-y-[-1])
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: Hls | null = null;
    const videoSrc = PERSONAL_INFO.hlsVideoUrl;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsInstance.loadSource(videoSrc);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  // GSAP Marquee Animation
  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to('.marquee-inner', {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const marqueeText = 'BUILDING INTELLIGENT FUTURES • '.repeat(10);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-stroke/60"
    >
      {/* Background Video (Flipped Vertically) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-40"
        />
        {/* Heavier overlay: bg-black/70 */}
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      {/* Marquee Banner */}
      <div
        ref={marqueeRef}
        className="relative z-10 w-full overflow-hidden py-4 border-y border-stroke/40 mb-16 select-none bg-surface/30 backdrop-blur-sm"
      >
        <div className="marquee-inner flex whitespace-nowrap will-change-transform">
          <span className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-text-primary/70">
            {marqueeText}
          </span>
          <span className="text-sm md:text-base font-medium tracking-[0.25em] uppercase text-text-primary/70">
            {marqueeText}
          </span>
        </div>
      </div>

      {/* Main Contact Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-text-primary mb-5 leading-tight">
            Let's Build Something{' '}
            <span className="font-display italic text-text-primary">Intelligent.</span>
          </h2>

          <p className="text-sm md:text-base text-muted max-w-lg mx-auto mb-10 leading-relaxed">
            Have an interesting idea, a project in mind, or an opportunity to collaborate? Let's connect and create something meaningful.
          </p>

          {/* Big CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group inline-flex items-center gap-2 rounded-full text-sm sm:text-base font-medium px-7 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
            >
              <span>Let's Talk</span>
              <span className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                ↗
              </span>
            </a>

            <button
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-medium text-muted hover:text-text-primary bg-surface/80 hover:bg-surface border border-white/10 hover:border-white/25 transition-all cursor-pointer backdrop-blur-md shadow-md"
            >
              <span>Quick Message</span>
            </button>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {/* Email */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-4 rounded-2xl bg-surface/50 hover:bg-surface border border-stroke hover:border-text-primary/30 transition-all group"
            >
              <Mail className="w-4 h-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">
                Email
              </div>
              <div className="text-xs font-medium text-text-primary truncate">
                {PERSONAL_INFO.email}
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="p-4 rounded-2xl bg-surface/50 hover:bg-surface border border-stroke hover:border-text-primary/30 transition-all group"
            >
              <Phone className="w-4 h-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">
                Phone
              </div>
              <div className="text-xs font-medium text-text-primary tabular-nums">
                {PERSONAL_INFO.phone}
              </div>
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-surface/50 hover:bg-surface border border-stroke hover:border-text-primary/30 transition-all group"
            >
              <Github className="w-4 h-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">
                GitHub
              </div>
              <div className="text-xs font-medium text-text-primary flex items-center justify-between">
                <span>{PERSONAL_INFO.githubUsername}</span>
                <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-text-primary" />
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-surface/50 hover:bg-surface border border-stroke hover:border-text-primary/30 transition-all group"
            >
              <Linkedin className="w-4 h-4 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-[11px] text-muted uppercase tracking-wider mb-0.5">
                LinkedIn
              </div>
              <div className="text-xs font-medium text-text-primary flex items-center justify-between">
                <span>sanjana-saraswathi</span>
                <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-text-primary" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-8 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        {/* Availability Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-medium tracking-wide">
            {PERSONAL_INFO.status}
          </span>
        </div>

        {/* Social Links & Document Downloads */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenPdfViewer ? onOpenPdfViewer('technical-profile') : downloadFile(PERSONAL_INFO.technicalProfilePdf, 'Sanjana_R_Technical_Profile.pdf')}
            className="hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-xs text-muted"
          >
            <span>Technical Profile</span>
            <span className="text-[10px]">↓</span>
          </button>
          <button
            onClick={() => onOpenPdfViewer ? onOpenPdfViewer('resume') : downloadFile(PERSONAL_INFO.resumePdf, 'Sanjana_R_Resume.pdf')}
            className="hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 text-xs text-muted"
          >
            <span>Resume</span>
            <span className="text-[10px]">↓</span>
          </button>
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-text-primary transition-colors"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center sm:text-right">
          © 2026 Sanjana R. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
