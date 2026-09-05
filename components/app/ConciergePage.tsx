"use client";

import { FormEvent, useState } from "react";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/Field";
import { matchmaker } from "@/lib/demo-data";

export function ConciergePage() {
  const { messages, sendConcierge, memberId } = useDemo();
  const mine = messages.filter((item) => !item.memberId || item.memberId === memberId);
  const [body, setBody] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    sendConcierge(body);
    setBody("");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Concierge</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Write to the house</h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        This is {matchmaker.name} — not another member. Nothing you write here is sent to someone you have been introduced to.
      </p>
      <div className="mt-10 space-y-5">
        {mine.map((message) => (
          <article
            key={message.id}
            className={`max-w-[36rem] border px-5 py-4 ${
              message.from === "house" ? "border-line bg-cream" : "ml-auto border-oxblood/20 bg-ivory"
            }`}
          >
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">
              {message.from === "house" ? "Verenne" : "You"} · {message.at}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink">{message.body}</p>
          </article>
        ))}
      </div>
      <form onSubmit={onSubmit} className="mt-10">
        <TextArea value={body} onChange={(event) => setBody(event.target.value)} placeholder="A note for Clara." required />
        <Button type="submit" className="mt-4">
          Send to concierge
        </Button>
      </form>
    </div>
  );
}
