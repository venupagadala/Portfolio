import React from "react";
import { featuredWork } from "../data/resume";
import "../assets/styles/FeaturedWork.scss";

function FeaturedWork() {
  return (
    <section id="work" className="section featured" aria-labelledby="featured-title">
      <header className="section-header">
        <h2 id="featured-title">Current work: {featuredWork.title}</h2>
        <p>{featuredWork.blurb}</p>
      </header>

      <div className="featured__card">
        <ol className="featured__journey" aria-label="Areas of the storefront I built">
          {featuredWork.areas.map((area, i) => (
            <li key={area.title} className="featured__area">
              <span className="featured__step" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{area.title}</h3>
              <ul>
                {area.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="featured__foot">
          <ul className="featured__stack" aria-label="Technologies">
            {featuredWork.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary"
            href={featuredWork.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {featuredWork.linkLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;
