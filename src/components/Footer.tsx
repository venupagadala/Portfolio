import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';  // Add this import
import '../assets/styles/Footer.scss';

function Footer() {
  return (
    <footer>
      <div className="social-icons">
        <a href="https://github.com/venupagadala" target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/venu-pagadala-77ab3a251" target="_blank" rel="noreferrer">
          <LinkedInIcon />
        </a>
        <a href="mailto:venupagadala13@gmail.com">
          <EmailIcon />
        </a>
      </div>
      <p>
  Thank you for visiting! <strong>Designed and developed by Venu Gopal Reddy Pagadala</strong> — passionate about clean code and elegant UI. Have a great day!</p>

    </footer>
  );
}

export default Footer;
