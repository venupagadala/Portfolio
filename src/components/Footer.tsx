import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { profile } from "../data/resume";
import "../assets/styles/Footer.scss";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="social-icons">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <LinkedInIcon aria-hidden="true" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <GitHubIcon aria-hidden="true" />
        </a>
        <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
          <EmailIcon aria-hidden="true" />
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} {profile.fullName}
      </p>
    </footer>
  );
}

export default Footer;
