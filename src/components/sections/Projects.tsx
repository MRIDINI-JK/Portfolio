import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { portfolio, type Project } from "@/lib/portfolio";
import { Placeholder, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function Links({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-foreground hover:text-primary"
        >
          <Github size={16} /> Code
        </a>
      ) : (
        <Placeholder label="GitHub link missing" />
      )}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer noopener"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex min-h-11 items-center gap-1.5 text-sm text-foreground hover:text-primary"
        >
          <ArrowUpRight size={16} /> Live demo
        </a>
      ) : (
        <Placeholder label="demo link missing" />
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ transformPerspective: 900 }}
      className="card-glow group relative flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold md:text-3xl">{project.name}</h3>
        <span className="font-mono text-[10px] tracking-[0.2em] text-primary">FEATURED</span>
      </div>
      <p className="mt-3 text-sm text-primary/90">{project.problem}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <Links project={project} />
        <button
          onClick={onOpen}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary/12 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          Case study <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const blocks: Array<[string, React.ReactNode]> = [
    ["Problem", project.problem],
    ["Solution", project.description],
    [
      "Architecture",
      <ol className="space-y-3">
        {project.architecture.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>,
    ],
    ["Technology", project.stack.join(" · ")],
    [
      "Implementation",
      <ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>,
    ],
    ["Challenges", project.challenges],
    ["Results", project.results ?? <Placeholder label="results not recorded yet" />],
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[110] overflow-y-auto bg-background/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8">
        <button
          onClick={onClose}
          className="glass fixed right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full"
          aria-label="Close case study"
        >
          <X size={18} />
        </button>

        <h3 className="font-display text-4xl font-bold md:text-6xl">{project.name}</h3>
        <div className="mt-6">
          <Links project={project} />
        </div>

        <div className="mt-12 space-y-10">
          {blocks.map(([title, body]) => (
            <section key={title}>
              <p className="font-mono text-[11px] tracking-[0.25em] text-primary">
                {title.toUpperCase()}
              </p>
              <div className="mt-3 text-base leading-relaxed text-foreground/85">{body}</div>
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const featured = portfolio.projects.filter((p) => p.featured);
  const others = portfolio.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative">
      <div className="section-shell">
        <SectionHeading
          num="03"
          label="PROJECTS"
          title="Things I built end to end."
          lead="Four lead projects, each with a full case study. Links appear once the repos are added to the config."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05} className="h-full">
              <ProjectCard project={p} onOpen={() => setOpen(p)} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
            MORE PROJECTS
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {others.map((p) => (
              <button
                key={p.id}
                onClick={() => setOpen(p)}
                className="rounded-xl border border-border bg-surface/40 p-5 text-left transition-colors hover:border-primary/40"
              >
                <p className="font-display text-lg font-semibold">{p.name}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.problem}</p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  {p.stack.join(" · ")}
                </p>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? <CaseStudy project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
