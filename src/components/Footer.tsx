import React from "react";
import { profile } from "../data/resume";
import "../assets/styles/Footer.scss";

function Footer() {
  return (
    <footer className="site-footer">
      <svg className="site-footer__hills" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60C220 20 420 46 640 50S1100 14 1440 46V90H0Z" fill="var(--hill-mid)" />
        <path d="M0 76C300 50 620 78 900 70S1260 52 1440 66V90H0Z" fill="var(--hill-near)" />
      </svg>
      <div className="site-footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. Designed and built by hand.
        </p>
        <p className="site-footer__links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
