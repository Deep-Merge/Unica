"use client";

import Image from "next/image";
import Link from "next/link";
import { StatusNote } from "@/components/app/StatusNote";
import { useDemo } from "@/components/demo/DemoProvider";
import { appRoutes } from "@/lib/brand";
import { otherOf, personById } from "@/lib/demo-data";

export function RequestsPage() {
  const { introductions, memberId } = useDemo();
  const mine = introductions.filter((item) => item.forMemberId === memberId);

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Requests</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">What you have asked for</h1>
      <p className="mt-3 max-w-xl text-[15px] text-muted">
        Clara reviews every request. The other person is not told you asked until they have also said yes — or the introduction simply does not move forward.
      </p>
      <div className="mt-10 space-y-4">
        {mine.map((item) => {
          const person = personById(otherOf(item, memberId));
          if (!person) return null;
          return (
            <Link
              key={item.id}
              href={`${appRoutes.introductions}/${item.id}`}
              className="flex items-center gap-5 border border-line bg-cream p-4"
            >
              <Image src={person.photo} alt="" width={72} height={72} className="h-[72px] w-[72px] object-cover" />
              <div>
                <p className="font-serif text-[22px] text-charcoal">{person.firstName}</p>
                <StatusNote status={item.status} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
