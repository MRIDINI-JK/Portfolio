import { portfolio, SKILL_LEVEL_WEIGHT } from "@/lib/portfolio";
import { EmptyState, Placeholder, Reveal, SectionHeading } from "@/components/ui/Primitives";

function Stat({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="rounded-xl border border-border bg-surface/50 p-5">
      <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        {label.toUpperCase()}
      </p>
      <div className="mt-3">
        {value === null ? (
          <Placeholder label="not tracked yet" />
        ) : (
          <span className="font-display text-3xl font-bold text-primary">{value}</span>
        )}
      </div>
    </div>
  );
}

function StrengthBar({ weight }: { weight: number }) {
  return (
    <span className="font-mono text-xs text-primary" aria-hidden="true">
      {"█".repeat(weight * 2)}
      <span className="text-border">{"░".repeat(10 - weight * 2)}</span>
    </span>
  );
}

export function Dsa() {
  const { dsa } = portfolio;

  return (
    <section id="dsa" className="relative">
      <div className="section-shell">
        <SectionHeading
          num="05"
          label="DSA"
          title="Problem solving."
          lead={dsa.currentFocus}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Reveal>
            <Stat label={`${dsa.platform} rating`} value={dsa.rating} />
          </Reveal>
          <Reveal delay={0.05}>
            <Stat label="Problems solved" value={dsa.solved} />
          </Reveal>
          <Reveal delay={0.1}>
            <Stat label="Contests" value={dsa.contests} />
          </Reveal>
        </div>

        <Reveal className="mt-6">
          <div className="rounded-xl border border-border bg-surface/50 p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              HANDLE
            </p>
            <div className="mt-2">
              {dsa.handle ? (
                <span className="font-display text-lg">{dsa.handle}</span>
              ) : (
                <Placeholder label="add your LeetCode / Codeforces handle" />
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
              TOPIC STRENGTH
            </p>
            <ul className="mt-5 space-y-3">
              {dsa.topics.map((t) => (
                <li key={t.name} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-foreground/90">{t.name}</span>
                  <span className="flex items-center gap-3">
                    <StrengthBar weight={SKILL_LEVEL_WEIGHT[t.level]} />
                    <span className="w-36 text-right font-mono text-[11px] text-muted-foreground">
                      {t.level}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
              ACTIVITY HEATMAP
            </p>
            <div className="mt-5">
              <EmptyState
                title="No activity feed connected"
                hint="Connect a LeetCode / GitHub handle in portfolio.ts to render real activity. Nothing is simulated here."
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
