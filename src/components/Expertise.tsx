import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faDocker } from "@fortawesome/free-brands-svg-icons";
import {
  faServer,
  faDatabase,
  faVialCircleCheck,
  faWandMagicSparkles,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { skills } from "../data/resume";
import "../assets/styles/Expertise.scss";

const icons: Record<string, IconDefinition> = {
  frontend: faReact,
  backend: faServer,
  data: faDatabase,
  cloud: faDocker,
  quality: faVialCircleCheck,
  ai: faWandMagicSparkles,
};

function Expertise() {
  return (
    <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
      <header className="section-header">
        <h2 id="expertise-title">Skills</h2>
      </header>

      <ul className="skills-grid">
        {skills.map((group) => (
          <li key={group.title} className="skill-card">
            <span className="skill-card__icon" aria-hidden="true">
              <FontAwesomeIcon icon={icons[group.icon]} />
            </span>
            <h3>{group.title}</h3>
            <ul className="skill-card__tags" aria-label={`${group.title} skills`}>
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Expertise;
