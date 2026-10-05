import { useEffect, useRef, useState } from 'react';

// The front page and the checkmark share five points, so one morphs into the
// other: the page’s corners fold down into the check’s stroke.
const PAGE = 'M9 9 L20 9 L20 20 L9 20 L9 9';
const CHECK = 'M4.5 12.5 L9 17 L19.5 6.5 L19.5 6.5 L19.5 6.5';

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const toCheck = useRef<SVGAnimateElement>(null);
  const toPage = useRef<SVGAnimateElement>(null);

  useEffect(() => {
    if (!copied) return;
    toCheck.current?.beginElement();
    const timer = window.setTimeout(() => {
      setCopied(false);
      toPage.current?.beginElement();
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      className="copy-button"
      type="button"
      data-copied={copied}
      aria-label={copied ? 'Copied' : label}
      title={copied ? 'Copied' : label}
      onClick={() =>
        navigator.clipboard
          .writeText(text)
          .then(() => setCopied(true))
          .catch(() => {})
      }
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path className="copy-back" d="M5 15V5a2 2 0 0 1 2-2h10" />
        <path d={PAGE}>
          <animate
            ref={toCheck}
            attributeName="d"
            to={CHECK}
            dur="0.32s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.3 0 0.2 1"
          />
          <animate
            ref={toPage}
            attributeName="d"
            to={PAGE}
            dur="0.32s"
            begin="indefinite"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.3 0 0.2 1"
          />
        </path>
      </svg>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
