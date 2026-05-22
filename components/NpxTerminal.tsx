"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ── command definitions ───────────────────────────────────────── */
type Line = { text: string; color?: string; indent?: boolean; href?: string };
type HistoryEntry = { id: number; cmd: string; output: Line[]; live?: "clock" };

const BOOT: Line[] = [
  { text: "╔══════════════════════════════════════════════╗", color: "var(--accent-cyan)" },
  { text: "║       npx smrnjeet  •  v2.0.0-dev            ║", color: "var(--accent-cyan)" },
  { text: "╚══════════════════════════════════════════════╝", color: "var(--accent-cyan)" },
  { text: "" },
  { text: "Welcome to Simranjeet Singh's interactive portfolio CLI.", color: "var(--text-secondary)" },
  { text: "Type help to see available commands.", color: "var(--text-secondary)" },
  { text: "# psst... gamers might find something hidden here", color: "var(--accent-purple)" },
  { text: "" },
];

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { text: "Available commands:", color: "var(--accent-yellow)" },
    { text: "" },
    { text: "  whoami           →  About Simranjeet", color: "var(--text-primary)" },
    { text: "  ls projects/     →  List all projects", color: "var(--text-primary)" },
    { text: "  cat skills.txt   →  Tech stack", color: "var(--text-primary)" },
    { text: "  cat resume       →  View & download resume", color: "var(--text-primary)" },
    { text: "  open social/     →  Social links", color: "var(--text-primary)" },
    { text: "  hire smrnjeet    →  Availability & contact", color: "var(--text-primary)" },
    { text: "  time             →  Live IST clock", color: "var(--text-primary)" },
    { text: "  hint             →  Easter egg hint", color: "var(--accent-purple)" },
    { text: "  clear            →  Clear terminal", color: "var(--text-primary)" },
    { text: "  exit             →  Close terminal", color: "var(--text-primary)" },
    { text: "" },
  ],

  whoami: () => [
    { text: "Simranjeet Singh", color: "var(--accent-cyan)" },
    { text: "" },
    { text: "  Role       Senior Software Engineer · Web3 / Fullstack", color: "var(--text-primary)" },
    { text: "  Company    MON Co. / Pixelmon Labs (Dec 2023 – Present)", color: "var(--text-primary)" },
    { text: "  Location   Delhi, India", color: "var(--text-primary)" },
    { text: "  Status     Open to senior full-time roles", color: "var(--accent-green)" },
    { text: "" },
    { text: "  ✓  5+ yrs · 10+ products shipped across Web2 & Web3", color: "var(--text-secondary)" },
    { text: "  ✓  Proof-of-Activity Protocol → $1M AVAX grant for Pixelmon", color: "var(--accent-green)" },
    { text: "  ✓  MON token ecosystem · $30M+ deposits · 5+ EVM chains", color: "var(--text-secondary)" },
    { text: "  ✓  Tech Lead @ PopSocial · 4 engineers · SocialFi in 5 months", color: "var(--text-secondary)" },
    { text: "  ✓  ETHIndia 2022 Winner — The Graph ecosystem prize", color: "var(--accent-yellow)" },
    { text: "" },
  ],

  "ls projects/": () => [
    { text: "drwxr-xr-x  projects/", color: "var(--accent-yellow)" },
    { text: "" },
    { text: "  oxbin.sh        Onchain pastebin & file sharing · Go + Sui · ETHGlobal 2025", color: "var(--accent-cyan)", href: "https://github.com/smrnjeet222/oxbin" },
    { text: "  safu_pass.sh    Onchain password manager · Solidity + Subgraph · ETHIndia 2023", color: "var(--accent-green)", href: "https://github.com/smrnjeet222/web3pass-ui" },
    { text: "  grid1.sh        Forkable NFT builder · The Graph prize winner · ETHIndia 2022", color: "var(--accent-yellow)", href: "https://github.com/smrnjeet222/PokeTrade" },
    { text: "  cycloswap.sh    1st concentrated liquidity AMM on Solana · Cykura", color: "var(--accent-purple)", href: "https://github.com/cykura" },
    { text: "" },
    { text: "  → github.com/smrnjeet222", color: "var(--text-secondary)", href: "https://github.com/smrnjeet222" },
    { text: "" },
  ],

  "cat skills.txt": () => [
    { text: "# Tech Stack", color: "var(--text-secondary)" },
    { text: "" },
    { text: "  Languages    TypeScript · Python · Go · Solidity · Rust (reading)", color: "var(--text-primary)" },
    { text: "  Frontend     React · Next.js · React Native · TanStack · Vite · Tailwind CSS", color: "var(--accent-cyan)" },
    { text: "  Backend      Fiber · Node.js · NestJS · REST · GraphQL · WebSockets", color: "var(--accent-green)" },
    { text: "  Databases    PostgreSQL · Redis · MongoDB", color: "var(--accent-yellow)" },
    { text: "  Web3         ethers.js · Foundry · Solidity · Subgraphs · Ponder · Solana · Sui", color: "var(--text-primary)" },
    { text: "  DeFi         Uniswap · Morpho Vaults · ERC4626/7540 · LayerZero/OFT · NFTs · RWA", color: "var(--accent-purple)" },
    { text: "  AI/Agents    Agentic AI · MCP Tool Orchestration · RAG · Vector Search · LLM", color: "var(--accent-orange)" },
    { text: "  Cloud        AWS · Docker · CI/CD · ClickHouse · Grafana", color: "var(--accent-cyan)" },
    { text: "" },
  ],

  "cat resume": () => [
    { text: "# Simranjeet Singh — Resume", color: "var(--accent-cyan)" },
    { text: "" },
    { text: "  Education   B.Tech CSE · IPU Delhi · 2018–2022 · CGPA 8.6", color: "var(--text-primary)" },
    { text: "  Current     Senior SWE @ MON Co. / Pixelmon Labs (Dec 2023 –)", color: "var(--text-primary)" },
    { text: "  Impact      $30M+ deposits · $1M AVAX grant · ETHIndia Winner", color: "var(--accent-yellow)" },
    { text: "  Highlight   LexiumVault ERC7540 · CycloSwap (1st AMM on Solana)", color: "var(--accent-cyan)" },
    { text: "" },
    { text: "  Downloading resume...", color: "var(--accent-green)" },
    { text: "  ✓ simranjeet_resume.pdf", color: "var(--accent-green)" },
    { text: "" },
  ],

  "open social/": () => [
    { text: "# Social Links", color: "var(--text-secondary)" },
    { text: "" },
    { text: "  GitHub     github.com/smrnjeet222",       color: "var(--text-primary)",   href: "https://github.com/smrnjeet222" },
    { text: "  LinkedIn   linkedin.com/in/smrnjeet222",  color: "var(--accent-cyan)",    href: "https://www.linkedin.com/in/smrnjeet222/" },
    { text: "  X          twitter.com/smrnjeet_22",      color: "var(--text-primary)",   href: "https://twitter.com/smrnjeet_22" },
    { text: "  Telegram   t.me/smrnjeet_22",             color: "var(--accent-purple)",  href: "https://t.me/smrnjeet_22" },
    { text: "" },
  ],

  hint: () => [
    { text: "# Easter egg hint", color: "var(--text-secondary)" },
    { text: "" },
    { text: "what is the konami code ?", color: "var(--accent-purple)" },
    // { text: "  ↑ ↑ ↓ ↓ ← → ← → B A", color: "var(--accent-purple)" },
    { text: "" },
  ],

  time: () => [
    { text: "# Live clock — IST (UTC+5:30)", color: "var(--text-secondary)" },
    { text: "" },
  ],

  "hire smrnjeet": () => [
    { text: "┌─────────────────────────────────────────┐", color: "var(--accent-green)" },
    { text: "│  ●  OPEN TO SENIOR OPPORTUNITIES        │", color: "var(--accent-green)" },
    { text: "└─────────────────────────────────────────┘", color: "var(--accent-green)" },
    { text: "" },
    { text: "  Open to:", color: "var(--text-secondary)" },
    { text: "  ✓  Senior full-time engineering roles", color: "var(--accent-green)" },
    { text: "  ✓  Web3 / DeFi protocol engineering", color: "var(--accent-green)" },
    { text: "  ✓  Fullstack product engineering", color: "var(--accent-green)" },
    { text: "  ✓  Open-source collaborations", color: "var(--accent-green)" },
    { text: "" },
    { text: "  Email     smrnjeet.dev@gmail.com", color: "var(--accent-cyan)" },
    { text: "  Telegram  @smrnjeet_22", color: "var(--text-primary)" },
    { text: "" },
    { text: "  → Scroll to Contact section to send a message", color: "var(--text-secondary)" },
    { text: "" },
  ],
};

