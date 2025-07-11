// 



import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career & Education History</h1>
        <VerticalTimeline>
          {/* Job: AT&T */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Jan 2024 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Engineer – React/Next.js</h3>
            <h4 className="vertical-timeline-element-subtitle">AT&T Services Inc. – Atlanta, GA</h4>
            <p>
              Developed scalable and accessible UIs using React, Next.js, TypeScript, and Tailwind CSS.
              Integrated REST APIs with React Query, optimized Core Web Vitals, and built CI/CD pipelines via GitHub Actions and Vercel.
            </p>
          </VerticalTimelineElement>

          {/* Job: Divami Design Labs */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jan 2021 – Jul 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer – React.js / UI Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Divami Design Labs – Hyderabad, India</h4>
            <p>
              Built modular components using React, Zustand, and Tailwind CSS. Translated Figma designs to pixel-perfect UI,
              ensured cross-browser compatibility, and participated in Agile-based code reviews and QA testing.
            </p>
          </VerticalTimelineElement>

          {/* Education: Masters */}
          <VerticalTimelineElement        
            className="vertical-timeline-element--education"
            date="Masters Degree"
            iconStyle={{ background: '#0077b6', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Master of Science – Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">Kennesaw State University – Georgia, USA</h4>
            <p>
              Focused on Data Structures, Advanced Algorithms, and Machine Learning. Built GenAI-based UI prototypes integrating OpenAI APIs.
            </p>
          </VerticalTimelineElement>

          {/* Education: Bachelors */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="Bachelor's Degree"
            iconStyle={{ background: '#0077b6', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Bachelor of Technology – Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">LBRCE – AP, India</h4>
            <p>
              Studied Programming Fundamentals, Operating Systems, DBMS, and Software Engineering. Participated in coding contests and academic projects.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
