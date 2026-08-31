import type { Metadata } from "next";
import { cookies } from "next/headers";
import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { requireUser } from "@/app/_lib/require-user";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: PageProps<"/folder/[folderId]">): Promise<Metadata> {
  const { folderId } = await params;
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("folders")
    .select("name")
    .eq("id", Number(folderId))
    .single();

  return {
    title: data?.name ?? "폴더",
  };
}

export default async function FolderPage({ params }: PageProps<"/folder/[folderId]">) {
  await requireUser();
  const { folderId } = await params;

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar activeFolderId={folderId} />
        <main className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
          <BookmarkGrid folderId={folderId} />
        </main>
      </div>
    </div>
  );
}
