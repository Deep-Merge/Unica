import { IntroductionDetail } from "@/components/app/IntroductionDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <IntroductionDetail id={id} />;
}
