import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { displayInitials } from "@/lib/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Never blocks longer than ~1.6s; 3D loads progressively behind it. */
export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / 1500, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setDone(true), 280);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          role="status"
          aria-live="polite"
        >
          <span className="font-display text-5xl font-bold tracking-[0.25em] text-primary text-glow">
            {displayInitials}
          </span>
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground">
            {progress < 1 ? "Initializing portfolio..." : "System ready."}
          </p>
          <div className="mt-4 h-px w-52 overflow-hidden bg-border">
            <div
              className="h-full bg-primary transition-[width] duration-100"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