const SUGGESTIONS = Object.keys(COMMANDS);

/* ── live clock ────────────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })
  );
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", year: "numeric", month: "long", day: "numeric" })
  );

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true }));
      setDate(now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", weekday: "long", year: "numeric", month: "long", day: "numeric" }));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <div style={{ paddingLeft: "0", marginBottom: "4px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
        <span style={{
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "var(--accent-cyan)",
          letterSpacing: "0.05em",
          textShadow: "0 0 20px rgba(125,207,255,0.5)",
          fontVariantNumeric: "tabular-nums",
        }}>
          {time}
        </span>
        <span style={{ fontSize: "0.72rem", color: "var(--accent-green)", letterSpacing: "0.05em" }}>
          IST / UTC+5:30
        </span>
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "4px" }}>
        {date}
      </div>
      <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "8px", opacity: 0.6 }}>
        # clock updates every second
      </div>
      <div style={{ marginTop: "4px" }} />
    </div>
  );
}

/* ── component ─────────────────────────────────────────────────── */

export default function NpxTerminal() {
  const [isTouch, setIsTouch] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
  }, []);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const idRef = useRef(0);

  const inputRef   = useRef<HTMLInputElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const openRef    = useRef(false);

  /* keep ref in sync for key handler */
  useEffect(() => { openRef.current = open; }, [open]);

  /* backtick toggle */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* focus input when opened */
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  /* scroll to bottom on new output */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  /* autocomplete suggestion */
  useEffect(() => {
    if (!input.trim()) { setSuggestion(""); return; }
    const match = SUGGESTIONS.find(
      (s) => s.startsWith(input) && s !== input
    );
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h]);
    setCmdIdx(-1);

    if (cmd === "exit" || cmd === "q") {
      setOpen(false);
      return;
    }
    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // download resume on cat resume
    if (cmd === "cat resume") {
      const a = document.createElement("a");
      a.href = "/simranjeet_resume.pdf";
      a.download = "Simranjeet_Singh_Resume.pdf";
      a.click();
    }

    const fn = COMMANDS[cmd];
    const isTime = cmd === "time";
    const output: Line[] = fn
      ? fn()
      : [
          { text: `bash: ${cmd}: command not found`, color: "var(--accent-red)" },
          { text: 'Type "help" to see available commands.', color: "var(--text-secondary)" },
          { text: "" },
        ];

    const id = ++idRef.current;
    setHistory((h) => [...h, { id, cmd: raw.trim(), output, live: isTime ? "clock" : undefined }]);
    setInput("");
    setSuggestion("");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(input + suggestion);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIdx + 1, cmdHistory.length - 1);
      setCmdIdx(next);
      setInput(cmdHistory[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIdx - 1, -1);
      setCmdIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
      return;
    }
  };

  if (isTouch) return null;

  if (!open) {
    return (
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "80px",
          right: "24px",
          zIndex: 300,
          background: "rgba(22,27,34,0.92)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          padding: "6px 12px",
          fontSize: "0.68rem",
          color: "var(--text-secondary)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ color: "var(--accent-cyan)" }}>›</span>
        press <kbd style={{
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border-color)",
          borderRadius: "3px",
          padding: "1px 5px",
          color: "var(--text-primary)",
          fontFamily: "inherit",
        }}>`</kbd> to open terminal
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)",
        animation: "fadeUp 0.18s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        style={{
          width: "min(720px, 95vw)",
          height: "min(500px, 80vh)",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(125,207,255,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "inherit",
        }}
      >
        {/* title bar */}
        <div
          style={{
            background: "var(--bg-tertiary)",
            borderBottom: "1px solid var(--border-color)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <div
            style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent-red)", cursor: "pointer" }}
            onClick={() => setOpen(false)}
          />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent-yellow)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent-green)" }} />
          <span
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              paddingRight: "36px",
            }}
          >
            npx smrnjeet — interactive portfolio CLI
          </span>
        </div>

        {/* output area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            fontSize: "0.82rem",
            lineHeight: 1.7,
          }}
        >
          {/* boot message */}
          {BOOT.map((line, i) => (
            <div key={`boot-${i}`} style={{ color: line.color ?? "var(--text-primary)", whiteSpace: "pre" }}>
              {line.text}
            </div>
          ))}

          {/* command history */}
          {history.map((entry) => (
            <div key={entry.id}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                <span style={{ color: "var(--accent-green)" }}>jeet@portfolio</span>
                {/* <span style={{ color: "var(--accent-green)" }}>@portfolio</span> */}
                <span style={{ color: "var(--text-secondaiy)" }}>:~$</span>
                <span style={{ color: "var(--text-primary)" }}>{entry.cmd}</span>
              </div>
              {entry.output.map((line, i) => (
                <div
                  key={i}
                  style={{
                    color: line.color ?? "var(--text-primary)",
                    paddingLeft: line.indent ? "4px" : "0",
                    whiteSpace: "pre",
                  }}
                >
                  {line.href ? (
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: line.color ?? "var(--text-primary)",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      {line.text}
                    </a>
                  ) : line.text}
                </div>
              ))}
              {entry.live === "clock" && <LiveClock />}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* input row */}
        <div
          style={{
            borderTop: "1px solid var(--border-color)",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            background: "var(--bg-primary)",
            position: "relative",
          }}
        >
          <span style={{ color: "var(--accent-green)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
            jeet@portfolio:~$
          </span>
          <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
            {/* ghost suggestion */}
            {suggestion && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  fontSize: "0.82rem",
                  color: "transparent",
                  whiteSpace: "pre",
                  userSelect: "none",
                }}
              >
                {input}
                <span style={{ color: "var(--text-secondary)", opacity: 0.45 }}>{suggestion}</span>
              </span>
            )}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              style={{
                width: "100%",
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                fontSize: "0.82rem",
                caretColor: "var(--accent-cyan)",
              }}
            />
          </div>
          {suggestion && (
            <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", flexShrink: 0 }}>
              Tab to complete
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
