import { Fragment } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import { about, site, socials, stack, steps, work } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />

      <main>
        <section className="block" id="about">
          <div className="wrap about">
            <blockquote>“{about.quote}”</blockquote>
            <div>
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="block" id="work" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="sec-title">Selected work</h2>
            <Work projects={work} />
          </div>
        </section>

        <section className="block" id="process" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="sec-title">How I work</h2>
            <div className="steps">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <span className="n">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="block" id="stack" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <h2 className="sec-title">Tools I build with</h2>
            <p className="stack">
              {stack.map(([tools, suffix], i) => (
                <Fragment key={tools}>
                  {i > 0 && " "}
                  {tools} <span>{suffix}</span>
                </Fragment>
              ))}
            </p>
          </div>
        </section>

        <section
          className="block contact"
          id="contact"
          style={{ paddingTop: 0 }}
        >
          <div className="wrap">
            <h2 className="sec-title">Have a process that should run itself?</h2>
            <a className="mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <div className="links">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          © {site.year} {site.name}
        </div>
      </footer>
    </>
  );
}
