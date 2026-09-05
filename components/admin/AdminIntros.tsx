"use client";

import { useDemo } from "@/components/demo/DemoProvider";
import { personById } from "@/lib/demo-data";

export function AdminIntros() {
  const { introductions } = useDemo();

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.28em] text-muted uppercase">Introductions</p>
      <h1 className="mt-3 font-serif text-[40px] text-charcoal">Every introduction</h1>
      <table className="mt-10 w-full text-left text-[14px]">
        <thead className="text-[12px] tracking-[0.12em] text-muted uppercase">
          <tr>
            <th className="pb-3 font-normal">Members</th>
            <th className="pb-3 font-normal">Status</th>
            <th className="pb-3 font-normal">Opened</th>
          </tr>
        </thead>
        <tbody>
          {introductions.map((item) => (
            <tr key={item.id} className="border-t border-line">
              <td className="py-4">
                {personById(item.aId)?.firstName} · {personById(item.bId)?.firstName}
              </td>
              <td className="py-4 text-muted">{item.status.replaceAll("_", " ")}</td>
              <td className="py-4 text-muted">{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
