import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Center the cursor elements on their transform origins
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    // GSAP quickTo for highly performant tracking
    const xToCursor = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power3.out' });
    const yToCursor = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power3.out' });

    const xToFollower = gsap.quickTo(follower, 'x', { duration: 0.5, ease: 'power3.out' });
    const yToFollower = gsap.quickTo(follower, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      // Reveal cursors on first mouse move
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover logic for snapping/scaling on interactive elements
    const handleHoverElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-tilt], [data-magnetic], input, textarea, .project-card, .bento-card'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    handleHoverElements();
    
    // Observe DOM changes to re-attach hover events
    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor ${isHovered ? 'hovered' : ''}`} />
      <div ref={followerRef} className={`custom-cursor-follower ${isHovered ? 'hovered' : ''}`} />
    </>
  );
}
