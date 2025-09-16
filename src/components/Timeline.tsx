import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";

function Timeline() {
  return (
    <section id="history" aria-label="Career and education history">
      <div className="items-container">
        <h1 className="timeline-title">Career & Education History</h1>

        <VerticalTimeline>
          {/* Job: PNC Financial Services */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#ffffff", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
            date="Sep 2024 – Present"
            iconStyle={{ background: "#5000ca", color: "#fff" }}
            icon={<FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />}
            aria-label="PNC Financial Services work experience"
          >
            <h3 className="vertical-timeline-element-title">Software Developer</h3>
            {/* <h4 className="vertical-timeline-element-subtitle">PNC Financial Services, USA</h4> */}
            <ul className="timeline-points">
              <li>
                Built <strong>responsive, WCAG-compliant</strong> dashboards using React.js, Next.js, Tailwind CSS and boosting mobile engagement by <strong>15%</strong>.
              </li>
              <li>
                Implemented <strong>SSR/SSG</strong> with Next.js, reducing initial load times by <strong>40%</strong> and improving SEO.
              </li>
              <li>
                Optimized dynamic data handling with <strong>React Query</strong>, cutting redundant API calls and improving load times by <strong>30%</strong>.
              </li>
              <li>
                Delivered CI/CD pipelines with <strong>GitHub Actions</strong> → <strong>AWS Amplify</strong>, reducing deployment time from hours to under 10 minutes.
              </li>
              <li>
                Strengthened quality with <strong>Jest/RTL</strong> tests, achieving ~<strong>95%</strong> coverage across critical flows.
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* Job: Zensar Technologies */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#ffffff", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
            date="Aug 2021 – Jul 2023"
            iconStyle={{ background: "#5000ca", color: "#fff" }}
            icon={<FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />}
            aria-label="Zensar Technologies work experience"
          >
            <h3 className="vertical-timeline-element-title">Software Developer</h3>
            {/* <h4 className="vertical-timeline-element-subtitle">Zensar Technologies, India</h4> */}
            <ul className="timeline-points">
              <li>
                Developed scalable web apps using <strong>React.js + TypeScript</strong> with Bootstrap 5 and Material UI.
              </li>
              <li>
                Enhanced rendering with <strong>lazy loading, useMemo, debounce</strong>, and delivered apps scoring <strong>95+ Lighthouse</strong>.
              </li>
              <li>
                Contributed to design systems and <strong>cross-browser/device testing</strong>, cutting UI defects by <strong>45%</strong>.
              </li>
              <li>
                Integrated secure <strong>REST APIs</strong> with Axios (retry logic & error boundaries), reducing UI crashes by <strong>45%</strong>.
              </li>
              <li>
                Deployed builds via <strong>Netlify + Webpack</strong> with automated pipelines for faster iterations.
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* Education: Master's */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "#ffffff", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
            date="Dec 2024"
            iconStyle={{ background: "#0077b6", color: "#fff" }}
            icon={<FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />}
            aria-label="Master of Science in Computer Science"
          >
            <h3 className="vertical-timeline-element-title">Master's in Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">Kennesaw State University — Georgia, USA</h4>
            <ul className="timeline-points">
              <li>
                Focused on <strong>software engineering, algorithms, and system design</strong>.
              </li>
              <li>
                Built full-stack projects with <strong>React, Next.js, Node.js, and Python</strong>.
              </li>
              <li>
                Explored backend frameworks like <strong>Flask</strong> and enterprise-level concepts in <strong>Java</strong>.
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* Education: Bachelor's */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "#ffffff", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
            date="Apr 2023"
            iconStyle={{ background: "#0077b6", color: "#fff" }}
            icon={<FontAwesomeIcon icon={faGraduationCap} aria-hidden="true" />}
            aria-label="Bachelor of Technology in Computer Science and Engineering"
          >
            <h3 className="vertical-timeline-element-title">B.Tech in Computer Science & Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">Lakireddy Balireddy College of Engineering, India</h4>
            <ul className="timeline-points">
              <li>
                Studied <strong>core CS subjects</strong>: Data Structures, DBMS, OS, Networks, and Web Development.
              </li>
              <li>
                Gained practical exposure to <strong>Java</strong> and <strong>Python</strong> programming with project work.
              </li>
              <li>
                Completed academic projects in <strong>full-stack web development</strong> and participated in coding contests.
              </li>
            </ul>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
}

export default Timeline;
