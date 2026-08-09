import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { WorldCanvas } from "@/components/3d/WorldCanvas";
import { Nav } from "@/components/ui/Nav";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Dsa } from "@/components/sections/Dsa";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { useActiveSection } from "@/hooks/useActiveSection";
import { displayName, portfolio } from "@/lib/portfolio";

const title = `${displayName} — CSE Student & Software Engineer`;
const description = portfolio.hero.intro;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const active = useActiveSection();

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <WorldCanvas section={active} />
      <Nav active={active} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Dsa />
        <Achievements />
        <Contact />
      </main>

      <Footer />
      <Toaster theme="dark" position="bottom-right" />
    </>
  );
}
