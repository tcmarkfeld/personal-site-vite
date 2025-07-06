import { LineNumber } from '@/components/LineNumber';
import { Terminal } from '@/components/Terminal';
import { ROUTES } from '@/Navigation/routeEnum';

export function About() {
  return (
    <Terminal page={ROUTES.ABOUT} pwd="about" txt="about_me" eofLineNumber={4}>
      <LineNumber>3</LineNumber>
      Work in progress...
    </Terminal>
  );
}
