import { ForgotForm } from "@/components/forms/ForgotForm";
import { PageHero } from "@/components/shell/PageHero";
import { SiteChrome } from "@/components/shell/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/brand";

export const metadata = {
  title: "Reset password",
  description: "Reset access to your Verenne member space.",
};

export default function ForgotPage() {
  return (
    <SiteChrome>
      <PageHero
        kicker="Account"
        title="Reset your password"
        copy="Enter the email on your membership. If an account exists, a quiet note will follow. The subject will not mention dating."
      />
      <section className="mx-auto max-w-3xl px-6 pb-24 sm:px-10">
        <ForgotForm />
        <div className="mt-10">
          <ButtonLink href={routes.login} variant="ghost">
            Return to sign in
          </ButtonLink>
        </div>
      </section>
    </SiteChrome>
  );
}
