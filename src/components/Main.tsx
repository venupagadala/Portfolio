import "../assets/styles/Main.scss";
import { profile } from "../data/resume";
import { Landscape } from "./Scenery";

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
      <div className="hero__text">
        <p className="hero__hello">Hello, I'm</p>
        <h1 id="hero-name">{profile.name}</h1>
        <p className="hero__title">
          {profile.title} <span>·</span> currently {profile.currentRole} at {profile.currentCompany}
        </p>
        <p className="hero__summary">{profile.tagline}</p>

        <div className="hero__actions">
          <a className="button button--solid" href="#experience" onClick={scrollTo("experience")}>
            Read my experience
          </a>
          <a className="button button--plain" href="#contact" onClick={scrollTo("contact")}>
            Get in touch
          </a>
        </div>

        <p className="hero__links">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      </div>

      <Landscape />
    </section>
  );
}

export default Main;
