import Image from "next/image";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { stories } from "@/lib/content";

export const metadata = {
  title: "Stories",
  description: "A few introductions, told quietly.",
};

export default function StoriesPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Stories"
        title="A few introductions, told quietly."
        copy="Names are changed where asked. The feeling is not. These are not ratings. They are how an evening can go when nobody is performing for a crowd."
      />

      <section className="mx-auto max-w-6xl space-y-20 px-6 py-10 pb-24 sm:px-10">
        {stories.map((story, index) => (
          <Reveal key={story.names}>
            <article className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image src={story.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">{story.place}</p>
                <h2 className="mt-3 font-serif text-[34px] text-charcoal">{story.names}</h2>
                <p className="mt-5 font-serif text-[22px] leading-relaxed text-ink">“{story.quote}”</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
      <ClosingBand />
    </SiteChrome>
  );
}
