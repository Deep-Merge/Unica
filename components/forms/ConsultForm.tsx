"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/Field";

export function ConsultForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  }

  if (sent) {
    return (
      <div>
        <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Request received</p>
        <h2 className="mt-3 font-serif text-[32px] text-charcoal">We will offer you a time.</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Consultations are thirty minutes, complimentary, and private. A matchmaker will write to you with two or three possible hours.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <Field label="Full name">
        <TextInput name="name" autoComplete="name" required />
      </Field>
      <Field label="Email">
        <TextInput type="email" name="email" autoComplete="email" required />
      </Field>
      <Field label="I am">
        <SelectInput name="path" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="man-seeking-woman">A man seeking a woman</option>
          <option value="woman-seeking-man">A woman seeking a man</option>
        </SelectInput>
      </Field>
      <Field label="When is easiest" hint="Optional">
        <TextArea name="timing" placeholder="Mornings in the week, or Thursday after six." />
      </Field>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Sending…" : "Request a consultation"}
      </Button>
    </form>
  );
}
