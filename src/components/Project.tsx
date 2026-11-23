import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "../assets/styles/Project.scss";
import { profile } from "../data/resume";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
  pushed_at: string;
  languages_url: string;
  fork: boolean;
  archived: boolean;
};

type RepoWithLanguages = Repo & {
  allLanguages: string[];
};

function Projects() {
  const [repos, setRepos] = useState<RepoWithLanguages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const CACHE_KEY = "gh-repos-v3";
    const CACHE_TTL = 1000 * 60 * 60; // 1h: unauthenticated GitHub API allows 60 req/h per IP

    const readCache = (): RepoWithLanguages[] | null => {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { at, data } = JSON.parse(raw);
        return Date.now() - at < CACHE_TTL ? data : null;
      } catch {
        return null;
      }
    };

    const fetchReposAndLanguages = async () => {
      const cached = readCache();
      if (cached) {
        setRepos(cached);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=100`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }
        const data: Repo[] = await res.json();
        const visible = data
          .filter((r) => !r.fork && !r.archived && r.name !== profile.githubUser)
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 9);

        const settled = await Promise.allSettled(
          visible.map(async (repo) => {
            const langRes = await fetch(repo.languages_url, { signal: controller.signal });
            if (!langRes.ok) throw new Error("languages unavailable");
            return Object.keys(await langRes.json());
          })
        );
        const withLanguages = visible.map((repo, i) => {
          const result = settled[i];
          return {
            ...repo,
            allLanguages:
              result.status === "fulfilled" ? result.value : repo.language ? [repo.language] : [],
          };
        });

        setRepos(withLanguages);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: withLanguages }));
        } catch {
          /* storage unavailable: fine, we just refetch next visit */
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Error fetching repos", err);
        setError("GitHub is not responding right now.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    fetchReposAndLanguages();
    return () => controller.abort();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <p role="status" aria-live="polite" className="projects__status-message">
          Loading projects…
        </p>
      );
    }

    if (error) {
      return (
        <p role="alert" className="projects__error-message">
          {error}{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            Browse my repositories on GitHub
          </a>
          .
        </p>
      );
    }

    return (
      <div className="projects__grid">
        {repos.map((repo) => (
          <article
            key={repo.id}
            className="project-card"
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
          </article>
        ))}
      </div>
    );
  };

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <header className="section-header">
        <h2 id="projects-title">Projects</h2>
        <p>Personal projects from my GitHub.</p>
      </header>
      {renderContent()}
    </section>
  );
}

export default Projects;
