export const metadata = { title: "Audit" };

const rows = [
  { at: "Today, 09:12", who: "Clara", action: "Opened Maya’s private profile" },
  { at: "Today, 09:18", who: "Clara", action: "Approved introduction Maya · Julian" },
  { at: "Yesterday", who: "Admin", action: "Approved application Robert Lang" },
  { at: "Yesterday", who: "System", action: "Identity verified · Maya" },
];

export default function Page() {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Audit</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Who opened what</h1>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {rows.map((row) => (
          <li key={row.at + row.action} className="py-4">
            <p className="text-[15px] text-charcoal">{row.action}</p>
            <p className="mt-1 text-[13px] text-muted">
              {row.who} · {row.at}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
