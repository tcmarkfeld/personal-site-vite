import {
  Binary,
  Braces,
  Cloud,
  Code2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Container,
  Database,
  Disc3,
  Download,
  GitBranch,
  Github,
  Globe,
  HardDrive,
  KeyRound,
  Layers,
  LayoutGrid,
  Linkedin,
  Mail,
  Menu,
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
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PropsWithChildren,
} from 'react';

type ProjectItem = {
  title: string;
  period: string;
  description: string;
  href?: string;
  nugetBadges?: {
    href: string;
    badgeSrc: string;
    label: string;
  }[];
};

type SkillGroup = {
  label: string;
  values: SkillTag[];
};

type SkillTag = {
  label: string;
  Icon: LucideIcon;
};

type WorkExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  href: string;
  gallery?: WorkGalleryImage[];
};

type WorkGalleryImage = {
  alt: string;
  src: string;
};

type HeroContact = {
  label: string;
  href: string;
  Icon: LucideIcon;
  download?: string;
};

type ScrollMarker = {
  id: string;
  label: string;
  start: number;
  end: number;
};

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

const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    company: 'FirmPilot',
    role: 'Senior Software Engineer',
    period: 'Apr 2025 - Present',
    location: 'Nashville, TN',
    summary:
      'Full-stack engineering across AI automation, secure GraphQL APIs, event-driven workers, and multi-tenant SaaS systems.',
    highlights: [
      'Built fault-tolerant worker systems on AWS SQS/SNS, ECS, RDS, and Parameter Store for content, social, and backlink automation.',
      'Designed GraphQL APIs and React/Next.js frontends with database access patterns keeping p99 query latency under 25ms.',
      'Engineered AI-driven content pipelines spanning LLMs, fact-checking, media generation, and automated WordPress publishing.',
      'Reviewed and merged 1,500+ PRs while mentoring engineers on architecture, maintainability, and production quality.',
    ],
    href: 'https://firmpilot.com/',
  },
  {
    company: 'HCA Healthcare',
    role: 'Data Integration Engineer II',
    period: 'Sep 2023 - Apr 2025',
    location: 'Nashville, TN',
    summary:
      'Healthcare integration platform work across HIPAA-regulated .NET services, interoperability standards, and cloud migration.',
    highlights: [
      'Managed 200+ .NET microservices processing over 1M daily events across clinical integration workflows.',
      'Integrated external EHR systems using FHIR APIs, HL7 messaging, IHE standards, IBM MQ, and Kafka event processing.',
      'Led migration from legacy integration services to Apache NiFi with Terraform, Azure AD, and Google Cloud Platform.',
      'Implemented Dynatrace monitoring, alerting, and automated failover workflows for platform reliability.',
    ],
    href: 'https://www.hcahealthcare.com/',
  },
  {
    company: 'Corolla Ice Delivery',
    role: 'Manager and Lead Developer',
    period: 'May 2020 - Aug 2022',
    location: 'Corolla, NC',
    summary:
      'Seasonal operations and product work for a delivery business, spanning route optimization, customer management, and mobile delivery workflows.',
    highlights: [
      'Designed and developed a full-stack mobile app to manage deliveries and customer information.',
      'Built a sorting algorithm that grouped deliveries by neighborhood and address to optimize each daily driver route.',
      'Developed the mobile app in React Native, the website in React, the backend in Node.js, and the database in MySQL.',
    ],
    href: 'https://corollaicedelivery.com/',
    gallery: [
      {
        alt: 'Corolla Ice Delivery today page',
        src: '/ice-delivery-today-page.png',
      },
      {
        alt: 'Corolla Ice Delivery add delivery page',
        src: '/ice-delivery-add-page.png',
      },
      {
        alt: 'Corolla Ice Delivery all deliveries page',
        src: '/ice-delivery-all-deliveries-page.png',
      },
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
    nugetBadges: [
      {
        href: 'https://www.nuget.org/packages/HL7Kit',
        badgeSrc:
          'https://img.shields.io/nuget/v/HL7Kit?style=flat-square&label=HL7Kit',
        label: 'HL7Kit NuGet badge',
      },
      {
        href: 'https://www.nuget.org/packages/HL7Kit.Fhir',
        badgeSrc:
          'https://img.shields.io/nuget/v/HL7Kit.Fhir?style=flat-square&label=HL7Kit.Fhir',
        label: 'HL7Kit.Fhir NuGet badge',
      },
    ],
  },
  {
    title: 'Conductor',
    period: 'Open Source',
    description:
      'CLI for .NET teams on AWS that generates least-privilege IAM policies and Terraform resources from MassTransit, SQS, and SNS configuration. Published on NuGet.',
    href: 'https://github.com/tcmarkfeld/Conductor',
    nugetBadges: [
      {
        href: 'https://www.nuget.org/packages/Conductor.Tool',
        badgeSrc:
          'https://img.shields.io/nuget/v/Conductor.Tool?style=flat-square&label=Conductor.Tool',
        label: 'Conductor.Tool NuGet badge',
      },
    ],
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
  { id: 'about', label: 'About', start: 0.14, end: 0.38 },
  { id: 'experience', label: 'Experience', start: 0.38, end: 0.58 },
  { id: 'projects', label: 'Projects', start: 0.58, end: 0.82 },
  { id: 'education', label: 'Education', start: 0.86, end: 1 },
];

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const HERO_CONTACTS: HeroContact[] = [
  {
    label: 'Download Resume',
    href: '/Timothy_Markfeld_Resume.pdf',
    Icon: Download,
    download: 'Timothy_Markfeld_Resume.pdf',
  },
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
];

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

function WorkGallery({
  images,
  isActive,
}: {
  images: WorkGalleryImage[];
  isActive: boolean;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const updateScrollState = () => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    setCanScrollLeft(gallery.scrollLeft > 8);
    setCanScrollRight(gallery.scrollLeft < maxScrollLeft - 8);
  };

  const scrollGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;

    if (!gallery) {
      return;
    }

    gallery.scrollBy({
      behavior: 'smooth',
      left: direction * Math.min(gallery.clientWidth * 0.72, 320),
    });
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }

    updateScrollState();
    window.addEventListener('resize', updateScrollState);

    return () => {
      window.removeEventListener('resize', updateScrollState);
    };
  }, [isActive]);

  return (
    <div className="iphone-gallery-wrap">
      {canScrollLeft ? (
        <button
          className="gallery-scroll-button gallery-scroll-button-left"
          type="button"
          aria-label="Scroll gallery left"
          onClick={() => scrollGallery(-1)}
        >
          <ChevronLeft aria-hidden="true" size={18} strokeWidth={2} />
        </button>
      ) : null}
      <div
        className="iphone-gallery"
        ref={galleryRef}
        onScroll={updateScrollState}
      >
        {images.map((image) => (
          <figure className="iphone-frame" key={image.src}>
            <img alt={image.alt} src={image.src} />
          </figure>
        ))}
      </div>
      {canScrollRight ? (
        <button
          className="gallery-scroll-button gallery-scroll-button-right"
          type="button"
          aria-label="Scroll gallery right"
          onClick={() => scrollGallery(1)}
        >
          <ChevronRight aria-hidden="true" size={18} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}

export const Home = () => {
  const [selectedExperienceIndex, setSelectedExperienceIndex] =
    useState<number>(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const { scrollY, progress } = useScrollMetrics();
  const auroraOneShift = useMemo(() => scrollY * 0.05, [scrollY]);
  const auroraTwoShift = useMemo(() => scrollY * -0.04, [scrollY]);
  const aboutProgress = useMemo(
    () => clamp01((progress - 0.14) / 0.24),
    [progress],
  );
  const experienceProgress = useMemo(
    () => clamp01((progress - 0.38) / 0.2),
    [progress],
  );
  const projectProgress = useMemo(
    () => clamp01((progress - 0.58) / 0.24),
    [progress],
  );
  const educationProgress = useMemo(
    () => clamp01((progress - 0.86) / 0.14),
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
    <main className="site-shell" id="top">
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
      <header className="site-header">
        <div className="nav-bar">
          <a className="nav-logo-link" href="#top" aria-label="Back to top">
            {'<TM/>'}
          </a>
          <button
            className="mobile-nav-toggle"
            type="button"
            aria-label={
              isMobileNavOpen ? 'Close navigation' : 'Open navigation'
            }
            aria-expanded={isMobileNavOpen}
            aria-controls="section-navigation"
            onClick={() => setIsMobileNavOpen((current) => !current)}
          >
            {isMobileNavOpen ? (
              <X aria-hidden="true" size={18} strokeWidth={2} />
            ) : (
              <Menu aria-hidden="true" size={18} strokeWidth={2} />
            )}
          </button>
          <nav
            className="scroll-rail"
            id="section-navigation"
            aria-label="Section progress"
            data-open={isMobileNavOpen}
          >
            {SCROLL_MARKERS.map((marker, index) => (
              <a
                className="rail-item"
                href={`#${marker.id}`}
                key={marker.id}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <span className="rail-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="rail-label">{marker.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

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
            I design and operate full-stack systems - from message-driven
            workers and reliable APIs to AI automation pipelines - built to hold
            up under real-world load.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-stats">
            <article>
              <h2>1,500+</h2>
              <p>PRs merged in under 14 months</p>
            </article>
            <article>
              <h2>1M+</h2>
              <p>daily events processed across HIPAA-regulated systems</p>
            </article>
            <article>
              <h2>97.8%</h2>
              <p>
                on-call incident acknowledgment rate, 13s mean
                time-to-acknowledge
              </p>
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
                download={contact.download}
              >
                <contact.Icon aria-hidden="true" size={14} strokeWidth={2} />
                {contact.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={420}>
          <a className="hero-scroll-cue" href="#about" aria-label="Scroll down">
            <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
          </a>
        </Reveal>
      </section>

      <section className="section" id="about">
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + aboutProgress * 0.36,
              transform: `translate3d(0, ${scrollY * 0.03}px, 0)`,
            } as CSSProperties
          }
        />
        <Reveal>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        <Reveal delay={100}>
          <article className="timeline-card about-card">
            <div className="about-layout">
              <div>
                <p className="about-copy">
                  I'm currently a Senior Software Engineer at{' '}
                  <a
                    href="https://firmpilot.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    FirmPilot
                  </a>
                  , working across both backend and frontend. A lot of my work
                  has been building our GraphQL API, AI-driven workflows for
                  publishing, SEO, social media, PPC, and WordPress automation,
                  as well as onboarding systems.
                </p>
                <p className="about-copy">
                  Before FirmPilot, I was at{' '}
                  <a
                    href="https://www.hcahealthcare.com/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    HCA Healthcare
                  </a>{' '}
                  taking legacy .NET microservices and re-architecting them into
                  Apache NiFi, while making the system faster and more
                  observable. My team was in charge of processing high-volume
                  Kafka events and HL7/FHIR data for clinical workflows.
                </p>
                <p className="about-copy">
                  I enjoy taking messy workflows and turning them into clean,
                  maintainable systems with strong observability and clear
                  ownership. I care about practical engineering, shipping useful
                  products, and helping teams move faster without sacrificing
                  quality.
                </p>
              </div>
              <div className="about-headshot-wrap">
                <img
                  alt="Timothy Markfeld headshot"
                  className="about-headshot"
                  src="/headshot.png"
                />
              </div>
            </div>
          </article>
        </Reveal>

        <div className="about-stack-block">
          <Reveal delay={180}>
            <div className="terminal-card">
              <div className="terminal-header" aria-hidden="true">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">core-stack</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-prompt">
                  <span>$</span> fetch core-stack
                </div>
                <h3 className="section-subtitle">Core Stack</h3>

                <div className="skills-grid">
                  {SKILL_GROUPS.map((group, index) => (
                    <Reveal delay={100 * index} key={group.label}>
                      <article className="skill-card">
                        <h3>{group.label}</h3>
                        <div className="chips">
                          {group.values.map(({ label, Icon }) => (
                            <span className="chip-item" key={label}>
                              <Icon
                                aria-hidden="true"
                                size={14}
                                strokeWidth={2}
                              />
                              {label}
                            </span>
                          ))}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="experience">
        <div
          className="section-glow"
          style={
            {
              opacity: 0.12 + experienceProgress * 0.38,
              transform: `translate3d(0, ${scrollY * 0.028}px, 0)`,
            } as CSSProperties
          }
        />
        <Reveal>
          <div>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-copy">
              A timeline of production engineering work across SaaS automation
              and healthcare integration platforms.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="work-panel">
            <div className="work-list" aria-label="Work experience roles">
              {WORK_EXPERIENCE.map((experience, index) => (
                <button
                  className="work-tab"
                  type="button"
                  aria-pressed={selectedExperienceIndex === index}
                  key={experience.company}
                  onClick={() => setSelectedExperienceIndex(index)}
                >
                  <span>{experience.company}</span>
                  <small>{experience.period}</small>
                </button>
              ))}
            </div>

            <div className="work-detail-stack">
              {WORK_EXPERIENCE.map((experience, index) => (
                <article
                  className="work-detail"
                  aria-hidden={selectedExperienceIndex !== index}
                  key={experience.company}
                >
                  <div className="work-detail-header">
                    <div>
                      <h3>{experience.role}</h3>
                      <p>{experience.company}</p>
                    </div>
                    <div className="work-meta">
                      <span>{experience.period}</span>
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  <p className="work-summary">{experience.summary}</p>
                  <h4>Highlights</h4>
                  <ul>
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  {experience.gallery?.length ? (
                    <div className="work-gallery">
                      <h4>Gallery</h4>
                      <WorkGallery
                        images={experience.gallery}
                        isActive={selectedExperienceIndex === index}
                      />
                    </div>
                  ) : null}
                  <a
                    className="work-company-link"
                    href={experience.href}
                    rel="noreferrer"
                    target="_blank"
                    tabIndex={selectedExperienceIndex === index ? 0 : -1}
                  >
                    View company
                  </a>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
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
          <h2 className="section-title">Projects</h2>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <Reveal delay={120 * index} key={project.title}>
              <article className="project-card">
                <h3>{project.title}</h3>
                <p className="meta">{project.period}</p>
                <p>{project.description}</p>
                {project.nugetBadges?.length ? (
                  <div className="project-badge-row">
                    {project.nugetBadges.map((badge) => (
                      <a
                        className="project-badge-link"
                        href={badge.href}
                        key={badge.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <img
                          alt={badge.label}
                          className="project-badge"
                          src={badge.badgeSrc}
                        />
                      </a>
                    ))}
                  </div>
                ) : null}
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
