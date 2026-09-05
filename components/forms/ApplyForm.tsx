"use client";

import { FormEvent, useState } from "react";
import { useDemo } from "@/components/demo/DemoProvider";
import { Button } from "@/components/ui/Button";
import { Field, SelectInput, TextArea, TextInput } from "@/components/ui/Field";

export function ApplyForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { addApplication } = useDemo();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const age = Number(data.get("age"));
    if (!Number.isFinite(age) || age < 21) {
      event.currentTarget.querySelector<HTMLInputElement>("[name=age]")?.setCustomValidity(
        "Members must be 21 or older.",
      );
      event.currentTarget.reportValidity();
      return;
    }
    addApplication({
      id: `app-${Date.now()}`,
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      age,
      city: String(data.get("city") ?? ""),
      path: String(data.get("path") ?? ""),
      intention: String(data.get("intention") ?? ""),
      note: String(data.get("note") ?? ""),
      status: "new",
    });
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  }

  if (sent) {
    return (
      <div className="max-w-lg">
        <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Application received</p>
        <h2 className="mt-3 font-serif text-[36px] leading-[1.1] text-charcoal">Thank you. We will read this carefully.</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">
          A matchmaker reviews every application, usually within two business days. If Verenne is a considered fit, we will write to you privately.
        </p>
      </div>
    );
  }

  return (
    <form className="max-w-lg space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name">
          <TextInput name="firstName" autoComplete="given-name" required />
        </Field>
        <Field label="Last name">
          <TextInput name="lastName" autoComplete="family-name" required />
        </Field>
      </div>
      <Field label="Email">
        <TextInput type="email" name="email" autoComplete="email" required placeholder="name@studio.com" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Age" hint="21 or older">
          <TextInput
            type="number"
            name="age"
            min={21}
            max={99}
            required
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
        </Field>
        <Field label="City">
          <TextInput name="city" autoComplete="address-level2" required />
        </Field>
      </div>
      <Field label="I am">
        <SelectInput name="path" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="man-seeking-woman">A man seeking a woman</option>
          <option value="woman-seeking-man">A woman seeking a man</option>
        </SelectInput>
      </Field>
      <Field label="What I am looking for">
        <SelectInput name="intention" required defaultValue="">
          <option value="" disabled>
            Select
          </option>
          <option value="long-term">A long-term relationship</option>
          <option value="partnership">A life partnership</option>
          <option value="marriage">Marriage</option>
        </SelectInput>
      </Field>
      <Field label="A few words, if you wish" hint="Optional">
        <TextArea name="note" maxLength={600} placeholder="What would make an introduction feel worthwhile." />
      </Field>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink">
        <input type="checkbox" name="adult" required className="mt-1 accent-oxblood" />
        I confirm I am 21 or older, and that this application is truthful.
      </label>
      <label className="flex items-start gap-3 text-[13px] leading-relaxed text-ink">
        <input type="checkbox" name="privacy" required className="mt-1 accent-oxblood" />
        I understand introductions are facilitated, and that private profiles are released only after mutual interest.
      </label>
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}
