import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { X, Mail, Phone, Github, Linkedin, Copy, Check, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

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

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${name}`
    )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto overscroll-contain bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6"
          style={{ overscrollBehavior: 'contain' }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-sky-300 font-medium block mb-1">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-display italic text-text-primary">
                Let's Talk
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-bg border border-stroke flex items-center justify-center text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-bg border border-stroke flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs text-text-primary truncate">
                  {PERSONAL_INFO.email}
                </span>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text-primary transition-colors cursor-pointer"
                title="Copy email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-bg border border-stroke flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs text-text-primary tabular-nums truncate">
                  {PERSONAL_INFO.phone}
                </span>
              </div>
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-text-primary transition-colors cursor-pointer"
                title="Copy phone"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Direct Message Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-1.5">
                Message / Collaboration Idea
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Sanjana, I'd love to discuss..."
                className="w-full bg-bg border border-stroke rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-muted/50 focus:outline-none focus:border-sky-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 transition-all cursor-pointer shadow-lg"
            >
              {isSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Opening Mail Client...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Social Links */}
          <div className="pt-2 border-t border-stroke/50 flex items-center justify-center gap-4 text-xs text-muted">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-text-primary transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span>·</span>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-text-primary transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
