import { useState } from "react";
import { z } from "zod";
import { Download, ExternalLink, Github, Linkedin, Mail, Send } from "lucide-react";
import { portfolio, displayName } from "@/lib/portfolio";
import { Placeholder, Reveal, SectionHeading } from "@/components/ui/Primitives";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please add your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Please add a message").max(1000),
});

function ResumeBlock() {
  const { resume } = portfolio;
  return (
    <Reveal className="glass rounded-3xl p-8 md:p-12">
      <h3 className="font-display text-3xl font-bold text-balance md:text-4xl">{resume.heading}</h3>
      <p className="mt-4 max-w-xl text-muted-foreground">{resume.body}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {resume.url ? (
          <>
            <a
              href={resume.url}
              download
              data-magnetic
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
            >
              <Download size={18} /> Download Resume
            </a>
            <a
              href={resume.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-6 py-3 font-medium"
            >
              <ExternalLink size={18} /> View Resume
            </a>
          </>
        ) : (
          <Placeholder label="upload a resume PDF and set resume.url in portfolio.ts" />
        )}
      </div>
    </Reveal>
  );
}

export function Contact() {
  const { contact } = portfolio;
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    if (!contact.email) {
      toast.error("No contact email is configured yet.");
      return;
    }
    const body = `${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Portfolio enquiry from ${parsed.data.name}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const links = [
    { icon: Mail, label: "Email", href: contact.email ? `mailto:${contact.email}` : null },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin },
    { icon: Github, label: "GitHub", href: contact.github },
    { icon: Download, label: "Resume", href: portfolio.resume.url },
  ];

  return (
    <section id="contact" className="relative">
      <div className="section-shell">
        <ResumeBlock />

        <div className="mt-20">
          <SectionHeading num="07" label="CONTACT" title={contact.heading} lead={contact.body} />
        </div>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ul className="space-y-3">
              {links.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer noopener"
                      className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon size={18} /> {label}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-muted-foreground">
                      <Icon size={18} />
                      <span className="text-sm">{label}</span>
                      <Placeholder label="not added" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8">
              <div className="grid gap-4">
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    NAME
                  </span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    EMAIL
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
                    MESSAGE
                  </span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={1000}
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                    placeholder={`Hi ${displayName}, ...`}
                  />
                </label>
              </div>

              <button
                type="submit"
                data-magnetic
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Send Message <Send size={16} />
              </button>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                Opens your email client — nothing is stored.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
