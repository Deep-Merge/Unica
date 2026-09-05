import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Terms",
  description: "Membership terms for Unica private introductions.",
};

const sections = [
  {
    title: "Admission",
    copy: "Membership is by application. We may decline without lengthy explanation. You must be 21 or older and truthful in what you tell us.",
  },
  {
    title: "The service",
    copy: "Unica facilitates introductions. We do not guarantee a relationship. Four introductions are included in a three-month concierge term. A matchmaker may grant one additional introduction.",
  },
  {
    title: "Conduct",
    copy: "Harassment, dishonesty about identity, leaking another member’s private material, or payment fraud ends a membership at once. A decline must remain private.",
  },
  {
    title: "Money",
    copy: "In this first chapter, gentlemen purchase membership after a complimentary consultation, unless we already know them. The amount is agreed privately. There is no automatic refund if no introduction becomes mutual interest; the matchmaker will review the search with you.",
  },
  {
    title: "A successful ending",
    copy: "If two members confirm they are seeing each other, or independently confirm a second meeting, we regard the work as complete. Leaving for a relationship is not a failure of the house.",
  },
];

export default function TermsPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Terms"
        title="The terms of the house."
        copy="A formal agreement will be published before applications are taken in earnest. These are the rules we already operate by."
      />
      <section className="mx-auto max-w-3xl space-y-10 px-6 pb-24 sm:px-10">
        {sections.map((section) => (
          <article key={section.title}>
            <h2 className="font-serif text-[28px] text-charcoal">{section.title}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{section.copy}</p>
          </article>
        ))}
      </section>
    </SiteChrome>
  );
}
