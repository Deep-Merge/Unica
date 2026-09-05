type MarkProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function Mark({ className = "", tone = "light" }: MarkProps) {
  const color = tone === "light" ? "#f6f1e8" : "#221e1b";

  return (
    <span
      className={`inline-flex items-center gap-2.5 tracking-[0.22em] ${
        tone === "light" ? "text-ivory" : "text-charcoal"
      } ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="10.2" stroke={color} strokeWidth="0.8" />
        <path
          d="M6.8 15.4L11 6.8l4.2 8.6"
          stroke={color}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] font-medium uppercase">Verenne</span>
    </span>
  );
}
