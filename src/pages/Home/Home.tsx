import { BorderBeam } from 'border-beam';
import {
  Activity,
  ArrowUp,
  Code2,
  ChevronDown,
  Command,
  CornerUpLeft,
  Database,
  Download,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Github,
  Home as HomeIcon,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Smartphone,
  ShieldCheck,
  BriefcaseBusiness,
  RotateCw,
  Sun,
  Truck,
  UserRound,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PropsWithChildren,
} from 'react';
import { flushSync } from 'react-dom';
import { FaAws, FaDatabase, FaHospital, FaJava } from 'react-icons/fa';
import {
  SiApachekafka,
  SiDatadog,
  SiDocker,
  SiDotnet,
  SiGooglecloud,
  SiGraphql,
  SiNextdotjs,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import type { IconBaseProps, IconType } from 'react-icons';
import { clamp01, getTimelineColor, revealVisibleElements } from '@/lib/utils';

type ProjectItem = {
  title: string;
  period: string;
  description: string;
  href?: string;
  Icon?: LucideIcon;
  color?: string;
  nugetBadges?: {
    href: string;
    badgeSrc: string;
    label: string;
  }[];
};

type SkillItem = {
  label: string;
  Icon: IconType;
  color: string;
  darkColor?: string;
};

type WorkExperienceAccent = 'emerald' | 'blue' | 'pink';
type ThemeMode = 'light' | 'dark';
type ThemeTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => unknown;
};

type WorkExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  skills: string[];
  href: string;
  Icon: LucideIcon;
  logoSrc: string;
  accent: WorkExperienceAccent;
};

type TypingStyle = CSSProperties & {
  '--typing-characters': number;
  '--typing-delay': string;
  '--typing-duration': string;
};

type CommandPageLink = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

type CommandConnectLink = {
  href: string;
  label: string;
  Icon: LucideIcon;
  download?: string;
};

type ContextMenuPosition = {
  x: number;
  y: number;
};

type MobileTimelineLine = {
  height: number;
  top: number;
};

const Hl7Icon: IconType = ({
  size = 30,
  title,
  'aria-hidden': ariaHidden,
}: IconBaseProps) => {
  const iconSize = `${size}px`;
  const fontSize = `${(size as number) * 0.38}px`;

  return (
    <span
      aria-hidden={ariaHidden}
      className="skill-text-icon"
      style={{ fontSize, height: iconSize, width: iconSize }}
      title={title}
    >
      HL7
    </span>
  );
};

const SKILLS: SkillItem[] = [
  { label: 'C#', Icon: TbBrandCSharp, color: '#8b5cf6' },
  { label: '.NET', Icon: SiDotnet, color: '#6d4aff' },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { label: 'React', Icon: SiReact, color: '#61dafb' },
  {
    label: 'Next.js',
    Icon: SiNextdotjs,
    color: '#171513',
    darkColor: '#e8e1d5',
  },
  { label: 'GraphQL', Icon: SiGraphql, color: '#e10098' },
  { label: 'AWS', Icon: FaAws, color: '#ff9900' },
  { label: 'GCP', Icon: SiGooglecloud, color: '#4285f4' },
  { label: 'Docker', Icon: SiDocker, color: '#2496ed' },
  { label: 'Terraform', Icon: SiTerraform, color: '#7b42bc' },
  { label: 'SQL', Icon: FaDatabase, color: '#4f8cc9' },
  { label: 'Python', Icon: SiPython, color: '#3776ab' },
  { label: 'Java', Icon: FaJava, color: '#f89820' },
  { label: 'FHIR', Icon: FaHospital, color: '#ef4444' },
  { label: 'HL7', Icon: Hl7Icon, color: '#22c55e' },
  { label: 'Kafka', Icon: SiApachekafka, color: '#9ca3af' },
  { label: 'MassTransit', Icon: SiRabbitmq, color: '#5fcfa3' },
  { label: 'Datadog', Icon: SiDatadog, color: '#632ca6' },
];

const WORK_EXPERIENCE: WorkExperienceItem[] = [
  {
    company: 'FirmPilot',
    role: 'Senior Software Engineer',
    period: 'Apr 2025 - Present',
    location: 'Remote',
    summary:
      'Senior engineering ownership across distributed workers, AI automation, secure GraphQL APIs, and multi-tenant SaaS systems.',
    highlights: [
      'Built and owned fault-tolerant distributed worker systems on AWS SQS/SNS, ECS, RDS, Parameter Store, and Secrets Manager for content, social media, and backlink automation workflows.',
      'Designed secure GraphQL APIs and React/Next.js applications, maintaining p99 query latency below 25ms across multi-tenant workloads with RBAC and OAuth integrations.',
      'Engineered AI-driven content pipelines integrating LLMs, fact-checking, media generation, and automated WordPress publishing across hundreds of client sites.',
      'Merged 1,500+ PRs across backend, frontend, and infrastructure while mentoring engineers, leading CQRS refactors, and supporting production on-call response.',
    ],
    skills: ['.NET', 'GraphQL', 'AWS', 'React', 'Next.js', 'AI'],
    href: 'https://firmpilot.com/',
    Icon: Code2,
    logoSrc: '/firmpilot_logo.jpg',
    accent: 'pink',
  },
  {
    company: 'HCA Healthcare',
    role: 'Data Integration Engineer II',
    period: 'Sep 2023 - Apr 2025',
    location: 'Nashville, TN',
    summary:
      'Healthcare integration platform work across HIPAA-regulated .NET services, clinical interoperability standards, and cloud migration.',
    highlights: [
      'Owned and supported 200+ HIPAA-regulated .NET microservices processing over 1M daily events across clinical integration workflows.',
      'Integrated external EHR systems using FHIR APIs, HL7 messaging, and IHE interoperability standards for clinical data exchange.',
      'Led migration of legacy healthcare integration services to Apache NiFi with Terraform provisioning, Azure AD integration, and Google Cloud Platform deployment.',
      'Implemented Dynatrace monitoring, alerting, and automated failover workflows while mentoring engineers on platform architecture and HL7/FHIR integration patterns.',
    ],
    skills: ['.NET', 'FHIR', 'HL7', 'Kafka', 'GCP'],
    href: 'https://www.hcahealthcare.com/',
    Icon: Database,
    logoSrc: '/hca_logo.jpg',
    accent: 'blue',
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
    skills: ['React Native', 'React', 'Node.js', 'MySQL'],
    href: 'https://corollaicedelivery.com/',
    Icon: Truck,
    logoSrc: '/corolla_ice_delivery_logo.jpg',
    accent: 'emerald',
  },
];

