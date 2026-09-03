import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface CertificateModalProps {
  certificate: {
    name: string;
    issuer: string;
    image: string;
  } | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden';
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        autoAlpha: 1,
        backdropFilter: 'blur(12px)',
        duration: 0.4,
        ease: 'power2.out',
      }).fromTo(
        contentRef.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [certificate]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    
    tl.to(contentRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    }).to(
      overlayRef.current,
      {
        autoAlpha: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.in',
      },
      '-=0.1'
    );
  };

  if (!certificate) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 invisible"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--background)] border border-[var(--border)] p-2 md:p-4 rounded-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-2 pb-4 pt-2">
          <div>
            <h3 className="text-lg md:text-xl font-medium">{certificate.name}</h3>
            <span className="font-mono text-xs text-[var(--muted-foreground)]">
              {certificate.issuer}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[var(--card)] rounded-full transition-colors text-[var(--muted-foreground)] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden rounded border border-[var(--border)]/50 bg-[var(--card)] flex items-center justify-center relative min-h-[200px] md:min-h-[400px] p-2">
          <img
            src={certificate.image}
            alt={certificate.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="text-center p-8"><span class="font-mono text-xs text-[var(--muted-foreground)]">Upload ' + certificate.image + ' into public folder</span></div>';
            }}
          />
        </div>
      </div>
    </div>
  );
}
