"use client";

import Image from "next/image";
import Link from "next/link";
import { StatusNote } from "@/components/app/StatusNote";
import { useDemo } from "@/components/demo/DemoProvider";
import { appRoutes } from "@/lib/brand";
import { otherOf, personById } from "@/lib/demo-data";
import { isOpenStatus } from "@/lib/status";

export function IntroductionsPage() {
  const { introductions, memberId } = useDemo();
  const mine = introductions.filter((item) => item.forMemberId === memberId);
  const open = mine.filter((item) => isOpenStatus(item.status));
  const closed = mine.filter((item) => !isOpenStatus(item.status));

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Introductions</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">The introductions we are holding</h1>
      <div className="mt-10 space-y-4">
        {open.map((item) => {
          const person = personById(otherOf(item, memberId));
          if (!person) return null;
          return (
            <Link key={item.id} href={item.status === "mutual_interest_confirmed" && !item.moment?.decision ? appRoutes.moment(item.id) : `${appRoutes.introductions}/${item.id}`} className="grid gap-5 border border-line bg-cream p-4 sm:grid-cols-[140px_1fr]">
              <Image src={person.photo} alt="" width={140} height={160} className="h-40 w-full object-cover" />
              <div className="self-center">
                <p className="font-serif text-[26px] text-charcoal">{person.firstName}</p>
                <p className="mt-1 text-[14px] text-muted">{person.intention}</p>
                <div className="mt-3">
                  <StatusNote status={item.status} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {closed.length ? (
        <section className="mt-14">
          <h2 className="text-[13px] tracking-[0.18em] text-muted uppercase">Closed</h2>
          <ul className="mt-4 space-y-3">
            {closed.map((item) => {
              const person = personById(otherOf(item, memberId));
              if (!person) return null;
              return (
                <li key={item.id} className="text-[15px] text-muted">
                  {person.firstName} · <StatusNote status={item.status} />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
