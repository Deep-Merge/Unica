import { Kicker } from "@/components/ui/Kicker";

export function PageHero({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-8 sm:px-10 sm:pt-28">
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-4 font-serif text-[42px] leading-[1.06] text-charcoal sm:text-[56px]">{title}</h1>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">{copy}</p>
    </section>
  );
}
