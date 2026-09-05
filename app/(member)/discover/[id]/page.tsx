import { ProfilePreview } from "@/components/app/ProfilePreview";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProfilePreview id={id} />;
}
