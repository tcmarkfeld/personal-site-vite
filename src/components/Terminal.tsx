import type { ReactNode } from 'react';
import { TerminalHeader } from './TerminalHeader';
import { Footer } from './Footer';
import { LineNumber } from './LineNumber';
import { RightPanel } from './RightPanel';

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
    <div className="bg-background-secondary text-terminal-text flex h-screen flex-row justify-between overflow-hidden rounded-md font-mono">
      <div className="flex w-4/6 flex-col">
        <div className="no-scrollbar bg-terminal border-terminal-border flex h-screen w-full flex-grow flex-col overflow-y-auto rounded-lg border shadow-2xl">
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
            <div className="border-terminal-border text-terminal-cyan mt-8 flex space-x-2 border-t pt-4 text-sm">
              <LineNumber>{eofLineNumber}</LineNumber>
              <span>EOF</span>
            </div>

            {/* Next command prompt */}
            <div className="mt-4 flex items-center space-x-2">
              <LineNumber>{eofLineNumber + 1}</LineNumber>
              <span className="text-terminal-green">timothy@portfolio</span>
              <span className="text-terminal-text">:</span>
              <span className="text-terminal-blue">~/{pwd}</span>
              <span className="text-terminal-text">$</span>
              <div className="bg-terminal-text h-4 w-2 animate-[blink_1s_infinite]"></div>
            </div>
          </div>
        </div>
        <Footer currentPage={page} />
      </div>
      <div className="bg-terminal w-2/6 p-4">
        <RightPanel />
      </div>
    </div>
  );
}
