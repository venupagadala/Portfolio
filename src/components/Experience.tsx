import React, { useState } from "react";
import { experience, impactMetrics, Role } from "../data/resume";
import "../assets/styles/Experience.scss";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const moreCount = role.groups.reduce((n, g) => n + g.items.length, 0);
  const detailsId = `xp-details-${role.id}`;

  return (
    <li className={`xp-item${role.current ? " xp-item--current" : ""}`}>
      <div className="xp-rail" aria-hidden="true">
        <span className="xp-dot" />
      </div>

      <article className="xp-card" aria-labelledby={`xp-title-${role.id}`}>
        <header className="xp-card__head">
          <span className="xp-logo" aria-hidden="true">
            {role.monogram}
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
        </header>

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
              <span className="xp-live__areas">
                {role.liveSite.areas.join(" · ")}
              </span>
            </div>
            <a
              className="btn btn--ghost"
              href={role.liveSite.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {role.liveSite.label} <ExternalIcon />
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
      </article>
    </li>
  );
}

function Experience() {
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <header className="section-header">
        <h2 id="experience-title">Experience</h2>
        <p>
          About five years across HD Supply / Home Depot, AT&amp;T and Essilor, working on both
          the frontend and the services behind it.
        </p>
      </header>

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
