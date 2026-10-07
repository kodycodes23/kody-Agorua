"use client";

import { useEffect, useState } from "react";
import { navLinks, site, socials } from "@/lib/content";

export default function Nav() {
  const linkedin = socials.find((s) => s.label === "LinkedIn");
  const [active, setActive] = useState<string | null>(null);

  // highlight the link whose section crosses the middle of the viewport
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
          else setActive((cur) => (cur === `#${e.target.id}` ? null : cur));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="nav" aria-label="Main">
      <a className="logo" href="#hero">
        {site.name}
      </a>
      <ul>
        {navLinks.map((l) => (
          <li key={l.href}>
            <a href={l.href} aria-current={active === l.href ? "location" : undefined}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      {linkedin && (
        <a className="ext" href={linkedin.href} target="_blank" rel="noopener">
          LinkedIn
        </a>
      )}
    </nav>
  );
}
