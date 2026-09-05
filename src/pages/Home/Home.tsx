import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import './Home.css';

const projects = [
  {
    name: 'HL7Kit',
    category: 'HEALTHCARE / OPEN SOURCE',
    description: 'A strongly typed HL7 parser with FHIR conversion for .NET.',
    stack: 'C# / .NET / HL7 / FHIR',
    href: 'https://github.com/tcmarkfeld/HL7Kit',
    kind: 'parser',
  },
  {
    name: 'Conductor',
    category: 'DEVELOPER TOOLS / OPEN SOURCE',
    description:
      'Generate least-privilege IAM policies and Terraform from your messaging configuration.',
    stack: '.NET / AWS / TERRAFORM',
    href: 'https://github.com/tcmarkfeld/Conductor',
    kind: 'conductor',
  },
  {
    name: 'MonoCode',
    category: 'DEVELOPER TOOLS / CONTRIBUTOR',
    description:
      'Contributions to a desktop app for AI coding agents, including work on queued follow-ups and CI.',
    stack: 'TYPESCRIPT / REACT / TAURI',
    href: 'https://usemono.dev/',
    kind: 'monocode',
  },
];

const experience = [
  {
    company: 'FirmPilot',
    role: 'Senior Software Engineer',
    date: 'APR 2025 — PRESENT',
    description:
      'Building AI-powered marketing platforms: distributed AWS workers, secure GraphQL APIs, and automated content pipelines serving hundreds of client sites.',
    detail:
      'Owned fault-tolerant SQS/SNS worker systems, React and Next.js applications, and multi-tenant APIs with p99 query latency below 25ms. Mentored engineers and supported production incident response.',
    tags: 'AWS · .NET · GraphQL · React · AI',
    href: 'https://firmpilot.com/',
  },
  {
    company: 'HCA Healthcare',
    role: 'Data Integration Engineer II',
    date: 'SEP 2023 — APR 2025',
    description:
      'Connected clinical systems at scale. Supported 200+ HIPAA-regulated microservices processing more than one million events each day.',
    detail:
      'Integrated EHR systems through FHIR, HL7, and IHE standards. Led migration to Apache NiFi with Terraform and Google Cloud, with monitoring and automated failover workflows.',
    tags: '.NET · FHIR · HL7 · Kafka · GCP',
    href: 'https://www.hcahealthcare.com/',
  },
  {
    company: 'Corolla Ice Delivery',
    role: 'Full Stack Engineer',
    date: 'MAY 2020 — AUG 2023',
    description:
      'Built mobile and web tools for customer management, delivery tracking, and optimized driver routes.',
    detail:
      'Built the React Native mobile app, React website, Node.js backend, and MySQL database. Grouped deliveries by neighborhood and address to improve daily routes.',
    tags: 'React Native · React · Node.js · MySQL',
    href: 'https://corollaicedelivery.com/',
  },
];

