import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/login/Reveal";
import { routes } from "@/lib/brand";

export function ClosingBand({
  kicker = "Begin privately",
  title = "Meet someone worth knowing",
  copy = "Membership is by application. If Verenne is right for you, a matchmaker will be in touch.",
}: {
  kicker?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="relative isolate min-h-[460px] overflow-hidden">
      <Image
        src="/images/closing.jpg"
        alt="A private dinner shared between two people"
        fill
        sizes="100vw"
        className="object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-black/48" />
      <Reveal className="relative z-10 mx-auto flex min-h-[460px] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] font-medium tracking-[0.28em] text-ivory/72 uppercase">{kicker}</p>
        <h2 className="mt-4 font-serif text-[40px] leading-[1.1] text-ivory sm:text-[52px]">{title}</h2>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ivory/78">{copy}</p>
        <ButtonLink href={routes.apply} variant="light" className="mt-8">
          Apply for membership
        </ButtonLink>
      </Reveal>
    </section>
  );
}
