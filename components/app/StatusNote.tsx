import { memberStatusLabel, type IntroStatus } from "@/lib/status";

export function StatusNote({ status }: { status: IntroStatus }) {
  return <span className="text-[13px] text-muted">{memberStatusLabel[status]}</span>;
}
