import React from 'react';

export function ProjectSkeleton() {
  return (
    <div className="project-list animate-pulse">
      {[1, 2].map((item) => (
        <article key={item} className="project-card cursor-default hover:border-[var(--border)] hover:box-shadow-none">
          {/* Visual Side Skeleton */}
          <div className="project-visual bg-[var(--card)] border-r border-[var(--border)]">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/[0.02]" />
          </div>

          {/* Info Side Skeleton */}
          <div className="project-info">
            {/* Topline */}
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-[var(--card)] rounded-sm" />
              <div className="h-4 w-4 bg-[var(--card)] rounded-sm" />
            </div>
            
            {/* Body */}
            <div className="project-body">
              <div className="h-12 md:h-16 w-3/4 bg-[var(--card)] rounded-sm mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-[var(--card)] rounded-sm" />
                <div className="h-4 w-5/6 bg-[var(--card)] rounded-sm" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((tag) => (
                <div key={tag} className="h-[26px] w-20 bg-[var(--card)] rounded-sm" />
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function BentoSkeleton() {
  return (
    <div className="bento-grid animate-pulse">
      {/* Intro Card Skeleton */}
      <div className="bento-card intro-card bg-[var(--card)] border-[var(--border)] cursor-default hover:border-[var(--border)]">
        <div>
          <div className="h-3 w-32 bg-[var(--card)] rounded-sm mb-8" />
          <div className="space-y-4">
            <div className="h-6 w-full bg-[var(--card)] rounded-sm" />
            <div className="h-6 w-11/12 bg-[var(--card)] rounded-sm" />
            <div className="h-6 w-4/5 bg-[var(--card)] rounded-sm" />
          </div>
        </div>
        <div className="h-4 w-28 bg-[var(--card)] rounded-sm mt-8" />
      </div>

      {/* Stat Card Skeleton */}
      <div className="bento-card bg-[var(--card)] border-[var(--border)] cursor-default hover:border-[var(--border)]">
        <div className="flex justify-between items-center mb-6">
          <div className="h-3 w-24 bg-[var(--card)] rounded-sm" />
          <div className="h-3 w-12 bg-[var(--card)] rounded-sm" />
        </div>
        <div className="h-24 w-32 bg-[var(--card)] rounded-sm mb-6" />
        <div className="space-y-2">
          <div className="h-3 w-3/4 bg-[var(--card)] rounded-sm" />
          <div className="h-3 w-1/2 bg-[var(--card)] rounded-sm" />
        </div>
      </div>

      {/* Location Card Skeleton */}
      <div className="bento-card bg-[var(--card)] border-[var(--border)] cursor-default hover:border-[var(--border)]">
        <div className="h-3 w-24 bg-[var(--card)] rounded-sm mb-6" />
        <div className="space-y-3 mb-6">
          <div className="h-10 w-40 bg-[var(--card)] rounded-sm" />
          <div className="h-10 w-24 bg-[var(--card)] rounded-sm" />
        </div>
        <div className="h-2 w-32 bg-[var(--card)] rounded-sm mt-auto" />
      </div>

      {/* Skills Card Skeleton */}
      <div className="bento-card skills-card bg-[var(--card)] border-[var(--border)] cursor-default hover:border-[var(--border)]">
        <div className="h-3 w-24 bg-[var(--card)] rounded-sm mb-6" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((skill) => (
            <div key={skill} className="h-8 w-20 bg-[var(--card)] rounded-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}
