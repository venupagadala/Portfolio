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

          {/* Job: PNC Financial Services */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid white' }}
            date="Sep 2024 – Present"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Engineer – Frontend</h3>
            <h4 className="vertical-timeline-element-subtitle">PNC Financial Services – USA</h4>
            <p>
              Engineered responsive, WCAG-compliant dashboards using React.js, Next.js, and Tailwind CSS.
              Implemented Redux, React Router, and React Query to improve navigation and data performance.
              Collaborated with design teams via Figma, built modular UI components, and deployed with AWS Amplify & GitHub Actions.
            </p>
          </VerticalTimelineElement>

          {/* Job: Zensar Technologies- India  */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2021 – Jul 2023"
            iconStyle={{ background: '#5000ca', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Engineer – Frontend</h3>
            <h4 className="vertical-timeline-element-subtitle">Zensar Technologies – India</h4>
            <p>
              Developed scalable web apps using React.js and TypeScript with Bootstrap 5 and Material UI.
              Improved UI rendering with lazy loading, useMemo, and debounce.
              Migrated to Zustand for global state, integrated REST APIs with Axios & retry logic, and deployed with Netlify.
            </p>
          </VerticalTimelineElement>

          {/* Education: Masters */}
          <VerticalTimelineElement        
            className="vertical-timeline-element--education"
            date="Master's Degree"
            iconStyle={{ background: '#0077b6', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Master of Science – Computer Science</h3>
            <h4 className="vertical-timeline-element-subtitle">Kennesaw State University – Georgia, USA</h4>
            <p>
              Focused on advanced software engineering concepts, algorithms, and full-stack development.
              Completed projects in React, Node.js, and AI-enabled UI integrations.
            </p>
          </VerticalTimelineElement>

          {/* Education: Bachelors */}
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="Bachelor's Degree"
            iconStyle={{ background: '#0077b6', color: '#fff' }}
            icon={<FontAwesomeIcon icon={faGraduationCap} />}
          >
            <h3 className="vertical-timeline-element-title">Bachelor of Technology – Computer Science Engineering</h3>
            <h4 className="vertical-timeline-element-subtitle">LBRCE – India</h4>
            <p>
              Studied core computer science subjects including Data Structures, DBMS, Operating Systems, and Web Development.
              Participated in coding contests and academic projects.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
