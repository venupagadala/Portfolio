import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faDocker,
  faPython,
} from "@fortawesome/free-brands-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

const labelsFirst = [
  "React.js",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "SCSS",
  "Figma",
  "Storybook",
  "Jest",
  "React Testing Library",
];

const labelsSecond = [
  "Git",
  "GitHub Actions",
  "Bitbucket",
  "Vercel",
  "Netlify",
  "Docker",
  "Azure",
  "CI/CD",
  "Jira",
  "Confluence",
];

const labelsThird = [
    "OpenAI (ChatGPT API)",
    "LangChain (Basic)",
    "Qdrant",
    "Vector Embeddings",
    "Streamlit (UI prototyping)",
    "Python",
    "FastAPI (basic)",
    "REST APIs",
    "JSON"
];


function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">
          {/* Frontend Engineering */}
          <div className="skill">
            <FontAwesomeIcon icon={faReact} size="3x" />
            <h3>Frontend Engineering (React & UI/UX)</h3>
            <p>
              Specializing in crafting scalable and high-performance frontend
              applications using React.js and modern design systems. I create
              pixel-perfect UI experiences aligned with Figma designs, focusing
              on performance, responsiveness, and accessibility (WCAG 2.1).
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* DevOps and Tooling */}
          <div className="skill">
            <FontAwesomeIcon icon={faDocker} size="3x" />
            <h3>DevOps & Tooling</h3>
            <p>
              I build robust development workflows with CI/CD automation,
              version control, and deployment pipelines using Vercel, Netlify,
              GitHub Actions, and Docker. Familiar with collaboration tools like
              Jira and Confluence to support Agile delivery.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsSecond.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* AI/ML & GenAI */}
          <div className="skill">
            <FontAwesomeIcon icon={faPython} size="3x" />
            <h3>AI-Enabled Frontend Integrations</h3>
            <p>
              I integrate basic GenAI features like ChatGPT and Q&A systems into
              modern frontend apps using APIs. I work with engineers to connect
              React UIs to vector databases like Qdrant and simple Python
              backends (FastAPI/Flask). My focus is on frontend-side integration
              and intelligent UI presentation.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsThird.map((label, index) => (
                <Chip key={index} className="chip" label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
