import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SECTIONS, displayInitials, type SectionId } from "@/lib/portfolio";
import { scrollToSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export function Nav({ active }: { active: SectionId }) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: SectionId) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "glass flex w-full max-w-5xl items-center justify-between rounded-full transition-all duration-300",
          compact ? "px-4 py-2" : "px-5 py-3",
        )}
      >
        <button
          onClick={() => go("home")}
          className="font-display text-sm font-bold tracking-[0.2em] text-primary"
          aria-label="Back to top"
        >
          {displayInitials}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] transition-colors",
                  active === s.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <div className="glass absolute inset-x-4 top-20 rounded-2xl p-3 md:hidden">
          <ul className="flex flex-col">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => go(s.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                    active === s.id ? "bg-primary/10 text-primary" : "text-foreground",
                  )}
                >
                  <span className="font-mono text-[11px] text-muted-foreground">{s.num}</span>
                  <span className="font-display text-base">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
