"use client";

import Image from "next/image";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";
import { otherOf, people, personById } from "@/lib/demo-data";

export function MemberFile({ id }: { id: string }) {
  const person = personById(id);
  const { introductions, approveIntroduction, requestIntroduction } = useDemo();
  const history = introductions.filter((item) => item.aId === id || item.bId === id);
  const suggestions = people.filter((item) => item.id !== id && item.path !== person?.path && item.visibility === "public");

  if (!person) return <p className="text-muted">Member not found.</p>;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="text-[11px] tracking-[0.28em] text-muted uppercase">Member file</p>
        <h1 className="mt-3 font-serif text-[40px] text-charcoal">{person.firstName}</h1>
        <p className="mt-2 text-[15px] text-muted">
          {person.age} · {person.visibility} · {person.verified ? "Verified" : "Unverified"}
        </p>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink">{person.about}</p>
        <p className="mt-3 text-[14px] text-muted">Deal-breaker notes: spectacle, open inboxes, haste.</p>

        <h2 className="mt-12 font-serif text-[26px] text-charcoal">Suggested candidates</h2>
        <p className="mt-2 text-[13px] text-muted">Drafts only. You approve. Nothing is sent without you.</p>
        <div className="mt-6 space-y-4">
          {suggestions.slice(0, 3).map((candidate) => {
            const existing = history.find((item) => item.aId === candidate.id || item.bId === candidate.id);
            return (
              <article key={candidate.id} className="flex gap-4 border border-line bg-cream p-4">
                <Image src={candidate.photo} alt="" width={72} height={90} className="h-[90px] w-[72px] object-cover" />
                <div className="flex-1">
                  <p className="font-serif text-[22px] text-charcoal">{candidate.firstName}</p>
                  <p className="text-[13px] text-muted">{candidate.why ?? "A possible fit — verify in conversation."}</p>
                  <p className="mt-2 text-[13px] text-muted">Friction: {candidate.difference ?? "None recorded."}</p>
                  {existing ? (
                    <p className="mt-3 text-[12px] text-muted">Already in the introduction book.</p>
                  ) : person.id === "maya" ? (
                    <Button className="mt-3 h-10 px-4 text-[13px]" onClick={() => requestIntroduction(candidate.id)}>
                      Begin matchmaker review
                    </Button>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <aside className="space-y-4">
        <section className="border border-line bg-cream p-5">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Introduction history</p>
          <ul className="mt-3 space-y-3 text-[14px]">
            {history.map((item) => {
              const other = personById(otherOf(item, id));
              return (
                <li key={item.id}>
                  {other?.firstName} · {item.status.replaceAll("_", " ")}
                  {item.status === "matchmaker_review" ? (
                    <Button className="mt-2 h-9 px-3 text-[12px]" onClick={() => approveIntroduction(item.id)}>
                      Approve
                    </Button>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
        <section className="border border-line bg-cream p-5">
          <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Private note</p>
          <p className="mt-3 text-[14px] leading-relaxed text-ink">
            Wants fewer, better. Do not offer anyone who treats dating as sport.
          </p>
        </section>
      </aside>
    </div>
  );
}
