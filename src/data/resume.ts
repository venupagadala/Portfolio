// Single source of truth for portfolio content. Mirrors the resume, so a
// resume update is one edit here rather than a hunt through components.

export const profile = {
  name: "Venu Pagadala",
  fullName: "Venu Gopal Pagadala",
  title: "Senior Full Stack Engineer",
  tagline:
    "I'm a full stack engineer with 5+ years of experience, currently working on HD Supply's e-commerce site. Most of my work is in React and Next.js, plus the Java Spring Boot and Node.js services behind them. I've worked on the homepage, search, product pages and order flows, and I spend a fair amount of time on performance, caching and production support. Before HD Supply I built customer-facing apps at AT&T and partner portals at Essilor. I'm currently looking for my next role as a senior full stack or frontend engineer, so if you're hiring, I'd be glad to talk.",
  currentRole: "Sr. Frontend Engineer (Full Stack)",
  currentCompany: "HD Supply / Home Depot",
  yearsExperience: "5+",
  email: "venupagadala.ui@gmail.com",
  linkedin: "https://www.linkedin.com/in/venu-pagadala-77ab3a251/",
  github: "https://github.com/venupagadala",
  githubUser: "venupagadala",
};

export const summary: string[] = [
  "Full stack engineer with 5+ years building enterprise web applications for teams at HD Supply and AT&T.",
  "Owns features end to end: UI from Figma, REST APIs and microservices, PostgreSQL data access, analytics, tests and production release.",
  "Strong in production support: Splunk traces, root-cause analyses and hotfix backports across live release branches.",
  "Hands-on with Core Web Vitals, layout-shift fixes, page-cache strategy and Redis caching for high-traffic commerce pages.",
  "Active promoter of AI in development: helped build Claude-based agentic workflows that let developers review code and raise pull requests locally.",
];

export type Metric = { value: string; label: string };

export const impactMetrics: Metric[] = [
  { value: "12%", label: "lift in homepage add-to-cart rate at HD Supply" },
  { value: "<150ms", label: "API responses with PostgreSQL + Redis caching" },
  { value: "58%", label: "smaller bundle, TTI 4.2s to 1.8s at AT&T" },
  { value: "50K+", label: "daily active users on the AT&T app" },
];

export type HighlightGroup = { title: string; items: string[] };

export type Role = {
  id: string;
  company: string;
  monogram: string;
  role: string;
  employment?: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  metrics: Metric[];
  keyWins: string[];
  groups: HighlightGroup[];
  stack: string[];
  liveSite?: { label: string; href: string; areas: string[] };
};

