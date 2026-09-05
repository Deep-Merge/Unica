import Image from "next/image";
import { ConsultForm } from "@/components/forms/ConsultForm";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Consultation",
  description: "A complimentary thirty-minute conversation with a Verenne matchmaker.",
};

export default function ConsultationPage() {
  return (
    <SiteChrome>
      <section className="mx-auto grid max-w-6xl items-start gap-16 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Consultation</p>
          <h1 className="mt-4 font-serif text-[42px] leading-[1.08] text-charcoal sm:text-[52px]">
            Thirty minutes. No performance.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            A private conversation to understand the life you want. Complimentary. Usually required before a gentleman’s first membership.
          </p>
          <div className="relative mt-10 aspect-[5/4] overflow-hidden">
            <Image src="/images/consult.png" alt="A conversation across a café table" fill className="object-cover" sizes="(min-width: 1024px) 40vw, 90vw" />
          </div>
        </div>
        <div className="lg:pt-16">
          <ConsultForm />
        </div>
      </section>
    </SiteChrome>
  );
}
