"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import type { Folder } from "@/app/_lib/types";
import Link from "next/link";
import DeleteFolderButton from "./DeleteFolderButton";
import EditFolderButton from "./EditFolderButton";

type FolderListProps = {
  folders: Folder[];
  activeFolderId?: string;
};

export default function FolderList({ folders, activeFolderId }: FolderListProps) {
  const { bookmarks } = useBookmarks();

  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const isActive = folder.id === activeFolderId;
        const count = bookmarks.filter((bookmark) => bookmark.folderId === folder.id).length;

        return (
          <li key={folder.id} className="group relative">
            <Link
              href={`/folder/${folder.id}`}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-[var(--hover-bg)] font-medium text-[var(--text)]"
                  : "text-[var(--text-sub)] hover:bg-[var(--hover-bg)] hover:text-[var(--text)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>📁</span>
                {folder.name}
              </span>
              <span className="text-xs text-[var(--text-sub)] transition-opacity duration-150 group-hover:opacity-0">
                {count}
              </span>
            </Link>
            <div className="pointer-events-none absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
              <EditFolderButton folderId={folder.id} folderName={folder.name} />
              <DeleteFolderButton folderId={folder.id} folderName={folder.name} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
