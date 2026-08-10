import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { portfolio, displayName } from "@/lib/portfolio";
import { scrollToSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Placeholder } from "@/components/ui/Primitives";

function RoleLine() {
  const roles = portfolio.hero.roles;
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => window.clearInterval(id);
  }, [reduced, roles.length]);

  if (reduced) {
    return <span className="text-primary">{roles.join(" • ")}</span>;
  }

  return (
    <span className="text-primary" aria-live="off">
      {roles[i]}
    </span>
  );
}

export function Hero() {
  const { hero, identity, resume } = portfolio;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center noise">
      <div className="section-shell pt-32 md:pt-40">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {identity.status.toUpperCase()}
          </p>

          <p className="mt-8 font-mono text-sm tracking-[0.2em] text-muted-foreground">
            {hero.greeting}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] font-bold tracking-tight text-balance md:text-7xl">
            {displayName}
            {identity.name === null ? (
              <Placeholder label="add your name" className="ml-3 align-middle" />
            ) : null}
          </h1>

          <p className="mt-6 max-w-2xl font-display text-xl leading-snug text-foreground/90 text-balance md:text-3xl">
            {hero.headline}
          </p>

          <p className="mt-5 font-mono text-sm tracking-wide md:text-base">
            <RoleLine />
          </p>

          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">{hero.intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              data-magnetic
              onClick={() => scrollToSection("projects")}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Explore My Work <ArrowRight size={18} />
            </button>

            {resume.url ? (
              <a
                href={"https://drive.google.com/file/d/1eU9ixOfO_KYObCPKfL5TdutfhAubNueK/view?usp=sharing"}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-surface"
              >
                <Download size={18} /> Download Resume
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-dashed border-border px-6 py-3 font-mono text-xs text-muted-foreground">
                <Download size={16} /> Resume not uploaded yet
              </span>
            )}

            <button
              onClick={() => scrollToSection("contact")}
              className="min-h-11 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Let's Connect
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("about")}
          className="mt-20 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
        >
          {hero.scrollCue.toUpperCase()} <ArrowDown size={14} className="animate-float" />
        </button>
      </div>
    </section>
  );
}
