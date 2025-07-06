import { useEffect, useState } from 'react';
import { AsciiClock } from './AsciiClock';

const quotes = [
  '“Talk is cheap. Show me the code.” - Linus Torvalds',
  '“First, solve the problem. Then, write the code.” - John Johnson',
  "“Code is like humor. When you have to explain it, it's bad.” - Cory House",
  '“Programs must be written for people to read.” - Hal Abelson',
];

export function RightPanel() {
  const [quote, setQuote] = useState(quotes[0]);
  const [, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const quoteInterval = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 15000);

    return () => {
      clearInterval(interval);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="bg-terminal text-terminal-text h-full overflow-y-auto p-3 font-mono text-xs leading-snug whitespace-pre-wrap">
      {String.raw`┌────────────────────────────────────┐
│ USER      timothy                  │
│ HOST      portfolio.local          │
│ SHELL     zsh                      │
│ STACK     TypeScript, React, Vite  │
└────────────────────────────────────┘`}

      <p className="text-terminal-cyan mt-3 h-12 italic">{quote}</p>

      <div className="w-ful mt-4 h-24">
        <AsciiClock />
      </div>

      <div className="text-terminal-green mt-4 flex h-fit flex-col gap-1">
        <a
          href="https://github.com/tcmarkfeld"
          target="_blank"
          className="hover:text-terminal-yellow underline"
        >
          [ GitHub ] → tcmarkfeld
        </a>
        <a
          href="https://www.linkedin.com/in/timothy-markfeld/"
          target="_blank"
          className="hover:text-terminal-yellow underline"
        >
          [ LinkedIn ] → timothy-markfeld
        </a>
      </div>
    </div>
  );
}
