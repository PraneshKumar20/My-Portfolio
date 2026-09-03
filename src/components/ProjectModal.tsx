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
                <span
                  key={item}
                  className="px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] font-mono text-xs text-[var(--foreground)] rounded"
                >
                  {item}
                </span>
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
                    <span>Real-time computer vision face contour analysis for customized hairstyle recommendations.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Salon geolocation indexing with live appointment slot reservations and wait-time estimations.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Responsive interface designed with intuitive gesture support and low-latency rendering.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Full MERN stack architecture with JWT authentication and granular category spending limits.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Interactive data visualizations for monthly cash-flow trends, recurring bills, and savings rate.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-[var(--cyan)] mt-0.5 shrink-0" />
                    <span>Optimized MongoDB aggregations ensuring sub-50ms analytics query latency on large datasets.</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border)]">
            <a
              href="mailto:raju.praneshkumar@gmail.com?subject=Inquiry regarding project "
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--card)] text-[var(--background)] font-mono text-xs font-bold rounded hover:bg-[var(--card)] transition-colors"
            >
              <ExternalLink size={14} />
              <span>Discuss Project</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[var(--border)] text-[var(--foreground)] font-mono text-xs rounded hover:border-[var(--border)] transition-colors"
            >
              <Github size={14} />
              <span>View Code Repo</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