const PROJECTS: ProjectItem[] = [
  {
    title: 'HL7Kit / HL7Kit.Fhir',
    period: '.NET • HL7 • FHIR',
    description:
      'Strongly typed HL7 v2 parser for .NET with full segment coverage, dynamic delimiter handling, Z-segment support, and FHIR R4 conversion. Published on NuGet.',
    href: 'https://github.com/tcmarkfeld/HL7Kit',
    Icon: Workflow,
    color: '#5fcfa3',
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
    period: '.NET • AWS • Terraform • MassTransit',
    description:
      'CLI for .NET teams on AWS that generates least-privilege IAM policies and Terraform resources from MassTransit, SQS, and SNS configuration. Published on NuGet.',
    href: 'https://github.com/tcmarkfeld/Conductor',
    Icon: ShieldCheck,
    color: '#a98216',
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
    period: '.NET • Kafka',
    description:
      'Price-time priority matching engine for .NET with Kafka-driven order submission, trade execution, and real-time order book management.',
    href: 'https://github.com/tcmarkfeld/PriceTime',
    Icon: Activity,
    color: '#5288f6',
  },
];

const EARLIER_WORK: ProjectItem[] = [
  {
    title: 'UA Lacrosse Website (MVC)',
    period: 'Jan 2022 - May 2022',
    description:
      'Built an MVC website for the University of Alabama lacrosse team with Stripe-powered secure payments.',
    Icon: FolderGit2,
    color: '#25596a',
  },
  {
    title: 'RateMyProfessor Data Analysis (Python)',
    period: 'Sep 2023 - Dec 2023',
    description:
      'Created a Python data pipeline for web scraping and statistical analysis of professor trends.',
    Icon: Database,
    color: '#5288f6',
  },
  {
    title: 'Five Horizons Health Services (Mobile)',
    period: 'Sep 2023 - Dec 2023',
    description:
      'Developed a React Native app enabling appointment booking and educational resource access.',
    Icon: Smartphone,
    color: '#8a6418',
  },
];

const COMMAND_PAGE_LINKS: CommandPageLink[] = [
  { id: 'top', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: UserRound },
  { id: 'experience', label: 'Experience', Icon: BriefcaseBusiness },
  { id: 'skills', label: 'Skills', Icon: Code2 },
  { id: 'projects', label: 'Projects', Icon: FolderGit2 },
  { id: 'education', label: 'Education', Icon: GraduationCap },
];

const COMMAND_CONNECT_LINKS: CommandConnectLink[] = [
  {
    href: 'https://github.com/tcmarkfeld',
    label: 'GitHub',
    Icon: Github,
  },
  {
    href: 'https://linkedin.com/in/timothy-markfeld',
    label: 'LinkedIn',
    Icon: Linkedin,
  },
  {
    href: 'mailto:timmarkfeld@gmail.com',
    label: 'Email',
    Icon: Mail,
  },
  {
    href: '/Timothy_Markfeld_Resume.pdf',
    label: 'Resume',
    Icon: Download,
    download: 'Timothy_Markfeld_Resume.pdf',
  },
];

const HERO_MARQUEE_ITEMS = [
  'Production Engineering',
  'Distributed Systems',
  'AI Automation',
  'GraphQL APIs',
  'Reliable .NET Services',
  'Cloud-Native Platforms',
  'Event-Driven Workers',
  'Healthcare Integration',
  'Observability First',
];

const THEME_STORAGE_KEY = 'site-theme';
const THEME_COLORS: Record<ThemeMode, string> = {
  light: '#faf7f2',
  dark: '#0d0b0a',
};
const MOBILE_TYPING_STAGGER_MS = 82;
const MOBILE_TYPING_MS_PER_CHARACTER = 16;
const MOBILE_TYPING_MIN_MS = 280;
const MOBILE_TYPING_MAX_MS = 1180;

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function useIsMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 960px)');
    const updateViewport = () => setIsMobileViewport(query.matches);

    updateViewport();
    query.addEventListener('change', updateViewport);

    return () => {
      query.removeEventListener('change', updateViewport);
    };
  }, []);

  return isMobileViewport;
}

function useScrollMetrics(isEnabled: boolean) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!isEnabled) {
      setProgress(0);
      return;
    }

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
  }, [isEnabled]);

  return { progress };
}

