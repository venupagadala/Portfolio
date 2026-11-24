import React from "react";
import { featuredWork } from "../data/resume";
import "../assets/styles/FeaturedWork.scss";

function FeaturedWork() {
  return (
    <section id="work" className="section featured" aria-labelledby="featured-title">
      <header className="section-head">
        <p className="kicker">What I'm working on</p>
        <h2 id="featured-title">{featuredWork.title}</h2>
        <p>{featuredWork.blurb}</p>
      </header>

      <ol className="featured__areas" aria-label="Areas of the storefront I've worked on">
        {featuredWork.areas.map((area, i) => (
          <li key={area.title}>
            <span className="featured__num" aria-hidden="true">
              {["i", "ii", "iii"][i] ?? i + 1}.
            </span>
            <h3>{area.title}</h3>
            <ul className="leaf-list">
              {area.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <p className="featured__visit">
        Built with {featuredWork.stack.join(", ")}.{" "}
        <a href={featuredWork.href} target="_blank" rel="noopener noreferrer">
          Visit {featuredWork.linkLabel} ↗
        </a>
      </p>
    </section>
  );
}

export default FeaturedWork;
