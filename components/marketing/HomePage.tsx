import { HouseStory } from "@/components/marketing/HouseStory";
import { HomeHero } from "@/components/marketing/HomeHero";
import { SiteFooter } from "@/components/shell/SiteFooter";

export function HomePage() {
  return (
    <main className="bg-ivory text-ink">
      <HomeHero />
      <p className="bg-charcoal py-7 text-center text-[13px] tracking-[0.22em] text-ivory/78 uppercase">
        Don’t begin with an empty chat. Begin with a Moment.
      </p>
      <HouseStory />
      <SiteFooter />
    </main>
  );
}
