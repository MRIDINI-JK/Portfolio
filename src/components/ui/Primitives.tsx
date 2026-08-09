import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** Entrance reveal — purpose: hierarchy, guides the eye to what matters first. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: _as,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: never;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  num,
  label,
  title,
  lead,
}: {
  num: string;
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="font-mono text-xs tracking-[0.3em] text-primary">
        {num} — {label}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance md:text-6xl">
        {title}
      </h2>
      {lead ? <p className="mt-5 text-base text-muted-foreground md:text-lg">{lead}</p> : null}
    </Reveal>
  );
}

/** Honest empty state — never a fabricated value. */
export function Placeholder({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-8 text-center">
      <p className="font-display text-lg text-foreground">{title}</p>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
