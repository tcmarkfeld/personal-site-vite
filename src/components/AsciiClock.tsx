import { useEffect, useState } from 'react';

const ASCII_DIGITS: Record<string, string[]> = {
  '0': [' ██  ', '█  █ ', '█  █ ', '█  █ ', ' ██  '],
  '1': ['  █  ', ' ██  ', '  █  ', '  █  ', ' ███ '],
  '2': [' ██  ', '█  █ ', '  █  ', ' █   ', '████ '],
  '3': ['███  ', '   █ ', ' ██  ', '   █ ', '███  '],
  '4': ['█  █ ', '█  █ ', '████ ', '   █ ', '   █ '],
  '5': ['████ ', '█    ', '███  ', '   █ ', '███  '],
  '6': [' ██  ', '█    ', '███  ', '█  █ ', ' ██  '],
  '7': ['████ ', '   █ ', '  █  ', ' █   ', ' █   '],
  '8': [' ██  ', '█  █ ', ' ██  ', '█  █ ', ' ██  '],
  '9': [' ██  ', '█  █ ', ' ███ ', '   █ ', ' ██  '],
  ':': ['     ', '  ░  ', '     ', '  ░  ', '     '],
};

export function AsciiClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getAsciiLines = () => {
    const timeStr = time.toLocaleTimeString('en-US', { hour12: false });
    const lines: string[][] = Array(5)
      .fill('')
      .map(() => []);
    for (const char of timeStr) {
      const art = ASCII_DIGITS[char] || [
        '     ',
        '     ',
        '     ',
        '     ',
        '     ',
      ];
      art.forEach((line, idx) => lines[idx].push(line));
    }
    return lines.map((line) => line.join('  '));
  };

  const asciiLines = getAsciiLines();

  return (
    <div className="text-terminal-yellow font-mono text-[10px] leading-tight whitespace-pre select-none">
      {asciiLines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
