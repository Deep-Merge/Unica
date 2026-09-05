"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Mark } from "@/components/brand/Mark";
import { useDemo } from "@/components/demo/DemoProvider";
import { routes } from "@/lib/brand";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/introductions", label: "Introductions" },
  { href: "/admin/audit", label: "Audit" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useDemo();

  return (
    <div className="min-h-screen bg-ivory text-ink lg:grid lg:grid-cols-[200px_1fr]">
      <aside className="border-b border-line bg-cream lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-b-0">
        <div className="flex h-full flex-col px-5 py-7">
          <Link href="/admin">
            <Mark tone="dark" />
          </Link>
          <p className="mt-8 text-[10px] tracking-[0.28em] text-muted uppercase">Administration</p>
          <nav className="mt-6 flex gap-1 overflow-x-auto lg:flex-col">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-l-2 px-3 py-2.5 text-[13px] whitespace-nowrap transition-colors duration-200 ${
                    active ? "border-brass text-charcoal" : "border-transparent text-muted hover:text-charcoal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="link-quiet mt-auto hidden text-left text-[12px] lg:block"
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
