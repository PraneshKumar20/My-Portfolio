/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Check, Code, Copy, Sparkles, Terminal, Mail, Layers, Sun, Moon, Heart, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomCursor } from './components/animations/CustomCursor';
import { SmoothScroll } from './components/animations/SmoothScroll';
import { PageTransition } from './components/animations/PageTransition';
import { PortraitVisual } from './components/PortraitCanvas';
import { ProjectModal, ProjectData } from './components/ProjectModal';
import { LeetCodeModal } from './components/LeetCodeModal';
import { ContactModal } from './components/ContactModal';
import { CertificateModal } from './components/CertificateModal';
import { ThreeHero } from './components/ThreeHero';
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type CredentialItem = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'achievement';
  image?: string;
  action?: 'leetcode';
};

const credentials: CredentialItem[] = [
  {
    id: 'glowlogics-ambassador',
    name: 'Campus Ambassador',
    issuer: 'GlowLogics Solutions',
    date: 'Aug 2025',
    type: 'achievement',
    image: '/Campus Ambassador.png',
  },
  {
    id: 'fcc-rwd',
    name: 'Responsive Web Design Developer Certification',
    issuer: 'freeCodeCamp',
    date: 'Aug 2025',
    type: 'certificate',
    image: '/Front End Web Design Certificate.png',
  },
  {
    id: 'hackerrank-java',
    name: 'Java (Basic) Skill Certification',
    issuer: 'HackerRank',
    date: 'Aug 2025',
    type: 'certificate',
    image: '/Hackerrank.png',
  },
  {
    id: 'tcs-ion',
    name: 'TCS iON Career Edge (Young Professional)',
    issuer: 'Tata Consultancy Services',
    date: 'Feb 2026',
    type: 'certificate',
    image: '/TCS iON.png',
  },
  {
    id: 'servicenow',
    name: 'ServiceNow Administration Fundamentals',
    issuer: 'ServiceNow University',
    date: 'Jun 2026',
    type: 'certificate',
    image: '/ServiceNow Internship.png',
  }
];

const projects: ProjectData[] = [
  {
    number: '01',
    title: 'Hairloon',
    type: 'ML / PRODUCT DESIGN',
    description:
      'A salon discovery and hairstyle recommendation platform that turns face-shape analysis into a confident next move.',
    stack: ['JavaScript', 'Machine Learning', 'Geolocation', 'TailwindCSS'],
    visual: 'hairloon',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z4khcCQSEa5BKd1wDnsNSERghTSJyM.png',
    githubUrl: 'https://github.com/PraneshKumar20/Hairloon',
    liveUrl: 'https://hairloon.vercel.app/',
  },
  {
    number: '02',
    title: 'Expense Tracker',
    type: 'FULL-STACK / MERN',
    description:
      'A focused finance workspace for logging transactions, planning budgets, and making everyday money feel legible.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Chart.js'],
    visual: 'expense',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-duKoBpxISnUhqhHIMNOSiCxRxZUGa1.png',
  },
];

const skills = [
  'Java',
  'JavaScript',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'DSA',
  'OOP',
  'Git',
  'REST APIs',
  'Tailwind CSS',
];

