import Image from "next/image";
import { MomentIcon } from "@/components/moment/MomentIcons";
import type { MomentChoice } from "@/lib/moment/types";

export function PhotoCard({
  choice,
  selected,
  onSelect,
}: {
  choice: MomentChoice;
  selected?: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="group block w-full text-left">
      <span
        className={`relative block aspect-[4/5] w-full overflow-hidden ${
          selected ? "ring-1 ring-brass" : "ring-1 ring-transparent"
        }`}
      >
        <Image
          src={choice.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, 46vw"
          className="img-zoom object-cover"
        />
        <span className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,12,10,0.72),rgba(16,12,10,0.08)_55%)]" />
        <span className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-5">
          <MomentIcon name={choice.icon} className="text-brass" />
          <span className="mt-3 block font-serif text-[22px] leading-[1.1] sm:text-[24px]">{choice.title}</span>
          <span className="mt-1 block text-[13px] text-ivory/72">{choice.line}</span>
        </span>
      </span>
    </button>
  );
}
