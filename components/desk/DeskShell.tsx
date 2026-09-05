"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Mark } from "@/components/brand/Mark";
import { useDemo } from "@/components/demo/DemoProvider";
import { routes } from "@/lib/brand";

const nav = [
  { href: "/desk", label: "Members" },
  { href: "/desk/introductions", label: "Introductions" },
  { href: "/desk/follow-ups", label: "Follow-ups" },
];

export function DeskShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useDemo();

  return (
    <div className="min-h-screen bg-ivory text-ink lg:grid lg:grid-cols-[200px_1fr]">
      <aside className="bg-charcoal text-ivory lg:sticky lg:top-0 lg:h-screen">
        <div className="flex h-full flex-col px-5 py-7">
          <Link href="/desk">
            <Mark />
          </Link>
          <p className="mt-8 text-[10px] tracking-[0.28em] text-ivory/45 uppercase">Matchmaker</p>
          <nav className="mt-6 flex gap-1 lg:flex-col">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-l-2 px-3 py-2.5 text-[13px] transition-colors duration-200 ${
                    active ? "border-brass text-ivory" : "border-transparent text-ivory/55 hover:text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="mt-auto hidden text-left text-[12px] text-ivory/45 transition-colors hover:text-ivory lg:block"
            onClick={() => {
              signOut();
              router.push(routes.home);
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="page-enter mx-auto w-full max-w-[1120px] px-6 py-10 sm:px-10 lg:px-12 lg:py-12">{children}</div>
    </div>
  );
}
