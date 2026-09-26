import type { ReactNode } from 'react';

// Two-tone icons for the bio. Named parts animate once the section is lit.
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="bio-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function PalmIcon() {
  return (
    <Icon>
      <path d="M12 22c0-4 .4-7.3 1.5-11" />
      <g className="palm-fronds">
        <path
          className="duo"
          d="M13.5 11C11 7.5 7 7 4 8.5c3-.2 6 .8 9.5 2.5Z"
        />
        <path
          className="duo"
          d="M13.5 11c1-3.5 4.5-6 8.5-5.5-3 .8-5.8 2.8-8.5 5.5Z"
        />
        <path
          className="duo"
          d="M13.5 11c-1-3 0-6.5 2.5-8.5-.8 2.8-1.5 5.5-2.5 8.5Z"
        />
        <path
          className="duo"
          d="M13.5 11c-3 .3-6.5 2.5-7.5 6 2.2-2.5 4.8-4.4 7.5-6Z"
        />
        <path className="duo" d="M13.5 11c3 0 6 2 7 5.5-2-2.3-4.5-4.2-7-5.5Z" />
      </g>
    </Icon>
  );
}

export function ServerIcon() {
  return (
    <Icon>
      <rect className="duo" x="3" y="4" width="18" height="7" rx="2" />
      <rect className="duo" x="3" y="13" width="18" height="7" rx="2" />
      <path d="M11 7.5h6M11 16.5h6" />
      <circle
        className="server-led"
        cx="7"
        cy="7.5"
        r="1"
        fill="currentColor"
      />
      <circle
        className="server-led"
        cx="7"
        cy="16.5"
        r="1"
        fill="currentColor"
      />
    </Icon>
  );
}

export function HeartIcon() {
  return (
    <Icon>
      <path
        className="duo heart-shape"
        d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"
      />
      <path className="heart-pulse" d="M7 12.5h2.5l1.2-2.5 2.2 5 1.3-2.5H17" />
    </Icon>
  );
}

export function TruckIcon() {
  return (
    <Icon>
      <g className="truck-body">
        <rect className="duo" x="2" y="6" width="11.5" height="9.5" rx="1.5" />
        <path className="duo" d="M13.5 9.5h4l3 3.5v2.5h-7Z" />
      </g>
      <circle className="truck-wheel" cx="6.5" cy="17.5" r="2" />
      <circle className="truck-wheel" cx="16.5" cy="17.5" r="2" />
    </Icon>
  );
}

export function SparkleIcon() {
  return (
    <Icon>
      <path
        className="duo sparkle-main"
        d="M10 3l1.8 4.9L17 10l-5.2 2.1L10 17l-1.8-4.9L3 10l5.2-2.1Z"
      />
      <path
        className="duo sparkle-small"
        d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8Z"
      />
      <circle
        className="sparkle-dot"
        cx="19"
        cy="5"
        r="1"
        fill="currentColor"
      />
    </Icon>
  );
}
