"use client";

interface TerminalWindowProps {
  filename: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({
  filename,
  children,
  className = "",
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-filename">{filename}</span>
      </div>
      <div className="terminal-content">{children}</div>
    </div>
  );
}
