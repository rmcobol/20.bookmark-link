import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default async function FolderPage({ params }: PageProps<"/folder/[folderId]">) {
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
