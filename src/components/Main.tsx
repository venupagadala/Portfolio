import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePic from './../assets/images/profile.jpeg';
import EmailIcon from '@mui/icons-material/Email';  // Add this import
import './Main.scss'


function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePic} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/venupagadala" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/venu-pagadala-77ab3a251/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="mailto:venupagadala13@gmail.com">
          <EmailIcon />
        </a>
          </div>
          <h1>Venu Pagadala</h1>
          <h2>Frontend Developer</h2>

          <div className="mobile_social_icons">
            <a href="https://github.com/yujisatojr" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/yujisato/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;