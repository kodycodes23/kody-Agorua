"use client";

import { useEffect, useRef } from "react";
import TechOrbit from "./TechOrbit";

type Pt = { x: number; y: number };
type Node = Pt & { l: string };
type Edge = { A: Node; B: Node; c1: Pt; c2: Pt };
type Flower = { x: number; y: number; z: number; ph: number; h: number };
type Pulse = { e: Edge; t: number; sp: number };

// idea-to-production lifecycle: the main line ships, the lower line monitors and loops back to Idea
const NODE_DEF = [
  { x: 0.12, y: 0.63, l: "Idea" },
  { x: 0.3, y: 0.575, l: "Design" },
  { x: 0.48, y: 0.65, l: "Build" },
  { x: 0.66, y: 0.585, l: "Test" },
  { x: 0.85, y: 0.665, l: "Deploy" },
  { x: 0.64, y: 0.81, l: "Monitor" },
  { x: 0.3, y: 0.83, l: "AI Agent" },
];
// pulses travel A → B, so edge direction is the direction work flows
const EDGE_DEF = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 2],
  [6, 0],
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function bez(e: Edge, t: number): Pt {
  const u = 1 - t;
  return {
    x: u * u * u * e.A.x + 3 * u * u * t * e.c1.x + 3 * u * t * t * e.c2.x + t * t * t * e.B.x,
    y: u * u * u * e.A.y + 3 * u * u * t * e.c1.y + 3 * u * t * t * e.c2.y + t * t * t * e.B.y,
  };
}

