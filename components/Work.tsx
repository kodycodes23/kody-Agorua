"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/content";

// deterministic PRNG so the generated preview is identical on server and client
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A small workflow graph in the project's accent color, echoing the hero scene. */
function FlowArt({ seed, accent }: { seed: number; accent: string }) {
  const rnd = mulberry32(seed * 9973 + 17);
  const n = 5 + Math.floor(rnd() * 2);
  const nodes = Array.from({ length: n }, (_, i) => ({
    x: 50 + (i * 300) / (n - 1),
    y: 70 + rnd() * 110,
  }));
  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = (b.x - a.x) / 2;
    return `M${a.x} ${a.y} C${a.x + dx} ${a.y} ${b.x - dx} ${b.y} ${b.x} ${b.y}`;
  };
  const edges = nodes.slice(1).map((b, i) => curve(nodes[i], b));
  // one branch that skips a step, so it reads as a workflow rather than a line chart
  edges.push(curve(nodes[1], nodes[n - 2]));

  return (
    <svg className="proj-art" viewBox="0 0 400 250" aria-hidden="true">
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={rnd() * 400} cy={rnd() * 250} r={rnd() * 1.2 + 0.2} fill="#EFE8D8" opacity={rnd() * 0.35} />
      ))}
      {edges.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={accent} strokeOpacity={i === edges.length - 1 ? 0.35 : 0.7} strokeWidth="1.2" strokeDasharray={i === edges.length - 1 ? "3 4" : undefined} />
      ))}
      {edges.slice(0, -1).map((d, i) => (
        <circle key={`p${i}`} r="3" fill="#FFF3D6" className="proj-pulse">
          <animateMotion dur={`${2.6 + (i % 3) * 0.7}s`} repeatCount="indefinite" path={d} begin={`-${i * 0.45}s`} />
        </circle>
      ))}
      {nodes.map((p, i) => (
        <g key={`n${i}`}>
          <circle cx={p.x} cy={p.y} r="9" fill="rgba(5,6,5,.7)" stroke="#EFE8D8" strokeOpacity=".85" strokeWidth="1.1" />
          <circle cx={p.x} cy={p.y} r="2.6" fill={accent} />
        </g>
      ))}
    </svg>
  );
}

function ProjectCard({ p, index, wide }: { p: Project; index: number; wide: "" | "start" | "end" }) {
  const num = String(index + 1).padStart(2, "0");
  const meta = [p.year, p.area].filter(Boolean).join(" · ");
  const destinations = p.links
    ? [
        { label: "Website", href: p.links.website },
        { label: "Demo", href: p.links.demo },
        { label: "GitHub", href: p.links.github },
      ]
    : [{ label: /github\.com/.test(p.url ?? "") ? "GitHub" : "Website", href: p.url }];
  return (
    <article className={`proj${wide ? " proj--featured" : ""}${wide === "end" ? " proj--flip" : ""}`} style={{ "--a": p.accent } as React.CSSProperties}>
      <div className={`proj-media${p.image ? " proj-media--shot" : ""}`}>
        {p.image ? (
          // screenshot sits in a browser-window frame, cropped from the top
          <div className="proj-frame">
            <div className="proj-bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="proj-shot">
              <Image src={p.image} alt={`${p.title} screenshot`} fill sizes="(max-width: 820px) 90vw, 50vw" className="proj-img" />
            </div>
          </div>
        ) : (
          <FlowArt seed={index + 1} accent={p.accent} />
        )}
        <span className="proj-num">{num}</span>
        <span className="proj-type">{p.type}</span>
      </div>
      <div className="proj-body">
        {meta && <span className="proj-meta">{meta}</span>}
        <h3>{p.title}</h3>
        <p className="proj-desc">{p.description}</p>
        {p.result && <p className="proj-result">{p.result}</p>}
        <ul className="proj-tools">
          {p.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="proj-links">
          {destinations.map(({ label, href }) =>
            href ? (
              <a key={label} className="proj-link" href={href} target="_blank" rel="noopener noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span key={label} className="proj-link proj-link--soon" aria-disabled="true">
                {label} soon
              </span>
            ),
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work({ projects }: { projects: Project[] }) {
  const types = Array.from(new Set(projects.map((p) => p.type)));
  const [filter, setFilter] = useState<string>("All");
  const shown = projects
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => filter === "All" || p.type === filter);

  return (
    <>
      {types.length > 1 && (
        <div className="proj-filters" role="group" aria-label="Filter projects">
          {["All", ...types].map((t) => (
            <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)}>
              {t}
              <span>{t === "All" ? projects.length : projects.filter((p) => p.type === t).length}</span>
            </button>
          ))}
        </div>
      )}
      <div className="proj-grid">
        {shown.map(({ p, i }, pos) => {
          // first card is featured; if the rest can't pair up, the last one spans too so the grid has no gap
          const last = pos === shown.length - 1 && pos > 0 && (shown.length - 1) % 2 === 1;
          return <ProjectCard key={p.title} p={p} index={i} wide={pos === 0 ? "start" : last ? "end" : ""} />;
        })}
      </div>
    </>
  );
}
