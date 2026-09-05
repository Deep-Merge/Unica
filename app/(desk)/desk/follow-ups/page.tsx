export const metadata = { title: "Follow-ups" };

export default function Page() {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Follow-ups</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">After the evening</h1>
      <ul className="mt-10 space-y-5">
        <li className="border border-line bg-cream p-5">
          <p className="font-serif text-[22px] text-charcoal">Maya · Daniel</p>
          <p className="mt-2 text-[14px] text-muted">Introduction scheduled. Ask both, separately, how the room felt. Do not share one answer with the other.</p>
        </li>
        <li className="border border-line bg-cream p-5">
          <p className="font-serif text-[22px] text-charcoal">Maya · Marcus</p>
          <p className="mt-2 text-[14px] text-muted">Interest being confirmed. If three days pass, write once — never chase in their name.</p>
        </li>
      </ul>
    </div>
  );
}
