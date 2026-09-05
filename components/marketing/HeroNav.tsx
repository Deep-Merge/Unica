"use client";

import Link from "next/link";
import { useState } from "react";
import { Mark } from "@/components/brand/Mark";
import { IconClose, IconMenu } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { navPrimary, routes } from "@/lib/brand";

export function HeroNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="rise mx-auto flex h-[88px] max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link href={routes.home} onClick={() => setOpen(false)}>
          <Mark />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navPrimary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.06em] text-ivory/70 transition-colors duration-200 hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href={routes.login} variant="ghostLight" className="h-10 px-5">
            Log in
          </ButtonLink>
          <span className="hidden sm:inline-flex">
            <ButtonLink href={routes.apply} variant="light" className="h-10 px-5">
              Apply
            </ButtonLink>
          </span>
          <button
            type="button"
            className="ml-1 text-ivory lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-ivory/15 bg-[rgba(16,12,10,0.88)] px-6 py-8 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col gap-5">
            {navPrimary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-[17px] text-ivory/86"
              >
                {item.label}
              </Link>
            ))}
            <Link href={routes.login} onClick={() => setOpen(false)} className="text-[17px] text-ivory">
              Log in
            </Link>
            <Link href={routes.apply} onClick={() => setOpen(false)} className="text-[17px] text-brass">
              Apply for membership
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
