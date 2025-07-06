import { Terminal } from '@/components/Terminal';
import { ROUTES } from '@/Navigation/routeEnum';

export const Home = () => {
  return (
    <Terminal page={ROUTES.HOME} pwd="home" txt="home.txt" eofLineNumber={2}>
      <div className="text-terminal-green mb-4 text-lg">
        " Welcome to Tim's Terminal "
      </div>

      <div className="mb-2">
        <span className="text-terminal-yellow"></span>{' '}
        <span className="text-terminal-blue">Name:</span> Timothy Markfeld
      </div>

      <div className="mb-2">
        <span className="text-terminal-yellow"></span>{' '}
        <span className="text-terminal-blue">Role:</span> Developer, Tinkerer,
        Coffee Enthusiast
      </div>

      <div className="mb-2">
        <span className="text-terminal-yellow"></span>{' '}
        <span className="text-terminal-blue">Stack:</span> Bun, Vite, React,
        TypeScript, TailwindCSS
      </div>

      <div className="mb-2">
        <span className="text-terminal-yellow"></span>{' '}
        <span className="text-terminal-blue">Website:</span>{' '}
        <a
          href="https://www.timmarkfeld.com"
          className="text-terminal-cyan hover:underline"
          target="_blank"
        >
          timothymarkfeld.com
        </a>
      </div>

      <div className="border-border mt-6 border-t pt-4">
        <p className="text-terminal-magenta">
          " I am passionate about building clean, performant code that solves
          the problem at hand. I can quickly pick up new technologies and am not
          afraid to dive head-first into something I've never done before. "
        </p>
      </div>
    </Terminal>
  );
};