function getMobileTypingStyle(text: string, index: number): TypingStyle {
  const duration = Math.min(
    Math.max(
      text.length * MOBILE_TYPING_MS_PER_CHARACTER,
      MOBILE_TYPING_MIN_MS,
    ),
    MOBILE_TYPING_MAX_MS,
  );

  return {
    '--typing-characters': Math.max(text.length, 1),
    '--typing-delay': `${index * MOBILE_TYPING_STAGGER_MS}ms`,
    '--typing-duration': `${duration}ms`,
  };
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('top');
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [contextMenuPosition, setContextMenuPosition] =
    useState<ContextMenuPosition | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [timelineProgress, setTimelineProgress] = useState<number>(0);
  const [timelineCapOffset, setTimelineCapOffset] = useState<number>(0);
  const [mobileTimelineLine, setMobileTimelineLine] =
    useState<MobileTimelineLine | null>(null);
  const [expandedExperienceCompany, setExpandedExperienceCompany] = useState<
    string | null
  >(null);
  const isMobileViewport = useIsMobileViewport();
  const { progress } = useScrollMetrics(!isMobileViewport);
  const timelineCapColor = getTimelineColor(timelineProgress);
  const nextThemeMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';

  const toggleThemeMode = () => {
    const updateThemeMode = () => {
      flushSync(() => setThemeMode(nextThemeMode));
    };
    const transitionDocument = document as ThemeTransitionDocument;

    if (!transitionDocument.startViewTransition) {
      updateThemeMode();
      return;
    }

    transitionDocument.startViewTransition(updateThemeMode);
  };

  const toggleMobileExperience = (company: string) => {
    setExpandedExperienceCompany((currentCompany) =>
      currentCompany === company ? null : company,
    );
  };

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.documentElement.style.colorScheme = themeMode;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[themeMode]);
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    if (!isMobileViewport) {
      setExpandedExperienceCompany(null);
    }
  }, [isMobileViewport]);

  useEffect(() => {
    if (!isMobileViewport) {
      setMobileTimelineLine(null);
      return;
    }

    const timeline = timelineRef.current;

    if (!timeline) {
      return;
    }

    let frameId = 0;
    const updateMobileTimelineLine = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const markerElements = timeline.querySelectorAll<HTMLElement>(
          '.work-timeline-marker',
        );
        const firstMarker = markerElements.item(0);
        const lastMarker = markerElements.item(markerElements.length - 1);

        if (!firstMarker || !lastMarker) {
          frameId = 0;
          return;
        }

        const timelineRect = timeline.getBoundingClientRect();
        const firstMarkerRect = firstMarker.getBoundingClientRect();
        const lastMarkerRect = lastMarker.getBoundingClientRect();
        const top =
          firstMarkerRect.top - timelineRect.top + firstMarkerRect.height / 2;
        const end =
          lastMarkerRect.top - timelineRect.top + lastMarkerRect.height / 2;

        setMobileTimelineLine({ height: Math.max(end - top, 0), top });
        frameId = 0;
      });
    };

    const resizeObserver = new ResizeObserver(updateMobileTimelineLine);
    resizeObserver.observe(timeline);
    updateMobileTimelineLine();
    window.addEventListener('resize', updateMobileTimelineLine);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMobileTimelineLine);
    };
  }, [expandedExperienceCompany, isMobileViewport]);

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
      { threshold: 0.01, rootMargin: '0px 0px 12% 0px' },
    );

    revealElements.forEach((element) => observer.observe(element));
    revealVisibleElements();

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateTimelineProgress = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const timeline = timelineRef.current;

        if (!timeline) {
          frameId = 0;
          return;
        }

        const rect = timeline.getBoundingClientRect();
        const lineInset = window.innerWidth <= 960 ? 24 : 32;
        const lineHeight = Math.max(rect.height - lineInset * 2, 1);
        const viewportCenter = window.innerHeight / 2;
        const nextProgress = clamp01(
          (viewportCenter - rect.top - lineInset) / lineHeight,
        );

        setTimelineProgress(nextProgress);
        setTimelineCapOffset(lineInset + lineHeight * nextProgress);
        frameId = 0;
      });
    };

    updateTimelineProgress();
    window.addEventListener('scroll', updateTimelineProgress, {
      passive: true,
    });
    window.addEventListener('resize', updateTimelineProgress);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', updateTimelineProgress);
      window.removeEventListener('resize', updateTimelineProgress);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    if (isMobileViewport) {
      return;
    }

    let frameId = 0;
    const sectionIds = COMMAND_PAGE_LINKS.map((link) => link.id);

    const updateActiveSection = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        const activationLine = window.innerHeight * 0.36;
        let nextActiveSection = 'top';

        sectionIds.forEach((sectionId) => {
          const section = document.getElementById(sectionId);

          if (!section) {
            return;
          }

          if (section.getBoundingClientRect().top <= activationLine) {
            nextActiveSection = sectionId;
          }
        });

        setActiveSectionId(nextActiveSection);
        frameId = 0;
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    if (!contextMenuPosition) {
      return;
    }

    const closeMenu = () => setContextMenuPosition(null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', closeMenu, { passive: true });
    window.addEventListener('resize', closeMenu);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('resize', closeMenu);
    };
  }, [contextMenuPosition]);

  const closeContextMenu = () => setContextMenuPosition(null);

  const openContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsMobileNavOpen(false);

    const menuWidth = 232;
    const menuHeight = 336;
    const margin = 16;
    const x = Math.min(event.clientX, window.innerWidth - menuWidth - margin);
    const y = Math.min(event.clientY, window.innerHeight - menuHeight - margin);

    setContextMenuPosition({
      x: Math.max(margin, x),
      y: Math.max(margin, y),
    });
  };

  const handlePageNavigation = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setActiveSectionId(sectionId);
    setIsMobileNavOpen(false);

    window.setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (!section) {
        return;
      }

      section.scrollIntoView({ block: 'start', behavior: 'auto' });
      window.history.replaceState(null, '', `#${sectionId}`);
      if (!isMobileViewport) {
        revealVisibleElements();
      }
    }, 80);
  };

  return (
    <main
      className="site-shell"
      id="top"
      onClick={closeContextMenu}
      onContextMenu={openContextMenu}
    >
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
      />
      <header className="site-header">
        <div className="nav-bar">
          <a className="nav-logo-link" href="#top" aria-label="Back to top">
            {'<TM/>'}
          </a>
          <BorderBeam
            className="nav-pill-beam"
            colorVariant="sunset"
            size="pulse-outside"
            theme={themeMode}
          >
            <nav className="nav-pill" aria-label="Primary navigation">
              {COMMAND_PAGE_LINKS.slice(0, 5).map((link) => (
                <a
                  aria-current={
                    activeSectionId === link.id ? 'page' : undefined
                  }
                  data-active={activeSectionId === link.id}
                  href={`#${link.id}`}
                  key={link.id}
                  onClick={(event) => handlePageNavigation(event, link.id)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </BorderBeam>
          <BorderBeam
            colorVariant="sunset"
            className="command-menu-trigger-beam"
            size="pulse-outside"
            theme={themeMode}
          >
            <button
              className="command-menu-trigger"
              type="button"
              aria-label={
                isMobileNavOpen
                  ? 'Close navigation menu'
                  : 'Open navigation menu'
              }
              aria-expanded={isMobileNavOpen}
              aria-controls="command-navigation"
              onClick={() => setIsMobileNavOpen((current) => !current)}
            >
              <Command
                className="command-menu-trigger-desktop-icon"
                aria-hidden="true"
                size={21}
                strokeWidth={2.2}
              />
              <Menu
                className="command-menu-trigger-mobile-icon"
                aria-hidden="true"
                size={18}
                strokeWidth={2.2}
              />
              <span>Tap to Explore</span>
            </button>
          </BorderBeam>
        </div>
      </header>
      <div
        className="command-menu-overlay"
        data-open={isMobileNavOpen}
        onClick={() => setIsMobileNavOpen(false)}
      />
      <aside
        className="command-menu-dialog"
        id="command-navigation"
        data-open={isMobileNavOpen}
        aria-hidden={!isMobileNavOpen}
        aria-label="Navigation menu"
        role="dialog"
      >
        <div className="command-menu-header">
          <span>Navigation</span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <X aria-hidden="true" size={17} strokeWidth={2.2} />
          </button>
        </div>

        <div className="command-menu-section">
          <p>Theme</p>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${nextThemeMode} theme`}
            aria-pressed={themeMode === 'dark'}
            onClick={toggleThemeMode}
          >
            <span className="theme-toggle-icon" data-theme={themeMode}>
              <Sun
                aria-hidden="true"
                className="theme-toggle-sun"
                size={18}
                strokeWidth={2.1}
              />
              <Moon
                aria-hidden="true"
                className="theme-toggle-moon"
                size={18}
                strokeWidth={2.1}
              />
            </span>
            <span className="theme-toggle-copy">
              <strong>{themeMode === 'dark' ? 'Dark' : 'Light'}</strong>
              <span>Switch to {nextThemeMode}</span>
            </span>
          </button>
        </div>

        <div className="command-menu-section">
          <p>Pages</p>
          <div className="command-menu-grid">
            {COMMAND_PAGE_LINKS.map(({ id, label, Icon }) => (
              <a
                className="command-menu-card"
                href={`#${id}`}
                key={id}
                onClick={(event) => handlePageNavigation(event, id)}
              >
                <Icon aria-hidden="true" size={19} strokeWidth={2} />
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="command-menu-section">
          <p>Connect</p>
          <div className="command-menu-connect">
            {COMMAND_CONNECT_LINKS.map(({ href, label, Icon, download }) => (
              <a
                className="command-menu-card"
                href={href}
                key={label}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                download={download}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Icon aria-hidden="true" size={19} strokeWidth={2} />
                {label}
                {href.startsWith('http') ? (
                  <ExternalLink
                    className="command-menu-external-icon"
                    aria-hidden="true"
                    size={14}
                    strokeWidth={2}
                  />
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </aside>
      {contextMenuPosition ? (
        <aside
          className="context-menu"
          style={
            {
              '--context-menu-x': `${contextMenuPosition.x}px`,
              '--context-menu-y': `${contextMenuPosition.y}px`,
            } as CSSProperties
          }
          aria-label="Quick actions"
          onClick={(event) => event.stopPropagation()}
        >
          <p>Connect</p>
          <a
            className="context-menu-item context-menu-item-featured"
            href="/Timothy_Markfeld_Resume.pdf"
            download="Timothy_Markfeld_Resume.pdf"
            onClick={closeContextMenu}
          >
            <Download aria-hidden="true" size={17} strokeWidth={2.2} />
            <span>Download Resume</span>
            <strong>PDF</strong>
          </a>
          <a
            className="context-menu-item"
            href="https://github.com/tcmarkfeld"
            rel="noreferrer"
            target="_blank"
            onClick={closeContextMenu}
          >
            <Github aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>GitHub</span>
          </a>
          <a
            className="context-menu-item"
            href="https://linkedin.com/in/timothy-markfeld"
            rel="noreferrer"
            target="_blank"
            onClick={closeContextMenu}
          >
            <Linkedin aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>LinkedIn</span>
          </a>
          <a
            className="context-menu-item"
            href="mailto:timmarkfeld@gmail.com"
            onClick={closeContextMenu}
          >
            <Mail aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>Send Email</span>
          </a>
          <div className="context-menu-divider" />
          <p>Page</p>
          <button
            className="context-menu-item"
            type="button"
            onClick={() => {
              closeContextMenu();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ArrowUp aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>Scroll to Top</span>
            <kbd>Home</kbd>
          </button>
          <button
            className="context-menu-item"
            type="button"
            onClick={() => {
              closeContextMenu();
              window.history.back();
            }}
          >
            <CornerUpLeft aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>Go Back</span>
          </button>
          <button
            className="context-menu-item"
            type="button"
            onClick={() => {
              closeContextMenu();
              window.location.reload();
            }}
          >
            <RotateCw aria-hidden="true" size={16} strokeWidth={2.2} />
            <span>Refresh</span>
            <kbd>F5</kbd>
          </button>
        </aside>
      ) : null}

      <section className="hero section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit" aria-hidden="true">
          <span className="ring-large ring" />
          <span className="ring-small ring" />
          <span className="ring-dot" />
        </div>
        <div className="hero-center">
          <Reveal>
            <p className="hero-intro">~/profile/init</p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="hero-title">Timothy Markfeld</h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="hero-role">
              Senior Software Engineer • Distributed Systems • AI Automation
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="hero-summary">
              I turn complex backend workflows into production software that is
              fast, observable, and maintainable.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="hero-marquee-stack" aria-label="Engineering focus">
              <div className="hero-marquee" data-direction="left">
                <div className="hero-marquee-track">
                  {[...HERO_MARQUEE_ITEMS, ...HERO_MARQUEE_ITEMS].map(
                    (item, index) => (
                      <span key={`${item}-${index}`}>{item}</span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <a
              className="hero-scroll-cue"
              href="#about"
              aria-label="Scroll down"
            >
              <ChevronDown aria-hidden="true" size={18} strokeWidth={2} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section" id="about">
        <Reveal>
          <h2 className="section-title">About Me</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="about-bento">
            <article className="about-card about-profile-card">
              <div className="about-profile-header">
                <img
                  alt="Timothy Markfeld headshot"
                  className="about-avatar"
                  src="/headshot.png"
                />
                <div>
                  <h3>Timothy Markfeld</h3>
                  <p>Senior Software Engineer</p>
                </div>
              </div>
              <p className="about-copy">
                I build production platforms across GraphQL APIs, React/Next.js
                applications, AWS worker systems, and event-driven .NET
                microservices.
              </p>
              <p className="about-copy">
                I care about practical engineering, clear ownership, strong
                observability, and systems that stay maintainable after they
                ship.
              </p>
            </article>

            <article className="about-card about-focus-card">
              <p className="about-kicker">Currently Building</p>
              <h3>AI automation systems for legal marketing workflows</h3>
              <p className="about-copy">
                At{' '}
                <a
                  href="https://firmpilot.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  FirmPilot
                </a>
                , I work on LLM-driven content generation, SEO/GEO automation,
                WordPress publishing, multi-tenant performance, RBAC/OAuth
                integrations, and production incident response.
              </p>
              <div className="about-location-card">
                <div className="about-location-copy">
                  <p>Located In:</p>
                  <strong>St. Petersburg, FL</strong>
                </div>
                <div
                  className="florida-map"
                  aria-label="Map of Florida with pin near Tampa"
                  role="img"
                >
                  <svg viewBox="755 400 145 150" aria-hidden="true">
                    <g className="florida-map-content">
                      <path
                        className="florida-shape"
                        d="m 854.6867,535.28542 -0.19413,0 0.0971,0.0971 0.0971,-0.0971 z m -0.87357,-0.0971 0,0.0971 0.0971,0 -0.0971,-0.0971 z m 0.19413,-0.0971 0,-0.0971 0,0.0971 0,0 z m -13.20059,1.45594 0,0 0,0.0971 0,-0.0971 z m -0.19412,0.0971 0,-0.0971 0,0.0971 0,0 z m 0.0971,-0.0971 0,0 0,0 0,0 z m -0.97063,0.0971 -0.0971,0 0,0.0971 0.0971,-0.0971 z m 27.56592,-6.11498 -0.0971,0 0.0971,0.19412 0,-0.19412 z m 2.62071,-0.67944 0,-0.19413 -0.19413,0.29119 0.19413,-0.0971 z m -0.97063,-0.19413 -0.38826,-0.38825 -0.0971,0.0971 0.48532,0.29119 z m -0.29119,0.77651 -1.16476,-1.45595 0.67944,1.26182 0.48532,0.19413 z m 9.22099,-5.72673 0,0.38825 0.19413,-0.19412 -0.19413,-0.19413 z m 1.35889,-0.97063 0.29119,-0.48532 -0.38826,0.38826 0.0971,0.0971 z m 0.29119,-0.97063 -0.0971,0 0,0.0971 0.0971,-0.0971 z m -1.74714,-0.29119 -0.0971,-0.0971 0.0971,0.0971 0,0 z m 0.87357,-1.45595 -0.0971,-0.0971 0,0.19413 0.0971,-0.0971 z m -2.62071,-0.0971 -0.0971,-0.0971 0.0971,0.0971 0,0 z m 3.30015,-2.23245 -0.19413,0.0971 0.29119,0.0971 -0.0971,-0.19412 z m 0.38825,0 -0.19412,-0.19413 0.0971,0.29119 0.0971,-0.0971 z m -0.67944,-0.19413 -0.0971,-0.0971 0,0.19412 0.0971,-0.0971 z m 3.59134,-0.67944 0,-0.0971 -0.19413,0.38825 0.19413,-0.29119 z m -4.07665,0.38825 -0.19413,0 0.19413,0.0971 0,-0.0971 z m 2.03832,-1.16476 -0.29119,0 -0.0971,0.0971 0.38825,-0.0971 z m 0.77651,-0.48531 0,0 -0.0971,0 0.0971,0 z m -8.15331,0.38825 0,-0.19412 -0.0971,0.19412 0.0971,0 z m 0.87357,-0.29119 -0.29119,0 0.29119,0.58238 0,-0.58238 z m -2.32951,0.0971 0,-0.58238 -0.48532,0.0971 0.48532,0.48532 z m -1.35889,-0.97064 0.48532,0.48532 0,-0.19413 -0.48532,-0.29119 z m 14.26828,0.58238 -1.74713,0.77651 0.58237,0.0971 1.16476,-0.87357 z m -13.58883,-0.87356 -0.58238,0 0,0.19412 0.58238,-0.19412 z m 15.33597,-4.85316 0.0971,-0.48532 0.0971,-1.26182 -0.19412,1.74714 z m 0.0971,-5.43554 -0.38825,-0.97063 -0.19413,0.38826 0.58238,0.58237 z m -22.42158,2.42658 -0.19413,0.29119 0.48532,0.0971 -0.29119,-0.38825 z m -1.8442,-0.87357 -0.87357,0.29119 0.67945,0.0971 0.19412,-0.38826 z m -1.94126,0.19413 0,-0.29119 -0.0971,0.0971 0.0971,0.19413 z m -2.03833,-0.0971 -0.58238,0.38825 0.77651,0.38825 -0.19413,-0.7765 z m 2.71777,0.0971 -0.0971,-0.29119 -0.48532,-0.0971 0.58238,0.38825 z m -12.71527,-9.51219 -0.58238,0.29119 1.16476,0.38826 -0.58238,-0.67945 z m -2.32951,-3.10602 -0.77651,-1.16475 0.29119,0.87357 0.48532,0.29118 z m 3.00895,1.94127 -1.35888,-3.10602 -0.97063,-0.29119 2.32951,3.39721 z m -3.88252,-3.88253 -0.29119,-0.7765 -0.19413,-0.48532 0.48532,1.26182 z m -8.05624,-10.774 -1.74714,-1.26182 0.67945,0.67944 1.06769,0.58238 z m 43.6784,-6.50323 -7.0856,-11.8417 -0.38826,0 7.47386,11.8417 z m -49.01687,-18.92731 -0.29119,-0.0971 0.29119,0.19412 0,-0.0971 z m -0.58238,-0.67944 -0.0971,0.0971 0.0971,0.0971 0,-0.19412 z m -0.67944,-0.97063 0,-0.0971 -0.0971,0.0971 0.0971,0 z m 0.38825,-0.38826 0.29119,0.19413 0,-0.19413 -0.29119,0 z m 0.58238,-0.38825 -0.38825,0.0971 0.0971,0 0.29119,-0.0971 z m -0.67944,-0.0971 -0.29119,-0.29119 0.0971,0.0971 0.19413,0.19413 z m -0.67944,-1.0677 -0.19413,0 0.29119,0.0971 -0.0971,-0.0971 z m 0.67944,-1.16475 -0.38826,0 -0.0971,0.0971 0.48532,-0.0971 z m 0.38825,0.19412 -0.48532,-0.48531 0.19413,0.0971 0.29119,0.38825 z m -3.6884,-4.17371 -0.19413,-0.0971 0,0.0971 0.19413,0 z m -4.17371,0 -0.29119,-0.38825 0.0971,0.48531 0.19413,-0.0971 z m -35.33098,-3.20309 2.91189,-2.23245 -3.20308,2.13539 0.29119,0.0971 z m 5.82379,-4.65902 0.29119,-0.29119 -1.16476,0.48531 0.87357,-0.19412 z m -36.88399,-6.50323 -10.57988,3.39721 5.82379,-1.65008 4.75609,-1.74713 z m 26.30411,-16.50073 -2.81483,0.48531 -41.93127,6.79442 4.36784,9.9975 0.29119,0.0971 -1.06769,3.97959 3.10602,-1.35888 3.3972,-3.00896 5.82379,-0.19412 6.69736,-2.42658 4.56196,0.67944 -1.06769,1.65007 8.34743,2.81483 7.18267,3.49428 1.65007,3.88252 5.33847,-1.16476 12.61821,-10.28869 4.65903,0.19413 19.02437,14.36534 3.88252,-0.77651 4.07666,5.43554 0.7765,8.63862 -1.26182,5.43553 0.58238,2.71777 3.39721,6.79442 -1.55301,-5.33847 4.36784,-0.0971 0.38825,3.88253 -2.32951,6.01791 8.05624,11.0652 3.00895,0.0971 -2.52364,-3.39721 3.10602,0.38825 1.8442,-1.16475 -0.7765,6.21204 4.17371,3.30014 2.81483,7.57093 3.78546,2.32951 4.85316,1.26182 6.69735,8.54156 3.49428,1.84419 -4.65903,0.29119 2.13538,2.42658 7.66799,-2.52364 3.78546,-2.13539 3.49427,-12.22995 -1.74713,-19.02437 -0.38825,-1.94127 -9.31806,-15.53009 -7.95918,-11.25933 -4.4649,-9.22099 3.78546,3.20308 0.7765,-0.58238 1.65008,8.05624 4.27077,6.11498 -4.17371,-8.1533 0.19413,-3.88253 -12.52115,-15.23891 -3.00895,-4.75609 -3.97959,-8.05624 -2.71777,-6.79442 -2.13539,-2.42658 -0.48531,-3.10602 -0.0971,-0.0971 -6.69735,-0.38825 -2.62071,2.03832 -1.45594,7.47386 -1.35889,-3.49427 -45.81379,5.72672 -3.30014,-5.14434 0.0971,-0.0971 z"
                      />
                      <g className="florida-map-markers">
                        <circle
                          className="florida-pin-halo"
                          cx="831"
                          cy="465"
                          r="6"
                        />
                        <circle
                          className="florida-pin-dot"
                          cx="831"
                          cy="465"
                          r="2.6"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </article>

            <article className="about-card about-platform-card">
              <div className="about-card-icon">
                <Workflow aria-hidden="true" size={20} strokeWidth={2} />
              </div>
              <p className="about-kicker">Platform Background</p>
              <h3>Healthcare integration, cloud migration, and reliability</h3>
              <p className="about-copy">
                Before FirmPilot, I worked at{' '}
                <a
                  href="https://www.hcahealthcare.com/"
                  rel="noreferrer"
                  target="_blank"
                >
                  HCA Healthcare
                </a>{' '}
                on high-volume Kafka events, HL7/FHIR data, Apache NiFi, and
                HIPAA-regulated .NET microservices.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      <Reveal delay={180}>
        <a className="atlas-preview" href="/chat" id="about-end">
          <div className="atlas-preview-topbar">
            <span className="atlas-preview-brand">{'<TM/>'}</span>
            <span>Experience workspace</span>
            <ExternalLink aria-hidden="true" size={15} strokeWidth={2} />
          </div>
          <div className="atlas-preview-body">
            <div className="atlas-preview-rail" aria-hidden="true">
              <span className="is-active">FirmPilot</span>
              <span>HCA Healthcare</span>
              <span>Corolla Ice Delivery</span>
            </div>
            <div className="atlas-preview-chat">
              <p className="atlas-preview-thread">Experience thread</p>
              <h3>FirmPilot</h3>
              <p className="atlas-preview-user">Walk me through this work.</p>
              <p>
                I own production engineering across AI automation, distributed
                workers, GraphQL APIs, and multi-tenant SaaS systems.
              </p>
              <span className="atlas-preview-link">
                Open interactive experience
                <ExternalLink aria-hidden="true" size={14} strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </a>
      </Reveal>

      <section className="section" id="experience">
        <Reveal>
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">Experience</h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="work-timeline"
            aria-label="Work experience timeline"
            ref={timelineRef}
            style={
              {
                '--timeline-cap-color': timelineCapColor,
                '--timeline-cap-offset': `${timelineCapOffset}px`,
                '--timeline-progress': timelineProgress,
                '--timeline-remaining': `${(1 - timelineProgress) * 100}%`,
                '--mobile-timeline-line-height': `${mobileTimelineLine?.height ?? 0}px`,
                '--mobile-timeline-line-opacity': mobileTimelineLine ? 1 : 0,
                '--mobile-timeline-line-top': `${mobileTimelineLine?.top ?? 0}px`,
              } as CSSProperties
            }
          >
            <div className="work-timeline-line" aria-hidden="true" />
            <div className="work-timeline-cap" aria-hidden="true" />
            <div className="work-timeline-items">
              {WORK_EXPERIENCE.map((experience) => {
                const isExperienceExpanded =
                  expandedExperienceCompany === experience.company;
                const mobileDetailsId = `experience-${experience.company
                  .toLowerCase()
                  .replace(/\s+/g, '-')}-details`;

                return (
                  <article
                    className="work-timeline-item"
                    data-accent={experience.accent}
                    key={experience.company}
                  >
                    <div className="work-timeline-marker" aria-hidden="true">
                      {!isMobileViewport && (
                        <img
                          alt=""
                          className="work-timeline-logo"
                          src={experience.logoSrc}
                        />
                      )}
                    </div>
                    {isMobileViewport ? (
                      <div className="work-timeline-content">
                        <button
                          aria-controls={mobileDetailsId}
                          aria-expanded={isExperienceExpanded}
                          className="work-timeline-mobile-trigger"
                          onClick={() =>
                            toggleMobileExperience(experience.company)
                          }
                          type="button"
                        >
                          <span
                            className="work-timeline-mobile-icon"
                            aria-hidden="true"
                          >
                            <img
                              alt=""
                              className="work-timeline-logo"
                              src={experience.logoSrc}
                            />
                          </span>
                          <span className="work-timeline-mobile-heading">
                            <span className="work-timeline-mobile-company">
                              {experience.company}
                            </span>
                            <span className="work-timeline-mobile-role">
                              {experience.role}
                            </span>
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className="work-timeline-mobile-chevron"
                            size={18}
                            strokeWidth={2.4}
                          />
                        </button>
                        {isExperienceExpanded && (
                          <div
                            className="work-timeline-mobile-details"
                            id={mobileDetailsId}
                          >
                            <p
                              className="work-timeline-mobile-meta work-mobile-typing"
                              style={getMobileTypingStyle(
                                `${experience.period} - ${experience.location}`,
                                0,
                              )}
                            >
                              {experience.period} - {experience.location}
                            </p>
                            <p
                              className="work-summary work-mobile-typing"
                              style={getMobileTypingStyle(
                                experience.summary,
                                1,
                              )}
                            >
                              {experience.summary}
                            </p>
                            <p
                              className="work-timeline-mobile-label work-mobile-typing"
                              style={getMobileTypingStyle(
                                'Key achievements',
                                2,
                              )}
                            >
                              Key achievements
                            </p>
                            <ul>
                              {experience.highlights.map(
                                (highlight, highlightIndex) => (
                                  <li
                                    className="work-mobile-typing"
                                    key={highlight}
                                    style={getMobileTypingStyle(
                                      highlight,
                                      highlightIndex + 3,
                                    )}
                                  >
                                    {highlight}
                                  </li>
                                ),
                              )}
                            </ul>
                            <div
                              className="work-timeline-skills"
                              aria-label={`${experience.company} skills`}
                            >
                              {experience.skills.map((skill, skillIndex) => (
                                <span
                                  className="work-mobile-typing"
                                  key={skill}
                                  style={getMobileTypingStyle(
                                    skill,
                                    skillIndex +
                                      experience.highlights.length +
                                      3,
                                  )}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <a
                              className="work-timeline-mobile-link"
                              href={experience.href}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Learn more
                              <ExternalLink size={14} strokeWidth={2.2} />
                            </a>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="work-timeline-content">
                        <p className="work-timeline-period">
                          {experience.period}
                        </p>
                        <h3>{experience.role}</h3>
                        <a
                          className="work-timeline-company"
                          href={experience.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {experience.company}
                        </a>
                        <p className="work-timeline-location">
                          {experience.location}
                        </p>
                        <p className="work-summary">{experience.summary}</p>
                        <ul>
                          {experience.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                        <div
                          className="work-timeline-skills"
                          aria-label={`${experience.company} skills`}
                        >
                          {experience.skills.map((skill) => (
                            <span key={skill}>{skill}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>

      </section>

      <section className="section" id="skills">
        <Reveal>
          <h2 className="section-title skills-title">Skills</h2>
        </Reveal>

        <div className="skills-grid" aria-label="Technical skills">
          {SKILLS.map(({ label, Icon, color, darkColor }, index) => (
            <Reveal delay={45 * index} key={label}>
              <article
                className="skill-card"
                style={
                  {
                    '--skill-color-light': color,
                    '--skill-color-dark': darkColor ?? color,
                  } as CSSProperties
                }
              >
                <Icon aria-hidden="true" size={30} />
                <h3>{label}</h3>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <Reveal>
          <div>
            <h2 className="section-title">Projects</h2>
          </div>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <Reveal delay={120 * index} key={project.title}>
              <article
                className="project-card"
                style={
                  {
                    '--project-color': project.color ?? '#2f6f83',
                  } as CSSProperties
                }
              >
                <div className="project-heading">
                  {project.Icon ? (
                    <div className="project-icon" aria-hidden="true">
                      <project.Icon size={25} strokeWidth={2.1} />
                    </div>
                  ) : null}
                  <h3>{project.title}</h3>
                </div>
                <p className="project-meta">{project.period}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-badge-row">
                  {project.nugetBadges?.map((badge) => (
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

        <Reveal delay={360}>
          <div className="earlier-work">
            <h3 className="section-subtitle">Earlier Work</h3>
            <div className="earlier-work-grid">
              {EARLIER_WORK.map((project) => (
                <article
                  className="earlier-work-card"
                  key={project.title}
                  style={
                    {
                      '--project-color': project.color ?? '#2f6f83',
                    } as CSSProperties
                  }
                >
                  {project.Icon ? (
                    <div className="earlier-work-icon" aria-hidden="true">
                      <project.Icon size={18} strokeWidth={2} />
                    </div>
                  ) : null}
                  <div>
                    <h4>{project.title}</h4>
                    <p className="earlier-work-meta">{project.period}</p>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="section split-layout education-section"
        id="education"
      >
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
        <div className="footer-brand">
          <a className="footer-logo" href="#top" aria-label="Back to top">
            {'<TM/>'}
          </a>
          <p>Timothy Markfeld</p>
          <span>Senior Software Engineer</span>
        </div>
        <div className="footer-column">
          <h2>Links</h2>
          {COMMAND_PAGE_LINKS.map(({ id, label }) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>
        <div className="footer-column">
          <h2>Social</h2>
          <div className="footer-social">
            {COMMAND_CONNECT_LINKS.filter(({ label }) =>
              ['GitHub', 'LinkedIn', 'Email'].includes(label),
            ).map(({ href, label, Icon }) => (
              <a
                href={href}
                key={label}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                aria-label={label}
              >
                <Icon aria-hidden="true" size={16} strokeWidth={2.1} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
};
