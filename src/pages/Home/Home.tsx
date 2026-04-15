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
};

type SkillGroup = {
  label: string;
  values: string[];
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
      'Built and scaled distributed automation systems for content, SEO, and social media workflows.',
      'Owned message-driven worker systems processing thousands of jobs daily with retries, fault tolerance, and observability.',
      'Designed secure GraphQL APIs and React apps for multi-tenant RBAC and OAuth integrations.',
      'Engineered AI-driven publishing pipelines with LLMs, fact-checking, media generation, and WordPress delivery.',
      'Helped lead architecture cleanup and large-scale CQRS refactors.',
    ],
  },
  {
    title: 'Data Integration Engineer II',
    company: 'HCA Healthcare',
    location: 'Nashville, TN',
    dateRange: 'Sep 2023 - Apr 2025',
    bullets: [
      'Managed a system of 200+ .NET microservices integrated with 10 SQL databases and Kafka-based data flows.',
      'Helped drive migration from legacy .NET microservices to Apache NiFi for higher scalability.',
      'Analyzed legacy systems and designed replacement services in Java.',
      'Implemented monitoring and alerting workflows in Dynatrace with automated failover support.',
      'Automated regression testing workflows, saving up to 8 hours per full test cycle.',
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
      'Owned the lifecycle from design and implementation to App Store and Google Play deployment.',
      'Maintained and upgraded the application through multiple major versions.',
    ],
  },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Languages',
    values: ['C#', 'Java', 'SQL', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    label: 'Cloud + Platform',
    values: ['AWS', 'GCP', 'Azure AD', 'Linux', 'CI/CD', 'Terraform'],
  },
  {
    label: 'Architecture + Systems',
    values: [
      'Microservices',
      'SQS/SNS + Kafka',
      'CQRS',
      'Datadog',
      'Dynatrace',
    ],
  },
  {
    label: 'Frontend + APIs',
    values: ['React', 'React Native', 'GraphQL', 'REST API', 'OAuth', 'RBAC'],
  },
];

const PROJECTS: ProjectItem[] = [
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
  const orbitRotation = useMemo(() => scrollY * 0.08, [scrollY]);
  const gridShift = useMemo(() => scrollY * 0.06, [scrollY]);
  const auroraOneShift = useMemo(() => scrollY * 0.05, [scrollY]);
  const auroraTwoShift = useMemo(() => scrollY * -0.04, [scrollY]);
  const sideProjectsShift = useMemo(
    () => Math.sin(scrollY * 0.0048) * 8,
    [scrollY],
  );
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
      <div className="scanline" />
      <div className="noise" />
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
        <div
          className="hero-grid"
          style={{ transform: `translateY(${gridShift}px)` }}
        />
        <div
          className="hero-orbit"
          style={{
            transform: `translate(-50%, -50%) rotate(${orbitRotation}deg) scale(${1 + progress * 0.07})`,
          }}
        >
          <div className="ring-large ring" />
          <div className="ring-small ring" />
          <div className="ring-dot" />
        </div>

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
              <article
                className="timeline-card"
                style={{
                  transform: `translate3d(0, ${Math.sin(scrollY * 0.004 + index * 0.85) * 10}px, 0)`,
                }}
              >
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
          <div>
            <h2 className="section-title">Core Stack</h2>
            <p className="section-copy">
              Strong background in backend systems, modern frontend delivery,
              and cloud-native operations.
            </p>
            <div className="tech-ribbon-shell">
              <div
                className="tech-ribbon"
                style={{
                  transform: `translate3d(${-120 + stackProgress * 120}px, 0, 0)`,
                }}
              >
                DISTRIBUTED SYSTEMS • MICROSERVICES • GRAPHQL • REACT • AI
                INTEGRATION • SQS/SNS
              </div>
            </div>
          </div>
        </Reveal>

        <div className="skills-grid">
          {SKILL_GROUPS.map((group, index) => (
            <Reveal delay={100 * index} key={group.label}>
              <article
                className="skill-card"
                style={{
                  transform: `translate3d(0, ${Math.sin(scrollY * 0.0048 + index * 1.2) * 8}px, 0)`,
                }}
              >
                <h3>{group.label}</h3>
                <div className="chips">
                  {group.values.map((value) => (
                    <span key={value}>{value}</span>
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
              <article
                className="project-card"
                style={{
                  transform: `translate3d(0, ${sideProjectsShift}px, 0)`,
                }}
              >
                <h3>{project.title}</h3>
                <p className="meta">{project.period}</p>
                <p>{project.description}</p>
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
          <article
            className="education-card"
            style={{
              transform: `translate3d(0, ${Math.sin(scrollY * 0.0042 + 2.2) * 8}px, 0)`,
            }}
          >
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
        <a href="mailto:timmarkfeld@gmail.com">timmarkfeld@gmail.com</a>
      </footer>
    </main>
  );
};
