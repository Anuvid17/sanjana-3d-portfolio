import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpen3D?: () => void;
}

export default function Navbar({ onOpenResume, onOpenContact, onOpen3D }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = ['home', '3d-portfolio', 'about', 'projects', 'skills', 'certifications'];
      const scrollPos = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none">
      <div
        className={`pointer-events-auto inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/85 px-2 py-1.5 transition-all duration-300 ${
          scrolled
            ? 'shadow-lg shadow-black/40 border-white/20 bg-surface/95 scale-[0.98]'
            : 'shadow-md shadow-black/10'
        }`}
      >
        {/* Logo 9x9 (36px) circle */}
        <button
          onClick={() => scrollTo('home')}
          className="relative w-9 h-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110 cursor-pointer group shrink-0 focus:outline-none"
          aria-label="Sanjana R Portfolio Home"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/50 transition-colors" />
          <div className="relative w-full h-full rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary tracking-tight font-medium">
              SR
            </span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5 hidden sm:block" />

        {/* Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => scrollTo('home')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium ${
              activeSection === 'home'
                ? 'text-text-primary bg-stroke/60 shadow-inner'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            Home
          </button>

          {/* 3D Portfolio Link Highlight */}
          <button
            onClick={() => {
              if (onOpen3D) onOpen3D();
              else scrollTo('3d-portfolio');
            }}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium flex items-center gap-1 ${
              activeSection === '3d-portfolio'
                ? 'text-text-primary bg-stroke/60 shadow-inner'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            <span>3D Portfolio</span>
            <span className="text-[10px] text-white/60">✦</span>
          </button>

          <button
            onClick={() => scrollTo('about')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium ${
              activeSection === 'about'
                ? 'text-text-primary bg-stroke/60 shadow-inner'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            About
          </button>

          <button
            onClick={() => scrollTo('projects')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium ${
              activeSection === 'projects'
                ? 'text-text-primary bg-stroke/60 shadow-inner'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            Projects
          </button>

          <button
            onClick={() => scrollTo('certifications')}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium ${
              activeSection === 'certifications'
                ? 'text-text-primary bg-stroke/60 shadow-inner'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            Certifications
          </button>

          <button
            onClick={onOpenResume}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all cursor-pointer whitespace-nowrap shrink-0 font-medium text-muted hover:text-text-primary hover:bg-stroke/40"
          >
            Resume
          </button>
        </nav>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-1.5" />

        {/* Say Hi Button */}
        <button
          onClick={onOpenContact}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface hover:bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-text-primary border border-stroke/70 hover:border-white/30 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
          aria-label="Say Hi to Sanjana R"
        >
          <span>Say hi</span>
          <span className="text-[11px] text-muted">↗</span>
        </button>
      </div>
    </header>
  );
}
