"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  siAirtable,
  siClaude,
  siGithub,
  siJavascript,
  siN8n,
  siNotion,
  siReact,
  siTypescript,
} from "simple-icons";

// `path` = single-color simple-icons glyph; `src` = full-color logo file in /public/logos
type Logo = { title: string; color: string; path?: string; src?: string };

const IVORY = "#EFE8D8";

const logo = (i: { title: string; path: string; hex: string }, color = `#${i.hex}`): Logo => ({
  title: i.title,
  path: i.path,
  color,
});
const file = (title: string, src: string, color: string): Logo => ({ title, src, color });

// GitHub and Notion are near-black brands, so they get ivory to stay visible on the night background
const ORBITS: { rx: number; ry: number; speed: number; logos: Logo[] }[] = [
  { rx: 0.4, ry: 0.15, speed: 0.4, logos: [logo(siReact), logo(siClaude), logo(siN8n)] },
  {
    rx: 0.69,
    ry: 0.26,
    speed: -0.26,
    logos: [
      file("Google", "/logos/google.svg", "#EA4335"),
      file("Apollo", "/logos/apollo.png", "#E9F00F"),
      file("Python", "/logos/python.svg", "#3776AB"),
      file("Firecrawl", "/logos/firecrawl.png", "#FA5D19"),
      logo(siNotion, IVORY),
    ],
  },
  {
    rx: 0.98,
    ry: 0.37,
    speed: 0.17,
    logos: [
      logo(siTypescript),
      logo(siJavascript),
      logo(siAirtable),
      file("Apify", "/logos/apify.svg", "#20A34E"),
      logo(siGithub, IVORY),
    ],
  },
];
const TILT = (-16 * Math.PI) / 180;

// fixed star positions (viewBox -100..100) so server and client render the same markup
const STARS = [
  [-88, -52, 0.7], [-62, 70, 0.5], [-40, -84, 0.9], [-14, 58, 0.5], [8, -66, 0.6], [30, 82, 0.8],
  [52, -44, 0.5], [74, 60, 0.7], [92, -8, 0.6], [-94, 18, 0.5], [66, -80, 0.9], [-70, -18, 0.4],
  [18, 30, 0.4], [-30, 26, 0.6],
];

export default function TechOrbit() {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const box = boxRef.current!;
    const items = itemRefs.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cos = Math.cos(TILT), sin = Math.sin(TILT);
    let raf = 0, visible = true;

    function place(t: number) {
      const R = box.clientWidth / 2;
      let k = 0;
      for (const o of ORBITS) {
        o.logos.forEach((_, i) => {
          const a = t * o.speed + (i / o.logos.length) * Math.PI * 2;
          const x = Math.cos(a) * o.rx * R, y = Math.sin(a) * o.ry * R;
          // depth: +1 in front of the core, -1 behind it
          const d = Math.sin(a);
          const el = items[k++]!;
          el.style.transform = `translate(${x * cos - y * sin}px,${x * sin + y * cos}px) scale(${0.72 + 0.28 * (d + 1) / 2})`;
          el.style.opacity = String(0.45 + 0.55 * (d + 1) / 2);
          el.style.zIndex = d > 0 ? "3" : "1";
        });
      }
    }

    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(box);
    const start = performance.now();
    const loop = (now: number) => {
      if (visible) place((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) place(0);
    else raf = requestAnimationFrame(loop);
    const onResize = () => reduce && place(0);
    addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", onResize);
    };
  }, []);

  let k = 0;
  return (
    <div className="orbit" ref={boxRef}>
      <svg className="orbit-rings" viewBox="-100 -100 200 200" aria-hidden="true">
        {ORBITS.map((o) => (
          <ellipse
            key={o.rx}
            rx={o.rx * 100}
            ry={o.ry * 100}
            transform={`rotate(${(TILT * 180) / Math.PI})`}
          />
        ))}
      </svg>
      <svg className="orbit-rings orbit-stars" viewBox="-100 -100 200 200" aria-hidden="true">
        {STARS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} style={{ animationDelay: `${(i * 0.37) % 3}s` }} />
        ))}
      </svg>
      <div className="orbit-core" />
      {ORBITS.flatMap((o) =>
        o.logos.map((l) => {
          const idx = k++;
          return (
            <div
              key={l.title}
              className="orbit-item"
              ref={(el) => { itemRefs.current[idx] = el; }}
              style={{ "--c": l.color } as React.CSSProperties}
              title={l.title}
            >
              {l.src ? (
                <Image src={l.src} alt={l.title} width={24} height={24} unoptimized />
              ) : (
                <svg viewBox="0 0 24 24" fill={l.color} role="img" aria-label={l.title}>
                  <path d={l.path} />
                </svg>
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}
