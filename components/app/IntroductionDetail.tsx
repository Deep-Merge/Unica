"use client";

import Image from "next/image";
import { StatusNote } from "@/components/app/StatusNote";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { appRoutes } from "@/lib/brand";
import { otherOf, personById } from "@/lib/demo-data";

export function IntroductionDetail({ id }: { id: string }) {
  const { introductions, confirmInterest, declineIntroduction, memberId } = useDemo();
  const intro = introductions.find((item) => item.id === id);
  const person = intro ? personById(otherOf(intro, memberId)) : undefined;

  if (!intro || !person) {
    return <p className="text-muted">This introduction is no longer available.</p>;
  }

  const canDecide = intro.status === "first_member_pending" || intro.status === "matchmaker_approved";
  const momentWaiting = intro.status === "mutual_interest_confirmed" && !intro.moment?.decision;
  const released = ["profiles_released", "introduction_scheduled", "introduction_completed", "follow_up_pending", "ongoing_connection", "successful_match"].includes(intro.status);

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <div className="relative min-h-[420px]">
        <Image src={person.photo} alt="" fill className="object-cover" sizes="45vw" />
      </div>
      <div>
        <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Introduction</p>
        <h1 className="mt-3 font-serif text-[40px] text-charcoal">{person.firstName}</h1>
        <div className="mt-3">
          <StatusNote status={intro.status} />
        </div>
        <p className="mt-6 text-[16px] leading-relaxed text-ink">
          {released ? person.about : person.why ?? person.about}
        </p>
        {!released ? (
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            A fuller profile, including how to meet, is released only after both of you have said yes — each asked in private.
          </p>
        ) : (
          <p className="mt-4 text-[14px] leading-relaxed text-muted">
            Mutual interest is confirmed. Clara is arranging the first meeting. No phone number is exchanged in this chapter.
          </p>
        )}
        {momentWaiting ? (
          <div className="mt-8">
            <ButtonLink href={appRoutes.moment(intro.id)}>Enter your Moment</ButtonLink>
            <p className="mt-3 text-[13px] text-muted">Three small choices. One evening you invent together.</p>
          </div>
        ) : null}
        {canDecide ? (
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => confirmInterest(intro.id)}>I am interested</Button>
            <Button variant="ghost" onClick={() => declineIntroduction(intro.id)}>
              Not for me
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
