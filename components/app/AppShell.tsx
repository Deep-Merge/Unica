"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ChatDock } from "@/components/app/ChatDock";
import { Mark } from "@/components/brand/Mark";
import { useDemo } from "@/components/demo/DemoProvider";
import { IconChat } from "@/components/icons";
import { appRoutes, routes } from "@/lib/brand";
import { personById } from "@/lib/demo-data";

const nav = [
  { href: appRoutes.home, label: "Home" },
  { href: appRoutes.discover, label: "Available" },
  { href: appRoutes.requests, label: "Requests" },
  { href: appRoutes.introductions, label: "Introductions" },
  { href: appRoutes.concierge, label: "Concierge" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, memberId, openChat, chatOpen, chats } = useDemo();
  const noteCount = (chats ?? []).filter((item) => item.aId === memberId || item.bId === memberId).length;
  const me = personById(memberId) ?? personById("julian")!;

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-ivory/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center gap-8 px-5 sm:px-8">
          <Link href={appRoutes.home} className="shrink-0">
            <Mark tone="dark" />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== appRoutes.home && pathname.startsWith(`${item.href}/`));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-0.5 text-[13px] tracking-[0.06em] transition-colors duration-200 ${
                    active ? "text-charcoal" : "text-muted hover:text-charcoal"
                  }`}
                >
                  {item.label}
                  {active ? <span className="absolute inset-x-0 -bottom-1 h-px bg-brass" /> : null}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={() => openChat()}
              className={`relative hidden items-center gap-1.5 text-[13px] tracking-[0.06em] sm:flex ${
                chatOpen ? "text-charcoal" : "text-muted hover:text-charcoal"
              }`}
            >
              <IconChat />
              <span>Notes</span>
              {noteCount > 0 ? <span className="text-[11px] text-brass">{noteCount}</span> : null}
            </button>
            <Link href={appRoutes.profile} className="hidden items-center gap-2.5 sm:flex">
              <Image src={me.photo} alt="" width={32} height={32} className="h-8 w-8 object-cover" />
              <span className="text-[13px] text-charcoal">{me.firstName}</span>
            </Link>
            <button
              type="button"
              className="text-[12px] text-muted transition-colors hover:text-charcoal"
              onClick={() => {
                signOut();
                router.push(routes.home);
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-line px-5 py-2 lg:hidden">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== appRoutes.home && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-[12px] tracking-[0.04em] whitespace-nowrap ${
                  active ? "text-charcoal" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => openChat()}
            className={`px-3 py-2 text-[12px] tracking-[0.04em] whitespace-nowrap ${chatOpen ? "text-charcoal" : "text-muted"}`}
          >
            Notes
          </button>
        </nav>
      </header>
      <div className="page-enter mx-auto max-w-[1280px] px-5 py-8 sm:px-8 lg:py-10">{children}</div>
      <ChatDock />
    </div>
  );
}
