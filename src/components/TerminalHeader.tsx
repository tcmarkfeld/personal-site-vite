interface TerminalHeaderProps {
  pwd: string;
}

export function TerminalHeader({ pwd }: TerminalHeaderProps) {
  return (
    <div className="border-terminal-border bg-terminal-header-bg sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center space-x-2">
        <div className="bg-terminal-red h-3 w-3 rounded-full"></div>
        <div className="bg-terminal-orange h-3 w-3 rounded-full"></div>
        <div className="bg-terminal-olive h-3 w-3 rounded-full"></div>
      </div>
      <div className="text-terminal-gray text-sm">
        timothy@portfolio:~/{pwd}
      </div>
      <div className="w-16"></div>
    </div>
  );
}
