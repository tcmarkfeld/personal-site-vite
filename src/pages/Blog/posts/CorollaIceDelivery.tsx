import { ArrowUpRight } from 'lucide-react';

const facts = [
  { label: 'Role', value: 'Full Stack Engineer' },
  { label: 'When', value: 'May 2020 — Aug 2023' },
  { label: 'Stack', value: 'React Native, React, Node.js, MySQL' },
  { label: 'Shipped to', value: 'App Store and Google Play' },
  { label: 'Result', value: 'Up to 3 hours cut from a delivery day' },
];

const screens = [
  {
    src: '/ice-delivery-route.webp',
    title: 'Today’s route',
    caption:
      'Stops grouped by neighborhood, with drop-offs, refills, and pickups, the day’s bag count, and one-tap navigate, call, and text.',
  },
  {
    src: '/ice-delivery-route-progress.webp',
    title: 'Checking off stops',
    caption:
      'Marking a stop done updates the day’s progress and moves it to the Done tab.',
  },
  {
    src: '/ice-delivery-new-delivery.webp',
    title: 'New delivery',
    caption:
      'Bookings capture the customer, the rental address and neighborhood, and the rental dates.',
  },
  {
    src: '/ice-delivery-deliveries.webp',
    title: 'Deliveries',
    caption:
      'Every booking on record, searchable, with a week view and statuses like Active and Pickup today.',
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

export function CorollaIceDelivery() {
  return (
    <>
      <section className="column post-lede">
        <p>
          Corolla Ice Delivery delivers ice around Corolla, on North Carolina’s
          Outer Banks. I owned their delivery app from design through both app
          stores, plus the site and backend behind it.
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
                height="1392"
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
    </>
  );
}
