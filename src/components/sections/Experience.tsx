import { portfolio } from "@/lib/portfolio";
import { EmptyState, Reveal, SectionHeading } from "@/components/ui/Primitives";

export function Experience() {
  const items = portfolio.experience;

  return (
    <section id="experience" className="relative">
      <div className="section-shell">
        <SectionHeading
          num="04"
          label="EXPERIENCE"
          title="Where I've worked."
          lead="Internships, roles and structured programmes."
        />

        {items.length === 0 ? (
          <Reveal>
            <EmptyState
              title="No experience entries added yet"
              hint="Add internships or roles to portfolio.experience — nothing is invented here."
            />
          </Reveal>
        ) : (
          <ol className="relative border-l border-border pl-6 md:pl-10">
            {items.map((item, i) => (
              <Reveal key={`${item.org}-${item.role}`} delay={i * 0.05}>
                <li className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] md:-left-[47px]" />
                  <p className="font-mono text-xs tracking-[0.2em] text-primary">{item.duration}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{item.role}</h3>
                  <p className="text-sm text-muted-foreground">{item.org}</p>

                  <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                    {item.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>

                  {item.achievements.length > 0 ? (
                    <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
                      {item.achievements.map((a) => (
                        <li key={a}>↗ {a}</li>
                      ))}
                    </ul>
                  ) : null}

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
