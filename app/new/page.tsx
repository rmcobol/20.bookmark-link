import Header from "@/components/Header";
import NewLinkForm from "@/components/NewLinkForm";
import Sidebar from "@/components/Sidebar";
import { requireUser } from "@/app/_lib/require-user";

export default async function NewLinkPage() {
  await requireUser();

  return (
    <div className="flex flex-1 flex-col bg-[var(--background)]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 items-start justify-center overflow-y-auto px-6 pt-10 pb-6">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
