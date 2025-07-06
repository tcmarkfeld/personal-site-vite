import type { ReactNode } from 'react';
import { TerminalHeader } from './TerminalHeader';
import { Footer } from './Footer';
import { LineNumber } from './LineNumber';

interface TerminalProps {
  children: ReactNode;
  page: string;
  pwd: string;
  txt: string;
  eofLineNumber: number;
}

export function Terminal({
  children,
  page,
  pwd,
  txt,
  eofLineNumber,
}: TerminalProps) {
  return (
    <div className="bg-background-secondary text-terminal-text flex h-screen flex-col justify-between overflow-hidden font-mono">
      <div className="flex flex-grow items-center justify-center overflow-hidden p-4">
        <div className="no-scrollbar bg-terminal border-terminal-border flex max-h-4/5 w-full max-w-4xl flex-col overflow-hidden rounded-lg border shadow-2xl">
          <TerminalHeader pwd={pwd} />

          <div className="flex-1 overflow-y-auto p-6">
            <style>{`
              @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
              }
            `}</style>
            <div className="space-y-1">
              {/* Command prompt */}
              <div className="flex items-center space-x-2">
                <span className="text-terminal-border mr-2 text-sm select-none">
                  1
                </span>
                <span className="text-terminal-green">timothy@portfolio</span>
                <span className="text-terminal-text">:</span>
                <span className="text-terminal-blue">~/{pwd}</span>
                <span className="text-terminal-text">$</span>
                <span className="text-terminal-text">cat {txt}.txt</span>
              </div>

              {/* Blinking cursor */}
              <div className="flex items-center">
                <span className="text-terminal-border mr-2 text-sm select-none">
                  2
                </span>
                <div className="bg-terminal-text h-4 w-2 animate-[blink_1s_infinite]"></div>
              </div>
            </div>

            {children}

            {/* End of file indicator */}
            <div className="border-terminal-border mt-8 border-t pt-4">
              <div className="text-terminal-cyan flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <LineNumber>{eofLineNumber}</LineNumber>
                  <span>EOF</span>
                </div>
                <div className="flex flex-row gap-2">
                  <span>
                    <a
                      href="https://www.linkedin.com/in/timothy-markfeld/"
                      target="_blank"
                      className="hover:text-terminal-green underline transition-colors"
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a
                      href="https://github.com/tcmarkfeld"
                      target="_blank"
                      className="hover:text-terminal-green underline transition-colors"
                    >
                      GitHub
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Next command prompt */}
            <div className="mt-6 flex items-center space-x-2">
              <LineNumber>{eofLineNumber + 1}</LineNumber>
              <span className="text-terminal-green">timothy@portfolio</span>
              <span className="text-terminal-text">:</span>
              <span className="text-terminal-blue">~/{pwd}</span>
              <span className="text-terminal-text">$</span>
              <div className="bg-terminal-text h-4 w-2 animate-[blink_1s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer currentPage={page} />
    </div>
  );
}
