"use client";

import { AvailableGallery } from "@/components/app/AvailableGallery";
import { PageIntro } from "@/components/ui/PageIntro";

export function DiscoverPage() {
  return (
    <div>
      <PageIntro
        kicker="Available"
        title="People Clara is prepared to stand behind"
        copy="Browse the room. Like, star, or write a note. A request still goes to Clara — never as a public performance."
      />
      <div className="mt-10">
        <AvailableGallery />
      </div>
    </div>
  );
}
