import { SignUpSplit } from "@/components/login/SignUpSplit";
import { SiteFooter } from "@/components/shell/SiteFooter";

export const metadata = {
  title: "Create an account",
  description: "Create your Unica account. Membership still goes through an application.",
};

export default function SignUpRoute() {
  return (
    <main className="bg-ivory text-ink">
      <SignUpSplit />
      <SiteFooter />
    </main>
  );
}
