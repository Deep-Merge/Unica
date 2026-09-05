type IconProps = { className?: string };

function Stroke({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const NavHome = (props: IconProps) => <Stroke {...props} d="M3.2 8.1 9 3.4l5.8 4.7V14.4H3.2V8.1Z" />;
export const NavDiscover = (props: IconProps) => <Stroke {...props} d="M8.1 3.6a5.2 5.2 0 1 0 3.4 9.1L15 15" />;
export const NavRequests = (props: IconProps) => <Stroke {...props} d="M4 5h10M4 9h10M4 13h6.5" />;
export const NavIntros = (props: IconProps) => (
  <Stroke {...props} d="M6.2 11.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2ZM11.8 11.8a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z" />
);
export const NavConcierge = (props: IconProps) => <Stroke {...props} d="M4.2 13 5.5 5.8h7L14 13l-5-2.2L4.2 13Z" />;
export const NavProfile = (props: IconProps) => <Stroke {...props} d="M9 8.6A2.2 2.2 0 1 0 9 4.2 2.2 2.2 0 0 0 9 8.6ZM4.8 14a4.2 4.2 0 0 1 8.4 0" />;
