import Image from "next/image";
import { IconCheck, IconFocus, IconLock } from "@/components/icons";
import { Reveal } from "@/components/login/Reveal";
import { ClosingBand } from "@/components/shell/ClosingBand";
import { Kicker } from "@/components/ui/Kicker";

const trust = [
  { title: "Verified membership", copy: "Every profile is reviewed", icon: IconCheck },
  { title: "Private by design", copy: "Your information stays protected", icon: IconLock },
  { title: "Human-led introductions", copy: "Technology supports, people decide", icon: IconFocus },
];

const steps = [
  { n: "01", title: "Apply privately", copy: "Share who you are. We review every application with care." },
  { n: "02", title: "Meet your matchmaker", copy: "A private conversation to understand what you are looking for." },
  { n: "03", title: "Receive considered introductions", copy: "Meet fewer people, chosen with intention and mutual consent." },
];

const privacyPoints = [
  "No open messaging between members",
  "Profiles released only after mutual interest",
  "Identity reviewed before introductions begin",
  "Your photos are never given public URLs",
];

export function HouseStory() {
  return (
    <>
      <section className="border-y border-line bg-limestone/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-3 lg:gap-0 lg:py-16">
          {trust.map((item, index) => (
            <Reveal
              key={item.title}
              className={`flex flex-col items-start gap-3 px-1 lg:px-10 ${index > 0 ? "lg:border-l lg:border-line" : ""}`}
            >
              <item.icon className="text-oxblood" />
              <div>
                <h3 className="text-[16px] font-medium text-charcoal">{item.title}</h3>
                <p className="mt-1 text-[14px] text-muted">{item.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal className="relative aspect-[4/5] overflow-hidden">
          <Image src="/images/process.jpg" alt="A quiet dinner in warm light" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
        </Reveal>
        <Reveal>
          <Kicker>A quieter alternative</Kicker>
          <h2 className="mt-4 font-serif text-[40px] leading-[1.1] text-charcoal sm:text-[48px]">
            Not another dating marketplace
          </h2>
          <ol className="mt-10 space-y-7">
            {steps.map((step) => (
              <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="font-serif text-[22px] text-oxblood">{step.n}</span>
                <div>
                  <h3 className="text-[17px] text-charcoal">{step.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="bg-charcoal text-ivory">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.28em] text-ivory/55 uppercase">The Moment</p>
            <h2 className="mt-4 font-serif text-[40px] leading-[1.1] sm:text-[48px]">
              We don’t simply introduce you. We create your first evening together.
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ivory/72">
              After mutual interest, you receive a private adventure — not an inbox. Three chapters. One postcard. Then you decide, quietly, whether you would like to meet.
            </p>
            <ol className="mt-10 space-y-5 text-[15px] leading-relaxed">
              <li><span className="text-brass">01 Spark</span> — a playful, photographic beginning</li>
              <li><span className="text-brass">02 Read me</span> — guess what they would actually do</li>
              <li><span className="text-brass">03 Create</span> — invent the evening, then keep the postcard</li>
            </ol>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/moments/pastry.jpg" alt="A pastry counter in warm light" fill className="object-cover" sizes="30vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden">
              <Image src="/images/moments/wine.jpg" alt="A quiet interior table" fill className="object-cover" sizes="30vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <Reveal className="order-2 lg:order-1">
            <Kicker>Discretion, built-in</Kicker>
            <h2 className="mt-4 font-serif text-[40px] leading-[1.1] text-charcoal sm:text-[48px]">
              Your private life should remain private
            </h2>
            <ul className="mt-10 space-y-4">
              {privacyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <IconCheck className="mt-0.5 shrink-0 text-oxblood" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="relative order-1 aspect-[4/5] overflow-hidden lg:order-2">
            <Image
              src="/images/privacy.jpg"
              alt="A couple looking out over a quiet morning"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[50%_40%]"
            />
          </Reveal>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
