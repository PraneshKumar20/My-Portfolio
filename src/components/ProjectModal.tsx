import React from 'react';
import { X, ExternalLink, Github, Layers, Cpu, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ProjectData {
  number: string;
  title: string;
  type: string;
  description: string;
  stack: string[];
  visual: string;
  image?: string;
  highlights?: string[];
  liveUrl?: string;
  githubUrl?: string;
  longOverview?: string;
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData | null;
  onClose: () => void;
}) {
  if (!project) return null;

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

          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[var(--cyan)] tracking-widest">{project.number} //</span>
            <span className="font-mono text-xs text-[var(--purple)] tracking-wider uppercase">{project.type}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {project.title}
          </h2>

          <p className="text-sm md:text-base text-[var(--muted-foreground)] leading-relaxed mb-6">
            {project.description}
          </p>

          {project.image && (
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-[var(--border)] mb-6 bg-[var(--card)] relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--cyan)] mb-3 uppercase tracking-wider">
              <Cpu size={14} />
              <span>Technology & Architecture</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <div
                  key={item}
                  className="relative px-[10px] py-[7px] border border-[var(--border)] text-[var(--foreground)] opacity-80 bg-[var(--card)] transition-all duration-300 cursor-default flex items-center gap-2 outline-none hover:border-[var(--cyan)] hover:opacity-100 hover:-translate-y-[2px] hover:shadow-[0_2px_10px_rgba(125,249,229,0.15)] hover:bg-[rgba(125,249,229,0.05)] group/tile rounded-sm"
                >
                  <span className="font-mono text-xs whitespace-nowrap">{item}</span>
                  <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] shadow-[0_0_6px_var(--cyan)] transition-all duration-300 opacity-0 scale-0 group-hover/tile:opacity-100 group-hover/tile:scale-100" />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--purple)] mb-3 uppercase tracking-wider">
              <Layers size={14} />
              <span>Key Features & Engineering Highlights</span>
            </div>
            <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
              {project.title === 'Hairloon' ? (
                <>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Face-shape analysis with personalized hairstyle recommendations based on facial features.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Location-aware salon discovery with mapped recommendations and appointment-oriented browsing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Responsive React interface with interactive discovery flows and optimized client-side interactions.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Full-stack MERN architecture with secure authentication and granular category spending limits.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Interactive data visualizations for cashflow trends, recurring bills, savings goals, and spending patterns.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>MongoDB-backed financial data processing with optimized analytics and aggregation workflows.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border)]">
            <a
              href="mailto:raju.praneshkumar@gmail.com?subject=Inquiry regarding project "
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--cyan)]/40 text-[var(--cyan)]/80 font-mono text-xs rounded hover:-translate-y-1 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300"
            >
              <ExternalLink size={14} />
              <span>Discuss Project</span>
            </a>
            <a
              href={project.githubUrl || "https://github.com"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--cyan)]/40 text-[var(--cyan)]/80 font-mono text-xs rounded hover:-translate-y-1 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300"
            >
              <Github size={14} />
              <span>View Code Repo</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--cyan)]/40 text-[var(--cyan)]/80 font-mono text-xs rounded hover:-translate-y-1 hover:border-[var(--cyan)] hover:text-[var(--cyan)] hover:bg-[var(--cyan)]/10 transition-all duration-300"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
