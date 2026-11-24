import React, { useState } from "react";
import { experience, impactMetrics, Role } from "../data/resume";
import "../assets/styles/Experience.scss";
import "../assets/styles/ExperienceBrands.scss";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

/** HD Supply's link affordance: a black arrow inside a thick yellow ring. */
function RingArrow() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="ring-arrow">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#FFC907" strokeWidth="5" />
      <path d="M13 20h13M21 14l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" />
    </svg>
  );
}

/**
 * Decorative background art for each company's band. Original drawings that
 * evoke each brand's visual language; purely decorative.
 */
function Motif({ id }: { id: string }) {
  if (id === "hd-supply") {
    return (
      <svg viewBox="0 0 200 200" className="xp-motif" aria-hidden="true">
        <circle cx="100" cy="100" r="70" fill="none" stroke="#FFC907" strokeWidth="26" />
        <circle cx="100" cy="100" r="18" fill="#FFC907" />
      </svg>
    );
  }
  if (id === "att") {
    // Sphere of curved latitude bands, AT&T-globe style.
    return (
      <svg viewBox="0 0 200 200" className="xp-motif" aria-hidden="true">
        <defs>
          <clipPath id="xp-globe">
            <circle cx="100" cy="100" r="88" />
          </clipPath>
        </defs>
        <g clipPath="url(#xp-globe)" fill="#ffffff">
          {[-60, -36, -14, 6, 24, 40, 54, 66].map((y, i) => (
            <path
              key={y}
              d={`M0 ${100 + y} Q100 ${100 + y + 26 - i * 2} 200 ${100 + y} V${100 + y + 12 - i} Q100 ${
                100 + y + 38 - i * 3
              } 0 ${100 + y + 12 - i} Z`}
            />
          ))}
        </g>
      </svg>
    );
  }
  // Essilor: concentric lens rings with an optical axis.
  return (
    <svg viewBox="0 0 200 200" className="xp-motif" aria-hidden="true">
      {[86, 70, 54, 38, 22].map((r) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
      <path d="M0 100H200M100 0V200" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const moreCount = role.groups.reduce((n, g) => n + g.items.length, 0);
  const detailsId = `xp-details-${role.id}`;
  const isHd = role.id === "hd-supply";

  return (
    <li
      id={`xp-${role.id}`}
      className={`xp-item xp-item--${role.id}${role.current ? " xp-item--current" : ""}`}
      style={
        {
          "--brand-fill": role.brand.fill,
          "--brand-ink": role.brand.ink,
          "--brand-light": role.brand.light,
          "--brand-dark": role.brand.dark,
        } as React.CSSProperties
      }
    >
      <div className="xp-rail" aria-hidden="true">
        <span className="xp-dot" />
      </div>

      <article className="xp-card" aria-labelledby={`xp-title-${role.id}`}>
        <header className="xp-band">
          <Motif id={role.id} />
          <p className="xp-sector">{role.sector}</p>
          <div className="xp-card__head">
            <span className="xp-logo">
              <img src={role.logo} alt={`${role.company} logo`} width={104} height={34} loading="lazy" decoding="async" />
            </span>
            <div className="xp-card__titles">
              <h3 id={`xp-title-${role.id}`}>{role.role}</h3>
              <p className="xp-company">
                {role.company}
                {role.employment && <span className="xp-sep"> · {role.employment}</span>}
                <span className="xp-sep"> · {role.location}</span>
              </p>
            </div>
            <div className="xp-dates">
              {role.current && <span className="xp-badge">Current</span>}
              <time>
                {role.start} – {role.end}
              </time>
            </div>
          </div>
        </header>

        <div className="xp-body">
          <p className="xp-summary">{role.summary}</p>

          <dl className="xp-metrics">
            {role.metrics.map((m) => (
              <div key={m.label} className="xp-metric">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>

          <h4 className="xp-label">Highlights</h4>
          <ul className="xp-wins">
            {role.keyWins.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>

          {role.liveSite && (
            <div className="xp-live">
              <div>
                <strong>Worked on</strong>
                <span className="xp-live__areas">{role.liveSite.areas.join(" · ")}</span>
              </div>
              <a
                className={isHd ? "xp-live__ring" : "button button--plain"}
                href={role.liveSite.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isHd ? (
                  <>
                    <span>Visit {role.liveSite.label}</span>
                    <RingArrow />
                  </>
                ) : (
                  <>
                    {role.liveSite.label} <ExternalIcon />
                  </>
                )}
              </a>
            </div>
          )}

          <div id={detailsId} className="xp-details" hidden={!open}>
            {role.groups.map((g) => (
              <section key={g.title} className="xp-group">
                <h4 className="xp-label">{g.title}</h4>
                <ul>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer className="xp-card__foot">
            <ul className="xp-stack" aria-label="Technologies used">
              {role.stack.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="xp-toggle"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Less" : `More details (${moreCount})`}
              <svg viewBox="0 0 24 24" aria-hidden="true" className={open ? "is-open" : ""}>
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </footer>
        </div>
      </article>
    </li>
  );
}

function Experience() {
  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <header className="section-head">
        <p className="kicker">Where I've worked</p>
        <h2 id="experience-title">Experience</h2>
        <p>
          About five years across HD Supply / Home Depot, AT&amp;T and Essilor, working on both
          the frontend and the services behind it.
        </p>
      </header>

      <nav className="xp-index" aria-label="Jump to a company">
        {experience.map((r) => (
          <a
            key={r.id}
            href={`#xp-${r.id}`}
            onClick={jumpTo(`xp-${r.id}`)}
            className={`xp-index__item xp-index__item--${r.id}`}
            style={{ "--brand-fill": r.brand.fill } as React.CSSProperties}
          >
            <span className="xp-index__logo">
              <img src={r.logo} alt="" width={68} height={24} decoding="async" />
            </span>
            <span className="xp-index__text">
              <strong>{r.company}</strong>
              <span>
                {r.start} – {r.end}
              </span>
            </span>
          </a>
        ))}
      </nav>

      <dl className="impact-strip" aria-label="Career impact highlights">
        {impactMetrics.map((m) => (
          <div key={m.label} className="impact">
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      <ol className="xp-list">
        {experience.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </ol>
    </section>
  );
}

export default Experience;
