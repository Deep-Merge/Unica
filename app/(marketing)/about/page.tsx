import Image from "next/image";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "About",
  description: "Unica is a private matchmaking house. Technology helps. People decide.",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="About Unica"
        title="A private house for serious introductions."
        copy="We built Unica for people who are tired of performing for strangers. Meet fewer people, more meaningfully. The work is human. The software exists to protect time, privacy, and the quality of a first meeting."
      />

      <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
        <Reveal className="relative aspect-[16/8] overflow-hidden">
          <Image src="/images/about.jpg" alt="A quiet table in warm light" fill className="object-cover" sizes="90vw" />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:px-10 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-[32px] text-charcoal">What we believe</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Most platforms optimize for attention. We optimize for a smaller number of right meetings. Leaving because you found someone is a success, not a loss.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-[32px] text-charcoal">What we will not do</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            We will not let members message strangers. We will not publish match percentages. We will not allow software to introduce two people without a matchmaker. We will not pretend an algorithm knows the heart.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-[32px] text-charcoal">Who we serve</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            In this first chapter we introduce men seeking women and women seeking men, all 21 or older, in one city at a time. The house may widen later. We will not widen it carelessly.
          </p>
        </Reveal>
        <Reveal>
          <h2 className="font-serif text-[32px] text-charcoal">Who does the work</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Matchmakers interview, search, confirm interest, and follow up. Technology drafts portraits and suggests candidates. A person always decides.
          </p>
        </Reveal>
      </section>
      <ClosingBand />
    </SiteChrome>
  );
}
