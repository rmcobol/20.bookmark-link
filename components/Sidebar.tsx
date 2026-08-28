"use client";

import { useFolders } from "@/app/_lib/folder-context";
import Link from "next/link";
import FolderList from "./FolderList";
import LogoutButton from "./LogoutButton";

type SidebarProps = {
  activeFolderId?: string;
};

export default function Sidebar({ activeFolderId }: SidebarProps) {
  const { folders } = useFolders();
  const isAllActive = activeFolderId === undefined;

  return (
    <aside className="flex w-60 shrink-0 flex-col gap-4 border-r border-[var(--border)] p-4">
      <Link
        href="/"
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
          isAllActive
            ? "bg-[var(--hover-bg)] font-medium text-[var(--text)]"
            : "text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)]"
        }`}
      >
        <span aria-hidden>🗂️</span>
        전체
      </Link>
      <FolderList folders={folders} activeFolderId={activeFolderId} />
      <LogoutButton />
    </aside>
  );
}
