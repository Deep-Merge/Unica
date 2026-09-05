"use client";

import Link from "next/link";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";
import { otherOf, personById } from "@/lib/demo-data";

export function DeskIntros() {
  const { introductions, approveIntroduction, releaseProfiles, scheduleIntroduction } = useDemo();

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Introductions</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">The book</h1>
      <div className="mt-10 space-y-4">
        {introductions.map((item) => {
          const a = personById(item.aId);
          const b = personById(otherOf(item, item.aId));
          return (
            <article key={item.id} className="flex flex-wrap items-center justify-between gap-4 border border-line bg-cream p-5">
              <div>
                <p className="font-serif text-[22px] text-charcoal">
                  {a?.firstName} · {b?.firstName}
                </p>
                <p className="mt-1 text-[13px] text-muted">{item.status.replaceAll("_", " ")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.status === "matchmaker_review" ? (
                  <Button className="h-10 px-4 text-[13px]" onClick={() => approveIntroduction(item.id)}>
                    Approve
                  </Button>
                ) : null}
                {item.status === "mutual_interest_confirmed" ? (
                  <Button className="h-10 px-4 text-[13px]" onClick={() => releaseProfiles(item.id)}>
                    Release profiles
                  </Button>
                ) : null}
                {item.status === "profiles_released" ? (
                  <Button className="h-10 px-4 text-[13px]" onClick={() => scheduleIntroduction(item.id)}>
                    Schedule meeting
                  </Button>
                ) : null}
                <Link href={`/desk/members/${item.forMemberId}`} className="self-center text-[13px] text-muted">
                  Open file
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
