import { ReactNode } from "react";

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}
