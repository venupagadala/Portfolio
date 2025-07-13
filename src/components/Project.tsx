import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; // For viewport animations
import { motion, Variants, Transition } from "framer-motion"; // For animations, import Variants and Transition
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../assets/styles/Project.scss"; // Your styles

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
};

function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref: projectsGridRef, inView: projectsGridInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/venupagadala/repos"
        );
        const data: Repo[] = await res.json();
        const sortedData = data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setRepos(sortedData);
      } catch (err) {
        console.error("Error fetching repos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  // Explicitly type containerVariants as Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  // Explicitly type itemVariants as Variants
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        // FIX: Cast the cubic-bezier array to 'any' to satisfy TypeScript.
        // This is a common workaround for this specific type error in framer-motion.
        ease: [0.42, 0, 0.58, 1] as any,
      } as Transition, // Also cast the entire transition object to Transition
    },
  };

  return (
    <div id="projects" className="projects-container">
      <h1>Projects</h1>
      <p>
  A glimpse into the projects I’ve built — combining creativity, clean code, and modern web technologies.
</p>


      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <motion.div
          ref={projectsGridRef}
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={projectsGridInView ? "visible" : "hidden"}
        >
          {repos.map((repo) => (
            <motion.div
              className="project-card"
              key={repo.id}
              variants={itemVariants}
            >
              <div className="project-inner">
                {/* Visible always */}
                <div className="project-content">
                  <h3 className="project-title">{repo.name}</h3>
                  {/* <p className="project-description">{repo.description || "No description available."}</p> */}
                  <p className="project-language">
                    {repo.language || "Unknown"}
                  </p>
                </div>

                {/* On hover */}
                <div className="project-hover">
                  <h2 className="project-hover-title">{repo.name}</h2>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default Projects;
