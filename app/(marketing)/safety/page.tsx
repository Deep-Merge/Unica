import Image from "next/image";
import { IconCheck } from "@/components/icons";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Safety",
  description: "Reviewed people, considered introductions, and a house that will close a door.",
};

const points = [
  "Every member is 21 or older.",
  "Identity is verified before introductions begin.",
  "A matchmaker approves a profile before it can receive a request.",
  "There is no open messaging.",
  "A decline is never shown as a rejection.",
  "Harassment, fake identity, leaking a private profile, or payment fraud ends a membership immediately.",
  "Matchmakers see only the members assigned to them, unless elevated access is granted and recorded.",
  "You may pause your profile or ask us to delete your account.",
];

export default function SafetyPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Safety"
        title="Reviewed people. Considered introductions."
        copy="Safety here is not a badge. It is the shape of the process: who is admitted, what is visible, and what we will close a door for."
      />

      <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
        <Reveal className="relative aspect-[16/7] overflow-hidden">
          <Image src="/images/safety.jpg" alt="A quiet bar in low light" fill className="object-cover object-[50%_30%]" sizes="90vw" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-10 sm:py-24">
        <ul className="space-y-5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[16px] leading-relaxed text-ink">
              <IconCheck className="mt-0.5 shrink-0 text-oxblood" />
              {point}
            </li>
          ))}
        </ul>
      </section>
      <ClosingBand title="If this feels like the right house" />
    </SiteChrome>
  );
}
