import React, { useState } from 'react';
import { X, Send, Copy, Check, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export function ContactModal({
  isOpen,
  onClose,
  onShowToast,
}: {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('raju.praneshkumar@gmail.com');
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#7df9e5', '#a58bff', '#ffffff'],
      zIndex: 10000,
    });
    onShowToast('Email address copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      onShowToast('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      onShowToast('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitting(false);
      setIsSent(true);

      // Trigger paper poppers from both sides
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { x: 0.1, y: 0.8 },
        angle: 60,
        colors: ['#7df9e5', '#a58bff', '#ffffff'],
        zIndex: 10000,
      });
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { x: 0.9, y: 0.8 },
        angle: 120,
        colors: ['#7df9e5', '#a58bff', '#ffffff'],
        zIndex: 10000,
      });

      onShowToast('Message sent successfully! 🎉');

      setTimeout(() => {
        onClose();
        setIsSent(false);
        setName('');
        setEmail('');
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Contact error:', error);
      setIsSubmitting(false);
      onShowToast('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--cyan)]">
            <Mail size={14} />
            <span>DIRECT INBOX DISPATCH</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Let&apos;s build something together
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Available for full-time software engineering roles, internships, and ambitious freelance projects.
          </p>

          <div className="p-4 bg-[var(--card)] border border-[var(--border)] rounded flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--purple)] block">DIRECT EMAIL</span>
              <span className="font-mono text-xs md:text-sm text-[var(--foreground)]">raju.praneshkumar@gmail.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-[var(--card)] hover:bg-[var(--card)] border border-[var(--border)] text-[var(--cyan)] font-mono text-xs rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[var(--cyan)]" /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 uppercase">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alex Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--card)] border border-[var(--border)] focus:border-[var(--border)] text-white px-3.5 py-2.5 rounded font-sans text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 uppercase">
                Your Email Address
              </label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--card)] border border-[var(--border)] focus:border-[var(--border)] text-white px-3.5 py-2.5 rounded font-sans text-sm outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-[var(--muted-foreground)] mb-1.5 uppercase">
                Project or Message Details
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tell me about what you are looking to build or your opportunity..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[var(--card)] border border-[var(--border)] focus:border-[var(--border)] text-white px-3.5 py-2.5 rounded font-sans text-sm outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSent}
              className={`w-full py-3 font-mono text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                isSent
                  ? 'bg-[var(--purple)] text-white'
                  : 'bg-[var(--cyan)] text-[var(--background)] hover:bg-[#a5fbf0]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Sparkles size={16} className="animate-spin" />
                  <span>SENDING...</span>
                </>
              ) : isSent ? (
                <>
                  <Check size={16} />
                  <span>MESSAGE SENT!</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
