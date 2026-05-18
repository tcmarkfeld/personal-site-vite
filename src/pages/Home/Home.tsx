import {
  Binary,
  Braces,
  Cloud,
  Code2,
  ChevronDown,
  Container,
  Database,
  Disc3,
  GitBranch,
  Github,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  LayoutGrid,
  Linkedin,
  Mail,
  Network,
  Radio,
  RefreshCcw,
  Server,
  ShieldCheck,
  Smartphone,
  TerminalSquare,
  Truck,
  Workflow,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from 'react';

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  dateRange: string;
  bullets: string[];
};

type ProjectItem = {
  title: string;
  period: string;
  description: string;
  href?: string;
};

type SkillGroup = {
  label: string;
  values: SkillTag[];
};

type SkillTag = {
  label: string;
  Icon: LucideIcon;
};

type ScrollMarker = {
  id: string;
  label: string;
  start: number;
  end: number;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Senior Software Engineer',
    company: 'FirmPilot',
    location: 'Nashville, TN',
    dateRange: 'Apr 2025 - Present',
    bullets: [
      'Built and owned fault-tolerant message-driven worker systems with retry logic and full observability for content, social media, and backlink automation workflows.',
      'Designed and implemented secure GraphQL APIs and React/Next.js TypeScript frontends with optimized database access patterns, maintaining p99 query latency under 25ms across multi-tenant workloads.',
      'Engineered end-to-end AI-driven content pipelines integrating LLMs, fact-checking, media generation, and automated WordPress publishing.',
      'Led architecture cleanup and large-scale refactors, introducing CQRS patterns to improve long-term maintainability.',
      'Conducted daily code reviews, maintaining code quality standards and mentoring junior engineers on architecture and best practices.',
      'Active on-call responder with 97.8% incident acknowledgment rate, 13s MTTA, and 22min MTTR across 45+ production incidents, with zero timeout escalations.',
      'Partnered with Product and Design to define technical requirements and drive architecture decisions across multiple concurrent initiatives.',
    ],
  },
  {
    title: 'Data Integration Engineer II',
    company: 'HCA Healthcare',
    location: 'Nashville, TN',
    dateRange: 'Sep 2023 - Apr 2025',
    bullets: [
      'Managed a system of 200+ HIPAA-regulated .NET microservices processing 1M+ daily events via Kafka and file-based ingestion across 10 SQL databases.',
      'Integrated with FHIR standards and external EHRs, ingesting and parsing HL7 messages for downstream clinical and operational workflows.',
      'Mentored and onboarded new engineers on legacy system architecture and HL7/FHIR standards.',
      'Architected and led migration of legacy microservices to Apache NiFi, reducing operational overhead and improving pipeline reliability.',
      'Implemented alerting and monitoring in Dynatrace with automated failover workflows.',
    ],
  },
  {
    title: 'Lead Developer & Manager (Seasonal)',
    company: 'Corolla Ice Delivery',
    location: 'Corolla, NC',
    dateRange: 'May 2020 - Aug 2023',
    bullets: [
      'Built a full-stack React Native operations app to manage daily delivery workflows.',
      'Optimized route planning, cutting delivery time by up to 3 hours per day.',
      'Replaced spreadsheet-heavy operations with a centralized mobile system.',
      'Owned lifecycle from design and implementation to App Store and Google Play deployment.',
      'Maintained and upgraded application through multiple major versions.',
    ],
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    values: [
      { label: 'C#', Icon: Braces },
      { label: 'Java', Icon: Binary },
      { label: 'SQL', Icon: Database },
      { label: 'Python', Icon: Code2 },
      { label: 'JavaScript', Icon: TerminalSquare },
      { label: 'TypeScript', Icon: Code2 },
    ],
  },
  {
    label: 'Cloud + Platform',
    values: [
      { label: 'AWS', Icon: Cloud },
      { label: 'GCP', Icon: Globe },
      { label: 'Azure AD', Icon: KeyRound },
      { label: 'Linux', Icon: HardDrive },
      { label: 'CI/CD', Icon: RefreshCcw },
      { label: 'Terraform', Icon: Workflow },
      { label: 'Docker', Icon: Container },
    ],
  },
  {
    label: 'Architecture + Systems',
    values: [
      { label: 'Microservices', Icon: Container },
      { label: 'SQS/SNS + Kafka', Icon: Radio },
      { label: 'CQRS', Icon: GitBranch },
      { label: 'Datadog', Icon: Network },
      { label: 'Dynatrace', Icon: Layers },
      { label: 'MassTransit', Icon: Truck },
    ],
  },
  {
    label: 'Frontend + APIs',
    values: [
      { label: 'React', Icon: LayoutGrid },
      { label: 'React Native', Icon: Smartphone },
      { label: 'GraphQL', Icon: Network },
      { label: 'REST API', Icon: Server },
      { label: 'OAuth', Icon: ShieldCheck },
      { label: 'RBAC', Icon: Wrench },
      { label: 'Entity Framework', Icon: Disc3 },
    ],
  },
];

