import BookmarkGrid from "@/components/BookmarkGrid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { requireUser } from "./_lib/require-user";

export default async function Home() {
  await requireUser();

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-6 pt-10 pb-6">
          <BookmarkGrid />
        </main>
      </div>
    </div>
  );
}
