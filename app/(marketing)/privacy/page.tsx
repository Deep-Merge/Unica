import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";

export const metadata = {
  title: "Privacy",
  description: "How Verenne holds member information.",
};

const sections = [
  {
    title: "What we collect",
    copy: "Your application, profile, photographs, preferences, introduction history, payment records if you become a paying member, and the notes your matchmaker writes in the course of the work. Identity verification is performed by a specialist provider. We store the result and a reference, not your identity document.",
  },
  {
    title: "What we do not do",
    copy: "We do not sell member lists. We do not train public models on your private life. We do not put private photographs on public URLs. Email subjects never name another member or describe a romantic outcome.",
  },
  {
    title: "Who can see you",
    copy: "Before mutual interest: a first name or safe identifier, an age range, a city area, a relationship intention, a curated note, and either an approved public photograph or an anonymized portrait — only if you have chosen to be public. After mutual interest: the fuller profile, released on record. Matchmakers see assigned members. Administrators see what the work requires, and those views are logged.",
  },
  {
    title: "How long we keep it",
    copy: "If you close your account, personal profile material is deleted or anonymized within thirty days. Payment and audit records are kept as the law requires. You may ask for an export of what we hold.",
  },
  {
    title: "Your choices",
    copy: "Public or private visibility. Pause. Block a person. Decline without confrontation. Request deletion. Consent separately if any portrait of you is drafted by software.",
  },
];

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Privacy"
        title="Your private life stays private."
        copy="This is the working policy of the house. Counsel will settle the formal document before launch. The rules below are already how the product is built."
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
