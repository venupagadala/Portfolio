import { useEffect, useRef } from "react";

// Cards that get a cursor-tracking spotlight on hover.
const SPOT_SELECTOR =
  ".xp-card, .skill-card, .impact-strip .impact, .edu-card, .featured__card, .repo-card";

/**
 * A soft colour glow that trails the mouse, plus a spotlight inside hovered
 * cards. Mouse-only (no touch) and off when the user prefers reduced motion.
 * One passive pointer listener and one rAF loop; positions are written as
 * transforms and CSS variables, so React never re-renders.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let running = false;

    const tick = () => {
      // Ease toward the pointer so the glow trails behind it.
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = "1";
      if (!running) {
        running = true;
        frame = requestAnimationFrame(tick);
      }

      const card = (e.target as Element | null)?.closest?.(SPOT_SELECTOR) as HTMLElement | null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
