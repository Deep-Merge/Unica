"use client";

import { useState } from "react";

export default function PrivacyControlsPage() {
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [paused, setPaused] = useState(false);

  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Privacy</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">How you are seen</h1>
      <div className="mt-10 space-y-8">
        <fieldset>
          <legend className="text-[13px] tracking-[0.16em] text-muted uppercase">Visibility</legend>
          <div className="mt-4 space-y-3">
            {(
              [
                ["private", "Private — Clara may search. You do not appear in Discover."],
                ["public", "Public — a considered preview may appear in Discover."],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-start gap-3 text-[15px] text-ink">
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === value}
                  onChange={() => setVisibility(value)}
                  className="mt-1 accent-oxblood"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-start gap-3 text-[15px] text-ink">
          <input type="checkbox" checked={paused} onChange={() => setPaused((value) => !value)} className="mt-1 accent-oxblood" />
          Pause my profile. No new introductions until I ask.
        </label>
        <p className="text-[14px] leading-relaxed text-muted">
          You may block a person by writing to Clara. A request to delete your account is a ticket, not a silent erasure of payments.
        </p>
        <button type="button" className="text-[14px] text-oxblood">
          Request account deletion
        </button>
      </div>
    </div>
  );
}
