import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SectionId } from "@/lib/portfolio";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ONE continuous WebGL world for the whole page. Section changes morph the
 * central form and particle behaviour rather than mounting new scenes.
 * Purpose: navigational continuity — the world tells you where you are.
 */

type SceneProps = { section: SectionId };

const SECTION_CONFIG: Record<
  SectionId,
  { geometry: number; spin: number; spread: number; hue: number }
> = {
  home: { geometry: 0, spin: 0.16, spread: 1, hue: 0.5 },
  about: { geometry: 1, spin: 0.1, spread: 0.85, hue: 0.48 },
  skills: { geometry: 2, spin: 0.22, spread: 1.15, hue: 0.52 },
  projects: { geometry: 3, spin: 0.12, spread: 0.95, hue: 0.11 },
  experience: { geometry: 4, spin: 0.08, spread: 0.8, hue: 0.55 },
  dsa: { geometry: 5, spin: 0.2, spread: 1.05, hue: 0.45 },
  achievements: { geometry: 6, spin: 0.14, spread: 1.1, hue: 0.13 },
  contact: { geometry: 7, spin: 0.06, spread: 0.7, hue: 0.5 },
};

function ParticleField({ count, spread }: { count: number; spread: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const target = spread;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.03);
    if (reduced) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.06) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        color="#7fe7e0"
        depthWrite={false}
      />
    </points>
  );
}

const GEOMETRIES = [
  new THREE.IcosahedronGeometry(2.1, 1),
  new THREE.OctahedronGeometry(2.1, 1),
  new THREE.TorusKnotGeometry(1.4, 0.36, 90, 12),
  new THREE.DodecahedronGeometry(2.1, 0),
  new THREE.CylinderGeometry(0.5, 1.7, 3.2, 10, 4),
  new THREE.TorusGeometry(1.8, 0.5, 8, 24),
  new THREE.BoxGeometry(2.6, 2.6, 2.6, 3, 3, 3),
  new THREE.SphereGeometry(2, 24, 16),
];

function CoreForm({ section }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();
  const { viewport } = useThree();
  const cfg = SECTION_CONFIG[section];

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        transparent: true,
        opacity: 0.42,
        color: new THREE.Color().setHSL(cfg.hue, 0.7, 0.6),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;

    // Cursor parallax — position only, so it never competes with the copy.
    const px = (state.pointer.x * viewport.width) / 28;
    const py = (state.pointer.y * viewport.height) / 28;
    group.current.position.x += (px - group.current.position.x) * 0.04;
    group.current.position.y += (py - group.current.position.y) * 0.04;

    const target = new THREE.Color().setHSL(cfg.hue, 0.7, 0.6);
    material.color.lerp(target, 0.04);

    if (reduced) return;
    mesh.current.rotation.y += delta * cfg.spin;
    mesh.current.rotation.x += delta * cfg.spin * 0.35;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={GEOMETRIES[cfg.geometry]} material={material} />
    </group>
  );
}

export default function WorldScene({ section }: SceneProps) {
  const { particles, dpr } = useDeviceTier();

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <ParticleField count={particles} spread={SECTION_CONFIG[section].spread} />
      <CoreForm section={section} />
    </Canvas>
  );
}
