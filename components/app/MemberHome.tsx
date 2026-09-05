"use client";

import Image from "next/image";
import Link from "next/link";
import { AvailableGallery } from "@/components/app/AvailableGallery";
import { useDemo } from "@/components/demo/DemoProvider";
import { appRoutes } from "@/lib/brand";
import { greetingHour, matchmaker, otherOf, personById } from "@/lib/demo-data";
import { isOpenStatus } from "@/lib/status";

export function MemberHome() {
  const { introductions, memberId } = useDemo();
  const me = personById(memberId);
  const open = introductions.filter((item) => item.forMemberId === memberId && isOpenStatus(item.status));
  const waiting = open.find((item) => item.status === "mutual_interest_confirmed" && !item.moment?.decision);
  const waitingPerson = waiting ? personById(otherOf(waiting, memberId)) : undefined;

  if (!me) return null;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Available</p>
          <h1 className="mt-2 font-serif text-[36px] leading-[1.06] text-charcoal sm:text-[44px]">
            {greetingHour()}, {me.firstName}
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            {matchmaker.name} wrote every introduction. A request never goes to them directly.
          </p>
        </div>
        <Link href={appRoutes.concierge} className="text-[13px] text-oxblood">
          Write to Clara
        </Link>
      </div>

      {waiting && waitingPerson ? (
        <Link href={appRoutes.moment(waiting.id)} className="mt-8 flex overflow-hidden bg-charcoal text-ivory">
          <div className="relative hidden w-[220px] shrink-0 sm:block">
            <Image src="/images/moments/night.jpg" alt="" fill className="object-cover" sizes="220px" />
          </div>
          <div className="flex flex-1 items-center justify-between gap-6 px-6 py-5">
            <div>
              <p className="text-[11px] tracking-[0.22em] text-ivory/55 uppercase">A Moment is waiting</p>
              <p className="mt-1 font-serif text-[26px]">
                {me.firstName} + {waitingPerson.firstName}
              </p>
            </div>
            <span className="hidden h-10 items-center bg-ivory px-4 text-[13px] text-charcoal sm:inline-flex">Enter</span>
          </div>
        </Link>
      ) : null}

      <div className="mt-8">
        <AvailableGallery />
      </div>
    </div>
  );
}
