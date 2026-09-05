import { ReactNode } from "react";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
