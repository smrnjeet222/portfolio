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
    <div
      className={`terminal-window ${className}`}
      style={{
        background: "rgba(22, 27, 34, 0.70)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(48, 54, 61, 0.65)",
        ...style,
      }}
    >
      <div
        className="terminal-titlebar"
        style={{
          background: "rgba(33, 38, 45, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(48, 54, 61, 0.65)",
        }}
      >
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
