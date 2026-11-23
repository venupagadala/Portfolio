import { GitHubIcon, LinkedInIcon, EmailIcon } from "./Icons";
import "../assets/styles/Main.scss";
import { profile } from "../data/resume";

const scrollTo = (id: string) => (e: React.MouseEvent) => {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  }
};

function Main() {
  return (
    <section className="hero" id="about" aria-labelledby="hero-name">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__status">
            <span className="hero__dot" aria-hidden="true" />
            {profile.currentRole} at {profile.currentCompany}
          </p>
          <h1 id="hero-name">{profile.name}</h1>
          <h2 className="hero__title">{profile.title}</h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#experience" onClick={scrollTo("experience")}>
              Experience
            </a>
            <a className="btn btn--ghost" href="#contact" onClick={scrollTo("contact")}>
              Contact me
            </a>
          </div>

          <ul className="hero__social" aria-label="Profiles">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <LinkedInIcon aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <GitHubIcon aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
                <EmailIcon aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Main;
