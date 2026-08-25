import type { Folder } from "@/app/_lib/types";
import Link from "next/link";
import FolderList from "./FolderList";

type SidebarProps = {
  folders: Folder[];
  activeFolderId?: string;
};

export default function Sidebar({ folders, activeFolderId }: SidebarProps) {
  const isAllActive = activeFolderId === undefined;

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-4 border-r border-black/[.08] p-4 dark:border-white/[.145]">
      <Link
        href="/"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
          isAllActive
            ? "bg-black/[.06] font-medium text-black dark:bg-white/[.08] dark:text-zinc-50"
            : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.06]"
        }`}
      >
        <span aria-hidden>🗂️</span>
        전체
      </Link>
      <FolderList folders={folders} activeFolderId={activeFolderId} />
    </aside>
  );
}
