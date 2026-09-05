type IconProps = {
  className?: string;
  filled?: boolean;
};

export function IconCheck({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="9.2" stroke="currentColor" strokeWidth="1" />
      <path d="M7.2 11.2l2.4 2.4 5.2-5.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="5.2" y="9.4" width="11.6" height="8.2" rx="1.4" stroke="currentColor" strokeWidth="1" />
      <path d="M7.8 9.4V7.6a3.2 3.2 0 0 1 6.4 0v1.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IconFocus({ className }: IconProps) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="3.1" stroke="currentColor" strokeWidth="1" />
      <circle cx="11" cy="11" r="6.6" stroke="currentColor" strokeWidth="1" />
      <path d="M11 2.6v2.1M11 17.3v2.1M2.6 11h2.1M17.3 11h2.1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function IconEye({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2.4 10s2.6-5.1 7.6-5.1S17.6 10 17.6 10s-2.6 5.1-7.6 5.1S2.4 10 2.4 10Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="10" cy="10" r="2.05" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function IconEyeOff({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.2 3.2l13.6 13.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M7.05 6.7A6.7 6.7 0 0 1 10 6c4.9 0 7.5 5.1 7.5 5.1a12 12 0 0 1-2.35 2.95M5.1 8.1A12.4 12.4 0 0 0 2.5 11S5.1 16.1 10 16.1c1.1 0 2.1-.26 3-.7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconGoogle({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.29-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.46.35 2.83.96 4.03l2.99-2.33Z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97l2.99 2.33C4.66 5.17 6.65 3.58 9 3.58Z" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.5 6h13M3.5 10h13M3.5 14h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart({ className, filled }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 15.2S3.2 11.4 3.2 7.4A3.1 3.1 0 0 1 9 5.6a3.1 3.1 0 0 1 5.8 1.8c0 4-5.8 7.8-5.8 7.8Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStar({ className, filled }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 2.8l1.7 3.6 4 .6-2.9 2.8.7 4L9 12.1 5.5 13.8l.7-4L3.3 7l4-.6L9 2.8Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M4 4.4h10a1.4 1.4 0 0 1 1.4 1.4v5.2A1.4 1.4 0 0 1 14 12.4H8.2L4.4 15v-2.6H4A1.4 1.4 0 0 1 2.6 11V5.8A1.4 1.4 0 0 1 4 4.4Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconApple({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 16.97 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83ZM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
  );
}
