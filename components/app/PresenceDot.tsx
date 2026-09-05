export function PresenceDot({
  online,
  className = "",
  size = "md",
}: {
  online: boolean;
  className?: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5";
  return (
    <span
      className={`inline-block rounded-full ring-2 ring-ivory ${dim} ${online ? "bg-[#4a7c59]" : "bg-[#b8b0a4]"} ${className}`}
      title={online ? "Online" : "Offline"}
      aria-label={online ? "Online" : "Offline"}
    />
  );
}
