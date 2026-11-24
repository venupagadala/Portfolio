import React from "react";

// Original countryside artwork, drawn in SVG and coloured by theme variables
// (morning in light mode, evening in dark mode). Decorative only.

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2.5" y="-14" width="5" height="16" rx="1" fill="var(--trunk)" />
      <circle cx="0" cy="-26" r="15" fill="var(--tree)" />
      <circle cx="-9" cy="-18" r="10" fill="var(--tree)" />
      <circle cx="9" cy="-19" r="11" fill="var(--tree)" />
    </g>
  );
}

function Poplar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-2" y="-10" width="4" height="12" fill="var(--trunk)" />
      <ellipse cx="0" cy="-32" rx="9" ry="26" fill="var(--tree)" />
    </g>
  );
}

export function Landscape() {
  const posts = Array.from({ length: 12 }, (_, i) => 1010 + i * 28);
  return (
    <svg
      className="landscape"
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {/* Sun by day, moon by night */}
      <circle className="landscape__halo" cx="1170" cy="96" r="70" fill="var(--sun)" />
      <circle cx="1170" cy="96" r="42" fill="var(--sun)" />

      {/* Night sky */}
      <g className="landscape__stars" fill="var(--sun)">
        {[
          [120, 60], [260, 110], [410, 48], [560, 92], [700, 40], [860, 84], [980, 34],
          [1320, 64], [1390, 128], [80, 150], [640, 140],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" />
        ))}
      </g>

      {/* Birds by day */}
      <g className="landscape__birds" fill="none" stroke="var(--ink-muted)" strokeWidth="2" strokeLinecap="round">
        <path d="M230 92q7-7 14 0q7-7 14 0" />
        <path d="M268 72q5-5 10 0q5-5 10 0" />
        <path d="M300 104q6-6 12 0q6-6 12 0" />
      </g>

      <path
        d="M0 214C170 150 360 176 520 192S860 140 1040 170 1320 150 1440 172V360H0Z"
        fill="var(--hill-far)"
      />
      <path
        d="M0 262C200 214 420 232 600 250S980 206 1180 234 1380 224 1440 238V360H0Z"
        fill="var(--hill-mid)"
      />

      {/* Barn on the middle hill */}
      <g transform="translate(940 214)">
        <rect x="0" y="0" width="58" height="36" fill="var(--barn)" />
        <path d="M-6 2L29-22L64 2Z" fill="var(--barn-roof)" />
        <rect x="21" y="14" width="16" height="22" fill="var(--barn-roof)" />
        <path d="M21 14L37 36M37 14L21 36" stroke="var(--barn)" strokeWidth="1.5" />
        <rect className="landscape__window" x="24" y="-8" width="10" height="9" fill="var(--sun)" />
      </g>

      <Tree x={292} y={248} s={1.1} />
      <Tree x={330} y={252} s={0.85} />
      <Poplar x={1236} y={236} />
      <Poplar x={1262} y={238} s={0.8} />

      <path d="M0 314C260 272 520 302 760 296S1200 268 1440 300V360H0Z" fill="var(--hill-near)" />

      {/* Fence on the near hill */}
      <g stroke="var(--fence)" strokeWidth="3" strokeLinecap="round">
        <path d="M1004 286Q1160 276 1324 282" fill="none" />
        <path d="M1004 298Q1160 288 1324 294" fill="none" />
        {posts.map((x) => (
          <path key={x} d={`M${x} ${281 - (x - 1004) * 0.012}v26`} />
        ))}
      </g>

      <Tree x={620} y={300} s={1.25} />
      <Tree x={140} y={318} s={1.4} />
    </svg>
  );
}

