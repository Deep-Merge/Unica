import type { MomentIconName } from "@/lib/moment/types";

type Props = { name: MomentIconName; className?: string };

function Svg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

const stroke = { stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function MomentIcon({ name, className }: Props) {
  switch (name) {
    case "wine":
      return (
        <Svg className={className}>
          <path d="M7.2 3.6h7.6L13.6 11a2.6 2.6 0 0 1-5.2 0L7.2 3.6Z" {...stroke} />
          <path d="M11 13.6V18M8.4 18.4h5.2" {...stroke} />
        </Svg>
      );
    case "tram":
      return (
        <Svg className={className}>
          <rect x="5" y="6.2" width="12" height="8.4" rx="1.2" {...stroke} />
          <path d="M7.2 14.6v1.8M14.8 14.6v1.8M8 9.4h6M11 3.8v2.4" {...stroke} />
        </Svg>
      );
    case "music":
      return (
        <Svg className={className}>
          <path d="M9 16.4a2 2 0 1 1-2.2-2V7.4L16.4 5v8.2" {...stroke} />
          <circle cx="14.4" cy="15.2" r="2" {...stroke} />
        </Svg>
      );
    case "croissant":
      return (
        <Svg className={className}>
          <path d="M4.4 13.2c2.4-5.4 8.2-8 13.2-6.2-1.8 1-3.2 2.8-3.6 5.1-.8 4.2-4.6 6.6-9.6 1.1Z" {...stroke} />
        </Svg>
      );
    case "compass":
      return (
        <Svg className={className}>
          <circle cx="11" cy="11" r="7.2" {...stroke} />
          <path d="M13.6 8.4l-1.2 4-4 1.2 1.2-4 4-1.2Z" {...stroke} />
        </Svg>
      );
    case "book":
      return (
        <Svg className={className}>
          <path d="M5 5.4h5.2a2.4 2.4 0 0 1 2.4 2.4v9.2H7.4A2.4 2.4 0 0 1 5 14.6V5.4Z" {...stroke} />
          <path d="M17 5.4h-5.2A2.4 2.4 0 0 0 9.4 7.8v9.2H14.6A2.4 2.4 0 0 0 17 14.6V5.4Z" {...stroke} />
        </Svg>
      );
    case "moon":
      return (
        <Svg className={className}>
          <path d="M13.2 4.6a6.6 6.6 0 1 0 4.2 11.4 7 7 0 0 1-4.2-11.4Z" {...stroke} />
        </Svg>
      );
    case "key":
      return (
        <Svg className={className}>
          <circle cx="8.2" cy="13.2" r="3.2" {...stroke} />
          <path d="M11.2 12.2l6.2-6.2M15 6.4l2.2 2.2" {...stroke} />
        </Svg>
      );
    case "pin":
      return (
        <Svg className={className}>
          <path d="M11 18.4s5.6-5.2 5.6-9.2a5.6 5.6 0 1 0-11.2 0c0 4 5.6 9.2 5.6 9.2Z" {...stroke} />
          <circle cx="11" cy="9.1" r="1.6" {...stroke} />
        </Svg>
      );
    case "circles":
      return (
        <Svg className={className}>
          <circle cx="8.6" cy="11" r="4.2" {...stroke} />
          <circle cx="13.4" cy="11" r="4.2" {...stroke} />
        </Svg>
      );
    case "envelope":
      return (
        <Svg className={className}>
          <rect x="3.6" y="6.2" width="14.8" height="10" rx="1.2" {...stroke} />
          <path d="M4.2 7.2L11 12.2l6.8-5" {...stroke} />
        </Svg>
      );
    case "spark":
      return (
        <Svg className={className}>
          <path d="M11 3.6v3.2M11 15.2v3.2M3.6 11h3.2M15.2 11h3.2M6.2 6.2l2.1 2.1M13.7 13.7l2.1 2.1M15.8 6.2l-2.1 2.1M8.3 13.7l-2.1 2.1" {...stroke} />
          <circle cx="11" cy="11" r="1.4" {...stroke} />
        </Svg>
      );
    case "plate":
      return (
        <Svg className={className}>
          <circle cx="11" cy="11" r="6.6" {...stroke} />
          <circle cx="11" cy="11" r="3.2" {...stroke} />
        </Svg>
      );
    case "camera":
      return (
        <Svg className={className}>
          <rect x="3.8" y="7.2" width="14.4" height="9.2" rx="1.4" {...stroke} />
          <circle cx="11" cy="11.8" r="2.4" {...stroke} />
          <path d="M8.2 7.2l1-2.2h3.6l1 2.2" {...stroke} />
        </Svg>
      );
  }
}
