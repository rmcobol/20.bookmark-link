import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { bookmarks, folders } from "@/app/_lib/mock-data";

export default async function FolderPage({ params }: PageProps<"/folder/[folderId]">) {
  const { folderId } = await params;
  const folderBookmarks = bookmarks.filter((bookmark) => bookmark.folderId === folderId);

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} activeFolderId={folderId} />
        <main className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
          <BookmarkGrid bookmarks={folderBookmarks} />
        </main>
      </div>
    </div>
  );
}
