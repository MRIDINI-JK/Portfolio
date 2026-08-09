import { useState } from "react";
import { portfolio, type Skill } from "@/lib/portfolio";
import { Reveal, SectionHeading } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";

export function Skills() {
  const groups = portfolio.skillGroups;
  const [activeGroup, setActiveGroup] = useState(groups[0]!.id);
  const [selected, setSelected] = useState<Skill | null>(null);

  const group = groups.find((g) => g.id === activeGroup) ?? groups[0]!;

  return (
    <section id="skills" className="relative">
      <div className="section-shell">
        <SectionHeading
          num="02"
          label="SKILLS"
          title="Skill constellation."
          lead="Grouped by layer of the stack. Levels are qualitative — no invented percentages."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Skill groups">
            {groups.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={activeGroup === g.id}
                onClick={() => {
                  setActiveGroup(g.id);
                  setSelected(null);
                }}
                className={cn(
                  "min-h-11 rounded-full border px-4 py-2 font-mono text-xs tracking-[0.12em] transition-colors",
                  activeGroup === g.id
                    ? "border-primary/50 bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {g.label.toUpperCase()}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <button
                    onClick={() => setSelected(skill)}
                    onMouseEnter={() => setSelected(skill)}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-xl border border-border bg-surface/50 px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40",
                      selected?.name === skill.name && "border-primary/50 bg-primary/8",
                    )}
                  >
                    <span className="font-display text-base">{skill.name}</span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      {skill.level.toUpperCase()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="glass sticky top-28 rounded-2xl p-6">
              {selected ? (
                <>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-primary">
                    {selected.level.toUpperCase()}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold">{selected.name}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{selected.note}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a skill to see how it's actually used.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
