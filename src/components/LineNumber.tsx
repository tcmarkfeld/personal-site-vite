import type { ReactNode } from 'react';

interface LineNumberProps {
  children: ReactNode;
}

export function LineNumber({ children }: LineNumberProps) {
  return (
    <span className="text-terminal-border mr-2 min-w-[20px] text-sm select-none">
      {children}
    </span>
  );
}
