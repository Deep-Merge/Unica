import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const fieldClass =
  "w-full rounded-[var(--radius-sm)] border border-transparent bg-field px-4 text-[15px] text-charcoal outline-none transition-colors placeholder:text-muted/55 focus:border-oxblood/35 focus:bg-ivory";

type FieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, hint, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between text-[13px] text-ink">
        {label}
        {hint ? <span className="text-[12px] text-muted">{hint}</span> : null}
      </span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`h-12 ${fieldClass} ${props.className ?? ""}`} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`h-12 appearance-none ${fieldClass} ${props.className ?? ""}`}>
      {props.children}
    </select>
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`min-h-32 py-3 ${fieldClass} ${props.className ?? ""}`} />;
}