export const experience: Role[] = [
  {
    id: "hd-supply",
    company: "HD Supply / Home Depot",
    monogram: "HD",
    role: "Sr. Frontend Engineer (Full Stack)",
    location: "USA",
    start: "Aug 2025",
    end: "Present",
    current: true,
    summary:
      "Building the HD Supply e-commerce storefront on a headless Next.js and Optimizely CMS platform, plus the Java services behind it.",
    metrics: [
      { value: "12%", label: "homepage add-to-cart lift" },
      { value: "<150ms", label: "API response times" },
      { value: "~7K", label: "lines moved to HATEOAS" },
    ],
    keyWins: [
      "Built the homepage recommendation experience on the new recommendations service (Buy It Again carousels, CMS fallbacks, skeleton lazy loading), contributing to a 12% lift in homepage add-to-cart rate.",
      "Moved the storefront homepage from legacy WCS to headless Next.js and Optimizely CMS 12, with CMS-driven React components business authors manage without code releases.",
      "Developed Java Spring Boot REST microservices for recommendations, account and order history, with PostgreSQL queries and Redis caching that keep responses under 150ms.",
    ],
    groups: [
      {
        title: "Performance & caching",
        items: [
          "Built a CMS Dimensions block that reserves layout space per content block, targeting guest CLS from 0.546 down to the 0.1 Core Web Vitals budget.",
          "Fixed cached pages serving stale CSS after every deploy (about 1s of unstyled PDP) and added a fixed daily refresh window for PDP caches so pricing and content stay current.",
        ],
      },
      {
        title: "Search, sessions & commerce",
        items: [
          "Moved header search auto-suggest to server-driven HATEOAS actions across roughly 7K lines of frontend and API code.",
          "Resolved session and auth defects across the Next.js BFF and Java services: an account-switch race, expired-session sign-in, a punchout redirect loop and the account validation modal.",
          "Fixed Custom Cut Blinds order lines losing configuration attributes on the way to SAP, and backported the fix to release v2.85.",
          "Fixed on-behalf-of analytics recording two user IDs per sales rep and customer pair, and added add-to-cart tracking so marketing attributes revenue correctly.",
        ],
      },
      {
        title: "Production support",
        items: [
          "Traced production issues through Splunk logs and API traces, shipped hotfix backports to releases v2.77 through v2.85, and wrote root-cause analyses, including one tying 14 to 24% of failing order history loads to a single cause.",
        ],
      },
      {
        title: "AI-assisted SDLC & team",
        items: [
          "Worked with our architect on a Claude-based AI-assisted SDLC, writing reusable skills that let developers run code reviews and raise pull requests from their local setup, and helped the team adopt it.",
          "Wrote Jest and React Testing Library tests for components and hooks, and reviewed teammates' pull requests during sprint delivery.",
        ],
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Optimizely CMS 12",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "Splunk",
      "Adobe Analytics",
      "SAP",
      "Claude",
    ],
    liveSite: {
      label: "hdsupplysolutions.com",
      href: "https://hdsupplysolutions.com",
      areas: ["Homepage", "Product listing (PLP)", "Product detail (PDP)", "Header search"],
    },
  },
  {
    id: "att",
    company: "AT&T Services, Inc.",
    monogram: "AT",
    role: "Software Engineer",
    employment: "Contract",
    location: "USA",
    start: "Aug 2024",
    end: "Jul 2025",
    summary:
      "Full stack features for a customer-facing React and Next.js application covering account, billing and orders.",
    metrics: [
      { value: "58%", label: "smaller bundle" },
      { value: "1.8s", label: "TTI, down from 4.2s" },
      { value: "+9%", label: "autopay enrollment" },
    ],
    keyWins: [
      "Built account, billing and order screens from Figma for a React and Next.js app serving 50K+ daily active users.",
      "Rebuilt the online payment and autopay enrollment flow in Next.js, raising digital autopay enrollment by 9% and reducing billing calls to support.",
      "Reduced the frontend bundle by 58% with code splitting, server rendering and lazy loading, bringing Time-to-Interactive from 4.2s to 1.8s.",
    ],
    groups: [
      {
        title: "Backend & data",
        items: [
          "Developed Node.js and Express REST microservices and a backend-for-frontend combining several enterprise systems, with OAuth2/JWT auth and session management.",
          "Wrote and optimized PostgreSQL queries on AWS RDS for account and transaction lookups, adding indexes that cut response times on high-traffic endpoints.",
          "Cut redundant API calls by 40% with TanStack Query caching on the client and response caching in the Node.js layer.",
        ],
      },
      {
        title: "Real-time & reliability",
        items: [
          "Added real-time order and service status over WebSockets, with reconnect logic and a polling fallback for unstable mobile networks.",
          "Investigated incidents across the UI, Node.js services and downstream systems using logs and traces, helping keep the platform at 99.98% uptime.",
          "Set up CI/CD with GitHub Actions, Docker and Kubernetes for automated builds, tests and deployments.",
        ],
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "AWS RDS",
      "TanStack Query",
      "WebSockets",
      "OAuth2/JWT",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
  },
  {
    id: "essilor",
    company: "Essilor Group",
    monogram: "EG",
    role: "Frontend Developer",
    location: "India",
    start: "Jun 2020",
    end: "Jul 2023",
    summary:
      "Customer and partner portals with Angular and React, backed by Java Spring Boot services.",
    metrics: [
      { value: "30%", label: "faster order entry" },
      { value: "+15%", label: "online partner orders" },
      { value: "99.9%", label: "API availability" },
    ],
    keyWins: [
      "Redesigned the partner order entry flow, cutting average order entry time by 30% and helping grow online partner orders by 15%.",
      "Built Spring Boot microservices for high-volume transaction lookups, maintaining 99.9% API availability across millions of daily requests.",
      "Created a reusable component library in Storybook with WCAG 2.1 AA accessibility built in, used by several product teams.",
    ],
    groups: [
      {
        title: "Frontend",
        items: [
          "Built customer and partner portals with Angular and React for onboarding, order tracking and policy workflows.",
          "Developed an Angular operations app with RxJS and reactive forms for order review, data tables and bulk updates.",
          "Improved rendering performance by about 35% with OnPush change detection in Angular and memoized selectors in React.",
        ],
      },
      {
        title: "Backend, data & quality",
        items: [
          "Designed relational tables and wrote PostgreSQL queries with joins and indexes for customer, policy and document reporting.",
          "Built secure document upload to AWS S3 through REST APIs, with file validation, progress tracking and retry handling.",
          "Added automated tests with JUnit, Mockito and Jest across backend and frontend, reducing defects that reached production.",
        ],
      },
    ],
    stack: [
      "Angular",
      "React",
      "RxJS",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "AWS S3",
      "Storybook",
      "JUnit",
      "Jest",
    ],
  },
];

export type SkillGroup = { title: string; icon: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "frontend",
    items: [
      "React 19",
      "Next.js (App Router, RSC)",
      "Angular",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
      "RxJS",
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    items: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Express",
      "RESTful APIs",
      "Microservices",
      "GraphQL",
      "Backend-for-Frontend",
      "HATEOAS",
      "OAuth2/JWT",
      "Session Management",
    ],
  },
  {
    title: "Databases & Caching",
    icon: "data",
    items: [
      "PostgreSQL",
      "AWS RDS",
      "SQL Query Tuning",
      "Relational Schema Design",
      "Redis",
      "MongoDB",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: [
      "AWS (RDS, Lambda, S3)",
      "Docker",
      "Kubernetes",
      "Cloudflare Workers",
      "GitHub Actions",
      "Jenkins",
      "CI/CD Pipelines",
    ],
  },
  {
    title: "Monitoring & Testing",
    icon: "quality",
    items: [
      "Splunk",
      "Adobe Analytics",
      "Lighthouse",
      "Jest",
      "React Testing Library",
      "JUnit",
      "Mockito",
      "Storybook",
    ],
  },
  {
    title: "CMS, Commerce & AI Tools",
    icon: "ai",
    items: [
      "Optimizely CMS 12",
      "SAP Order Integration",
      "NX Monorepo",
      "Jira",
      "Git",
      "GitHub Copilot",
      "Claude agentic workflows",
    ],
  },
];

export type FeaturedArea = { title: string; points: string[] };

export const featuredWork = {
  title: "HD Supply storefront",
  href: "https://hdsupplysolutions.com",
  linkLabel: "hdsupplysolutions.com",
  blurb:
    "HD Supply's B2B e-commerce site. These are the parts of it I've worked on.",
  areas: [
    {
      title: "Homepage",
      points: [
        "Personalized recommendation carousels (Buy It Again) with CMS fallbacks",
        "Headless move from WCS to Next.js + Optimizely CMS 12",
        "Layout-space reservation to bring CLS within budget",
      ],
    },
    {
      title: "Search & PLP",
      points: [
        "Header search auto-suggest on server-driven HATEOAS actions",
        "Add-to-cart tracking for revenue attribution",
      ],
    },
    {
      title: "PDP & orders",
      points: [
        "Fixed stale CSS on cached pages after deploys",
        "Daily PDP cache refresh window for current pricing",
        "Custom Cut Blinds configuration flowing correctly into SAP",
      ],
    },
  ] as FeaturedArea[],
  stack: ["Next.js", "React", "Optimizely CMS 12", "Spring Boot", "Redis", "Splunk"],
};

export const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "Kennesaw State University",
    location: "Georgia, USA",
    year: "2024",
  },
  {
    degree: "Bachelor of Technology in Computer Science Engineering",
    school: "Lakireddy Balireddy College of Engineering",
    location: "India",
    year: "",
  },
];

export const awards = [
  {
    title: "Star Award, HD Supply",
    date: "Nov 2026",
    detail:
      "Recognized for the homepage release, active sprint participation, thorough code reviews and clearing launch bugs.",
    highlight: true,
  },
  {
    title: "GitHub Copilot Certified Developer",
    date: "",
    detail: "AI-assisted code generation and pair programming.",
  },
  {
    title: "Next.js & React Performance Mastery",
    date: "",
    detail: "Core Web Vitals, code splitting, and SSR/SSG.",
  },
  {
    title: "TypeScript Advanced Patterns",
    date: "",
    detail: "Discriminated unions, generics and type narrowing for enterprise apps.",
  },
];
