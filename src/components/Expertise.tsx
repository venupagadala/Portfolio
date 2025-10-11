import React from "react";
import { useInView } from "react-intersection-observer";
import { motion, Variants } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faDocker,
  faNodeJs,
  faPython,
  faJava,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGaugeHigh,
  faCheckCircle,
  faNetworkWired,
  faLeaf,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import Chip from "@mui/material/Chip";
import "../assets/styles/Expertise.scss";

// Define tech stack arrays for each skill section
const labelsFrontend = [
  "React",
  "Next.js",
  "Angular",
  "TypeScript",
  "Redux",
  "MUI",
  "RxJS",
  "NgRx",
  "Styled Components",
  "Figma",
];

const labelsPerfA11y = [
  "Lighthouse",
  "WCAG",
  "React Profiler",
  "Code Splitting",
  "Lazy Loading",
];

const labelsTestingQuality = [
  "Jest",
  "React Testing Library",
  "Cypress",
  "CI/CD",
];

const labelsDevOps = [
  "Docker",
  "AWS Amplify",
  "Netlify",
  "Vercel",
  "GitHub Actions",
];

const labelsAPIData = [
  "REST",
  "Axios",
  "React Query",
  "Caching",
  "Error Handling",
];

const labelsBackendBasic = [
  "Node.js",
  "Express",
  "JWT",
  "MongoDB",
];

const labelsBackendExtended = [
  "Java",
  "Spring Boot",
  "Python",
  "Flask",
  "PostgreSQL",
];

// Add containerVariants for parent animation
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Animation variants for each skill item
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Expertise() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Helper function for rendering Chips with improved accessibility
  const renderChips = (labels: string[], chipTitle: string) => (
    <div className="flex-chips">
      <span className="chip-title">{chipTitle}:</span>
      {labels.map((label, i) => (
        <Chip
          key={i}
          className="chip"
          label={label}
          // Added for accessibility
          role="listitem"
          aria-label={`Skill: ${label}`}
        />
      ))}
    </div>
  );

  return (
    <div className="container" id="expertise">
      <motion.div
        ref={ref}
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Changed h1 to h2 for correct semantic heading structure */}
        <h2>Expertise</h2>

        <motion.div className="skills-grid">
          {/* Frontend (React & Next.js) */}
          <motion.div className="skill" variants={itemVariants}>
            {/* Added aria-hidden="true" to decorative icons */}
            <FontAwesomeIcon icon={faReact} size="3x" aria-hidden="true" />
            <h3>Frontend Engineering (React, Angular & Next.js)</h3>
            <p>
              Building scalable, high-performance, and accessible UIs. Strong focus on
              SSR/SSG, reusable component libraries, and seamless Figma → code handoff.
            </p>
            {renderChips(labelsFrontend, "Tech stack")}
          </motion.div>

          {/* Performance & Accessibility */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faGaugeHigh} size="3x" aria-hidden="true" />
            <h3>Performance & Accessibility</h3>
            <p>
              Optimizing first load and interaction with code splitting, caching, and
              profiling; delivering WCAG-compliant, device-agnostic experiences.
            </p>
            {renderChips(labelsPerfA11y, "Focus areas")}
          </motion.div>

          {/* ... (repeat the pattern for all other skill sections) ... */}

          {/* Testing & Quality */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faCheckCircle} size="3x" aria-hidden="true" />
            <h3>Testing & Quality</h3>
            <p>
              Shipping with confidence via unit, integration, and E2E coverage; automated
              checks in CI to keep releases stable and maintainable.
            </p>
            {renderChips(labelsTestingQuality, "Tools")}
          </motion.div>
          
          {/* DevOps & Tooling */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faDocker} size="3x" aria-hidden="true" />
            <h3>DevOps & Tooling</h3>
            <p>
              Streamlined delivery with CI/CD, preview deployments, and containerized
              builds across AWS Amplify, Netlify, and Vercel.
            </p>
            {renderChips(labelsDevOps, "Platforms & tools")}
          </motion.div>
          
          {/* API & Data */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faNetworkWired} size="3x" aria-hidden="true" />
            <h3>API Integration & Data</h3>
            <p>
              Robust REST integrations with resilient error handling, retries, and
              client-side caching for fast, reliable data flows.
            </p>
            {renderChips(labelsAPIData, "Core skills")}
          </motion.div>

          {/* Backend (Node/Express basic) */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faNodeJs} size="3x" aria-hidden="true" />
            <h3>Backend (Node/Express — Basic)</h3>
            <p>
              Building and testing REST endpoints to support frontend needs with Node.js
              and Express; pragmatic auth and data handling.
            </p>
            {renderChips(labelsBackendBasic, "Tech stack")}
          </motion.div>

          {/* Backend & APIs (Extended: Java / Spring Boot / Python / Flask) */}
          <motion.div className="skill" variants={itemVariants}>
            <div className="icon-row">
              <FontAwesomeIcon icon={faJava} size="2x" style={{ marginRight: 12 }} aria-hidden="true" />
              <FontAwesomeIcon icon={faLeaf} size="2x" style={{ marginRight: 12 }} aria-hidden="true" />
              <FontAwesomeIcon icon={faPython} size="2x" style={{ marginRight: 12 }} aria-hidden="true" />
              <FontAwesomeIcon icon={faFlask} size="2x" aria-hidden="true" />
            </div>
            <h3>Backend Development & APIs</h3>
            <p>
              Experience building and integrating APIs with Java (Spring Boot) and Python
              (Flask), alongside Node/Express. Focus on secure auth, database integration,
              and clean REST services to support scalable frontends.
            </p>
            {renderChips(labelsBackendExtended, "Tech stack")}
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}

export default Expertise;