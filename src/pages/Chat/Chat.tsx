import { Link } from '@tanstack/react-router';
import {
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  Braces,
  Building2,
  ChevronRight,
  Cloud,
  Database,
  Download,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  Network,
  Moon,
  Plus,
  Sun,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { ROUTES } from '@/Navigation/routeEnum';

type ThreadId =
  | 'firmpilot'
  | 'hca'
  | 'corolla'
  | 'hl7kit'
  | 'conductor'
  | 'pricetime';

type Thread = {
  accent: 'amber' | 'blue' | 'cyan' | 'emerald' | 'pink' | 'violet';
  href: string;
  Icon: LucideIcon;
  id: ThreadId;
  messages: string[];
  logoSrc?: string;
  period: string;
  role: string;
  stack: string[];
  title: string;
  type: 'Experience' | 'Open source';
};

type ChatTheme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'site-theme';
const CHAT_THEME_COLORS: Record<ChatTheme, string> = {
  dark: '#0d0b0a',
  light: '#faf7f2',
};

const THREADS: Thread[] = [
  {
    accent: 'amber',
    href: 'https://firmpilot.com/',
    Icon: Building2,
    id: 'firmpilot',
    logoSrc: '/firmpilot_logo.jpg',
    messages: [
      'I own production engineering across AI automation, distributed workers, GraphQL APIs, and multi-tenant SaaS systems.',
      'Built fault-tolerant AWS worker systems for content, social media, and backlink automation using SQS, SNS, ECS, RDS, Parameter Store, and Secrets Manager.',
      'Designed secure GraphQL APIs and React/Next.js applications while keeping p99 query latency below 25ms across multi-tenant workloads.',
    ],
    period: 'Apr 2025 - Present',
    role: 'Senior Software Engineer',
    stack: ['AWS', 'GraphQL', '.NET', 'React', 'Next.js', 'AI'],
    title: 'FirmPilot',
    type: 'Experience',
  },
  {
    accent: 'blue',
    href: 'https://www.hcahealthcare.com/',
    Icon: Database,
    id: 'hca',
    logoSrc: '/hca_logo.jpg',
    messages: [
      'I worked on healthcare integration systems across HIPAA-regulated services, clinical interoperability standards, and cloud migration.',
      'Owned and supported 200+ .NET microservices processing more than one million daily events across clinical integration workflows.',
      'Integrated external EHR systems with FHIR APIs, HL7 messaging, IHE standards, Apache NiFi, Terraform, Azure AD, and Google Cloud Platform.',
    ],
    period: 'Sep 2023 - Apr 2025',
    role: 'Data Integration Engineer II',
    stack: ['.NET', 'FHIR', 'HL7', 'Kafka', 'GCP'],
    title: 'HCA Healthcare',
    type: 'Experience',
  },
  {
    accent: 'cyan',
    href: 'https://corollaicedelivery.com/',
    Icon: Network,
    id: 'corolla',
    logoSrc: '/corolla_ice_delivery_logo.jpg',
    messages: [
      'I led product and operations work for a seasonal delivery business, spanning customer management, mobile workflows, and route optimization.',
      'Designed and developed a full-stack mobile app to manage deliveries and customer information in the field.',
      'Built an address and neighborhood sorting algorithm to optimize each daily driver route.',
    ],
    period: 'May 2020 - Aug 2022',
    role: 'Manager and Lead Developer',
    stack: ['React Native', 'React', 'Node.js', 'MySQL'],
    title: 'Corolla Ice Delivery',
    type: 'Experience',
  },
  {
    accent: 'emerald',
    href: 'https://github.com/tcmarkfeld/HL7Kit',
    Icon: Braces,
    id: 'hl7kit',
    messages: [
      'HL7Kit is a strongly typed HL7 v2 parser for .NET, built to make clinical message handling safer and more maintainable.',
      'It supports full segment coverage, dynamic delimiter handling, Z-segments, and FHIR R4 conversion.',
      'Published as a NuGet package for teams building healthcare interoperability software.',
    ],
    period: 'Open source',
    role: 'HL7 and FHIR toolkit',
    stack: ['.NET', 'HL7', 'FHIR', 'NuGet'],
    title: 'HL7Kit',
    type: 'Open source',
  },
  {
    accent: 'pink',
    href: 'https://github.com/tcmarkfeld/Conductor',
    Icon: Cloud,
    id: 'conductor',
    messages: [
      'Conductor is a CLI for .NET teams operating event-driven systems on AWS.',
      'It generates least-privilege IAM policies and Terraform resources from MassTransit, SQS, and SNS configuration.',
      'The goal is to turn infrastructure conventions into repeatable, reviewable output.',
    ],
    period: 'Open source',
    role: 'AWS policy generator',
    stack: ['AWS', 'Terraform', 'MassTransit', '.NET'],
    title: 'Conductor',
    type: 'Open source',
  },
  {
    accent: 'violet',
    href: 'https://github.com/tcmarkfeld/PriceTime',
    Icon: GitBranch,
    id: 'pricetime',
    messages: [
      'PriceTime is a price-time priority matching engine built around event-driven order processing.',
      'It handles Kafka-driven order submission, trade execution, and a real-time order book.',
      'The project explores deterministic matching behavior and clear CQRS boundaries in .NET.',
    ],
    period: 'Open source',
    role: 'Trading engine',
    stack: ['.NET', 'Kafka', 'CQRS'],
    title: 'PriceTime',
    type: 'Open source',
  },
];

function getTypingDuration(text: string): string {
  return `${Math.min(Math.max(text.length * 15, 420), 1250)}ms`;
}

function getInitialChatTheme(): ChatTheme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function Chat() {
  const [activeThreadId, setActiveThreadId] = useState<ThreadId>('firmpilot');
  const [visibleMessageCount, setVisibleMessageCount] = useState<number>(0);
  const [chatTheme, setChatTheme] = useState<ChatTheme>(getInitialChatTheme);
  const activeThread = THREADS.find((thread) => thread.id === activeThreadId);

  useEffect(() => {
    document.documentElement.dataset.theme = chatTheme;
    document.documentElement.style.colorScheme = chatTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', CHAT_THEME_COLORS[chatTheme]);
    window.localStorage.setItem(THEME_STORAGE_KEY, chatTheme);
  }, [chatTheme]);

  useEffect(() => {
    setVisibleMessageCount(0);
    const firstMessageTimer = window.setTimeout(
      () => setVisibleMessageCount(1),
      180,
    );

    return () => window.clearTimeout(firstMessageTimer);
  }, [activeThreadId]);

  useEffect(() => {
    if (!activeThread || visibleMessageCount === 0) {
      return;
    }

    if (visibleMessageCount >= activeThread.messages.length) {
      return;
    }

    const nextMessageTimer = window.setTimeout(
      () => setVisibleMessageCount((current) => current + 1),
      920,
    );

    return () => window.clearTimeout(nextMessageTimer);
  }, [activeThread, visibleMessageCount]);

  if (!activeThread) {
    return null;
  }

  return (
    <main className="atlas-page codex-page" data-chat-theme={chatTheme}>
      <header className="codex-topbar">
        <div className="codex-topbar-start">
          <Link className="codex-brand" to={ROUTES.HOME}>
            {'<TM/>'}
          </Link>
          <Link className="codex-mobile-return" hash="about-end" to={ROUTES.HOME}>
            <ArrowLeft aria-hidden="true" size={14} />
            <span>Return home</span>
          </Link>
        </div>
        <span className="codex-mobile-title">Experience</span>
        <div className="codex-topbar-actions">
          <a
            className="codex-topbar-status"
            download="Timothy_Markfeld_Resume.pdf"
            href="/Timothy_Markfeld_Resume.pdf"
          >
            <Download aria-hidden="true" size={14} /> Resume
          </a>
          <button
            aria-label={`Switch to ${chatTheme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={chatTheme === 'dark'}
            className="codex-theme-toggle"
            onClick={() =>
              setChatTheme((currentTheme) =>
                currentTheme === 'dark' ? 'light' : 'dark',
              )
            }
            type="button"
          >
            <span className="codex-theme-toggle-icon" data-theme={chatTheme}>
              <Sun
                aria-hidden="true"
                className="codex-theme-toggle-sun"
                size={14}
                strokeWidth={2.1}
              />
              <Moon
                aria-hidden="true"
                className="codex-theme-toggle-moon"
                size={14}
                strokeWidth={2.1}
              />
            </span>
          </button>
        </div>
      </header>

      <div className="codex-shell">
        <aside className="codex-sidebar" aria-label="Experience threads">
          <div className="codex-sidebar-heading">
            <p>Threads</p>
            <Terminal aria-hidden="true" size={15} />
          </div>
          <nav>
            {THREADS.map((thread) => {
              const isActive = thread.id === activeThreadId;

              return (
                <button
                  aria-current={isActive ? 'page' : undefined}
                  className="codex-thread"
                  data-accent={thread.accent}
                  key={thread.id}
                  onClick={() => {
                    setVisibleMessageCount(0);
                    setActiveThreadId(thread.id);
                  }}
                  type="button"
                >
                  <span className="codex-thread-icon">
                    {thread.logoSrc ? (
                      <img alt="" className="codex-thread-logo" src={thread.logoSrc} />
                    ) : (
                      <thread.Icon aria-hidden="true" size={16} strokeWidth={2} />
                    )}
                  </span>
                  <span>
                    <strong>{thread.title}</strong>
                    <small>{thread.type}</small>
                  </span>
                  {isActive && <ChevronRight aria-hidden="true" size={15} />}
                </button>
              );
            })}
          </nav>
          <Link className="codex-return-home" hash="about-end" to={ROUTES.HOME}>
            <ArrowLeft aria-hidden="true" size={15} /> Return to home
          </Link>
        </aside>

        <section className="codex-chat" aria-label={`${activeThread.title} conversation`}>
          <header className="codex-chat-header">
            <div>
              <p>{activeThread.type} thread</p>
              <h1>{activeThread.title}</h1>
            </div>
            <span>{activeThread.period}</span>
          </header>

          <div className="codex-transcript" key={activeThread.id}>
            <div className="codex-message codex-message-user">
              <p>Walk me through this work.</p>
            </div>

            {activeThread.messages.slice(0, visibleMessageCount).map((message) => (
              <div className="codex-message codex-message-assistant" key={message}>
                <p
                  className="codex-typed-message"
                  style={
                    {
                      '--message-characters': Math.max(message.length, 1),
                      '--message-duration': getTypingDuration(message),
                    } as CSSProperties
                  }
                >
                  {message}
                </p>
              </div>
            ))}

            {visibleMessageCount >= activeThread.messages.length && (
              <div className="codex-thread-summary">
                <div className="codex-summary-role">
                  <p>Role</p>
                  <strong>{activeThread.role}</strong>
                </div>
                <div className="codex-summary-stack">
                  <p>Stack</p>
                  <span>{activeThread.stack.join(' / ')}</span>
                </div>
            <a href={activeThread.href} rel="noreferrer" target="_blank">
                  Open thread <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </div>
            )}
          </div>

          <div className="codex-composer">
            <p>Ask about {activeThread.title}</p>
            <div className="codex-composer-toolbar">
              <div className="codex-composer-actions">
                <span className="codex-composer-plus" aria-hidden="true">
                  <Plus size={17} />
                </span>
                <a className="codex-composer-link" href="mailto:timmarkfeld@gmail.com">
                  <Mail aria-hidden="true" size={15} />
                  <span>Contact me</span>
                </a>
                <span className="codex-composer-divider" aria-hidden="true" />
                <a
                  className="codex-composer-link codex-composer-social"
                  href="https://github.com/tcmarkfeld"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Github aria-hidden="true" size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  className="codex-composer-link codex-composer-social"
                  href="https://linkedin.com/in/timothy-markfeld"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Linkedin aria-hidden="true" size={15} />
                  <span>LinkedIn</span>
                </a>
                <a
                  className="codex-composer-link codex-composer-resume"
                  download="Timothy_Markfeld_Resume.pdf"
                  href="/Timothy_Markfeld_Resume.pdf"
                >
                  <Download aria-hidden="true" size={15} />
                  <span>Resume</span>
                </a>
              </div>
              <span className="codex-composer-send" aria-hidden="true">
                <ArrowUp aria-hidden="true" size={17} />
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
