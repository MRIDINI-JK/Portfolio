import { useEffect, useState } from "react";

export type DeviceTier = "low" | "mid" | "high";

export type DeviceProfile = {
  tier: DeviceTier;
  touch: boolean;
  /** Particle budget for the 3D scene. */
  particles: number;
  dpr: [number, number];
};

const DEFAULT: DeviceProfile = { tier: "mid", touch: false, particles: 1200, dpr: [1, 1.5] };

/**
 * Single mechanism for scaling 3D cost. Sections must not re-implement this.
 */
export function useDeviceTier(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    const narrow = window.innerWidth < 768;

    let tier: DeviceTier = "high";
    if (cores <= 4 || narrow) tier = "mid";
    if (cores <= 2 || (touch && narrow && cores <= 4)) tier = "low";

    const particles = tier === "high" ? 2200 : tier === "mid" ? 1100 : 450;
    const dpr: [number, number] = tier === "high" ? [1, 2] : tier === "mid" ? [1, 1.5] : [1, 1];

    setProfile({ tier, touch, particles, dpr });
  }, []);

  return profile;
}
