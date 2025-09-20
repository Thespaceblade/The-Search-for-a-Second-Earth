"use client";
import { useEffect, useMemo, useRef, useState } from 'react';

export type Ranges = { aMin: number; aMax: number; fluxMin: number; fluxMax: number };

export type ControlsValue = {
  hzOnly: boolean;
  a: [number, number];
  flux: [number, number];
  q: string;
};

export default function Controls({
  ranges,
  value,
  onChange,
}: {
  ranges: Ranges;
  value: ControlsValue;
  onChange: (v: ControlsValue) => void;
}) {
  const [local, setLocal] = useState<ControlsValue>(value);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // keep local in sync when parent changes (initialization)
  useEffect(() => {
    setLocal(value);
  }, [value.a[0], value.a[1], value.flux[0], value.flux[1], value.hzOnly]);

  const debouncedEmit = (next: ControlsValue) => {
    if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => onChange(next), 200);
  };

  const aMinDisp = useMemo(() => Math.min(ranges.aMin, ranges.aMax), [ranges]);
  const aMaxDisp = useMemo(() => Math.max(ranges.aMin, ranges.aMax), [ranges]);
  const fMinDisp = useMemo(() => Math.min(ranges.fluxMin, ranges.fluxMax), [ranges]);
  const fMaxDisp = useMemo(() => Math.max(ranges.fluxMin, ranges.fluxMax), [ranges]);

  return (
    <section className="controls" aria-label="Filters">
      <div className="row">
        <label>
          <input
            type="checkbox"
            checked={local.hzOnly}
            onChange={(e) => {
              const next = { ...local, hzOnly: e.target.checked };
              setLocal(next);
              debouncedEmit(next);
            }}
          />{' '}
          Only show habitable zone (0.36–1.11 flux)
        </label>
      </div>

      <div className="row">
        <label>Search by planet name</label>
        <input
          type="text"
          placeholder="e.g. Kepler-452 b"
          value={local.q}
          onChange={(e) => {
            const next = { ...local, q: e.target.value };
            setLocal(next);
            debouncedEmit(next);
          }}
        />
      </div>

      <div className="row">
        <label>
          Semi-major axis range (AU)
          <div className="hint">{local.a[0].toFixed(2)} – {local.a[1].toFixed(2)} (data: {aMinDisp.toFixed(2)} – {aMaxDisp.toFixed(2)})</div>
        </label>
        <div className="row inline">
          <input
            type="range"
            min={aMinDisp}
            max={aMaxDisp}
            step="0.01"
            value={local.a[0]}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), local.a[1]);
              const next = { ...local, a: [v, local.a[1]] as [number, number] };
              setLocal(next);
              debouncedEmit(next);
            }}
          />
          <input
            type="range"
            min={aMinDisp}
            max={aMaxDisp}
            step="0.01"
            value={local.a[1]}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), local.a[0]);
              const next = { ...local, a: [local.a[0], v] as [number, number] };
              setLocal(next);
              debouncedEmit(next);
            }}
          />
        </div>
      </div>

      <div className="row">
        <label>
          Stellar flux range (Earth=1)
          <div className="hint">{local.flux[0].toFixed(2)} – {local.flux[1].toFixed(2)} (data: {fMinDisp.toFixed(2)} – {fMaxDisp.toFixed(2)})</div>
        </label>
        <div className="row inline">
          <input
            type="range"
            min={fMinDisp}
            max={fMaxDisp}
            step="0.01"
            value={local.flux[0]}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), local.flux[1]);
              const next = { ...local, flux: [v, local.flux[1]] as [number, number] };
              setLocal(next);
              debouncedEmit(next);
            }}
          />
          <input
            type="range"
            min={fMinDisp}
            max={fMaxDisp}
            step="0.01"
            value={local.flux[1]}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), local.flux[0]);
              const next = { ...local, flux: [local.flux[0], v] as [number, number] };
              setLocal(next);
              debouncedEmit(next);
            }}
          />
        </div>
      </div>
    </section>
  );
}

