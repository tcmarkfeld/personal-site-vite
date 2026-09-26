import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Day = { date: string; count: number; level: number };

const dayLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const monthLabel = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  timeZone: 'UTC',
});

// A year of GitHub contributions, via a public proxy of the profile calendar.
export function ActivityGraph({ user }: { user: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [hovered, setHovered] = useState<Day | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { total: { lastYear: number }; contributions: Day[] }) => {
        setDays(data.contributions);
        setTotal(data.total.lastYear);
      })
      .catch(() => {
        // Without data the section stays hidden.
      });
    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    // On narrow screens, start scrolled to the most recent weeks.
    const scroller = scrollRef.current;
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
    // Fill the weeks in once the graph scrolls into view.
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.shown = 'true';
        observer.disconnect();
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [days]);

  if (!days) return null;

  const weeks: Day[][] = [];
  days.forEach((day, index) => {
    if (index % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push(day);
  });

  return (
    <section className="column activity" id="activity" ref={sectionRef}>
      <h2 className="label">GitHub activity</h2>
      <div className="activity-scroll" ref={scrollRef}>
        <div
          className="activity-grid"
          role="img"
          aria-label={`${total.toLocaleString()} GitHub contributions in the last year`}
          onMouseLeave={() => setHovered(null)}
        >
          {weeks.map((week, index) => {
            const first = new Date(week[0].date);
            const newMonth =
              index > 0 &&
              first.getUTCMonth() !==
                new Date(weeks[index - 1][0].date).getUTCMonth();
            return (
              <div
                className="activity-week"
                key={week[0].date}
                style={{ '--week': index } as CSSProperties}
              >
                <span className="activity-month" aria-hidden="true">
                  {newMonth ? monthLabel.format(first) : ''}
                </span>
                {week.map((day) => (
                  <span
                    key={day.date}
                    className="activity-day"
                    data-level={day.level}
                    onMouseEnter={() => setHovered(day)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <p className="activity-readout" aria-hidden="true">
        <span>
          {hovered ? (
            <>
              <strong>
                {hovered.count} contribution{hovered.count === 1 ? '' : 's'}
              </strong>{' '}
              on {dayLabel.format(new Date(hovered.date))}
            </>
          ) : (
            <>
              <strong>{total.toLocaleString()}</strong> contributions in the
              last year
            </>
          )}
        </span>
        <span className="activity-legend">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="activity-day" data-level={level} />
          ))}
          More
        </span>
      </p>
    </section>
  );
}
