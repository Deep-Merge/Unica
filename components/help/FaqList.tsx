"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";

export function FaqList() {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((item, index) => {
        const active = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-baseline justify-between gap-6 py-6 text-left"
              onClick={() => setOpen(active ? -1 : index)}
              aria-expanded={active}
            >
              <span className="text-[17px] text-charcoal">{item.q}</span>
              <span className="font-serif text-[22px] text-oxblood">{active ? "–" : "+"}</span>
            </button>
            {active ? <p className="pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
