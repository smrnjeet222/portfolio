"use client";

interface TerminalWindowProps {
  filename: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export default function TerminalWindow({
  filename,
  children,
  className = "",
  style,
  contentStyle,
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`} style={style}>
      <div className="terminal-titlebar">
        <span className="terminal-dot dot-red" />
        <span className="terminal-dot dot-yellow" />
        <span className="terminal-dot dot-green" />
        <span className="terminal-filename">{filename}</span>
      </div>
      <div className="terminal-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
