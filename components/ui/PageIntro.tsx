import { Kicker } from "@/components/ui/Kicker";

export function PageIntro({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h1 className="mt-3 font-serif text-[40px] leading-[1.08] text-charcoal sm:text-[46px]">{title}</h1>
      {copy ? <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">{copy}</p> : null}
    </header>
  );
}