/** Small sprig used as a divider between sections. */
export function Sprig() {
  return (
    <div className="sprig" aria-hidden="true">
      <svg viewBox="0 0 44 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M4 18C14 16 26 12 40 4" />
        <path d="M14 15.5c-1-4 1-7 4-8-0.5 3.5-1.5 6-4 8Z" fill="currentColor" />
        <path d="M22 12.5c0-4.5 2.5-7 5.5-7.5-1 3.8-2.5 6-5.5 7.5Z" fill="currentColor" />
        <path d="M17 15c3.5 1.2 6.5 0.6 8.5-1.8-3.2-0.6-6 0-8.5 1.8Z" fill="currentColor" />
        <path d="M26 10.5c3.5 0.8 6.2 0 8-2.4-3-0.4-5.8 0.4-8 2.4Z" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Wavy meadow edge with grass tufts and a few wildflowers. Sits at the top
 * (or, flipped, the bottom) of a meadow-coloured band.
 */
export function MeadowEdge({ flip = false }: { flip?: boolean }) {
  const flowers: [number, number, string][] = [
    [90, 30, "var(--wheat)"], [240, 22, "var(--barn)"], [410, 34, "var(--paper)"],
    [620, 20, "var(--wheat)"], [790, 30, "var(--barn)"], [980, 24, "var(--paper)"],
    [1150, 32, "var(--wheat)"], [1320, 22, "var(--barn)"],
  ];
  return (
    <svg
      className={`meadow-edge${flip ? " meadow-edge--flip" : ""}`}
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 40C180 14 360 52 540 34S900 10 1080 32 1320 50 1440 28V70H0Z" fill="var(--meadow)" />
      {!flip && (
        <g stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" fill="none">
          {[60, 150, 300, 470, 560, 700, 860, 1040, 1200, 1380].map((x, i) => {
            const y = 38 - (i % 3) * 4;
            return <path key={x} d={`M${x} ${y}l-4-10M${x} ${y}l1-12M${x} ${y}l5-9`} />;
          })}
        </g>
      )}
      {!flip &&
        flowers.map(([x, y, c]) => (
          <g key={x}>
            <path d={`M${x} ${y + 12}V${y}`} stroke="var(--sage)" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="4" fill={c} />
            <circle cx={x} cy={y} r="1.5" fill="var(--wheat)" />
          </g>
        ))}
    </svg>
  );
}

/** Small hand-drawn icons for the skill "seed packets". */
export function SkillIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (name) {
    case "frontend": // sunflower
      return (
        <svg {...common}>
          <path d="M24 30v14M24 38c-4-1-7-4-8-8 4 1 7 4 8 8Z" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse key={a} cx="24" cy="10" rx="3" ry="6" transform={`rotate(${a} 24 18)`} />
          ))}
          <circle cx="24" cy="18" r="5" fill="currentColor" />
        </svg>
      );
    case "backend": // barn
      return (
        <svg {...common}>
          <path d="M6 20 24 6l18 14v22H6Z" />
          <path d="M18 42V28h12v14M18 28l12 14M30 28 18 42M20 18h8" />
        </svg>
      );
    case "data": // grain silo
      return (
        <svg {...common}>
          <path d="M12 16a8 8 0 0 1 16 0v26H12Z" />
          <path d="M12 24h16M12 32h16M28 26h10v16H28M38 26l-5-6-5 6" />
        </svg>
      );
    case "cloud": // clouds over a hill
      return (
        <svg {...common}>
          <path d="M14 22a6 6 0 0 1 1-12 8 8 0 0 1 15 2 5 5 0 0 1 1 10Z" />
          <path d="M4 42c8-8 16-10 24-6s12 2 16-2" />
        </svg>
      );
    case "quality": // watering can
      return (
        <svg {...common}>
          <path d="M10 20h20v18H10Z" />
          <path d="M30 24l10-8M38 14l4 4M10 24c-6 0-6 10 0 10M14 20c0-6 12-6 12 0" />
          <path d="M42 22v2M44 26v2M40 26v2" />
        </svg>
      );
    default: // sprout
      return (
        <svg {...common}>
          <path d="M24 42V22" />
          <path d="M24 26c-10 0-14-6-14-12 8 0 14 4 14 12Z" />
          <path d="M24 22c0-8 6-14 14-14 0 8-6 14-14 14Z" />
          <path d="M14 42h20" />
        </svg>
      );
  }
}

/** A rural mailbox on a post, for the contact section. */
export function Mailbox() {
  return (
    <svg className="mailbox" viewBox="0 0 220 260" aria-hidden="true" focusable="false">
      <ellipse cx="110" cy="248" rx="86" ry="10" fill="var(--meadow)" />
      <rect x="100" y="120" width="20" height="128" rx="2" fill="var(--fence)" />
      <path d="M40 70a40 40 0 0 1 40-40h70v84H40Z" fill="var(--barn)" />
      <path d="M150 30a30 30 0 0 1 30 30v54h-30Z" fill="var(--barn-roof)" />
      <path d="M150 30a30 30 0 0 1 30 30" fill="none" stroke="var(--paper)" strokeWidth="3" opacity="0.4" />
      <rect x="40" y="112" width="140" height="8" fill="var(--barn-roof)" />
      {/* Flag up: there's mail */}
      <rect x="60" y="36" width="6" height="64" fill="var(--wheat)" />
      <rect x="60" y="36" width="34" height="20" fill="var(--wheat)" />
      {/* Letter peeking out */}
      <g transform="rotate(-8 170 70)">
        <rect x="160" y="58" width="44" height="30" rx="2" fill="var(--card)" stroke="var(--rule)" strokeWidth="2" />
        <path d="M160 60l22 16 22-16" fill="none" stroke="var(--rule)" strokeWidth="2" />
      </g>
      {/* Grass at the post */}
      <g stroke="var(--sage)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M92 248l-6-16M98 248l-2-18M124 248l4-16M130 248l8-14M86 248l-10-10" />
      </g>
    </svg>
  );
}
