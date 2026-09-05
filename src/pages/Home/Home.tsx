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
    false,
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
          <SystemSchematic className="hero-schematic" />
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

function SystemSchematic({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 760 760"
    >
      <defs>
        <pattern id="draft-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".65" fill="currentColor" />
        </pattern>
        <linearGradient id="disk-fill" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity=".28" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <rect className="schematic-grid" x="28" y="28" width="704" height="704" />
      <g className="draft-marks">
        <path d="M28 58V28h30M702 28h30v30M28 702v30h30M702 732h30v-30" />
        <path d="M60 82h90M610 82h90M60 680h90M610 680h90" />
      </g>
      <g className="schematic-guides">
        <path d="M380 105v550M235 190v390M525 190v390" />
        <path d="M235 190h290M235 580h290" />
      </g>
      <g className="schematic-layer top-layer">
        <path d="m257 148 168-76 111 63-168 77Z" />
        <path d="m257 148 111 64v38l-111-65Z" />
        <path d="m368 212 168-77v37l-168 78Z" />
        <path d="m294 150 127-58 77 44-127 59Z" />
        <path d="m322 151 99-45 51 29-99 46Z" />
        <path d="m278 183 24-11 20 12-24 11Z" />
        <circle cx="500" cy="159" r="5" />
      </g>
      <g className="schematic-layer service-ring">
        <ellipse cx="380" cy="320" rx="128" ry="55" />
        <ellipse cx="380" cy="304" rx="128" ry="55" />
        <ellipse cx="380" cy="304" rx="49" ry="21" />
        <path d="M252 304v16c0 30 57 55 128 55s128-25 128-55v-16" />
        <path d="M299 271c22 12 46 16 70 17M442 286c25-5 44-12 61-23" />
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index * Math.PI) / 3;
          const x = 380 + Math.cos(angle) * 92;
          const y = 304 + Math.sin(angle) * 39;
          return <circle key={index} cx={x} cy={y} r="7" />;
        })}
      </g>
      <g className="schematic-layer data-disk">
        <ellipse cx="380" cy="451" rx="139" ry="58" fill="url(#disk-fill)" />
        <path d="M241 451v22c0 32 62 58 139 58s139-26 139-58v-22" />
        <ellipse cx="380" cy="473" rx="139" ry="58" />
        <ellipse cx="380" cy="451" rx="139" ry="58" />
        <ellipse cx="380" cy="451" rx="43" ry="18" />
        <ellipse cx="380" cy="451" rx="20" ry="8" />
        <path d="M380 433v36M241 451h96M423 451h96" />
      </g>
      <g className="schematic-layer base-layer">
        <path d="m249 612 133-61 130 74-133 61Z" />
        <path d="m249 612 130 74v24l-130-75Z" />
        <path d="m379 686 133-61v24l-133 61Z" />
        <path d="m293 614 89-41 86 49-89 41Z" />
        <path d="M339 620c0-10 18-19 41-19s42 9 42 19-19 19-42 19-41-9-41-19Z" />
        <circle cx="380" cy="620" r="7" />
      </g>
      <g className="schematic-connectors">
        <path d="M257 168H136v-38M508 304h112v-30M241 451H121v35M512 634h106v42" />
        <path d="M380 250v38M380 375v58M380 531v20" />
      </g>
      <g className="schematic-labels">
        <text x="58" y="115">FIG.001</text>
        <text x="58" y="132">INTERFACE LAYER</text>
        <text x="625" y="262">SERVICE MESH</text>
        <text x="625" y="278">06 ACTIVE NODES</text>
        <text x="58" y="476">DISTRIBUTED DATA</text>
        <text x="58" y="493">EVENT STORE</text>
        <text x="622" y="691">CLOUD RUNTIME</text>
        <text x="622" y="708">FAULT TOLERANT</text>
      </g>
      <text className="side-label" x="48" y="390" transform="rotate(-90 48 390)">
        [ SYSTEM ARCHITECTURE / EXPLODED VIEW ]
      </text>
    </svg>
  );
}
