"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemo } from "@/components/demo/DemoProvider";
import { appRoutes } from "@/lib/brand";
import { personById } from "@/lib/people";

export function ProfileView() {
  const { memberId } = useDemo();
  const me = personById(memberId) ?? personById("julian")!;
  const seeking = me.path === "man-seeking-woman" ? "Women" : "Men";

  const sections = [
    { title: "About you", copy: me.about },
    { title: "Relationship goals", copy: me.intention },
    { title: "Lifestyle", copy: `${me.city}. ${me.traits.join(", ")}.` },
    { title: "Values", copy: "Discretion, emotional clarity, and enough independence to remain myself." },
    { title: "Preferences", copy: `${seeking} who want a household and can speak plainly.` },
    { title: "Deal-breakers", copy: "Open messaging culture. A life lived for an audience." },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside>
        <Image src={me.photo} alt="" width={280} height={340} className="w-full object-cover" />
        <p className="mt-4 font-serif text-[28px] text-charcoal">{me.firstName}</p>
        <p className="text-[14px] text-muted">
          Private · {me.verified ? "Verified" : "Held"} · {me.age}
        </p>
        <Link href={appRoutes.privacy} className="mt-4 inline-block text-[13px] text-oxblood">
          Visibility and data
        </Link>
      </aside>
      <div className="space-y-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Your profile</p>
          <h1 className="mt-3 font-serif text-[40px] text-charcoal">How Clara sees you</h1>
        </div>
        {sections.map((section) => (
          <article key={section.title} className="border-t border-line pt-6">
            <h2 className="text-[13px] tracking-[0.16em] text-muted uppercase">{section.title}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink">{section.copy}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
