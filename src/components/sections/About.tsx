import { portfolio } from "@/lib/portfolio";
import { Placeholder, Reveal, SectionHeading } from "@/components/ui/Primitives";

export function About() {
  const { about } = portfolio;

  return (
    <section id="about" className="relative">
      <div className="section-shell">
        <SectionHeading num="01" label="ABOUT" title="Systems thinker, still in school." />

        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90">{about.intro}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {about.education}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {about.interests}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {about.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm text-foreground/85"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ol className="relative border-l border-border pl-6">
              {about.timeline.map((item, i) => (
                <li key={item.title} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                  {item.year ? (
                    <p className="font-mono text-xs tracking-[0.2em] text-primary">{item.year}</p>
                  ) : (
                    <Placeholder label={`year ${i + 1}`} />
                  )}
                  <p className="mt-2 font-display text-lg font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
