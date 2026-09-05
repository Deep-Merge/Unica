import { DeskShell } from "@/components/desk/DeskShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DeskShell>{children}</DeskShell>;
}