const PROJECTS: ProjectItem[] = [
  {
    title: 'HL7Kit / HL7Kit.Fhir',
    period: 'Open Source',
    description:
      'Strongly typed HL7 v2 parser for .NET with full segment coverage, dynamic delimiter handling, Z-segment support, and FHIR R4 conversion. Published on NuGet.',
    href: 'https://github.com/tcmarkfeld/HL7Kit',
  },
  {
    title: 'Conductor',
    period: 'Open Source',
    description:
      'CLI for .NET teams on AWS that generates least-privilege IAM policies and Terraform resources from MassTransit, SQS, and SNS configuration. Published on NuGet.',
    href: 'https://github.com/tcmarkfeld/Conductor',
  },
  {
    title: 'PriceTime',
    period: 'Open Source',
    description:
      'Price-time priority matching engine for .NET with Kafka-driven order submission, trade execution, and real-time order book management.',
    href: 'https://github.com/tcmarkfeld/PriceTime',
  },
  {
    title: 'UA Lacrosse Website (MVC)',
    period: 'Jan 2022 - May 2022',
    description:
      'Built an MVC website for the University of Alabama lacrosse team with Stripe-powered secure payments.',
  },
  {
    title: 'RateMyProfessor Data Analysis (Python)',
    period: 'Sep 2023 - Dec 2023',
    description:
      'Created a Python data pipeline for web scraping and statistical analysis of professor trends.',
  },
  {
    title: 'Five Horizons Health Services (Mobile)',
    period: 'Sep 2023 - Dec 2023',
    description:
      'Developed a React Native app enabling appointment booking and educational resource access.',
  },
];

const SCROLL_MARKERS: ScrollMarker[] = [
  { id: 'experience', label: 'Experience', start: 0.18, end: 0.42 },
  { id: 'stack', label: 'Stack', start: 0.42, end: 0.61 },
  { id: 'projects', label: 'Projects', start: 0.61, end: 0.82 },
  { id: 'education', label: 'Education', start: 0.82, end: 1 },
];

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const HERO_CONTACTS = [
  {
    label: 'Email',
    href: 'mailto:timmarkfeld@gmail.com',
    Icon: Mail,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/tcmarkfeld',
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/timothy-markfeld',
    Icon: Linkedin,
  },
] as const;

function useScrollMetrics() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const nextY = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScrollable = Math.max(scrollHeight - windowHeight, 1);
        setScrollY(nextY);
        setProgress(Math.min(Math.max(nextY / maxScrollable, 0), 1));
        frameId = 0;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, progress };
}

