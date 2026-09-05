import { FaqList } from "@/components/help/FaqList";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/brand";

export const metadata = {
  title: "Help",
  description: "Questions about membership, privacy, and introductions.",
};

export default function HelpPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Help"
        title="A few questions, answered plainly."
        copy="If your question is more personal than these, write to the concierge. We read every note."
      />
      <section className="mx-auto max-w-3xl px-6 pb-16 sm:px-10 sm:pb-24">
        <FaqList />
        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href={routes.apply}>Apply for membership</ButtonLink>
          <ButtonLink href={routes.concierge} variant="ghost">
            Contact concierge
          </ButtonLink>
        </div>
      </section>
    </SiteChrome>
  );
}
