import { Link } from '@tanstack/react-router';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Plus,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import {
  HeartIcon,
  PalmIcon,
  ServerIcon,
  SparkleIcon,
  TruckIcon,
} from '@/components/BioIcons';
import { ActivityGraph } from '@/components/ActivityGraph';
import { CoastalScene } from '@/components/CoastalScene';
import { Gallery } from '@/components/Gallery';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ROUTES } from '@/Navigation/routeEnum';
import { useSiteState } from '@/lib/siteState';
import { useDarkTheme } from '@/lib/theme';
import { useReveal } from '@/lib/useReveal';
import { useStPeteWeather } from '@/lib/useStPeteWeather';
import './Home.css';

const experience = [
  {
    company: 'FirmPilot',
    logo: '/firmpilot_logo.jpg',
    role: 'Senior Software Engineer',
    date: '2025 — now',
    description:
      'Building AI-powered marketing platforms: distributed AWS workers, secure GraphQL APIs, and automated content pipelines serving hundreds of client sites.',
    detail:
      'Owned fault-tolerant SQS/SNS worker systems, React and Next.js applications, and multi-tenant APIs with p99 query latency below 25ms. Mentored engineers and supported production incident response.',
    metric: '<25ms p99 query latency',
    href: 'https://firmpilot.com/',
  },
  {
    company: 'HCA Healthcare',
    logo: '/hca_logo.jpg',
    role: 'Data Integration Engineer II',
    date: '2023 — 2025',
    description:
      'Connected clinical systems at scale. Supported 200+ HIPAA-regulated microservices processing more than one million events each day.',
    detail:
      'Integrated EHR systems through FHIR, HL7, and IHE standards. Led migration to Apache NiFi with Terraform and Google Cloud, with monitoring and automated failover workflows.',
    metric: '1M+ events per day',
    href: 'https://www.hcahealthcare.com/',
  },
  {
    company: 'Corolla Ice Delivery',
    logo: '/corolla_ice_delivery_logo.webp',
    role: 'Full Stack Engineer',
    date: '2020 — 2023',
    description:
      'Owned a React Native delivery app from design through App Store and Google Play that cut daily delivery time by up to 3 hours.',
    detail:
      'Replaced manual scheduling with route optimization used in day-to-day operations during peak season. Built the supporting React site and Node/MySQL backend so drivers and ops ran on one stack end to end.',
    metric: 'Up to 3 hrs saved a day',
    href: 'https://corollaicedelivery.com/',
    caseStudy: ROUTES.COROLLA,
  },
];

const details = [
  { label: 'Building', value: 'AI marketing systems at FirmPilot' },
  { label: 'Studied', value: 'Master’s & B.S., MIS, University of Alabama' },
  { label: 'Reach for', value: 'C#/.NET, TypeScript, React, AWS, Terraform' },
];

const stPeteTime = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
});

const casings = [
  { label: 'Plain', format: (words: string[]) => words.join(' ') },
  {
    label: 'camelCase',
    format: (words: string[]) =>
      words.map((word, i) => (i ? capitalize(word) : word)).join(''),
  },
  {
    label: 'PascalCase',
    format: (words: string[]) => words.map(capitalize).join(''),
  },
  { label: 'snake_case', format: (words: string[]) => words.join('_') },
  { label: 'kebab-case', format: (words: string[]) => words.join('-') },
];

const inks = ['var(--strong)', '#2f6bff', '#dd704b', '#1f9d6b'];

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

