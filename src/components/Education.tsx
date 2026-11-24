import React from "react";
import { awards, education } from "../data/resume";
import "../assets/styles/Education.scss";

function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-title">
      <header className="section-head">
        <p className="kicker">Schooling and recognition</p>
        <h2 id="education-title">Education &amp; certifications</h2>
      </header>

      <div className="education__cols">
        <section>
          <h3 className="education__label">Education</h3>
          <ul className="education__list">
            {education.map((e) => (
              <li key={e.degree}>
                <h4>{e.degree}</h4>
                <p>
                  {e.school}, {e.location}
                  {e.year && <> · {e.year}</>}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="education__label">Awards &amp; certifications</h3>
          <ul className="education__list">
            {awards.map((a) => (
              <li key={a.title} className={a.highlight ? "is-award" : undefined}>
                <h4>
                  {a.highlight && (
                    <span className="education__ribbon" aria-hidden="true">
                      ✦
                    </span>
                  )}
                  {a.title}
                  {a.date && <span className="education__date"> · {a.date}</span>}
                </h4>
                <p>{a.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default Education;