function Reveal({
  children,
  delay = 0,
}: PropsWithChildren<{ delay?: number }>) {
  return (
    <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export const Home = () => {
  const { scrollY, progress } = useScrollMetrics();
  const auroraOneShift = useMemo(() => scrollY * 0.05, [scrollY]);
  const auroraTwoShift = useMemo(() => scrollY * -0.04, [scrollY]);
  const experienceProgress = useMemo(
    () => clamp01((progress - 0.18) / 0.24),
    [progress],
  );
  const stackProgress = useMemo(
    () => clamp01((progress - 0.42) / 0.19),
    [progress],
  );
  const projectProgress = useMemo(
    () => clamp01((progress - 0.61) / 0.21),
    [progress],
  );
  const educationProgress = useMemo(
    () => clamp01((progress - 0.82) / 0.18),
    [progress],
  );

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="bg-vignette" />
      <div
        className="bg-mesh"
        style={{ transform: `translate3d(0, ${scrollY * -0.02}px, 0)` }}
      />
      <div className="scanline" />
      <div className="noise" />
      <div
        className="bg-dots"
        style={{
          transform: `translate3d(${scrollY * -0.05}px, ${scrollY * -0.07}px, 0)`,
        }}
      />
      <div
        className="aurora aurora-one"
        style={{ transform: `translate3d(0, ${auroraOneShift}px, 0)` }}
      />
      <div
        className="aurora aurora-two"
        style={{ transform: `translate3d(0, ${auroraTwoShift}px, 0)` }}
      />
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      <nav className="scroll-rail" aria-label="Section progress">
        {SCROLL_MARKERS.map((marker) => {
          const markerProgress = clamp01(
            (progress - marker.start) / (marker.end - marker.start),
          );

          return (
            <a className="rail-item" href={`#${marker.id}`} key={marker.id}>
              <span className="rail-label">{marker.label}</span>
              <span className="rail-dot-track">
                <span
                  className="rail-dot-fill"
                  style={{
                    transform: `scaleY(${markerProgress})`,
                  }}
                />
              </span>
            </a>
          );
        })}
      </nav>

      <section className="hero section">
        <Reveal>
          <p className="eyebrow">
            Software Engineer • Distributed Systems • Product Builder
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="hero-title">
            Timothy Markfeld
            <span>
              Building systems that stay fast, resilient, and useful at scale.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="hero-copy">
            I design and operate full-stack systems with a passion for clean and
            performant code. From message-driven workers, reliable APIs, and
            automation pipelines that hold up under real-world load.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-stats">
            <article>
              <h2>200+</h2>
              <p>.NET services managed in production ecosystems</p>
            </article>
            <article>
              <h2>1,000s</h2>
              <p>automated jobs processed daily with retries + observability</p>
            </article>
            <article>
              <h2>Full Stack</h2>
              <p>from distributed workers and APIs to React and mobile apps</p>
            </article>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className="hero-contact-row" aria-label="Contact links">
            {HERO_CONTACTS.map((contact) => (
              <a
                className="hero-contact-link"
                href={contact.href}
                key={contact.label}
                rel="noreferrer"
                target={contact.href.startsWith('http') ? '_blank' : undefined}
              >
                <contact.Icon aria-hidden="true" size={14} strokeWidth={2} />
                {contact.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={420}>
          <a
            className="hero-scroll-cue"
            href="#experience"
            aria-label="Scroll down"
          >
            <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
          </a>
        </Reveal>
      </section>

      <section className="section" id="experience">
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + experienceProgress * 0.36,
              transform: `translate3d(0, ${scrollY * 0.03}px, 0)`,
            } as CSSProperties
          }
        />
        <Reveal>
          <h2 className="section-title">Experience Timeline</h2>
        </Reveal>

        <div className="timeline">
          {EXPERIENCE.map((item, index) => (
            <Reveal
              delay={80 * index}
              key={`${item.company}-${item.dateRange}`}
            >
              <article className="timeline-card">
                <header>
                  <p className="role">{item.title}</p>
                  <h3>{item.company}</h3>
                  <p className="meta">
                    {item.location} • {item.dateRange}
                  </p>
                </header>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section split-layout stack-section" id="stack">
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + stackProgress * 0.34,
              transform: `translate3d(0, ${scrollY * 0.026}px, 0)`,
            } as CSSProperties
          }
        />
        <Reveal>
          <div className="tech-ribbon-container">
            <h2 className="section-title">Core Stack</h2>
            <p className="section-copy">
              Strong background in backend systems, modern frontend delivery,
              and cloud-native operations.
            </p>
            <div className="tech-ribbon-shell">
              <div className="tech-ribbon">
                DISTRIBUTED SYSTEMS • MICROSERVICES • GRAPHQL • REACT • AI
                INTEGRATION • SQS/SNS
              </div>
            </div>
          </div>
        </Reveal>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal delay={100 * index} key={group.label}>
              <article className="skill-card">
                <h3>{group.label}</h3>
                <div className="chips">
                  {group.values.map(({ label, Icon }) => (
                    <span className="chip-item" key={label}>
                      <Icon aria-hidden="true" size={14} strokeWidth={2} />
                      {label}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + projectProgress * 0.38,
              transform: `translate3d(0, ${scrollY * 0.024}px, 0)`,
            } as CSSProperties
          }
        />
        <div
          className="project-beam"
          style={{
            transform: `translate3d(${-26 + projectProgress * 52}%, 0, 0)`,
          }}
        />
        <Reveal>
          <h2 className="section-title">Side Projects</h2>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <Reveal delay={120 * index} key={project.title}>
              <article className="project-card">
                <h3>{project.title}</h3>
                <p className="meta">{project.period}</p>
                <p>{project.description}</p>
                {project.href ? (
                  <a
                    className="project-link"
                    href={project.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View repository
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section
        className="section split-layout education-section"
        id="education"
      >
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + educationProgress * 0.42,
              transform: `translate3d(0, ${scrollY * 0.022}px, 0)`,
            } as CSSProperties
          }
        />
        <Reveal>
          <div>
            <h2 className="section-title">Education</h2>
            <p className="section-copy">
              University of Alabama, with a focus on practical software
              engineering and systems.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <article className="education-card">
            <h3>University of Alabama</h3>
            <p>Master’s in Management Information Systems • 4.0 / 4.0</p>
            <p>
              Bachelor of Science, Management Information Systems • 3.94 / 4.0
            </p>
            <p className="meta">Completed: May 2023</p>
          </article>
        </Reveal>
      </section>

      <footer className="site-footer">
        <p>Timothy Markfeld</p>
        <div className="footer-grouping">
          <a href="mailto:timmarkfeld@gmail.com">timmarkfeld@gmail.com</a>
          <a href="https://github.com/tcmarkfeld" target="_blank">
            GitHub
          </a>
          <a href="https://linkedin.com/in/timothy-markfeld" target="_blank">
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
};