// An inline "selected text" chip with a tiny toolbar that re-cases the role.
function RoleChip() {
  const [casing, setCasing] = useState(0);
  const [ink, setInk] = useState(0);
  const [open, setOpen] = useState(false);
  const toolbarRef = useRef<HTMLSpanElement>(null);
  const { label, format } = casings[casing];

  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (
        event instanceof PointerEvent &&
        toolbarRef.current?.contains(event.target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <span className="role-chip">
      <span
        className="role-box"
        data-code={casing > 0}
        style={{ color: inks[ink] }}
      >
        {format(['senior', 'software', 'engineer'])}
        <i aria-hidden="true" />
      </span>
      <span
        className="role-toolbar"
        role="toolbar"
        aria-label="Role styling"
        ref={toolbarRef}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Casing: ${label}`}
        >
          {label} <ChevronDown size={10} aria-hidden="true" />
        </button>
        {open && (
          <span className="role-menu" role="listbox" aria-label="Casing">
            {casings.map((option, index) => (
              <button
                key={option.label}
                type="button"
                role="option"
                aria-selected={index === casing}
                onClick={() => {
                  setCasing(index);
                  setOpen(false);
                }}
              >
                {option.label}
                {index === casing && <Check size={11} aria-hidden="true" />}
              </button>
            ))}
          </span>
        )}
        <button
          type="button"
          onClick={() => setInk((ink + 1) % inks.length)}
          aria-label="Change color"
        >
          <span className="role-swatch" style={{ background: inks[ink] }} />
        </button>
      </span>
    </span>
  );
}

function Token({
  children,
  Icon,
  tone,
  order,
}: {
  children: string;
  Icon: () => ReactNode;
  tone: string;
  order: number;
}) {
  return (
    <span
      className="token"
      style={{ '--tone': tone, '--order': order } as CSSProperties}
    >
      {children}
      <Icon />
    </span>
  );
}

export const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLElement>(null);
  const dark = useDarkTheme();
  const { sky } = useSiteState();
  const weather = useStPeteWeather();
  const [localTime, setLocalTime] = useState(() =>
    stPeteTime.format(new Date()),
  );
  const effect = sky === 'live' ? (weather?.effect ?? 'clear') : sky;
  useReveal(pageRef);

  // Light up the bio's keywords the first time it scrolls into view.
  useEffect(() => {
    const bio = bioRef.current;
    if (!bio) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        bio.dataset.lit = 'true';
        observer.disconnect();
      },
      // Wait until the bio has scrolled up past the lower third of the screen.
      { threshold: 0.5, rootMargin: '0px 0px -35% 0px' },
    );
    observer.observe(bio);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(
      () => setLocalTime(stPeteTime.format(new Date())),
      30_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="site"
      data-theme={dark ? 'dark' : 'light'}
      id="top"
      ref={pageRef}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <div className="edge-fade" aria-hidden="true" />
      <main id="main">
        <section className="hero" aria-label="St. Petersburg, Florida">
          <div className="scene-frame">
            <CoastalScene dark={dark} effect={effect} weather={weather} />
          </div>
          <p className="scene-caption">
            St. Petersburg, FL · <time>{localTime}</time>
            {sky !== 'live'
              ? ` · sky set to ${sky}`
              : weather && ` · ${weather.temperature}°F, ${weather.label}`}
          </p>
        </section>

        <section className="column bio" id="hello" ref={bioRef}>
          <h1 className="sr-only">
            Timothy Markfeld, senior software engineer
          </h1>
          <p>Hey,</p>
          <p>
            I’m <strong>Tim</strong>, a <RoleChip /> based in{' '}
            <Token Icon={PalmIcon} order={0} tone="#1f9d6b">
              St. Pete
            </Token>
            .
          </p>
          <p>
            I build{' '}
            <Token Icon={ServerIcon} order={1} tone="#2f6bff">
              reliable software
            </Token>{' '}
            and work across{' '}
            <Token Icon={HeartIcon} order={2} tone="#e0445a">
              healthcare
            </Token>
            ,{' '}
            <Token Icon={TruckIcon} order={3} tone="#d98a1c">
              logistics
            </Token>
            , and{' '}
            <Token Icon={SparkleIcon} order={4} tone="#8a4fff">
              AI
            </Token>
            .
          </p>
          <p>
            Right now I’m at{' '}
            <a
              className="token token-logo"
              href="https://firmpilot.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/firmpilot_logo.jpg" alt="" width="16" height="16" />
              FirmPilot
            </a>
            , building the systems behind AI-powered marketing.
          </p>
        </section>

        <section className="column" id="experience" data-reveal>
          <h2 className="label">Experience</h2>
          <div className="jobs">
            {experience.map((job) => (
              <details className="job" key={job.company}>
                <summary>
                  <img
                    className="job-logo"
                    src={job.logo}
                    alt=""
                    width="32"
                    height="32"
                    loading="lazy"
                  />
                  <span className="job-title">
                    <strong>{job.company}</strong>
                    <span>{job.role}</span>
                  </span>
                  <time>{job.date}</time>
                  <Plus className="job-toggle" size={14} aria-hidden="true" />
                </summary>
                <div className="job-body">
                  <p>{job.description}</p>
                  <p>{job.detail}</p>
                  <div className="job-foot">
                    <span className="chip chip-quiet">{job.metric}</span>
                    {job.caseStudy && (
                      <Link to={job.caseStudy} viewTransition>
                        Case study <ArrowRight size={12} aria-hidden="true" />
                      </Link>
                    )}
                    <a href={job.href} target="_blank" rel="noreferrer">
                      Website <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="column" data-reveal>
            <h2 className="label">Things I’ve made</h2>
            <p className="work-intro">
              Open-source tools I build and contribute to, plus a case study.
            </p>
          </div>
          <Gallery />
        </section>

        <ActivityGraph user="tcmarkfeld" />

        <section className="column" data-reveal>
          <h2 className="label">Currently</h2>
          <dl className="details">
            {details.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};
