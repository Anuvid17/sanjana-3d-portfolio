/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ThreeDPortfolio from './components/ThreeDPortfolio';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Certifications from './components/Certifications';
import SkillsAndAchievements from './components/SkillsAndAchievements';
import AboutExperienceEducation from './components/AboutExperienceEducation';
import ContactFooter from './components/ContactFooter';
import ResumeModal from './components/ResumeModal';
import ContactModal from './components/ContactModal';
import ProjectModal from './components/ProjectModal';
import PdfViewerModal from './components/PdfViewerModal';
import { ProjectItem } from './types/portfolio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selected3DProject, setSelected3DProject] = useState<ProjectItem | null>(null);
  const [is3DFullScreen, setIs3DFullScreen] = useState(false);
  const [pdfModalDoc, setPdfModalDoc] = useState<'resume' | 'technical-profile' | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-sky-500/30 selection:text-sky-200">
      {/* Section 1: Loading Screen (000 -> 100 counter over 2700ms) */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Pill Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onOpen3D={() => scrollTo('3d-portfolio')}
      />

      {/* Section 2: Hero with HLS background video & GSAP entrance */}
      <Hero
        onExploreWork={() => scrollTo('projects')}
        onConnect={() => scrollTo('contact')}
        onOpen3D={() => scrollTo('3d-portfolio')}
      />

      {/* 3D Interactive Portfolio Lab: Three.js Spatial Workstation */}
      <ThreeDPortfolio
        onSelectProject={(proj) => setSelected3DProject(proj)}
        isFullScreenMode={is3DFullScreen}
        onToggleFullScreen={() => setIs3DFullScreen(!is3DFullScreen)}
      />

      {/* Section 3: Selected Works (Bento Grid with 3 custom projects) */}
      <SelectedWorks />

      {/* Section 4: Journal (Thoughts & Insights horizontal pills) */}
      <Journal />

      {/* Section 5: Explorations (Parallax Gallery with Pinned Center) */}
      <Explorations />

      {/* Section 6: Technical Skills, Recruiter Profile & Verified Achievements */}
      <SkillsAndAchievements
        onOpen3D={() => scrollTo('3d-portfolio')}
        onOpenPdfViewer={(doc) => setPdfModalDoc(doc)}
      />

      {/* Section 7: Verified Coursera Certifications & Credentials */}
      <Certifications
        onOpenPdfViewer={(doc) => setPdfModalDoc(doc)}
      />

      {/* Section 8: About Me, Internship Experience & Academic Foundation */}
      <AboutExperienceEducation
        onOpenPdfViewer={(doc) => setPdfModalDoc(doc)}
      />

      {/* Section 9: Contact & Footer with Inverted HLS Video & Marquee */}
      <ContactFooter
        onOpenContactModal={() => setIsContactOpen(true)}
        onOpenPdfViewer={(doc) => setPdfModalDoc(doc)}
      />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onOpenPdfViewer={(doc) => {
          setIsResumeOpen(false);
          setPdfModalDoc(doc);
        }}
      />

      <PdfViewerModal
        isOpen={pdfModalDoc !== null}
        initialDoc={pdfModalDoc || 'resume'}
        onClose={() => setPdfModalDoc(null)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectModal
        project={selected3DProject}
        onClose={() => setSelected3DProject(null)}
      />
    </div>
  );
}
