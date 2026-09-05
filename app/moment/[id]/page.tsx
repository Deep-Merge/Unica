import { MomentRoom } from "@/components/moment/MomentRoom";

export const metadata = {
  title: "A Moment",
  description: "A private experience created for two people.",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MomentRoom id={id} />;
}
