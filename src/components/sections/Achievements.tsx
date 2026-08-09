import { portfolio } from "@/lib/portfolio";
import { EmptyState, Reveal, SectionHeading } from "@/components/ui/Primitives";

export function Achievements() {
  const { achievements, github } = portfolio;

  return (
    <section id="achievements" className="relative">
      <div className="section-shell">
        <SectionHeading
          num="06"
          label="ACHIEVEMENTS"
          title="Proof of work."
          lead="Hackathons, contests, certifications, academics, research and open source."
        />

        <Reveal>
          <ul className="flex flex-wrap gap-2">
            {achievements.categories.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground"
              >
                {c.toUpperCase()}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8">
          {achievements.items.length === 0 ? (
            <Reveal>
              <EmptyState
                title="No achievements added yet"
                hint="Add real entries to portfolio.achievements.items — placeholders stay until then."
              />
            </Reveal>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.04}>
                  <article className="card-glow h-full rounded-2xl border border-border bg-surface/60 p-6 transition-transform hover:-translate-y-1">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-primary">
                      {item.category.toUpperCase()}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-4 font-mono text-[11px] text-muted-foreground">{item.date}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-3 inline-block text-sm text-primary hover:underline"
                      >
                        View →
                      </a>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <Reveal className="mt-12">
          <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
            GITHUB ACTIVITY
          </p>
          <div className="mt-5">
            {github.username ? (
              <a
                href={`https://github.com/${github.username}`}
                target="_blank"
                rel="noreferrer noopener"
                className="glass inline-flex min-h-11 items-center gap-2 rounded-xl px-5 py-3 text-sm hover:text-primary"
              >
                @{github.username} on GitHub →
              </a>
            ) : (
              <EmptyState
                title="GitHub not connected"
                hint="Add a username to portfolio.github to link live activity. No mocked feed is shown."
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
