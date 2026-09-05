import Link from "next/link";
import { navFooter, routes } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-muted uppercase">Verenne · Private introductions</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-muted">
            A considered way to meet. Membership is by application.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
          {navFooter.map((item) => (
            <Link key={item.href} href={item.href} className="link-quiet">
              {item.label}
            </Link>
          ))}
          <a href={routes.concierge} className="link-quiet">
            Contact concierge
          </a>
        </nav>
      </div>
    </footer>
  );
}
