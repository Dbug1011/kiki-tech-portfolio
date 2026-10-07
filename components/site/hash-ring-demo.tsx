"use client";

import { useMemo, useState } from "react";
import { MdAdd, MdRefresh, MdRemove } from "react-icons/md";

// A miniature of Project Jennah's router: workloads and executors are hashed
// onto the same ring, and each workload belongs to the first executor
// clockwise from it. Changing the pool shows how few workloads move compared
// with modulo placement (hash % executorCount).

const WORKLOADS = Array.from({ length: 16 }, (_, i) => `workload-${String(i + 1).padStart(2, "0")}`);
const NAMES = ["A", "B", "C", "D", "E", "F"];
const COLORS = ["#7945FF", "#CEC6EE", "#B0C6F4", "#6EE7B7", "#FCD34D", "#F9A8D4"];
const MIN = 2;
const START = 3;
// Each executor sits at a few points on the ring ("virtual nodes"), the
// standard way to keep load even with a small pool.
const VNODES = 3;

/**
 * FNV-1a, then murmur3's fmix32 finalizer. FNV alone barely moves the high
 * bits for names that differ only at the end ("workload-01" vs "-02"), which
 * would bunch every point together on the ring; the finalizer spreads them.
 */
function hash(str: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}
const toAngle = (h: number) => (h / 2 ** 32) * 360;

function ringOwners(count: number) {
  const nodes = NAMES.slice(0, count)
    .flatMap((name, i) =>
      Array.from({ length: VNODES }, (_, v) => ({
        id: `${name}#${v}`,
        name,
        color: COLORS[i],
        angle: toAngle(hash(`executor-${name}#${v}`)),
      }))
    )
    .sort((a, b) => a.angle - b.angle);
  const owners = WORKLOADS.map((w) => {
    const a = toAngle(hash(w));
    return (nodes.find((n) => n.angle >= a) ?? nodes[0]).name;
  });
  return { nodes, owners };
}
const moduloOwners = (count: number) => WORKLOADS.map((w) => NAMES[hash(w) % count]);

const R = 120;
const C = 160;
const point = (angle: number, r = R) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
};

export default function HashRingDemo() {
  const [count, setCount] = useState(START);
  const [prevCount, setPrevCount] = useState<number | null>(null);

  const { nodes, owners } = useMemo(() => ringOwners(count), [count]);
  const prev = useMemo(() => (prevCount ? ringOwners(prevCount).owners : null), [prevCount]);
  const moved = prev ? owners.filter((o, i) => o !== prev[i]).length : 0;
  const movedModulo = prevCount
    ? (() => {
        const before = moduloOwners(prevCount);
        return moduloOwners(count).filter((o, i) => o !== before[i]).length;
      })()
    : 0;

  const change = (next: number) => {
    setPrevCount(count);
    setCount(next);
  };
  const colorOf = (name: string) => COLORS[NAMES.indexOf(name)];

  return (
    <div className="surface grid gap-8 rounded-xl p-5 md:grid-cols-[320px_1fr] md:items-center md:p-8">
      <svg viewBox="0 0 320 320" role="img" aria-label={`Hash ring with ${count} executors and ${WORKLOADS.length} workloads`} className="mx-auto w-full max-w-[320px]">
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(206,198,238,0.18)" strokeWidth="1.5" />
        {WORKLOADS.map((w, i) => {
          const p = point(toAngle(hash(w)));
          const changed = prev && prev[i] !== owners[i];
          return (
            <g key={w}>
              {changed && (
                <circle cx={p.x} cy={p.y} r="11" fill="none" stroke={colorOf(owners[i])} strokeWidth="1.5" className="animate-ping [transform-box:fill-box] [transform-origin:center]" />
              )}
              <circle cx={p.x} cy={p.y} r="5" fill={colorOf(owners[i])} style={{ transition: "fill 400ms ease" }} />
            </g>
          );
        })}
        {nodes.map((n) => {
          const p = point(n.angle);
          const label = point(n.angle, R + 24);
          return (
            <g key={n.id}>
              <rect x={p.x - 8} y={p.y - 8} width="16" height="16" rx="4" fill="#0B0D0F" stroke={n.color} strokeWidth="2" />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle" fill={n.color} fontSize="11" fontFamily="var(--font-sans)">
                {n.name}
              </text>
            </g>
          );
        })}
        <text x={C} y={C - 6} textAnchor="middle" fill="#EFEDF7" fontSize="22" fontWeight="300" fontFamily="var(--font-sans)">
          {count}
        </text>
        <text x={C} y={C + 14} textAnchor="middle" fill="#A5A5AD" fontSize="9" letterSpacing="2" fontFamily="var(--font-sans)">
          EXECUTORS
        </text>
      </svg>

      <div>
        <p className="text-sm leading-relaxed text-mist">
          Squares are executors (each sits at {VNODES} points on the ring to
          keep load even), dots are workloads. Each workload belongs to the
          next executor clockwise. Add or remove an executor and watch which
          dots change colour.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" onClick={() => change(count + 1)} disabled={count >= NAMES.length} className="btn-ghost py-2 disabled:pointer-events-none disabled:opacity-40">
            <MdAdd aria-hidden="true" /> Add executor
          </button>
          <button type="button" onClick={() => change(count - 1)} disabled={count <= MIN} className="btn-ghost py-2 disabled:pointer-events-none disabled:opacity-40">
            <MdRemove aria-hidden="true" /> Remove
          </button>
          <button type="button" onClick={() => { setCount(START); setPrevCount(null); }} className="btn-ghost px-3 py-2" aria-label="Reset">
            <MdRefresh aria-hidden="true" />
          </button>
        </div>

        <dl aria-live="polite" className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-volt/40 bg-volt/[0.08] p-4">
            <dt className="micro text-lilac">Consistent hashing</dt>
            <dd className="mt-2 text-3xl font-light text-snow">
              {prev ? moved : "–"}
              <span className="text-base text-mist"> / {WORKLOADS.length} moved</span>
            </dd>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <dt className="micro text-mist">Modulo placement</dt>
            <dd className="mt-2 text-3xl font-light text-snow/70">
              {prev ? movedModulo : "–"}
              <span className="text-base text-mist"> / {WORKLOADS.length} moved</span>
            </dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-mist/70">
          {prev ? `Last change: ${prevCount} → ${count} executors.` : "Change the pool to compare."} Every moved
          workload loses its warm cache and state.
        </p>
      </div>
    </div>
  );
}
