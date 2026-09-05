"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, TextInput } from "@/components/ui/Field";

export function ForgotForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  }

  if (sent) {
    return (
      <p className="text-[16px] leading-relaxed text-muted">
        If an account exists for that address, a reset note is on its way. The subject line will not mention dating.
      </p>
    );
  }

  return (
    <form className="mt-10 max-w-md space-y-5" onSubmit={onSubmit}>
      <Field label="Email address">
        <TextInput type="email" name="email" autoComplete="email" required />
      </Field>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send reset note"}
      </Button>
    </form>
  );
}
