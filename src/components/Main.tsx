// Main.js
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../assets/styles/Main.scss";
import profilePic from "./../assets/images/dp.png";
import EmailIcon from "@mui/icons-material/Email";

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          {/* ADDED: alt text for the profile picture */}
          <img src={profilePic} alt="Venu Pagadala's profile avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a
              href="https://github.com/venupagadala"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile" // ADDED: aria-label
            >
              <GitHubIcon aria-hidden="true" /> {/* ADDED: aria-hidden */}
            </a>
            <a
              href="https://www.linkedin.com/in/venu-pagadala-77ab3a251/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile" // ADDED: aria-label
            >
              <LinkedInIcon aria-hidden="true" /> {/* ADDED: aria-hidden */}
            </a>
            <a 
              href="mailto:venupagadala13@gmail.com"
              aria-label="Email Venu" // ADDED: aria-label
            >
              <EmailIcon aria-hidden="true" /> {/* ADDED: aria-hidden */}
            </a>
          </div>
          <h1>Venu Pagadala</h1>
          <h2 className="job-title">Software Engineer</h2>

          <div className="mobile_social_icons">
            <a
              href="https://github.com/venupagadala"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile" 
            >
              <GitHubIcon aria-hidden="true" /> 
            </a>
            <a
              href="https://www.linkedin.com/in/venu-pagadala-77ab3a251/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile" 
            >
              <LinkedInIcon aria-hidden="true" /> 
            </a>
             <a 
              href="mailto:venupagadala13@gmail.com"
              aria-label="Email Venu" 
            >
              <EmailIcon aria-hidden="true" /> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;