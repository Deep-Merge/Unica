import Image from "next/image";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Our approach",
  description: "Fewer introductions, chosen with care. How Unica works.",
};

const chapters = [
  {
    n: "01",
    title: "You apply. We read.",
    copy: "There is no open signup. An application tells us who you are, what you are looking for, and whether this house is the right room. A matchmaker replies within two business days.",
  },
  {
    n: "02",
    title: "A private conversation",
    copy: "Thirty minutes, complimentary. We ask about the life you want, not the life that photographs well. Gentlemen may then be invited to membership. Women continue through verification and approval.",
  },
  {
    n: "03",
    title: "A profile, held with care",
    copy: "You choose public or private. Private profiles never appear in Discover. Photographs are released through signed access, never as a public page.",
  },
  {
    n: "04",
    title: "Interest, confirmed separately",
    copy: "You may request an introduction, or your matchmaker may propose one. Each person is asked in private. Nothing is revealed until both say yes.",
  },
  {
    n: "05",
    title: "A facilitated first meeting",
    copy: "Unica schedules the first introduction. There is no inbox, and no exchange of numbers in this chapter. Afterwards, we ask how it felt — privately.",
  },
];

export default function ApproachPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Our approach"
        title="Fewer introductions. Chosen with care."
        copy="Unica is not a marketplace. Members do not message strangers. A matchmaker confirms mutual interest before anything private is exchanged."
      />

      <section className="mx-auto max-w-6xl px-6 pt-6 pb-8 sm:px-10">
        <Reveal className="relative aspect-[16/8] overflow-hidden">
          <Image src="/images/process.jpg" alt="An evening conversation" fill className="object-cover" sizes="90vw" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <ol className="space-y-12">
          {chapters.map((chapter) => (
            <li key={chapter.n}>
              <Reveal>
                <article className="grid gap-4 sm:grid-cols-[4rem_1fr]">
                  <span className="font-serif text-[26px] text-oxblood">{chapter.n}</span>
                  <div>
                    <h2 className="font-serif text-[28px] text-charcoal">{chapter.title}</h2>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted">{chapter.copy}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <ClosingBand />
    </SiteChrome>
  );
}
