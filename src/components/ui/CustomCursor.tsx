import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Glowing core + trailing ring. Removed entirely on touch devices —
 * there is no cursor there to replace.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("hide-cursor");

    const onMove = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest("a,button,[role='button'],input,textarea,[data-magnetic]");
      setHovering(Boolean(interactive));

      // Magnetic pull toward primary CTAs.
      const magnet = el?.closest<HTMLElement>("[data-magnetic]");
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        x.set(e.clientX + (cx - e.clientX) * 0.35);
        y.set(e.clientY + (cy - e.clientY) * 0.35);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("hide-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]"
      />
      <motion.div
        style={{ x: reduced ? x : ringX, y: reduced ? y : ringY }}
        animate={{ scale: hovering ? 1.7 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.18 }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-primary"
      />
    </div>
  );
}
