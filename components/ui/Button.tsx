import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary:
    "inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-oxblood px-6 text-[14px] text-ivory transition-colors duration-200 hover:bg-oxblood-deep disabled:opacity-70",
  ghost:
    "inline-flex h-11 items-center justify-center rounded-[var(--radius)] border border-line bg-transparent px-6 text-[14px] text-charcoal transition-colors duration-200 hover:border-charcoal/30 disabled:opacity-70",
  light:
    "inline-flex h-11 items-center justify-center rounded-[var(--radius)] bg-ivory px-6 text-[14px] text-charcoal transition-colors duration-200 hover:bg-limestone",
  ghostLight:
    "inline-flex h-11 items-center justify-center rounded-[var(--radius)] border border-ivory/45 bg-transparent px-6 text-[14px] text-ivory transition-colors duration-200 hover:border-ivory hover:bg-ivory/10",
};

type Variant = keyof typeof styles;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button {...props} className={`${styles[variant]} ${className}`} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
