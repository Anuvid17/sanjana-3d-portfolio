import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { downloadFile } from '../utils/downloadHelper';
import { X, Download, ExternalLink, FileText, Check, Printer } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: 'resume' | 'technical-profile';
}

export default function PdfViewerModal({
  isOpen,
  onClose,
  initialDoc = 'resume',
}: PdfViewerModalProps) {
  const [activeDoc, setActiveDoc] = useState<'resume' | 'technical-profile'>(initialDoc);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveDoc(initialDoc);
    }
  }, [isOpen, initialDoc]);

  // Lock background scroll strictly
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

  const currentPdfUrl =
    activeDoc === 'resume' ? PERSONAL_INFO.resumePdf : PERSONAL_INFO.technicalProfilePdf;
  const currentFilename =
    activeDoc === 'resume' ? 'Sanjana_R_Resume.pdf' : 'Sanjana_R_Technical_Profile.pdf';
  const currentDocTitle =
    activeDoc === 'resume'
      ? 'Official Resume (AI / ML & SDE)'
      : 'Technical Profile (FACE Prep / Alliance)';

  const handleDownload = async () => {
    await downloadFile(currentPdfUrl, currentFilename);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
        return;
      } catch {
        // Fallback to window print
      }
    }
    window.print();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden overscroll-none"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[92vh] bg-[#0c0e14] border border-stroke rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Top Header & Document Switcher */}
          <div className="flex flex-wrap items-center justify-between p-3.5 sm:px-6 border-b border-stroke/70 bg-surface/70 gap-3 shrink-0">
            {/* Document Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-bg/80 border border-white/10">
              <button
                onClick={() => setActiveDoc('resume')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeDoc === 'resume'
                    ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (SDE & AI)</span>
              </button>

              <button
                onClick={() => setActiveDoc('technical-profile')}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeDoc === 'technical-profile'
                    ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                    : 'text-muted hover:text-text-primary'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Technical Profile</span>
              </button>
            </div>

            {/* Document Title Badge */}
            <div className="hidden lg:block text-xs text-muted truncate max-w-xs font-mono">
              <span className="text-white font-medium">{currentDocTitle}</span>
            </div>

            {/* Actions: Download, Open, Print, Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                title={`Download ${currentFilename}`}
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-white/80" />
                    <span>Download PDF</span>
                  </>
                )}
              </button>

              <a
                href={currentPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-colors"
                title="Open PDF directly in new browser tab"
              >
                <span>New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center justify-center p-2 rounded-full bg-surface hover:bg-stroke/60 border border-stroke text-muted hover:text-text-primary transition-colors cursor-pointer"
                title="Print PDF"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Close PDF Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* PDF Viewer Frame */}
          <div className="flex-1 w-full bg-[#14161f] relative overflow-hidden">
            <iframe
              ref={iframeRef}
              key={currentPdfUrl}
              src={`${currentPdfUrl}#view=FitH`}
              title={currentDocTitle}
              className="w-full h-full border-0"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
