import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { ROUTES } from '@/Navigation/routeEnum';
import { useDarkTheme } from '@/lib/theme';
import { useReveal } from '@/lib/useReveal';
import '@/pages/Home/Home.css';
import './CaseStudy.css';

const facts = [
  { label: 'Role', value: 'Full Stack Engineer' },
  { label: 'When', value: 'May 2020 — Aug 2023' },
  { label: 'Stack', value: 'React Native, React, Node.js, MySQL' },
  { label: 'Shipped to', value: 'App Store and Google Play' },
  { label: 'Result', value: 'Up to 3 hours cut from a delivery day' },
];

const screens = [
  {
    src: '/ice-delivery-today-page.webp',
    title: 'Today',
    caption:
      'Counts of coolers and loose or bagged ice up top, then every stop with one-tap map, call, and text.',
  },
  {
    src: '/ice-delivery-add-page.webp',
    title: 'Add',
    caption:
      'New bookings capture the customer, the delivery window, and the order in one form.',
  },
  {
    src: '/ice-delivery-all-deliveries-page.webp',
    title: 'All',
    caption:
      'Search and a week filter across every booking, with edit and delete inline.',
  },
];

const story = [
  {
    label: 'The problem',
    body: 'Scheduling was manual. During peak season, every day’s deliveries had to be sorted and planned by hand.',
  },
  {
    label: 'What I built',
    body: 'A React Native app for drivers and operations, shipped to the App Store and Google Play. Route optimization replaced the manual scheduling, and a React site with a Node and MySQL backend meant drivers and ops ran on one stack end to end.',
  },
  {
    label: 'The result',
    body: 'The app ran day-to-day operations through peak season and cut daily delivery time by up to three hours.',
  },
];

export function CorollaCaseStudy() {
  const dark = useDarkTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  useReveal(pageRef);

  useEffect(() => {
    document.title = 'Corolla Ice Delivery case study | Timothy Markfeld';
    return () => {
      document.title = 'Timothy Markfeld | Senior Software Engineer';
    };
  }, []);

  return (
    <div
      className="site case-study"
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
        <section className="column case-intro">
          <Link
            className="back-link"
            to={ROUTES.HOME}
            hash="experience"
            viewTransition
          >
            <ArrowLeft size={13} aria-hidden="true" /> Back
          </Link>
          <p className="case-kicker">
            <img
              src="/corolla_ice_delivery_logo.webp"
              alt=""
              width="20"
              height="20"
            />
            Corolla Ice Delivery · Case study
          </p>
          <h1>Routing ice across the Outer Banks.</h1>
          <p>
            Corolla Ice Delivery delivers ice around Corolla, on North
            Carolina’s Outer Banks. I owned their delivery app from design
            through both app stores, plus the site and backend behind it.
          </p>
        </section>

        <div className="case-screens" data-reveal>
          {screens.map((screen) => (
            <figure key={screen.title}>
              <div className="phone-shot">
                <img
                  src={screen.src}
                  alt={`${screen.title} screen of the Corolla Ice Delivery app`}
                  width="640"
                  height="1390"
                  loading="lazy"
                />
              </div>
              <figcaption>
                <strong>{screen.title}</strong>
                {screen.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="case-note">Screens shown with sample data.</p>

        <section className="column" data-reveal>
          <h2 className="label">At a glance</h2>
          <dl className="details">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {story.map((part) => (
          <section className="column case-part" key={part.label} data-reveal>
            <h2 className="label">{part.label}</h2>
            <p>{part.body}</p>
          </section>
        ))}

        <section className="column case-part">
          <a
            className="chip"
            href="https://corollaicedelivery.com/"
            target="_blank"
            rel="noreferrer"
          >
            corollaicedelivery.com <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
