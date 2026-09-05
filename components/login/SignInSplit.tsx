import Image from "next/image";
import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { LoginForm } from "@/components/login/LoginForm";
import { routes } from "@/lib/brand";

export function SignInSplit() {
  return (
    <section className="relative min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative min-h-[58vh] overflow-hidden lg:min-h-screen">
        <Image
          src="/images/hero-alt.jpg"
          alt="A quiet evening conversation at a private bar"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="hero-kenburns object-cover object-[62%_28%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/20" />
        <div className="absolute top-7 left-6 z-10 sm:top-9 sm:left-10">
          <Link href={routes.home}>
            <Mark />
          </Link>
        </div>
        <div className="absolute top-8 right-0 bottom-8 z-10 hidden w-px bg-brass/40 lg:block draw-y" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-10 lg:p-12">
          <p
            className="rise text-[11px] font-medium tracking-[0.28em] text-ivory/80 uppercase"
            style={{ animationDelay: "200ms" }}
          >
            Meet fewer, more meaningfully
          </p>
          <h2
            className="rise mt-3 max-w-md font-serif text-[40px] leading-[1.08] text-ivory sm:text-[52px]"
            style={{ animationDelay: "340ms" }}
          >
            A considered way to meet.
          </h2>
          <p className="rise mt-4 max-w-sm text-[15px] leading-relaxed text-ivory/78" style={{ animationDelay: "480ms" }}>
            For people who value discretion, emotional intelligence and introductions chosen with care.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-cream">
        <div className="flex justify-end px-6 pt-6 sm:px-10 sm:pt-8">
          <Link href={routes.approach} className="text-[13px] text-muted transition-colors hover:text-charcoal">
            Discover our approach
          </Link>
        </div>
        <div className="flex flex-1 items-center px-6 py-14 sm:px-12 lg:px-16">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
