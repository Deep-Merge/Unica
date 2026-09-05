import Image from "next/image";
import { people } from "@/lib/demo-data";

export const metadata = { title: "Members" };

export default function Page() {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Members</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">The book of members</h1>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {people.map((person) => (
          <article key={person.id} className="flex items-center gap-4 py-4">
            <Image src={person.photo} alt="" width={48} height={48} className="h-12 w-12 object-cover" />
            <div>
              <p className="text-[16px] text-charcoal">{person.firstName}</p>
              <p className="text-[13px] text-muted">
                {person.age} · {person.visibility} · {person.verified ? "Verified" : "Unverified"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
