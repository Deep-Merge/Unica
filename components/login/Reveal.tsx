"use client";

import { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className = "" }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
