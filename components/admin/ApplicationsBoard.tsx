"use client";

import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";

export function ApplicationsBoard() {
  const { applications, setApplicationStatus } = useDemo();

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Applications</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Who is asking to enter</h1>
      <div className="mt-10 space-y-4">
        {applications.map((item) => (
          <article key={item.id} className="border border-line bg-cream p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-[24px] text-charcoal">
                  {item.firstName} {item.lastName}
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  {item.age} · {item.city} · {item.path.replaceAll("-", " ")} · {item.status}
                </p>
                {item.note ? <p className="mt-3 max-w-xl text-[15px] text-ink">{item.note}</p> : null}
              </div>
              {item.status === "new" ? (
                <div className="flex gap-2">
                  <Button className="h-10 px-4 text-[13px]" onClick={() => setApplicationStatus(item.id, "approved")}>
                    Approve
                  </Button>
                  <Button variant="ghost" className="h-10 px-4 text-[13px]" onClick={() => setApplicationStatus(item.id, "changes")}>
                    Request changes
                  </Button>
                  <Button variant="ghost" className="h-10 px-4 text-[13px]" onClick={() => setApplicationStatus(item.id, "declined")}>
                    Decline
                  </Button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
