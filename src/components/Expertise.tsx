import React from "react";
import { useInView } from "react-intersection-observer";
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faDocker,
  faPython,
  faNodeJs,
  faAngular,
} from "@fortawesome/free-brands-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss"; // Your styles

// Tech stack arrays
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
  "AWS (S3, EC2, RDS)",
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

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
};

function Expertise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="container" id="expertise">
      <motion.div
        ref={ref}
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <h1>Expertise</h1>
        <motion.div className="skills-grid">
          {/* React */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faReact} size="3x" />
            <h3>Frontend Engineering (React & UI/UX)</h3>
            <p>
              Specializing in scalable and high-performance applications using
              React.js, focusing on responsiveness, accessibility, and pixel-perfect UIs.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Angular */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faAngular} size="3x" />
            <h3>Frontend Engineering (Angular)</h3>
            <p>
              Building dynamic, component-driven Angular apps using RxJS, Angular CLI,
              Material UI and best practices for clean architecture.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsAngular.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* DevOps */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faDocker} size="3x" />
            <h3>DevOps & Tooling</h3>
            <p>
              Streamlining development workflows using CI/CD pipelines, Docker,
              GitHub Actions, and cloud platforms like Azure & AWS.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsSecond.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* AI/GenAI */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faPython} size="3x" />
            <h3>AI-Enabled Frontend Integrations</h3>
            <p>
              Integrating ChatGPT and LangChain with modern UIs, using vector
              embeddings and FastAPI-based backends for smart frontend interactions.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsThird.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faNodeJs} size="3x" />
            <h3>Backend Development (Basic)</h3>
            <p>
              Using Node.js, Express, and MongoDB to build REST APIs and
              integrate with frontend apps. Basic auth, token handling, and API testing.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFourth.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Expertise;
