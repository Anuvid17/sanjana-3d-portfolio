import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onConnect: () => void;
  onOpen3D?: () => void;
}

export default function Hero({ onExploreWork, onConnect, onOpen3D }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating roles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // HLS Video Initialization
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
        video.play().catch(() => {
          // Autoplay policy fallback
        });
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

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1 },
        '-=0.8'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        {/* Dark overlay: bg-black/20 and ambient tint */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-90" />
        {/* Bottom fade: h-48 bg-gradient-to-t from-bg to-transparent */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
        {/* Radial subtle vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-bg/30 to-bg/80 pointer-events-none" />
      </div>

      {/* Centered Hero Content (z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-20">
        {/* Eyebrow */}
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 sm:mb-8 font-medium">
          {PERSONAL_INFO.eyebrow}
        </div>

        {/* Name Reveal */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.92] tracking-tight text-text-primary mb-6 select-none">
          {PERSONAL_INFO.name}
        </h1>

        {/* Role Line with Rotating Word */}
        <div className="blur-in text-base sm:text-lg md:text-xl text-text-primary/90 mb-6 font-normal tracking-wide">
          <span>A curious mind · </span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block text-lg sm:text-xl md:text-2xl px-1 text-sky-200"
          >
            {PERSONAL_INFO.roles[roleIndex]}
          </span>
          <span> building the future of AI.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed">
          {PERSONAL_INFO.bio}
        </p>

        {/* CTA Buttons - Matching Dark Theme with Subtle Blue Accents */}
        <div className="blur-in flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* 3D Spatial Lab Button */}
          <button
            onClick={onOpen3D}
            className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
          >
            <span className="text-white/80">✦</span>
            <span>3D Spatial Lab</span>
            <span className="text-xs text-white/60">↓</span>
          </button>

          {/* "Explore My Work" button */}
          <button
            onClick={onExploreWork}
            className="inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 bg-surface/90 hover:bg-surface text-text-primary border border-white/15 hover:border-white/30 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-black/30"
          >
            <span>Explore My Work</span>
            <span className="text-xs text-muted">↓</span>
          </button>

          {/* Outlined "Let's Connect" button */}
          <button
            onClick={onConnect}
            className="group inline-flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 bg-bg/70 hover:bg-surface text-muted hover:text-text-primary border border-white/10 hover:border-white/25 transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Let's Connect</span>
            <span className="text-xs text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-medium">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke/60 relative overflow-hidden">
          <div className="w-full h-4 accent-gradient animate-scroll-down rounded-full" />
        </div>
      </div>
    </section>
  );
}
