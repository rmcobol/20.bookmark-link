import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { bookmarks, folders } from "./_lib/mock-data";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
          <BookmarkGrid bookmarks={bookmarks} />
        </main>
      </div>
    </div>
  );
}
