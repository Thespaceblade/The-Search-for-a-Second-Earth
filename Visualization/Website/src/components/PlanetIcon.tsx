"use client";

import React from "react";

type Props = {
  name: string;
  size?: number;
};

// Small seeded RNG for deterministic pseudo-randomness per planet name
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(name: string) {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) h = (h ^ name.charCodeAt(i)) * 16777619;
  return h >>> 0;
}

export default function PlanetIcon({ name, size = 64 }: Props) {
  const seed = hash(name);
  const rand = mulberry32(seed);
  const hue = Math.floor(rand() * 360);
  const hue2 = (hue + 40 + Math.floor(rand() * 40)) % 360;
  const sat = 60 + Math.floor(rand() * 20);
  const light = 45 + Math.floor(rand() * 10);
  const base = `hsl(${hue}, ${sat}%, ${light}%)`;
  const alt = `hsl(${hue2}, ${sat - 10}%, ${light - 10}%)`;

  // Generate a few crater/spot circles
  const spots = Array.from({ length: 5 + Math.floor(rand() * 5) }).map((_, i) => {
    const r = 6 + Math.floor(rand() * 10);
    const cx = 20 + Math.floor(rand() * 60);
    const cy = 20 + Math.floor(rand() * 60);
    const fill = rand() > 0.5 ? base : alt;
    const opacity = 0.25 + rand() * 0.25;
    return { key: i, r, cx, cy, fill, opacity };
  });

  const id = `grad-${seed.toString(16)}`;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={`${name} icon`}>
      <defs>
        <radialGradient id={id} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="60%" stopColor={base} />
          <stop offset="100%" stopColor={alt} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${id})`} stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      {spots.map((s) => (
        <circle key={s.key} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.opacity} />
      ))}
      {/* Terminator shadow */}
      <ellipse cx="65" cy="55" rx="40" ry="50" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

