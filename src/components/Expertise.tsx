import React from "react";
import { skills } from "../data/resume";
import { SkillIcon } from "./Scenery";
import "../assets/styles/Expertise.scss";

// Skills as "seed packets": a paper card with a hand-drawn icon, a serif
// title and the tools as small kraft-paper labels.
function Expertise() {
  return (
    <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
      <header className="section-head">
        <p className="kicker">Tools of the trade</p>
        <h2 id="expertise-title">Skills</h2>
      </header>

      <ul className="packets">
        {skills.map((group, i) => (
          <li key={group.title} className="packet">
            <div className="packet__top">
              <span className="packet__icon">
                <SkillIcon name={group.icon} />
              </span>
              <span className="packet__no" aria-hidden="true">
                No. {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{group.title}</h3>
            <ul className="packet__items" aria-label={`${group.title} skills`}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Expertise;
