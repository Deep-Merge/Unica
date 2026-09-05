import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/brand";

export const metadata = { title: "Your membership" };

export default function Page() {
  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Membership</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Concierge · three months</h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">
        Active. Four facilitated introductions. Clara is assigned to you. The first meeting is always arranged by the house.
      </p>
      <dl className="mt-10 space-y-4 text-[15px]">
        <div className="flex justify-between border-b border-line py-3">
          <dt className="text-muted">Term</dt>
          <dd>September – December</dd>
        </div>
        <div className="flex justify-between border-b border-line py-3">
          <dt className="text-muted">Introductions remaining</dt>
          <dd>Two of four</dd>
        </div>
        <div className="flex justify-between border-b border-line py-3">
          <dt className="text-muted">Payment</dt>
          <dd>In good standing</dd>
        </div>
      </dl>
      <div className="mt-8 flex gap-3">
        <ButtonLink href={routes.consultation} variant="ghost">
          Speak with Clara
        </ButtonLink>
        <Link href="/account/privacy" className="self-center text-[13px] text-muted">
          Privacy
        </Link>
      </div>
    </div>
  );
}
