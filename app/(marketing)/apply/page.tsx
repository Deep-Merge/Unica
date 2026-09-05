import Image from "next/image";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Apply",
  description: "Apply privately for Verenne membership. Every application is reviewed by a matchmaker.",
};

export default function ApplyPage() {
  return (
    <SiteChrome>
      <section className="lg:grid lg:min-h-[calc(100vh-72px)] lg:grid-cols-2">
        <div className="relative hidden min-h-[70vh] overflow-hidden lg:block">
          <Image
            src="/images/membership.png"
            alt="A couple looking out over the city"
            fill
            priority
            sizes="50vw"
            className="object-cover object-[30%_40%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <p className="text-[11px] font-medium tracking-[0.28em] text-ivory/75 uppercase">Membership</p>
            <h2 className="mt-3 max-w-md font-serif text-[44px] leading-[1.08] text-ivory">Apply privately</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ivory/78">
              We read every application. If Verenne is a considered fit, a matchmaker will invite you to a conversation.
            </p>
          </div>
        </div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:px-16">
          <div className="w-full">
            <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase lg:hidden">Membership</p>
            <h1 className="mt-3 font-serif text-[40px] text-charcoal lg:hidden">Apply privately</h1>
            <p className="mt-3 mb-10 text-[15px] leading-relaxed text-muted lg:hidden">
              We read every application. If Verenne is a considered fit, a matchmaker will invite you to a conversation.
            </p>
            <ApplyForm />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