function makeGlow() {
  const glow = document.createElement("canvas");
  glow.width = glow.height = 64;
  const g = glow.getContext("2d")!;
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  r.addColorStop(0, "rgba(255,248,225,1)");
  r.addColorStop(0.25, "rgba(255,205,110,.85)");
  r.addColorStop(1, "rgba(255,170,40,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 64, 64);
  return glow;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const figLayerRef = useRef<HTMLDivElement>(null);
  const figRef = useRef<HTMLDivElement>(null);
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const ampRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = heroRef.current!, halo = haloRef.current!, portal = portalRef.current!;
    const cv = cvRef.current!, rim = rimRef.current!, figLayer = figLayerRef.current!;
    const fig = figRef.current!, t1 = t1Ref.current!, t2 = t2Ref.current!;
    const amp = ampRef.current!, year = yearRef.current!, cue = cueRef.current!;
    const foot = footRef.current!, s2 = s2Ref.current!;
    const ctx = cv.getContext("2d")!;
    // next/font renames families, so resolve the real one for canvas text
    const sansFamily = getComputedStyle(document.body).fontFamily;

    /* ---------- canvas scene: dusk field with a living workflow ---------- */
    let W = 0, H = 0, DPR = 1, time = 0;
    let field: Flower[] = [], nodes: Node[] = [], edges: Edge[] = [], pulses: Pulse[] = [];
    const glow = makeGlow();

    function build() {
      const hz = H * 0.52;
      field = [];
      const n = Math.min(2200, Math.round((W * H) / 800));
      for (let i = 0; i < n; i++) {
        const z = Math.pow(Math.random(), 1.7);
        field.push({
          x: Math.random() * W,
          y: hz + 4 + (H - hz + 30) * z,
          z,
          ph: Math.random() * 6.28,
          h: Math.random() * 14 - 7,
        });
      }
      field.sort((a, b) => a.y - b.y);
      nodes = NODE_DEF.map((d) => ({ x: d.x * W, y: d.y * H, l: d.l }));
      edges = EDGE_DEF.map(([a, b]) => {
        const A = nodes[a], B = nodes[b], dx = (B.x - A.x) * 0.5;
        return { A, B, c1: { x: A.x + dx, y: A.y }, c2: { x: B.x - dx, y: B.y } };
      });
      pulses = [];
    }

    function resize() {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth;
      H = innerHeight;
      cv.width = W * DPR;
      cv.height = H * DPR;
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
      layout();
      draw(0);
    }

    function draw(dt: number) {
      time += dt;
      const hz = H * 0.52;
      let g = ctx.createLinearGradient(0, 0, 0, hz);
      g.addColorStop(0, "#4F8F9A");
      g.addColorStop(0.55, "#A9C0B6");
      g.addColorStop(1, "#E9D6A6");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, hz + 2);
      const sun = ctx.createRadialGradient(W * 0.72, hz - 10, 0, W * 0.72, hz - 10, W * 0.45);
      sun.addColorStop(0, "rgba(255,226,160,.55)");
      sun.addColorStop(1, "rgba(255,226,160,0)");
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, W, hz + 2);
      // hills
      const hill = (amp: number, off: number, col: string, base: number) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 20) {
          ctx.lineTo(x, base + Math.sin((x / W) * 6 + off) * amp + Math.sin((x / W) * 13 + off * 2) * amp * 0.35);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = col;
        ctx.fill();
      };
      hill(H * 0.012, 1.3, "#7A7757", hz - H * 0.02);
      hill(H * 0.008, 4.1, "#5B5231", hz + H * 0.004);
      g = ctx.createLinearGradient(0, hz, 0, H);
      g.addColorStop(0, "#8F6A1E");
      g.addColorStop(0.35, "#B98221");
      g.addColorStop(1, "#241806");
      ctx.fillStyle = g;
      ctx.fillRect(0, hz + H * 0.01, W, H);
      // field flowers
      for (const p of field) {
        const sway = Math.sin(time * 1.1 + p.ph + p.x * 0.004) * (1 + p.z * 4);
        const s = 0.5 + p.z * p.z * 7;
        ctx.fillStyle = `hsla(${40 + p.h},${70 + p.z * 15}%,${38 + p.z * 20}%,${0.45 + p.z * 0.45})`;
        ctx.beginPath();
        ctx.arc(p.x + sway, p.y, s, 0, 6.283);
        ctx.fill();
      }
      // workflow edges
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255,240,205,.38)";
      for (const e of edges) {
        ctx.beginPath();
        ctx.moveTo(e.A.x, e.A.y);
        ctx.bezierCurveTo(e.c1.x, e.c1.y, e.c2.x, e.c2.y, e.B.x, e.B.y);
        ctx.stroke();
      }
      // pulses
      if (Math.random() < dt * 3.2) {
        pulses.push({ e: edges[(Math.random() * edges.length) | 0], t: 0, sp: 0.25 + Math.random() * 0.25 });
      }
      ctx.globalCompositeOperation = "lighter";
      pulses = pulses.filter((p) => {
        p.t += p.sp * dt;
        if (p.t > 1) return false;
        const q = bez(p.e, p.t), sz = 26;
        ctx.drawImage(glow, q.x - sz / 2, q.y - sz / 2, sz, sz);
        return true;
      });
      ctx.globalCompositeOperation = "source-over";
      // nodes
      const fs = Math.max(10, Math.min(13, W / 110));
      ctx.font = `500 ${fs}px ${sansFamily}`;
      ctx.textAlign = "center";
      for (const n of nodes) {
        const pr = 1 + Math.sin(time * 2 + n.x) * 0.08;
        ctx.fillStyle = "rgba(20,16,6,.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 11 * pr, 0, 6.283);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,244,220,.9)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.fillStyle = "rgba(255,226,150,.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = "rgba(255,247,230,.92)";
        ctx.fillText(n.l, n.x, n.y - 19);
      }
      // vignette
      const v = ctx.createRadialGradient(W / 2, H * 0.52, Math.min(W, H) * 0.3, W / 2, H * 0.52, Math.max(W, H) * 0.8);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,.5)");
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, W, H);
    }

    /* ---------- scroll choreography ---------- */
    let R0 = 200;
    function layout() {
      const vw = innerWidth, vh = innerHeight;
      R0 = Math.min(vw, vh) * (vw < 720 ? 0.36 : 0.29);
      const h = R0 * 1.3, w = (h * 200) / 300;
      // hips (≈ x 90, y 172 of 300) sit on the lower-right of the rim
      const cx = vw / 2, cy = vh * 0.52, ang = Math.PI * 0.33;
      const hx = cx + Math.cos(ang) * R0 * 1.02, hy = cy + Math.sin(ang) * R0 * 1.02;
      fig.style.width = w + "px";
      fig.style.height = h + "px";
      fig.style.left = hx - w * 0.45 + "px";
      fig.style.top = hy - h * 0.57 + "px";
      apply(reduce ? 1 : progress());
    }
    function progress() {
      const total = hero.offsetHeight - innerHeight;
      return total > 0 ? clamp(-hero.getBoundingClientRect().top / total) : 0;
    }
    function apply(p: number) {
      const vw = innerWidth, vh = innerHeight;
      const Rf = Math.hypot(vw, vh) * 0.62;
      const z = ease(clamp(p / 0.7));
      const r = R0 * Math.pow(Rf / R0, z);
      portal.style.clipPath = `circle(${r}px at 50% 52%)`;
      cv.style.transform = `scale(${0.7 + 0.3 * z})`;
      const th = Math.min(r * 0.14, 60);
      rim.style.width = rim.style.height = 2 * r + "px";
      rim.style.left = vw / 2 - r + "px";
      rim.style.top = vh * 0.52 - r + "px";
      rim.style.boxShadow = `0 0 0 ${th}px #171814, 0 0 0 ${th + 1.5}px rgba(239,232,216,.07), 0 40px 140px ${th}px rgba(0,0,0,.85), inset 0 0 ${th * 0.9}px rgba(0,0,0,.75), inset 0 ${th * 0.12}px ${th * 0.2}px rgba(255,255,255,.08)`;
      rim.style.opacity = String(1 - clamp((z - 0.7) / 0.3));
      halo.style.transform = `scale(${1 + z * 2.5})`;
      halo.style.opacity = String(1 - z);
      figLayer.style.transform = `scale(${1 + z * 3.4})`;
      figLayer.style.opacity = String(1 - clamp(z / 0.5));
      const tx = z * 48, sc = 1 + z * 1.8, op = String(1 - clamp(z / 0.55));
      t1.style.transform = `translate(${-tx}vw,${-z * 12}vh) scale(${sc})`;
      t1.style.opacity = op;
      t2.style.transform = `translate(${tx}vw,${z * 12}vh) scale(${sc})`;
      t2.style.opacity = op;
      amp.style.transform = `translate(${z * 20}vw,${z * 18}vh) scale(${1 + z * 2.4})`;
      amp.style.opacity = String(1 - clamp(z / 0.45));
      year.style.opacity = String(1 - clamp(z / 0.3));
      cue.style.opacity = foot.style.opacity = String(1 - clamp(p * 6));
      const q = clamp((p - 0.68) / 0.2);
      s2.style.opacity = String(q);
      s2.style.transform = `translateY(${(1 - q) * 30}px)`;
      s2.classList.toggle("on", q > 0.6);
    }

    let heroVisible = true, last = performance.now(), raf = 0;
    const io = new IntersectionObserver((es) => { heroVisible = es[0].isIntersecting; }, { threshold: 0 });
    io.observe(hero);
    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (heroVisible) draw(dt);
      raf = requestAnimationFrame(loop);
    }
    const onScroll = () => apply(progress());

    addEventListener("resize", resize);
    if (reduce) {
      resize();
    } else {
      addEventListener("scroll", onScroll, { passive: true });
      resize();
      raf = requestAnimationFrame(loop);
    }
    let alive = true;
    document.fonts?.ready.then(() => alive && draw(0));

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", resize);
      removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} aria-label="Introduction">
      <div className="stick">
        <div className="halo" ref={haloRef} />

        <div className="portal" ref={portalRef}>
          <canvas id="scene" ref={cvRef} aria-hidden="true" />
        </div>
        <div className="rim" ref={rimRef} />

        <div className="layer" ref={figLayerRef} aria-hidden="true">
          <div className="fig" ref={figRef}>
            <svg viewBox="0 0 200 300" fill="#050505">
              <circle cx="112" cy="46" r="21" />
              <path d="M88 40 Q92 18 114 20 Q136 22 136 42 Q122 34 88 40Z" />
              <path d="M82 72 Q112 58 142 74 L152 172 Q112 186 74 170 Z" />
              <path d="M84 104 Q58 148 70 178 L86 178 Q82 150 100 118Z" />
              <path d="M140 100 Q162 140 150 176 L136 176 Q142 146 128 118Z" />
              <path d="M80 160 L40 174 Q28 180 33 192 L72 192 Q96 186 104 174Z" />
              <path d="M36 180 L29 260 L46 262 L58 192Z" />
              <path d="M24 255 L50 255 Q58 266 46 271 L20 271Z" />
              <path d="M104 168 L74 200 L68 268 L84 270 L94 210 L128 178Z" />
              <path d="M62 264 L88 264 Q96 275 84 279 L58 279Z" />
            </svg>
          </div>
        </div>

        <div className="t1" ref={t1Ref}>
          <small>between</small>
          <span>Manual</span>
        </div>
        <div className="amp" ref={ampRef}>&amp;</div>
        <div className="t2" ref={t2Ref}>Automatic</div>
        <div className="year" ref={yearRef} aria-hidden="true">
          <TechOrbit />
        </div>

        <div className="cue" ref={cueRef} aria-hidden="true">
          <svg viewBox="0 0 70 130" fill="none" stroke="rgba(239,232,216,.5)" strokeWidth="1">
            <path d="M5 60 A30 30 0 0 1 65 60" />
            <path d="M35 70 V124 M30 118 L35 124 L40 118" />
          </svg>
          <b>Scroll down</b>
        </div>
        <div className="foot" ref={footRef}>
          Software engineer · AI automation engineer · workflows, agents &amp; integrations
        </div>

        <div className="scene2" ref={s2Ref}>
          <h1 className="s2-head">
            <span className="big">Build</span>
            <span className="sm">the</span>
            <span className="row2">Autopilot</span>
          </h1>
          <div className="s2-copy">
            <p>I turn business problems into working software: enterprise web applications, AI agents and automations built around how your team actually works.</p>
            <p>Leads, invoices, support tickets, reports: if it follows a pattern, it can run on its own.</p>
          </div>
          <a className="explore" href="#work">
            <i>Explore</i>
            <span>Selected work</span>
          </a>
        </div>
      </div>
    </section>
  );
}
