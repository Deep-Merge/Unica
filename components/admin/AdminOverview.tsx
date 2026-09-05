"use client";

import { useDemo } from "@/components/demo/DemoProvider";
import { people } from "@/lib/demo-data";
import { isOpenStatus } from "@/lib/status";

export function AdminOverview() {
  const { applications, introductions } = useDemo();
  const metrics = [
    { label: "New applications", value: applications.filter((item) => item.status === "new").length },
    { label: "Active members", value: people.length },
    { label: "Open introductions", value: introductions.filter((item) => isOpenStatus(item.status)).length },
    { label: "Interest pending", value: introductions.filter((item) => item.status.includes("pending")).length },
    { label: "Scheduled", value: introductions.filter((item) => item.status === "introduction_scheduled").length },
    { label: "Payment failures", value: 0 },
  ];

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Overview</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">The house today</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((item) => (
          <article key={item.label} className="border border-line bg-cream p-5">
            <p className="text-[13px] text-muted">{item.label}</p>
            <p className="mt-3 font-serif text-[40px] text-charcoal">{item.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
