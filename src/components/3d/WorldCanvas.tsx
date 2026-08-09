import { ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState } from "react";
import type { SectionId } from "@/lib/portfolio";

const WorldScene = lazy(() => import("./WorldScene"));

/**
 * Mounts the single WebGL world behind the page, client-side only and
 * after first paint so the content is never blocked by 3D.
 * Degrades to a pure CSS gradient + grid if WebGL is unavailable.
 */
export function WorldCanvas({ section }: { section: SectionId }) {
  const [ready, setReady] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")));
    } catch {
      setSupported(false);
    }
    const id = window.setTimeout(() => setReady(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent_70%)]" />
      {supported && ready ? (
        <ClientOnly fallback={null}>
          <Suspense fallback={null}>
            <WorldScene section={section} />
          </Suspense>
        </ClientOnly>
      ) : null}
    </div>
  );
}
