import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
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
              Developed scalable and accessible UIs using React, Next.js, TypeScript, and Tailwind CSS. Integrated REST APIs with React Query, optimized Core Web Vitals, and built CI/CD pipelines via GitHub Actions and Vercel.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jan 2022 – Jul 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Frontend Developer – React.js / UI Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Divami Design Labs – Hyderabad, India</h4>
            <p>
              Built modular components using React, Zustand, and Tailwind CSS. Translated Figma designs to pixel-perfect UI, ensured cross-browser compatibility, and participated in Agile-based code reviews and QA testing.
            </p>
          </VerticalTimelineElement>

      
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
