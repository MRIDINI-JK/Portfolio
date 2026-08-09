import { portfolio, displayName } from "@/lib/portfolio";
import { Placeholder } from "@/components/ui/Primitives";

export function Footer() {
  const { footer, contact, resume } = portfolio;

  const links = [
    { label: "GitHub", href: contact.github },
    { label: "LinkedIn", href: contact.linkedin },
    { label: "Email", href: contact.email ? `mailto:${contact.email}` : null },
    { label: "Resume", href: resume.url },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[78rem] flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg font-semibold">{displayName}</p>
          <p className="mt-1 text-sm text-muted-foreground">{footer.tagline}</p>
        </div>

        <ul className="flex flex-wrap items-center gap-4">
          {links.map((l) =>
            l.href ? (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <Placeholder label={l.label.toLowerCase()} />
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="mx-auto max-w-[78rem] px-5 pb-10 md:px-8">
        <p className="font-mono text-[11px] text-muted-foreground">
          © {footer.year} {displayName}. {footer.credit}.
        </p>
      </div>
    </footer>
  );
}
