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
      ?.setAttribute('content', dark ? '#142528' : '#f4f2e9');
  }, [dark]);

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
