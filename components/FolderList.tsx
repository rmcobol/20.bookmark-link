import type { Folder } from "@/app/_lib/types";
import Link from "next/link";

type FolderListProps = {
  folders: Folder[];
  activeFolderId?: string;
};

export default function FolderList({ folders, activeFolderId }: FolderListProps) {
  return (
    <ul className="flex flex-col gap-1">
      {folders.map((folder) => {
        const isActive = folder.id === activeFolderId;
        return (
          <li key={folder.id}>
            <Link
              href={`/folder/${folder.id}`}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-black/[.06] font-medium text-black dark:bg-white/[.08] dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.06]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>📁</span>
                {folder.name}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">{folder.count}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
