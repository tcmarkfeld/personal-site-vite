import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { PhoneShot } from '@/components/PhoneShot';
import { ProjectDiagram } from '@/components/ProjectDiagram';
import { ROUTES } from '@/Navigation/routeEnum';

type Card = {
  title: string;
  caption: string;
  stage: ReactNode;
  href?: string;
  to?: string;
};

// Vertical scroll drives the row sideways on wide screens; phones swipe natively.
export function Gallery() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const cards: Card[] = [
    {
      title: 'Revise',
      caption: 'A native macOS app that edits PDFs like a doc, no conversions',
      href: 'https://revise.timmarkfeld.com/',
      stage: (
        <div className="device">
          <ProjectDiagram kind="revise" />
        </div>
      ),
    },
    {
      title: 'HL7Kit',
      caption: 'Strongly typed HL7 parsing and FHIR conversion for .NET',
      href: 'https://github.com/tcmarkfeld/HL7Kit',
      stage: (
        <div className="device">
          <ProjectDiagram kind="parser" />
        </div>
      ),
    },
    {
      title: 'Conductor',
      caption: 'Least-privilege IAM and Terraform from messaging config',
      href: 'https://github.com/tcmarkfeld/Conductor',
      stage: (
        <div className="device">
          <ProjectDiagram kind="conductor" />
        </div>
      ),
    },
    {
      title: 'Corolla Ice Delivery',
      caption: 'Case study: the delivery app I shipped to both stores',
      to: ROUTES.COROLLA,
      stage: <PhoneShot />,
    },
  ];

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    const native = matchMedia(
      '(max-width: 760px), (prefers-reduced-motion: reduce)',
    );
    let frame = 0;

    function update() {
      if (!outer || !track) return;
      if (native.matches) {
        outer.style.height = '';
        track.style.transform = '';
        return;
      }
      const distance = Math.max(0, track.scrollWidth - track.clientWidth);
      outer.style.height = `${window.innerHeight + distance}px`;
      const progress = Math.min(
        1,
        Math.max(0, -outer.getBoundingClientRect().top / (distance || 1)),
      );
      track.style.transform = `translateX(${-progress * distance}px)`;
    }

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(track);
    window.addEventListener('scroll', onScroll, { passive: true });
    native.addEventListener('change', onScroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      native.removeEventListener('change', onScroll);
    };
  }, []);

  function nudge(direction: number) {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.gadget-card');
    if (!track || !card) return;
    const step = (card.offsetWidth + 12) * direction;
    if (getComputedStyle(track).overflowX === 'auto') {
      track.scrollBy({ left: step, behavior: 'smooth' });
    } else {
      window.scrollBy({ top: step, behavior: 'smooth' });
    }
  }

  return (
    <div className="gallery" ref={outerRef}>
      <div className="gallery-sticky">
        <div className="gallery-track" ref={trackRef}>
          {cards.map((card) => (
            <article className="gadget-card" key={card.title}>
              <div className="gadget-stage">{card.stage}</div>
              <h3>
                {card.href ? (
                  <a
                    className="gadget-link"
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card.title} <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : card.to ? (
                  <Link className="gadget-link" to={card.to} viewTransition>
                    {card.title} <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                ) : (
                  card.title
                )}
              </h3>
              <p>{card.caption}</p>
            </article>
          ))}
        </div>
        <div className="gallery-controls">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous card"
          >
            <ArrowLeft size={14} />
          </button>
          <button type="button" onClick={() => nudge(1)} aria-label="Next card">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
