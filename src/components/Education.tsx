import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faAward, faCertificate } from "@fortawesome/free-solid-svg-icons";
import { awards, education } from "../data/resume";
import "../assets/styles/Education.scss";

function Education() {
  return (
    <section id="education" className="section education" aria-labelledby="education-title">
      <header className="section-header">
        <h2 id="education-title">Education &amp; certifications</h2>
      </header>

      <div className="education__grid">
        <div>
          <h3 className="education__col-title">Education</h3>
          <ul className="edu-list">
            {education.map((e) => (
              <li key={e.degree} className="edu-card">
                <span className="edu-card__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                <div>
                  <h4>{e.degree}</h4>
                  <p>
                    {e.school}, {e.location}
                    {e.year && <span className="edu-card__year"> · {e.year}</span>}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="education__col-title">Awards &amp; certifications</h3>
          <ul className="edu-list">
            {awards.map((a) => (
              <li key={a.title} className={`edu-card${a.highlight ? " edu-card--highlight" : ""}`}>
                <span className="edu-card__icon" aria-hidden="true">
                  <FontAwesomeIcon icon={a.highlight ? faAward : faCertificate} />
                </span>
                <div>
                  <h4>
                    {a.title}
                    {a.date && <span className="edu-card__year"> · {a.date}</span>}
                  </h4>
                  <p>{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Education;
