"use client";

import { useRouter } from "next/navigation";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";
import { routes } from "@/lib/brand";
import { personById } from "@/lib/people";

export default function SettingsPage() {
  const { session, signOut, memberId } = useDemo();
  const router = useRouter();
  const me = personById(memberId);

  return (
    <div className="max-w-xl">
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Settings</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">The quiet details</h1>
      <form className="mt-10 space-y-5" onSubmit={(event) => event.preventDefault()}>
        <Field label="Email">
          <TextInput defaultValue={session?.email ?? "julian@studio.com"} readOnly />
        </Field>
        <Field label="Preferred name">
          <TextInput defaultValue={me?.firstName ?? "Julian"} />
        </Field>
        <Button type="submit">Save</Button>
      </form>
      <button
        type="button"
        className="mt-10 text-[14px] text-muted hover:text-charcoal"
        onClick={() => {
          signOut();
          router.push(routes.home);
        }}
      >
        Sign out
      </button>
    </div>
  );
}
