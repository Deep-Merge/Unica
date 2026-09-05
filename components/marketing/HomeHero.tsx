import Image from "next/image";
import { HeroNav } from "@/components/marketing/HeroNav";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/brand";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src="/images/hero.png"
        alt="A couple arriving for an evening together"
        fill
        priority
        sizes="100vw"
        className="hero-kenburns object-cover object-[50%_28%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,12,10,0.42)_0%,rgba(16,12,10,0.12)_28%,rgba(16,12,10,0.18)_52%,rgba(16,12,10,0.74)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(16,12,10,0.28)_100%)]" />

      <HeroNav />

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto max-w-6xl px-6 pb-20 sm:px-10 sm:pb-24">
          <p
            className="rise flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] text-ivory/70 uppercase"
            style={{ animationDelay: "180ms" }}
          >
            <span className="hidden h-px w-8 bg-brass/70 sm:block" aria-hidden />
            Private introductions
          </p>
          <h1
            className="rise mt-5 max-w-[12ch] font-serif text-[52px] leading-[0.98] text-ivory sm:text-[76px] lg:text-[84px]"
            style={{ animationDelay: "320ms" }}
          >
            A considered way to meet.
          </h1>
          <p
            className="rise mt-6 max-w-md text-[16px] leading-relaxed text-ivory/78 sm:text-[17px]"
            style={{ animationDelay: "460ms" }}
          >
            For people who value discretion, emotional intelligence and introductions chosen with care.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ animationDelay: "600ms" }}>
            <ButtonLink href={routes.login} variant="light">
              Log in
            </ButtonLink>
            <ButtonLink href={routes.apply} variant="ghostLight">
              Apply for membership
            </ButtonLink>
          </div>
        </div>
        <div className="scroll-cue mx-auto mb-8 h-9 w-px bg-ivory/50" aria-hidden />
      </div>
    </section>
  );
}
