"use client";

import Image from "next/image";
import Link from "next/link";
import { people } from "@/lib/demo-data";

const assigned = people.filter((person) => person.id === "maya" || person.id === "james");

export function DeskHome() {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Clara’s desk</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Assigned members</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {assigned.map((person) => (
          <Link key={person.id} href={`/desk/members/${person.id}`} className="flex gap-5 border border-line bg-cream p-5">
            <Image src={person.photo} alt="" width={88} height={110} className="h-[110px] w-[88px] object-cover" />
            <div>
              <p className="font-serif text-[26px] text-charcoal">{person.firstName}</p>
              <p className="mt-1 text-[13px] text-muted">
                {person.age} · {person.visibility} · {person.intention}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink">{person.about}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
