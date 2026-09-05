import { SignInSplit } from "@/components/login/SignInSplit";
import { SiteFooter } from "@/components/shell/SiteFooter";

export const metadata = {
  title: "Sign in",
  description: "Sign in to your private member space.",
};

export default function LoginRoute() {
  return (
    <main className="bg-ivory text-ink">
      <SignInSplit />
      <SiteFooter />
    </main>
  );
}
