import { LineNumber } from '@/components/LineNumber';
import { Terminal } from '@/components/Terminal';
import { ROUTES } from '@/Navigation/routeEnum';
import { ChevronRight } from 'lucide-react';

export const Home = () => {
  return (
    <Terminal page={ROUTES.HOME} pwd="home" txt="home" eofLineNumber={8}>
      <div className="text-terminal-green mb-4 text-lg">
        <LineNumber>3</LineNumber>" Welcome to Tim's Terminal "
      </div>

      <div className="mb-2 flex">
        <LineNumber>4</LineNumber>
        <ChevronRight className="text-terminal-yellow" />
        <span className="text-terminal-blue">Name:</span> Timothy Markfeld
      </div>

      <div className="mb-2 flex">
        <LineNumber>5</LineNumber>
        <ChevronRight className="text-terminal-yellow" />
        <span className="text-terminal-blue">Role:</span> Full-Stack Software
        Developer
      </div>

      <div className="mb-2 flex">
        <LineNumber>6</LineNumber>
        <ChevronRight className="text-terminal-yellow" />
        <span className="text-terminal-blue">Skilled With: </span> .NET,
        TypeScript/JS, React/React Native, GraphQL, SQL, Java, and more
      </div>

      <div className="border-terminal-border mt-6 flex border-t pt-4">
        <LineNumber>7</LineNumber>
        <p className="text-terminal-magenta">
          " I am passionate about building clean, performant code that solves
          the problem at hand. I can quickly pick up new technologies and am not
          afraid to dive head-first into something I've never done before. "
        </p>
      </div>
    </Terminal>
  );
};