export default function App() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<{ name: string, issuer: string, image: string } | null>(null);
  const [showLeetCodeModal, setShowLeetCodeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('raju.praneshkumar@gmail.com');
    setCopiedEmail(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#7df9e5', '#a58bff', '#ffffff'],
    });
    showToast('raju.praneshkumar@gmail.com copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleAppreciation = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const colors = theme === 'dark' ? ['#7df9e5', '#a58bff', '#ffffff'] : ['#0ea5e9', '#8b5cf6', '#ffffff'];

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        colors,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    showToast('Appreciation received! Thank you! 🚀');
  };

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // 0. Initial Page Load Transition
      const tl = gsap.timeline();
      tl.to('.loader-text', { y: 0, duration: 0.8, ease: 'power4.out', delay: 0.2 })
        .to('.loader-text', { y: '-100%', duration: 0.6, ease: 'power4.in', delay: 0.4 })
        .to('.loader-overlay', { yPercent: -100, duration: 1, ease: 'expo.inOut' })
        .fromTo(
          '.nav-wrap, .hero-title, .hero-copy, .hero-kicker, .cta',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 1.2, ease: 'power3.out' },
          "-=0.6"
        );

      // 1. Scroll Reveal for all .reveal elements
      const revealElements = gsap.utils.toArray<HTMLElement>('.reveal');
      revealElements.forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 1.5 Generic Scroll Parallax
      const parallaxElements = gsap.utils.toArray<HTMLElement>('[data-parallax]');
      parallaxElements.forEach((elem) => {
        const speed = elem.getAttribute('data-speed') || '0.1';
        gsap.fromTo(
          elem,
          { y: 0 },
          {
            y: () => `${-100 * parseFloat(speed)}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: elem,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // 1.8 Section Heading Horizontal Scrub
      const sectionHeadings = gsap.utils.toArray<HTMLElement>('.section-heading h2');
      sectionHeadings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { x: -60 },
          {
            x: 0,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top bottom',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      });

      // Scroll Progress Bar
      gsap.to('.scroll-progress-bar', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });

      const onPointerMove = (event: PointerEvent) => {
        root.style.setProperty('--pointer-x', `${event.clientX}px`);
        root.style.setProperty('--pointer-y', `${event.clientY}px`);
      };
      window.addEventListener('pointermove', onPointerMove);

      // 2. Parallax for portrait using ScrollTrigger
      const portrait = root.querySelector<HTMLElement>('[data-portrait]');
      if (portrait && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to(portrait, {
          '--portrait-scroll': '42px',
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // 3. Unique Elegant Entrance for the Portrait
        const portraitFrame = root.querySelector('.portrait-frame');
        const portraitImage = root.querySelector('.portrait-image');

        if (portraitFrame && portraitImage) {
          const tl = gsap.timeline();

          tl.fromTo(
            portrait,
            { opacity: 0, x: 80, rotation: 3 },
            { opacity: 1, x: 0, rotation: 0, duration: 1.6, ease: 'power4.out', delay: 0.2 }
          )
            .fromTo(
              portraitFrame,
              { opacity: 0, y: 40 },
              {
                opacity: 1, y: 0,
                duration: 1.5,
                ease: 'expo.inOut',
              },
              '-=1.2'
            )

        }
      }

      // Magnetic hover effects
      const magneticItems = root.querySelectorAll<HTMLElement>('[data-magnetic]');
      const cleanups: (() => void)[] = [];
      magneticItems.forEach((item) => {
        const move = (event: PointerEvent) => {
          const rect = item.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.2;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.2;
          item.style.transform = `translate(${x}px, ${y}px)`;
        };
        const leave = () => {
          item.style.transform = 'translate(0, 0)';
        };
        item.addEventListener('pointermove', move);
        item.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          item.removeEventListener('pointermove', move);
          item.removeEventListener('pointerleave', leave);
        });
      });

      // Removed portrait lighting and drift response per user request for a completely stable frame

      // ─── PROJECT CARD 3D TILT ───────────────────────────────────────────────
      // Clean, isolated mouse-follow tilt for project cards only.
      // Max rotation: ±7° (subtle, premium). No y-lift. Spotlight tracking via CSS vars.
      const projectCards = root.querySelectorAll<HTMLElement>('.project-card[data-tilt]');
      projectCards.forEach((card) => {
        // Set perspective once — does not interfere with quickTo
        gsap.set(card, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

        const rxTo = gsap.quickTo(card, 'rotationX', { duration: 0.55, ease: 'power3.out' });
        const ryTo = gsap.quickTo(card, 'rotationY', { duration: 0.55, ease: 'power3.out' });

        const onCardMove = (e: PointerEvent) => {
          // Allow mouse on touch laptops; skip pure touch events
          if (e.pointerType === 'touch') return;

          const rect = card.getBoundingClientRect();
          // Normalized 0–1 coordinates inside the card
          const nx = (e.clientX - rect.left) / rect.width;
          const ny = (e.clientY - rect.top) / rect.height;

          // Cursor LEFT (nx→0)  → rotateY negative → card tilts right  ✓
          // Cursor RIGHT (nx→1) → rotateY positive → card tilts left   ✓
          // Cursor TOP (ny→0)   → rotateX positive → card tilts down   ✓
          // Cursor BOTTOM(ny→1) → rotateX negative → card tilts up     ✓
          const ry = (nx - 0.5) * 14;   // ±7°
          const rx = (0.5 - ny) * 14;   // ±7°

          ryTo(ry);
          rxTo(rx);

          // Update spotlight CSS vars for the ::before pseudo-element
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };

        const onCardLeave = (e: PointerEvent) => {
          if (e.pointerType === 'touch') return;
          // Smooth return to neutral — no snap
          rxTo(0);
          ryTo(0);
        };

        card.addEventListener('pointermove', onCardMove);
        card.addEventListener('pointerleave', onCardLeave);
        cleanups.push(() => {
          card.removeEventListener('pointermove', onCardMove);
          card.removeEventListener('pointerleave', onCardLeave);
        });
      });

      // ─── BENTO CARD TILT (unchanged behavior) ───────────────────────────────
      // Bento cards use a shallower feel — retain the original ±8° + subtle y-lift.
      // These do NOT have a spotlight pseudo-element so no --mouse-x/y tracking needed.
      const bentoCards = root.querySelectorAll<HTMLElement>('.bento-card[data-tilt]');
      bentoCards.forEach((item) => {
        gsap.set(item, { transformPerspective: 1000, transformStyle: 'preserve-3d' });

        const xTo = gsap.quickTo(item, 'rotationY', { duration: 0.6, ease: 'power3' });
        const yTo = gsap.quickTo(item, 'rotationX', { duration: 0.6, ease: 'power3' });
        const transYTo = gsap.quickTo(item, 'y', { duration: 0.6, ease: 'power3' });

        const onBentoMove = (e: PointerEvent) => {
          if (e.pointerType === 'touch') return;
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          xTo(((x / rect.width) - 0.5) * 16);
          yTo(((y / rect.height) - 0.5) * -16);
          transYTo(-4);
        };

        const onBentoLeave = (e: PointerEvent) => {
          if (e.pointerType === 'touch') return;
          xTo(0);
          yTo(0);
          transYTo(0);
        };

        item.addEventListener('pointermove', onBentoMove);
        item.addEventListener('pointerleave', onBentoLeave);
        cleanups.push(() => {
          item.removeEventListener('pointermove', onBentoMove);
          item.removeEventListener('pointerleave', onBentoLeave);
        });
      });

      return () => {
        window.removeEventListener('pointermove', onPointerMove);
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: rootRef }
  );

  return (
    <SmoothScroll>
      <CustomCursor />
      <PageTransition>
        <main ref={rootRef} className="site-shell">
          {/* Global Scroll Progress Bar */}
          <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] origin-left scale-x-0 z-[9999] pointer-events-none" />

          {/* Initial Page Load Loader Overlay */}
          <div className="loader-overlay fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--background)]">
            <div className="overflow-hidden">
              <span className="loader-text inline-block translate-y-full font-mono text-xs tracking-[0.3em] text-[var(--cyan)]">
                INITIALIZING EXPERIENCE...
              </span>
            </div>
          </div>

          <div className="pointer-glow" aria-hidden="true" data-parallax="true" data-speed="0.4" />

          {/* Navigation Bar */}
          <header className="nav-wrap">
            <a className="wordmark" href="#top" aria-label="Pranesh Kumar home">
              <span>PRANESH KUMAR</span> R
            </a>
            <nav aria-label="Main navigation">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#journey">Journey</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--cyan)] transition-colors cursor-pointer bg-transparent"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              </button>
              <button
                onClick={() => setShowContactModal(true)}
                className="nav-status cursor-pointer bg-transparent"
                aria-label="Open contact dialog"
              >
                <span /> Available for opportunities
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section id="top" className="hero section-pad">
            <div className="hero-kicker reveal">
              <span className="eyebrow-line" />
              FULL-STACK DEVELOPER · CS ENGINEER
            </div>

            <h1 className="hero-title reveal">
              Building digital
              <br />
              <em className="outline-text">experiences</em>
              <br />
              with intent<span className="dot">.</span>
            </h1>

            <div className="hero-bottom reveal">
              <p className="hero-copy">
                I&apos;m Pranesh — a developer from Coimbatore crafting scalable web applications,
                thoughtful interfaces, and the systems between them.
              </p>
              <div className="flex flex-col gap-8 mt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                  <button
                    className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]"
                    data-magnetic
                    onClick={() => setShowContactModal(true)}
                  >
                    Let&apos;s work together <span>↗</span>
                  </button>
                  <a
                    href="/Pranesh-Kumar-Resume.pdf"
                    download="Pranesh-Kumar-Resume.pdf"
                    className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]"
                    data-magnetic
                  >
                    Download Resume <span className="flex items-center"><Download size={18} /></span>
                  </a>
                </div>
                <div className="flex lg:hidden flex-wrap items-center gap-5 sm:gap-8">
                  <a href="https://github.com/PraneshKumar20" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                    Github <span>↗</span>
                  </a>
                  <a href="https://www.linkedin.com/in/raju-pranesh-kumar" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                    LinkedIn <span>↗</span>
                  </a>
                  <a href="https://leetcode.com/u/praneshkumar20/" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                    LeetCode <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Portrait Stage */}
            <div
              className="portrait-stage"
              data-portrait
              aria-label="Interactive portrait of Pranesh Kumar"
            >
              <div className="orbital-ring" aria-hidden="true">
                <div className="orbital-dot"></div>
              </div>
              <div className="portrait-frame" data-portrait-frame>
                <div className="portrait-frame-inner">
                  <PortraitVisual />
                  <div className="portrait-glass" aria-hidden="true" />
                  <div className="portrait-glare" aria-hidden="true" />
                  <div className="portrait-info-glass">
                    <span className="portrait-caption">PRANESH / 01</span>
                    <span className="portrait-note">MOVE TO DECODE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links under profile image (Desktop only) */}
            <div className="absolute hidden lg:flex justify-center items-center gap-6 z-20 w-[min(32vw,370px)] right-[2%] top-[calc(max(10%,15vh)+min(65vh,600px)+24px)]">
              <a href="https://github.com/PraneshKumar20" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                Github <span>↗</span>
              </a>
              <a href="https://www.linkedin.com/in/raju-pranesh-kumar" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                LinkedIn <span>↗</span>
              </a>
              <a href="https://leetcode.com/u/praneshkumar20/" target="_blank" rel="noreferrer" className="magnetic cta bg-transparent border-0 border-b border-[var(--cyan)]" data-magnetic>
                LeetCode <span>↗</span>
              </a>
            </div>

            <div className="hero-meta">
              <span>11° 00&apos; N, 76° 57&apos; E</span>
              <span>
                SCROLL TO EXPLORE <b>↓</b>
              </span>
            </div>
          </section>

          {/* Selected Work Section */}
          <section id="work" className="work section-pad">
            <div className="section-heading reveal">
              <div>
                <span className="section-index">01 /</span>
                <h2>
                  Selected
                  <br />
                  <em>work</em>
                </h2>
              </div>
              <p>
                A small selection of things I&apos;ve designed,
                <br />
                engineered, and shipped.
              </p>
            </div>

            <div className="project-list">
              {projects.map((project) => (
                <div className="reveal project-card-wrapper" key={project.title}>
                  <article
                    className={`project-card ${project.visual}-card group`}
                    data-tilt
                    onClick={() => setActiveProject(project)}
                  >
                  <div className={`project-visual ${project.visual}`}>
                    {project.image ? (
                      <img
                        className="project-image"
                        src={project.image}
                        alt={`${project.title} project interface`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <>
                        <div className="visual-noise" />
                        <div className="visual-window">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="visual-mark">
                          {project.visual === 'hairloon' ? 'H' : '₹'}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="project-info">
                    <div className="project-topline">
                      <span>
                        {project.number} — {project.type}
                      </span>
                      <div className="relative flex flex-col items-center">
                        <div className="project-arrow-wrap" aria-hidden="true">
                          <span className="project-arrow">↗</span>
                        </div>
                        <span className="absolute top-[100%] mt-1 text-[9px] font-mono text-[var(--cyan)] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300">Click</span>
                      </div>
                    </div>

                    <div className="project-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>

                    <div className="tag-row">
                      {project.stack.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  </article>
                </div>
              ))}
            </div>
          </section>

          {/* About & Bento Grid Section */}
          <section id="about" className="about section-pad">
            <div className="section-heading reveal">
              <div>
                <span className="section-index">02 /</span>
                <h2>
                  More than
                  <br />
                  <em>code</em>
                </h2>
              </div>
              <p>Curiosity is my strongest technical skill.</p>
            </div>

            <div className="bento-grid">
              <div className="bento-card intro-card reveal" data-tilt>
                <span className="card-label">A LITTLE ABOUT ME</span>
                <p>
                  I care about the details that make software feel effortless. From a secure API to
                  a single well-placed transition, I like building work that is useful, clear, and
                  quietly memorable.
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="text-link bg-transparent border-0 cursor-pointer text-left p-0"
                >
                  Get to know me <span>↗</span>
                </button>
              </div>

              <div
                className="bento-card stat-card reveal cursor-pointer group"
                data-tilt
                onClick={() => setShowLeetCodeModal(true)}
                title="Click to view DSA problem breakdown"
              >
                <span className="card-label flex items-center justify-between">
                  <span>PROBLEM SOLVING</span>
                  <span className="text-[var(--cyan)] text-[9px] group-hover:underline">EXPLORE ↗</span>
                </span>
                <strong>
                  300<span>+</span>
                </strong>
                <p>
                  DSA problems solved
                  <br />
                  on LeetCode
                </p>
              </div>

              <div className="bento-card location-card reveal" data-tilt>
                <span className="card-label">CURRENTLY IN</span>
                <strong>
                  Coimbatore
                  <br />
                  <i>India</i>
                </strong>
                <span className="coordinates">11.0168° N / 76.9558° E</span>
              </div>

              <div className="bento-card skills-card reveal" data-tilt>
                <span className="card-label">THE TOOLKIT</span>
                <div className="skill-cloud">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Journey & Timeline Section */}
          <section id="journey" className="journey section-pad">
            <div className="section-heading reveal">
              <div>
                <span className="section-index">03 /</span>
                <h2>
                  The
                  <br />
                  <em>journey</em>
                </h2>
              </div>
              <p>Learning in public. Shipping with purpose.</p>
            </div>

            <div className="journey-grid">
              {/* Left Column: 3D Object placed directly on the page */}
              <div className="journey-3d-stage reveal" aria-hidden="true">
                <ThreeHero />
              </div>

              {/* Right Column: Milestone Timeline */}
              <div className="timeline">
                <div className="timeline-item reveal">
                  <span className="timeline-date">2026 — PRESENT</span>
                  <div>
                    <h3>Bachelor of Engineering</h3>
                    <p>
                      Computer Science & Engineering · V.S.B College of Engineering Technical Campus
                    </p>
                    <small>CGPA 7.52 / 10 · Focus on Algorithms, Systems & Web Architecture</small>
                  </div>
                </div>

                <div className="timeline-item reveal">
                  <span className="timeline-date">MAY — AUG 2025</span>
                  <div>
                    <h3>Full Stack Developer Intern</h3>
                    <p>
                      Grow Your Skills · Built 5+ responsive web applications and shipped front-end
                      features 10% ahead of schedule.
                    </p>
                    <small>React.js · Node.js · REST Integrations · Performance Optimization</small>
                  </div>
                </div>

                <div className="timeline-item reveal">
                  <span className="timeline-date">MAY — JUN 2026</span>
                  <div>
                    <h3>ServiceNow University</h3>
                    <p>
                      Virtual Internship Program · Administration, ITSM, automated workflows, and
                      Agentic AI architectures.
                    </p>
                    <small>Certified Workflow Automation & Cloud ITSM</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 reveal">
              <div className="section-heading mb-12">
                <div>
                  <h2>
                    Certifications
                    <br />
                    <em>& Achievements</em>
                  </h2>
                </div>
                <p>Professional credentials and milestones.</p>
              </div>

              <div className="flex flex-col gap-0 border-t border-[var(--border)]">
                {credentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="cert-card flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-[var(--border)] cursor-pointer group hover:bg-[var(--card)] px-4 -mx-4 transition-colors"
                    onClick={() => {
                      if (cred.action === 'leetcode') {
                        setShowLeetCodeModal(true);
                      } else if (cred.image) {
                        setActiveCertificate({
                          name: cred.name,
                          issuer: cred.issuer,
                          image: cred.image,
                        });
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      {cred.image && (
                        <div className="w-full sm:w-40 h-48 sm:h-28 shrink-0 rounded-md overflow-hidden bg-[var(--background)] border border-[var(--border)] relative flex items-center justify-center p-1">
                          <img
                            src={cred.image}
                            alt={cred.name}
                            className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-[var(--cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"></div>
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl md:text-2xl font-medium group-hover:text-[var(--cyan)] transition-colors mb-1">
                          {cred.name}
                        </h3>
                        <span className="font-mono text-xs text-[var(--muted-foreground)]">
                          {cred.date} · {cred.issuer} · {cred.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center justify-between transition-all">
                      <span className="md:hidden font-mono text-xs opacity-50 group-hover:opacity-100 group-hover:text-[var(--cyan)] transition-all">VIEW ↗</span>
                      <div className="relative hidden md:flex flex-col items-center">
                        <div className="project-arrow-wrap">
                          <ArrowUpRight className="project-arrow" size={18} />
                        </div>
                        <span className="absolute top-[100%] mt-1 text-[9px] font-mono text-[var(--cyan)] uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity duration-300">Click</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer & Contact Section */}
          <footer id="contact" className="footer section-pad reveal">
            <div
              className="footer-orbit cursor-pointer"
              aria-hidden="true"
              onClick={() => setShowContactModal(true)}
            >
              ↗
            </div>
            <span className="section-index">04 / CONTACT</span>
            <h2>
              Have a good
              <br />
              <em>idea?</em>
            </h2>
            <p>Let&apos;s turn it into something real.</p>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                className="email-link"
                href="mailto:raju.praneshkumar@gmail.com"
                onClick={(e) => {
                  // If on desktop, trigger modal or direct
                }}
              >
                raju.praneshkumar@gmail.com <span>↗</span>
              </a>

              <div className="flex gap-4 items-center mt-14">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2 border border-[var(--border)] hover:border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--cyan)] rounded flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} className="text-[var(--cyan)]" /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
                </button>
                <button
                  onClick={handleAppreciation}
                  className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--border)] text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--cyan)] rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Show Appreciation"
                >
                  <Heart size={14} className="text-[var(--cyan)]" />
                  <span>Show Appreciation</span>
                </button>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© 2026 PRANESH KUMAR R.</span>
              <div>
                <a
                  href="https://github.com/PraneshKumar20"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--cyan)]"
                >
                  GITHUB
                </a>
                <a
                  href="https://www.linkedin.com/in/raju-pranesh-kumar"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--cyan)]"
                >
                  LINKEDIN
                </a>
                <a
                  href="https://leetcode.com/u/praneshkumar20/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--cyan)]"
                >
                  LEETCODE
                </a>
              </div>
              <span>BUILT WITH INTENT</span>
            </div>
          </footer>

          {/* Modals & Dialogs */}
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
          <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
          <LeetCodeModal
            isOpen={showLeetCodeModal}
            onClose={() => setShowLeetCodeModal(false)}
          />
          <ContactModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            onShowToast={showToast}
          />

          {/* Toast Notification */}
          {toastMessage && (
            <div className="toast-notice">
              <Sparkles size={16} className="text-[var(--cyan)]" />
              <span>{toastMessage}</span>
            </div>
          )}
        </main>
      </PageTransition>
    </SmoothScroll>
  );
}
