import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faDocker,
  faPython,
  faNodeJs,
  faAngular,
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

const labelsAngular = [
  "Angular 12+",
  "RxJS",
  "Angular CLI",
  "NgRx (Basic)",
  "TypeScript",
  "HTML & SCSS",
  "Angular Material",
  "Component-based Architecture",
];

const labelsSecond = [
  "Git",
  "GitHub Actions",
  "Bitbucket",
  "Vercel",
  "Netlify",
  "Docker",
  "Azure",
  "AWS (S3, EC2)",
  "CI/CD Pipelines",
  "Version Control",
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

const labelsFourth = [
  "Node.js",
  "Express.js",
  "MongoDB (basic)",
  "JWT (basic auth)",
  "API Integration",
  "Nodemon",
  "Postman",
  "RESTful Services",
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">
          {/* Frontend Engineering - React */}
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

          {/* Frontend Engineering - Angular */}
          <div className="skill">
            <FontAwesomeIcon icon={faAngular} size="3x" />
            <h3>Frontend Engineering (Angular)</h3>
            <p>
              I also build dynamic, modular applications using Angular. With a solid understanding of Angular CLI, RxJS, Angular Material, and component-driven architecture, I can deliver highly maintainable codebases and clean UI flows.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAngular.map((label, index) => (
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

          {/* Backend Development (Basic) */}
          <div className="skill">
            <FontAwesomeIcon icon={faNodeJs} size="3x" />
            <h3>Backend Development (Basic)</h3>
            <p>
              I have working knowledge of backend development using Node.js and
              Express for building RESTful APIs and integrating MongoDB for simple
              data operations. I use Postman for testing and understand API auth
              and middleware concepts. Enough to build and connect full-stack apps.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFourth.map((label, index) => (
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
