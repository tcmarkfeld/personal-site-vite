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
import { useEffect, useRef, useState } from 'react';
import { CoastalScene } from '@/components/CoastalScene';
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
    date: 'May 2020 - Aug 2023',
    bullets: [
      'Owned a React Native delivery app from design through App Store and Google Play that cut daily delivery time by up to 3 hours.',
      'Replaced manual scheduling with route optimization used in day-to-day operations during peak season.',
      'Built the supporting React site and Node/MySQL backend so drivers and ops ran on one stack end to end.',
    ],
    tags: 'React Native · React · Node.js · MySQL',
    href: 'https://corollaicedelivery.com/',
  },
];

export const Home = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
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
      ?.setAttribute('content', dark ? '#141414' : '#f4f2e9');
  }, [dark]);

  useEffect(() => {
    const grid = projectsRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
      });
    });
    const updateVisibility = () => {
      grid.dataset.paused = String(document.hidden);
    };
    grid.querySelectorAll('.project-diagram').forEach((diagram) => observer.observe(diagram));
    document.addEventListener('visibilitychange', updateVisibility);
    updateVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return (
    <div className="portfolio" data-theme={dark ? 'dark' : 'light'} id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="folio-header">
        <a className="wordmark" href="#top" aria-label="Timothy Markfeld home">
          tm
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </a>
        <span className="header-note">
          SOFTWARE ENGINEERING
          <br />
          &amp; OPEN SOURCE
        </span>
        <nav aria-label="Main navigation">
          <a href="#about">
            About <span>01</span>
          </a>
          <a href="#experience">
            Experience <span>02</span>
          </a>
          <a href="#work">
            Projects <span>03</span>
          </a>
          <a href="#contact">Let’s talk</a>
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
          <CoastalScene dark={dark} />
          <div className="hero-eyebrow">
            <span>
              <i /> TIMOTHY MARKFELD
            </span>
            <span>SENIOR SOFTWARE ENGINEER</span>
          </div>
          <h1 id="hero-title">
            Distributed systems.
            <br />
            <span>Production ownership.</span>
          </h1>
          <div className="hero-bottom">
            <div className="folio-intro">
              <p>
                I build high-throughput backends and keep them reliable after
                they ship.
              </p>
              <a className="solid-link" href="#experience">
                Explore my work <ArrowDown size={18} />
              </a>
            </div>
            <div className="hero-caption">
              <span>BASED IN ST. PETERSBURG, FL</span>
            </div>
          </div>
        </section>

        <div className="focus-strip" aria-label="Specialties">
          <span>DISTRIBUTED SYSTEMS</span>
          <b aria-hidden="true">✳</b>
          <span>AWS</span>
          <b aria-hidden="true">✳</b>
          <span>.NET / TYPESCRIPT</span>
          <b aria-hidden="true">✳</b>
          <span>AI AUTOMATION</span>
        </div>

        <section className="folio-section about-section-new" id="about">
          <div className="section-topline">
            <span>01 / ABOUT ME</span>
          </div>
          <div className="about-layout">
            <div className="portrait-block">
              <div className="portrait-frame">
                <img
                  src="/headshot.png"
                  alt="Timothy Markfeld"
                  loading="lazy"
                />
                <span aria-hidden="true">Hello there.</span>
              </div>
              <div className="portrait-label">
                <span>Timothy Markfeld</span>
                <span className="portrait-location">
                  ST. PETE, FL <MapPin size={12} aria-hidden="true" />
                </span>
              </div>
            </div>
            <div className="about-text">
              <h2>
                A little
                <br />
                <em>about me.</em>
              </h2>
              <p>
                I’m Tim, a software engineer who likes making complicated things
                feel straightforward.
              </p>
              <p>
                My work spans healthcare, logistics, and AI. I care about
                understanding the problem, taking ownership, and keeping
                software reliable after it ships.
              </p>
              <p>
                Currently at FirmPilot, I build the systems behind AI-powered
                marketing. I also make open-source tools for problems I’ve met
                along the way.
              </p>
              <div className="education-note">
                <span className="micro">FOUNDATIONS</span>
                <strong>University of Alabama</strong>
                <span>
                  Master’s &amp; B.S. · Management Information Systems
                </span>
              </div>
            </div>
          </div>
          <div className="toolbox">
            <span className="micro">TOOLS OF THE TRADE</span>
            <p>
              C# / .NET / TypeScript / React / Next.js / GraphQL / AWS / GCP /
              Docker / Terraform / SQL / Kafka
            </p>
          </div>
        </section>

        <section className="experience-section folio-section" id="experience">
          <div className="section-topline">
            <span>02 / EXPERIENCE</span>
            <a
              href="/Timothy_Markfeld_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              VIEW RÉSUMÉ
            </a>
          </div>
          <h2>
            Where I’ve
            <br />
            <em>worked.</em>
          </h2>
          <div className="experience-list">
            {experience.map((job) => (
              <details
                className="job"
                key={job.company}
                open={true}
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
                  {job.bullets ? (
                    <ul>
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p>{job.description}</p>
                      <p>{job.detail}</p>
                    </>
                  )}
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
            <span>03 / SELECTED WORK</span>
          </div>
          <div className="section-heading">
            <h2>
              Open-source
              <br />
              <em>projects &amp; contributions.</em>
            </h2>
            <p>
              Tools I build and contribute to.
              <br />
              Available on GitHub.
            </p>
          </div>
          <div className="project-grid" ref={projectsRef}>
            {projects.map((project, index) => (
              <a
                className={`project ${project.kind}`}
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="project-visual">
                  <div className="project-heading">
                    <h3>{project.name}</h3>
                    <span className="project-number">00{index + 1}</span>
                  </div>
                  <div className="project-diagram" aria-hidden="true">
                    <svg viewBox="0 0 300 240" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path className="diagram-corners" d="M8 18V8h10m264 0h10v10M8 222v10h10m264 0h10v-10" />
                      {project.kind === 'parser' ? (
                        <>
                          <path className="diagram-guide" d="M106 120h88" />
                          <rect className="diagram-node" x="18" y="70" width="88" height="102" rx="4" />
                          <path d="M18 94h88" />
                          <text x="29" y="86">HL7</text>
                          <g className="diagram-record-text">
                            <text x="26" y="114">MSH|^~\&amp;|</text>
                            <text x="26" y="128">PID|42||</text>
                            <text x="26" y="142">DOE^JANE</text>
                            <text x="26" y="156">PV1|1|O</text>
                          </g>
                          <rect className="diagram-node" x="134" y="100" width="32" height="40" rx="3" />
                          <text x="141" y="155">MAP</text>
                          <rect className="diagram-node" x="194" y="70" width="88" height="102" rx="4" />
                          <path d="M194 94h88" />
                          <text x="205" y="86">FHIR</text>
                          <g className="diagram-record-text diagram-fhir-json">
                            <text x="202" y="104">{'{'}</text>
                            <text x="208" y="114">{'"resourceType":'}</text>
                            <text x="212" y="124">{'"Patient",'}</text>
                            <text x="208" y="136">{'"id": "42",'}</text>
                            <text x="208" y="148">{'"active": true'}</text>
                            <text x="202" y="160">{'}'}</text>
                          </g>
                          <path className="diagram-guide" d="M214 127h14M233 139h14M250 151h14" />
                          <g className="diagram-accent diagram-fields">
                            <path className="diagram-motion diagram-field" d="M143 112h14" />
                            <path className="diagram-motion diagram-field" d="M143 120h14" />
                            <path className="diagram-motion diagram-field" d="M143 128h14" />
                          </g>
                          <text x="34" y="196">MESSAGE</text>
                          <text x="211" y="196">RESOURCE</text>
                        </>
                      ) : project.kind === 'conductor' ? (
                        <>
                          <ellipse className="diagram-guide" cx="150" cy="181" rx="113" ry="35" />
                          <path d="m150 43-94 132 94 35 94-35Zm0 0v167M56 175l94-85 94 85M56 175l94-40 94 40M56 175l94-5 94 5" />
                          <path className="diagram-accent" d="M150 43v127l94 5-94 35" />
                          <circle className="diagram-solid" cx="150" cy="43" r="8" />
                          <circle className="diagram-accent diagram-motion diagram-pulse" cx="150" cy="43" r="11" />
                          <circle className="diagram-solid diagram-motion diagram-signal" cx="150" cy="43" r="3" />
                          <circle className="diagram-node" cx="56" cy="175" r="5" />
                          <circle className="diagram-node" cx="150" cy="210" r="5" />
                          <circle className="diagram-node" cx="244" cy="175" r="5" />
                          <text x="134" y="24">APP</text>
                          <text x="35" y="199">IAM</text>
                          <text x="139" y="232">SQS</text>
                          <text x="249" y="199">SNS</text>
                        </>
                      ) : (
                        <>
                          <path className="diagram-guide" d="M150 20v202M30 189h240" />
                          <path className="diagram-motion diagram-session" d="M98 50h152v112H98Zm-24 24h152v112H74Z" />
                          <path className="diagram-node" d="M50 98h152v112H50Z" />
                          <path d="M50 122h152m-140-12h3m6 0h3m6 0h3m129-24h14m-116-24h128" />
                          <path className="diagram-accent" d="m72 143 12 10-12 10M72 184h62" />
                          <path className="diagram-accent diagram-motion diagram-cursor" d="M95 163h18" />
                          <path d="M147 145h36m-36 10h26m-26 10h36" />
                          <circle className="diagram-solid" cx="242" cy="196" r="15" />
                          <path d="M235 196h14m-7-7v14" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>
                <div className="project-copy">
                  <span className="micro">{project.category}</span>
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

      </main>
      <footer className="contact-section" id="contact">
          <div className="section-topline">
            <span>04 / WHAT’S NEXT?</span>
          </div>
          <a className="contact-title" href="mailto:timmarkfeld@gmail.com">
            Let’s build
            <br />
            <em>something.</em>
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
        <div className="folio-footer">
          <span>© {new Date().getFullYear()} TIMOTHY MARKFELD</span>
          <a href="#top">
            BACK TO TOP <ArrowUp size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
};
