import React from 'react';
import { X, Code2, Award, Terminal, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function LeetCodeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const topics = [
    { name: 'Arrays & Hashing', count: 78, pct: 90 },
    { name: 'Two Pointers & Sliding Window', count: 46, pct: 85 },
    { name: 'Trees & Binary Search Trees', count: 52, pct: 80 },
    { name: 'Dynamic Programming', count: 42, pct: 70 },
    { name: 'Graphs & BFS/DFS', count: 38, pct: 75 },
    { name: 'Linked Lists & Stacks', count: 34, pct: 88 },
    { name: 'Backtracking & Greedy', count: 25, pct: 65 },
  ];

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
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--cyan)]">
            <Terminal size={14} />
            <span>ALGORITHMIC COMPETENCY // 300+ SOLVED</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Data Structures & Algorithms
          </h2>
          <p className="text-sm text-[var(--muted-foreground)] mb-6">
            Consistent focus on optimal time/space complexity analysis (O(N), O(log N)), memory efficiency, and systematic problem solving.
          </p>

          {/* Stat Badges */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-[var(--card)] border border-[var(--border)] text-center rounded">
              <span className="text-[10px] font-mono text-[var(--cyan)] uppercase block">Easy</span>
              <strong className="text-xl font-bold text-white">125</strong>
              <span className="text-[10px] text-white/40 block">Foundational</span>
            </div>
            <div className="p-3 bg-[var(--card)] border border-[var(--border)] text-center rounded">
              <span className="text-[10px] font-mono text-[var(--purple)] uppercase block">Medium</span>
              <strong className="text-xl font-bold text-white">152</strong>
              <span className="text-[10px] text-white/40 block">System Patterns</span>
            </div>
            <div className="p-3 bg-[var(--card)] border border-[var(--border)] text-center rounded">
              <span className="text-[10px] font-mono text-[#ef4444] uppercase block">Hard</span>
              <strong className="text-xl font-bold text-white">26</strong>
              <span className="text-[10px] text-white/40 block">Complex Graphs/DP</span>
            </div>
          </div>

          {/* Topic Progress Breakdown */}
          <div className="space-y-3 mb-6">
            <span className="text-xs font-mono text-[var(--foreground)] block uppercase tracking-wider">
              Topic Distribution
            </span>
            {topics.map((t) => (
              <div key={t.name} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[var(--muted-foreground)]">{t.name}</span>
                  <span className="text-[var(--cyan)]">{t.count} solved</span>
                </div>
                <div className="w-full h-1.5 bg-[var(--card)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]"
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--purple)]">
              <Award size={14} />
              <span>Languages: Java & JavaScript</span>
            </div>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--card)] text-[var(--background)] font-mono text-xs font-bold rounded hover:bg-[var(--card)] transition-colors"
            >
              <Code2 size={14} />
              <span>LeetCode Profile</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
