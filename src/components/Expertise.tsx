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

// ---- Tech stack arrays aligned to resume ----
const labelsFrontend = [
  "React.js",
  "Next.js (SSR/SSG)",
  "TypeScript",
  "JavaScript (ES6+)",
  "Zustand",
  "Redux Toolkit",
  "React Query",
  "React Router",
  "Tailwind CSS",
  "SCSS",
  "Figma",
  "Storybook",
];

const labelsPerfA11y = [
  "Code Splitting",
  "Lazy Loading",
  "useMemo",
  "Debounce",
  "Bundle Size Reduction",
  "React Profiler",
  "Lighthouse",
  "WCAG 2.1",
  "Semantic HTML",
  "ARIA Roles",
  "Keyboard Navigation",
];

const labelsTestingQuality = [
  "Jest",
  "React Testing Library",
  "Cypress",
  "Playwright",
  "ESLint",
  "Prettier",
  "CI Checks",
  "Integration Tests",
  "E2E Flows",
];

const labelsDevOps = [
  "GitHub Actions",
  "AWS Amplify",
  "Netlify",
  "Vercel",
  "Webpack",
  "Vite",
  "Docker",
  "CI/CD Pipelines",
  "Git",
  "Jira",
  "Confluence",
];

const labelsAPIData = [
  "RESTful APIs",
  "Axios",
  "Fetch",
  "Error Handling",
  "Retry Logic",
  "Caching (React Query)",
  "JSON",
];

const labelsBackendBasic = [
  "Node.js",
  "Express.js",
  "MongoDB (basic)",
  "JWT (basic auth)",
  "API Integration",
  "Postman",
];

const labelsBackendExtended = [
  "Java (Core)",
  "Spring Boot (REST APIs)",
  "Python",
  "Flask (APIs & microservices)",
  "PostgreSQL / MySQL",
  "MongoDB (basic)",
  "JWT Authentication",
  "API Design",
];

// ---- Animations ----
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
          {/* Frontend (React & Next.js) */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faReact} size="3x" />
            <h3>Frontend Engineering (React & Next.js)</h3>
            <p>
              Building scalable, high-performance, and accessible UIs. Strong focus on
              SSR/SSG, reusable component libraries, and seamless Figma → code handoff.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFrontend.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Performance & Accessibility */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faGaugeHigh} size="3x" />
            <h3>Performance & Accessibility</h3>
            <p>
              Optimizing first load and interaction with code splitting, caching, and
              profiling; delivering WCAG-compliant, device-agnostic experiences.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Focus areas:</span>
              {labelsPerfA11y.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Testing & Quality */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faCheckCircle} size="3x" />
            <h3>Testing & Quality</h3>
            <p>
              Shipping with confidence via unit, integration, and E2E coverage; automated
              checks in CI to keep releases stable and maintainable.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tools:</span>
              {labelsTestingQuality.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* DevOps & Tooling */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faDocker} size="3x" />
            <h3>DevOps & Tooling</h3>
            <p>
              Streamlined delivery with CI/CD, preview deployments, and containerized
              builds across AWS Amplify, Netlify, and Vercel.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Platforms & tools:</span>
              {labelsDevOps.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* API & Data */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faNetworkWired} size="3x" />
            <h3>API Integration & Data</h3>
            <p>
              Robust REST integrations with resilient error handling, retries, and
              client-side caching for fast, reliable data flows.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Core skills:</span>
              {labelsAPIData.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Backend (Node/Express basic) */}
          <motion.div className="skill" variants={itemVariants}>
            <FontAwesomeIcon icon={faNodeJs} size="3x" />
            <h3>Backend (Node/Express — Basic)</h3>
            <p>
              Building and testing REST endpoints to support frontend needs with Node.js
              and Express; pragmatic auth and data handling.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsBackendBasic.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>

          {/* Backend & APIs (Extended: Java / Spring Boot / Python / Flask) */}
          <motion.div className="skill" variants={itemVariants}>
            {/* Using brand + solid icons to visually hint Java/Spring/Python/Flask */}
            <div className="icon-row">
              <FontAwesomeIcon icon={faJava} size="2x" style={{ marginRight: 12 }} />
              <FontAwesomeIcon icon={faLeaf} size="2x" style={{ marginRight: 12 }} />
              <FontAwesomeIcon icon={faPython} size="2x" style={{ marginRight: 12 }} />
              <FontAwesomeIcon icon={faFlask} size="2x" />
            </div>
            <h3>Backend Development & APIs</h3>
            <p>
              Experience building and integrating APIs with Java (Spring Boot) and Python
              (Flask), alongside Node/Express. Focus on secure auth, database integration,
              and clean REST services to support scalable frontends.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsBackendExtended.map((label, i) => (
                <Chip key={i} className="chip" label={label} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Optional: resume-aligned outcome badges */}
        <motion.div className="metrics" variants={itemVariants}>
          <ul>
            <li>↓ 40% initial load time (Next.js SSR/SSG)</li>
            <li>↑ 15% mobile engagement (accessibility & UX)</li>
            <li>↑ 30% delivery speed (reusable components)</li>
            <li>95%+ test coverage on critical flows</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Expertise;