export const Home = () => {
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === 'dark',
  );

  useEffect(() => {
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('site-theme', theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#1c1d19' : '#f4f2e9');
  }, [dark]);

  return (
    <div className="portfolio" data-theme={dark ? 'dark' : 'light'} id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="folio-header">
        <a className="wordmark" href="#top" aria-label="Timothy Markfeld home">
          <span className="wordmark-sigil">TM</span>
          <span>Timothy Markfeld</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#work">Selected work</a>
          <a className="header-contact" href="#contact">
            Let’s talk <ArrowUpRight size={13} />
          </a>
        </nav>
        <button
          className="folio-theme-toggle"
          onClick={() => setDark(!dark)}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={dark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main id="main">
        <section className="folio-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span>Independent software engineer</span>
              <span>St. Petersburg, Florida</span>
            </p>
            <h1 id="hero-title">
              Engineering
              <br />
              <em>with intention.</em>
            </h1>
            <div className="folio-intro">
              <p>
                I design dependable backend systems, AI automation, and digital
                products that make complex work feel clear.
              </p>
              <a className="solid-link" href="#work">
                Explore selected work <ArrowDown size={16} />
              </a>
            </div>
          </div>
          <Landscape className="hero-landscape" />
          <div className="hero-coordinate" aria-hidden="true">
            <span>27.7676° N</span>
            <i />
            <span>82.6403° W</span>
          </div>
        </section>

        <div className="focus-strip" aria-label="Specialties">
          {['Distributed systems', 'AI automation', 'Cloud infrastructure', 'Product engineering'].map(
            (item, index) => (
              <span key={item}>
                <small>0{index + 1}</small>
                {item}
              </span>
            ),
          )}
        </div>

        <section className="folio-section about-section-new" id="about">
          <div className="section-topline">
            <span>01 — Profile</span>
            <span>Working at the intersection of systems &amp; people</span>
          </div>
          <div className="about-layout">
            <div className="about-monogram" aria-hidden="true">
              <span>TM</span>
              <div className="monogram-orbits">
                <i />
                <i />
                <i />
              </div>
              <small>EST. 2020</small>
            </div>
            <div className="about-text">
              <h2>
                Building calm
                <br />
                <em>inside complexity.</em>
              </h2>
              <p>
                I’m Tim, a senior software engineer who turns complicated
                systems into reliable, understandable products.
              </p>
              <p>
                My work spans healthcare, logistics, and AI—from clinical
                integration platforms processing millions of events to
                intelligent automation that serves hundreds of businesses.
              </p>
              <div className="about-signoff">
                <span className="portrait-location">
                  <MapPin size={13} aria-hidden="true" /> St. Petersburg, FL
                </span>
                <span>Available for thoughtful collaborations</span>
              </div>
            </div>
          </div>
          <div className="toolbox">
            <span className="micro">Selected tools</span>
            <p>
              C# · .NET · TypeScript · React · GraphQL · AWS · GCP · Docker ·
              Terraform · Kafka
            </p>
          </div>
        </section>

        <section className="experience-section folio-section" id="experience">
          <div className="section-topline">
            <span>02 — Experience</span>
            <a
              href="/Timothy_Markfeld_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View résumé <ArrowUpRight size={13} />
            </a>
          </div>
          <h2>
            A practice built
            <br />
            <em>across disciplines.</em>
          </h2>
          <div className="experience-list">
            {experience.map((job, index) => (
              <details
                className="job"
                key={job.company}
                open={index === 0 ? true : undefined}
              >
                <summary>
                  <span className="job-date">{job.date}</span>
                  <span className="job-title">
                    <strong>{job.company}</strong>
                    <span>{job.role}</span>
                  </span>
                  <span className="job-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="job-content">
                  <p>{job.description}</p>
                  <p>{job.detail}</p>
                  <div>
                    <span>{job.tags}</span>
                    <a href={job.href} target="_blank" rel="noreferrer">
                      Visit company
                    </a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="folio-section" id="work">
          <div className="section-topline">
            <span>03 — Selected work</span>
            <span>Open source / Product / Systems</span>
          </div>
          <div className="section-heading">
            <h2>
              Useful things,
              <br />
              <em>made carefully.</em>
            </h2>
            <p>
              A selection of tools created to solve
              <br /> real problems with less friction.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <a
                className={`project ${project.kind}`}
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="project-visual" aria-hidden="true">
                  <span className="project-number">0{index + 1}</span>
                  {project.kind === 'parser' ? (
                    <div className="parser-art">
                      <span>MSH|^~\&amp;|</span>
                      <span>PID|1||2048</span>
                      <div className="parser-convert">↓</div>
                      <strong>
                        {'{'} Patient {'}'}
                      </strong>
                    </div>
                  ) : project.kind === 'conductor' ? (
                    <div className="conductor-art">
                      <span>APPLICATION</span>
                      <div className="conductor-lines">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div>
                        <b>IAM</b>
                        <b>SQS</b>
                        <b>SNS</b>
                      </div>
                    </div>
                  ) : (
                    <div className="monocode-art">
                      <div className="monocode-titlebar">
                        <i />
                        <i />
                        <i />
                        <span>MonoCode</span>
                      </div>
                      <div className="monocode-session">
                        <span>›_</span>
                        <div>
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                      <div className="monocode-queue">
                        <span>↳</span> queued follow-up
                      </div>
                    </div>
                  )}
                </div>
                <div className="project-copy">
                  <span className="micro">{project.category}</span>
                  <h3>
                    {project.name}
                    <ArrowUpRight size={24} />
                  </h3>
                  <p>{project.description}</p>
                  <span className="project-stack">{project.stack}</span>
                </div>
              </a>
            ))}
          </div>
          <a
            className="text-link"
            href="https://github.com/tcmarkfeld"
            target="_blank"
            rel="noreferrer"
          >
            More on GitHub
          </a>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-topline">
            <span>04 — What’s next?</span>
            <span>Start a conversation</span>
          </div>
          <a className="contact-title" href="mailto:timmarkfeld@gmail.com">
            Let’s make
            <br />
            <em>something lasting.</em>
            <ArrowUpRight aria-hidden="true" />
          </a>
          <div className="contact-bottom">
            <a href="mailto:timmarkfeld@gmail.com">
              timmarkfeld@gmail.com <Mail size={18} />
            </a>
            <div>
              <a
                href="https://github.com/tcmarkfeld"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/timothy-markfeld"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} /> LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="folio-footer">
        <span>© {new Date().getFullYear()} TIMOTHY MARKFELD</span>
        <a href="#top">
          BACK TO TOP <ArrowUp size={14} />
        </a>
      </footer>
    </div>
  );
};

function Landscape({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 1440 640"
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <pattern id="hatch" width="11" height="11" patternUnits="userSpaceOnUse">
          <path d="M-3 11 11-3M4 14 14 4" />
        </pattern>
        <pattern id="water" width="34" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 8c8-5 17-5 34 0M7 14c6-3 12-3 20 0" />
        </pattern>
      </defs>
      <path className="land-faint" d="M0 427 116 364l83 20 92-97 79 52 118-134 86 72 103-135 104 167 88-93 86 111 95-70 92 90 112-46 116 80v259H0Z" />
      <path className="land-hatch" d="M0 427 116 364l83 20 92-97 79 52 118-134 86 72 103-135 104 167 88-93 86 111 95-70 92 90 112-46 116 80v118H0Z" />
      <g className="land-lines">
        <path d="M0 427 116 364l83 20 92-97 79 52 118-134 86 72 103-135 104 167 88-93 86 111 95-70 92 90 112-46 116 80" />
        <path d="m77 405 53-89 40 49M248 333l43-92 49 76M449 249l39-86 62 95M635 191l42-112 74 200M833 253l36-91 62 132M1044 272l43-80 83 111M1239 313l42-87 59 136" />
        <path d="M0 462c190-42 311-15 462 10s278-15 422-2 321 52 556-6" />
      </g>
      <g className="land-buildings">
        <path d="M112 417v-71h65v57m-54-57 21-28 22 28m-31 71v-34h20v34M391 405v-83h88v104m-72-104v-35h53v35m-1 20h-21v25h21m-52-25h18v25h-18M916 417v-98h112v126m-95-126v-30h72v30m-53 19h23v30h-23m42-30h18v30h-18M1207 430v-77h80v91m-66-91v-27h50v27" />
        <path d="M711 416v-113h26V189h25v114h28v121m-67-121h55m-42-114 13-33 13 33m-32 147h39" />
      </g>
      <g className="cypress">
        {[214, 349, 521, 593, 820, 1097, 1163, 1337].map((x, index) => (
          <path
            key={x}
            d={`M${x} 430c-${12 + (index % 3) * 3}-38 -8-102 4-143 17 47 26 105 6 143Z`}
          />
        ))}
      </g>
      <rect className="land-water" y="463" width="1440" height="177" />
      <g className="bridge">
        <path d="M0 455h1440v30H0Z" />
        <path d="M0 485h1440M58 455v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22m98 22v-22" />
        <path d="M170 485c0 98 134 98 134 0m386 0c0 98 134 98 134 0m386 0c0 98 134 98 134 0" />
      </g>
    </svg>
  );
}
