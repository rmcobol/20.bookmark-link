import Header from "@/components/Header";
import NewLinkForm from "@/components/NewLinkForm";
import Sidebar from "@/components/Sidebar";
import { folders } from "@/app/_lib/mock-data";

export default function NewLinkPage() {
  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar folders={folders} />
        <main className="flex flex-1 items-start justify-center overflow-y-auto px-6 pt-10 pb-6">
          <NewLinkForm folders={folders} />
        </main>
      </div>
    </div>
  );
}
