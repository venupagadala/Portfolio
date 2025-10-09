import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, Variants, Transition } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../assets/styles/Project.scss";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
};

// Extended Repo type to include all languages
type RepoWithLanguages = Repo & {
  allLanguages: string[];
};

function Projects() {
  const [repos, setRepos] = useState<RepoWithLanguages[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: projectsGridRef, inView: projectsGridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchReposAndLanguages = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/venupagadala/repos"
        );
        const data: Repo[] = await res.json();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // Fetch all languages for each repo
        const reposWithLanguages = await Promise.all(
          sortedData.map(async (repo) => {
            const langRes = await fetch(
              `https://api.github.com/repos/venupagadala/${repo.name}/languages`
            );
            const langData = await langRes.json();
            return {
              ...repo,
              allLanguages: Object.keys(langData),
            };
          })
        );

        setRepos(reposWithLanguages);
      } catch (err) {
        console.error("Error fetching repos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReposAndLanguages();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1] as any,
      } as Transition,
    },
  };

  return (
    <section id="projects" className="projects">
      <header className="projects__header">
        <h1 className="projects__title">Projects</h1>
        <p className="projects__subtitle">
          A glimpse into the projects I’ve built, combining creativity, clean
          code, and modern web technologies.
        </p>
      </header>

      {loading ? (
        <p role="status" aria-live="polite">
          Loading projects…
        </p>
      ) : (
        <motion.div
          ref={projectsGridRef}
          className="projects__grid"
          variants={containerVariants}
          initial="hidden"
          animate={projectsGridInView ? "visible" : "hidden"}
        >
          {repos.map((repo) => (
            <motion.article
              key={repo.id}
              className="project-card"
              variants={itemVariants}
              aria-labelledby={`project-title-${repo.id}`}
            >
              <div className="project-card__top-layer">
                <div className="project-card__content">
                  <h3 id={`project-title-${repo.id}`} className="project-card__title">
                    {repo.name}
                  </h3>
                  <p className="project-card__description--visible">
                    {repo.description || "No description available."}
                  </p>
                </div>
                <div className="project-card__languages">
                  {repo.allLanguages.map((lang) => (
                    <span key={lang} className="language-tag">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="project-card__bottom-layer">
                <div className="project-card__details">
                  <h3 className="project-card__title">{repo.name}</h3>
                  <p className="project-card__description">
                    {repo.description || "No description available."}
                  </p>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__link"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <FontAwesomeIcon icon={faGithub} /> View on GitHub
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Projects;
