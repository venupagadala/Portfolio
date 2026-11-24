import React, { useEffect, useState } from "react";
import "../assets/styles/Project.scss";
import { profile } from "../data/resume";
import { GitHubIcon } from "./Icons";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  pushed_at: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
};

type Lang = { name: string; pct: number };
type RepoCardData = Repo & { languages: Lang[] };

const CACHE_KEY = "gh-repos-v4";
const CACHE_TTL = 1000 * 60 * 60; // GitHub allows 60 anonymous requests per hour per IP
const SHOW = 6;

// GitHub's own language colours, so the bar reads like it does on GitHub.
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Python: "#3572A5",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
  MDX: "#fcb32c",
  Dockerfile: "#384d54",
};
const langColor = (name: string) => LANG_COLORS[name] ?? "#8b949e";

const titleCase = (slug: string) =>
  slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
function updatedAgo(iso: string) {
  const days = Math.round((Date.parse(iso) - Date.now()) / 86_400_000);
  if (Math.abs(days) < 1) return "today";
  if (Math.abs(days) < 30) return rtf.format(days, "day");
  if (Math.abs(days) < 365) return rtf.format(Math.round(days / 30), "month");
  return rtf.format(Math.round(days / 365), "year");
}

function readCache(): RepoCardData[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? data : null;
  } catch {
    return null;
  }
}

function writeCache(data: RepoCardData[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage unavailable: we just refetch next visit */
  }
}

const StarIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M8 .25a.75.75 0 0 1 .67.42l1.88 3.8 4.2.61a.75.75 0 0 1 .41 1.28l-3.04 2.96.72 4.18a.75.75 0 0 1-1.09.79L8 12.34l-3.75 1.97a.75.75 0 0 1-1.09-.79l.72-4.18L.84 6.38a.75.75 0 0 1 .41-1.28l4.2-.61L7.33.67A.75.75 0 0 1 8 .25Z"
    />
  </svg>
);

const ForkIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 5.37v.88c0 .41.34.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.88a2.25 2.25 0 1 1 1.5 0v.88a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.13a2.25 2.25 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.88a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"
    />
  </svg>
);

const RepoIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.71 1.71.75.75 0 0 1-1.07 1.06A2.49 2.49 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.71A2.49 2.49 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.09a.25.25 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"
    />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

function RepoCard({ repo }: { repo: RepoCardData }) {
  const top = repo.languages.slice(0, 3);
  const titleId = `repo-${repo.id}`;
  return (
    <article className="repo-card" aria-labelledby={titleId}>
      <header className="repo-card__head">
        <span className="repo-card__icon">
          <RepoIcon />
        </span>
        <div className="repo-card__titles">
          <h3 id={titleId}>{titleCase(repo.name)}</h3>
          <code>{repo.name}</code>
        </div>
      </header>

      <p className={`repo-card__desc${repo.description ? "" : " is-empty"}`}>
        {repo.description || "No description yet."}
      </p>

      {repo.languages.length > 0 && (
        <div className="repo-card__langs">
          <div
            className="repo-card__bar"
            role="img"
            aria-label={`Languages: ${repo.languages.map((l) => `${l.name} ${l.pct}%`).join(", ")}`}
          >
            {repo.languages.map((l) => (
              <span key={l.name} style={{ width: `${l.pct}%`, background: langColor(l.name) }} />
            ))}
          </div>
          <ul>
            {top.map((l) => (
              <li key={l.name}>
                <i style={{ background: langColor(l.name) }} aria-hidden="true" />
                {l.name} <span>{l.pct}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <footer className="repo-card__foot">
        <span className="repo-card__meta">
          {repo.stargazers_count > 0 && (
            <span title="Stars">
              <StarIcon /> {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span title="Forks">
              <ForkIcon /> {repo.forks_count}
            </span>
          )}
          <span>Updated {updatedAgo(repo.pushed_at)}</span>
        </span>
        <span className="repo-card__links">
          {repo.homepage && (
            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${repo.name}`}>
              Live demo <ArrowIcon />
            </a>
          )}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label={`Source code of ${repo.name} on GitHub`}>
            Code <ArrowIcon />
          </a>
        </span>
      </footer>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="repo-card repo-card--skeleton" aria-hidden="true">
      <span className="sk sk--title" />
      <span className="sk sk--line" />
      <span className="sk sk--line short" />
      <span className="sk sk--bar" />
      <span className="sk sk--foot" />
    </div>
  );
}

function Projects() {
  const [repos, setRepos] = useState<RepoCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const cached = readCache();
    if (cached) {
      setRepos(cached);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=100`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
        const data: Repo[] = await res.json();

        const visible = data
          .filter((r) => !r.fork && !r.archived && r.name !== profile.githubUser)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              Date.parse(b.pushed_at) - Date.parse(a.pushed_at)
          )
          .slice(0, SHOW);

        const settled = await Promise.allSettled(
          visible.map(async (repo) => {
            const r = await fetch(repo.languages_url, { signal: controller.signal });
            if (!r.ok) throw new Error("languages unavailable");
            return (await r.json()) as Record<string, number>;
          })
        );

        const cards: RepoCardData[] = visible.map((repo, i) => {
          const s = settled[i];
          let languages: Lang[] = repo.language ? [{ name: repo.language, pct: 100 }] : [];
          if (s.status === "fulfilled") {
            const total = Object.values(s.value).reduce((a, b) => a + b, 0) || 1;
            languages = Object.entries(s.value)
              .map(([name, bytes]) => ({ name, pct: Math.round((bytes / total) * 1000) / 10 }))
              .filter((l) => l.pct >= 0.5)
              .sort((a, b) => b.pct - a.pct);
          }
          return { ...repo, languages };
        });

        setRepos(cards);
        writeCache(cards);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        // Usually GitHub's anonymous rate limit; the UI shows a fallback link.
        console.warn("Could not load GitHub repos:", (err as Error).message);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title">
      <header className="section-head projects__header">
        <div>
          <p className="kicker">Things I build for fun</p>
          <h2 id="projects-title">Projects</h2>
          <p>Personal projects from my GitHub.</p>
        </div>
        <a className="button button--plain" href={profile.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon /> View all on GitHub
        </a>
      </header>

      {error ? (
        <p role="status" className="projects__fallback">
          GitHub isn't responding right now.{" "}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            Browse my repositories on GitHub
          </a>
          .
        </p>
      ) : (
        <div className="repo-grid" aria-busy={loading}>
          {loading
            ? Array.from({ length: SHOW }, (_, i) => <SkeletonCard key={i} />)
            : repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}
    </section>
  );
}

export default Projects;
