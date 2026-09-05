import Image from "next/image";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/brand";
import { membershipIncludes } from "@/lib/content";

export const metadata = {
  title: "Membership",
  description: "One concierge membership. Four introductions. Three months.",
};

export default function MembershipPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Membership"
        title="One membership. Enough time to meet well."
        copy="There is no ladder of tiers. A concierge membership lasts three months and includes four facilitated introductions. The investment is discussed privately after your consultation."
      />

      <section className="mx-auto max-w-6xl px-6 pb-8 sm:px-10">
        <Reveal className="relative aspect-[16/8] overflow-hidden">
          <Image
            src="/images/membership.png"
            alt="Morning light in a quiet room"
            fill
            className="object-cover object-[40%_45%]"
            sizes="90vw"
          />
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 lg:grid-cols-2">
        {membershipIncludes.map((item) => (
          <Reveal key={item.title}>
            <h2 className="font-serif text-[28px] text-charcoal">{item.title}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{item.copy}</p>
          </Reveal>
        ))}
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:px-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">For gentlemen</p>
            <h2 className="mt-4 font-serif text-[36px] text-charcoal">Apply, consult, then join</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              A complimentary half-hour comes first. If we agree the house is right, membership is offered. Payment is handled privately. There is no public price list.
            </p>
            <ButtonLink href={routes.consultation} className="mt-8">
              Book a consultation
            </ButtonLink>
          </Reveal>
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">For women</p>
            <h2 className="mt-4 font-serif text-[36px] text-charcoal">Apply, verify, then choose</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              There is no membership fee in this first chapter. Identity is verified, a matchmaker approves your profile, and you decide whether to appear in Discover or remain private.
            </p>
            <ButtonLink href={routes.apply} variant="ghost" className="mt-8">
              Apply privately
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <ClosingBand />
    </SiteChrome>
  );
}
