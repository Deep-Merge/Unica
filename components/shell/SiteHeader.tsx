"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { IconClose, IconMenu } from "@/components/icons";
import { navPrimary, routes } from "@/lib/brand";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ivory">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href={routes.home} onClick={() => setOpen(false)}>
          <Mark tone="dark" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-[0.02em] transition-colors duration-200 ${
                pathname === item.href ? "text-charcoal" : "text-muted hover:text-charcoal"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href={routes.login} className="link-quiet text-[13px]">
            Sign in
          </Link>
          <Link
            href={routes.apply}
            className="inline-flex h-10 items-center rounded-[var(--radius)] bg-oxblood px-4 text-[13px] text-ivory transition-colors duration-200 hover:bg-oxblood-deep"
          >
            Apply
          </Link>
        </div>

        <button
          type="button"
          className="text-charcoal lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-ivory px-6 py-7 lg:hidden">
          <nav className="flex flex-col gap-5">
            {navPrimary.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-[17px] text-charcoal">
                {item.label}
              </Link>
            ))}
            <Link href={routes.login} onClick={() => setOpen(false)} className="text-[17px] text-muted">
              Sign in
            </Link>
            <Link href={routes.apply} onClick={() => setOpen(false)} className="text-[17px] text-oxblood">
              Apply for membership
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
