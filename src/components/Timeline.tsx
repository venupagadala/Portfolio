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
            <h3 className="vertical-timeline-element-title">Software Engineer</h3>
            <ul className="timeline-points">
              <li>Designed and built responsive online banking dashboards with React and Tailwind CSS.</li>
              <li>Introduced SSR and SSG in Next.js to improve SEO and reduce load times.</li>
              <li>Developed backend services using Java and Spring Boot to improve transaction efficiency.</li>
              <li>Deployed applications on AWS with GitHub Actions pipelines for faster releases.</li>
              <li>Implemented observability with the ELK Stack and built real-time pipelines with Kafka and PostgreSQL.</li>
            </ul>
          </VerticalTimelineElement>

          {/* Job: Zensar Technologies */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#ffffff", color: "rgb(39, 40, 34)" }}
            contentArrowStyle={{ borderRight: "7px solid #ffffff" }}
            date="Jul 2021 – Jul 2023"
            iconStyle={{ background: "#5000ca", color: "#fff" }}
            icon={<FontAwesomeIcon icon={faBriefcase} aria-hidden="true" />}
            aria-label="Zensar Technologies work experience"
          >
            <h3 className="vertical-timeline-element-title">Software Engineer</h3>
            <ul className="timeline-points">
              <li>Developed enterprise web applications with React, Angular, and TypeScript for banking and insurance clients.</li>
              <li>Built Spring Boot services integrated with third-party APIs to improve performance and reduce latency.</li>
              <li>Implemented cross-browser testing workflows that reduced UI defects and improved reliability.</li>
              <li>Optimized Core Web Vitals and caching strategies with Redis and CDNs for faster applications.</li>
              <li>Automated CI/CD pipelines with Jenkins and Docker to deliver faster, more reliable releases.</li>
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
            <h3 className="vertical-timeline-element-title">Master of Science in Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">Kennesaw State University — Georgia, USA</h4>
            <ul className="timeline-points">
              <li>Studied advanced topics in software engineering, algorithms, and system design.</li>
              <li>Built full-stack projects with React, Next.js, Node.js, and Python.</li>
              <li>Worked with backend frameworks like Flask and enterprise Java systems.</li>
              <li>Focused on applying theory to practical full-stack solutions.</li>
              <li>Prepared for professional roles through research and project work.</li>
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
            <h3 className="vertical-timeline-element-title">Bachelor of Technology in Computer Science & Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">Lakireddy Balireddy College of Engineering, India</h4>
            <ul className="timeline-points">
              <li>Completed coursework in core CS areas including data structures, databases, OS, and networks.</li>
              <li>Gained hands-on programming experience in Java and Python.</li>
            </ul>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
}

export default Timeline;
