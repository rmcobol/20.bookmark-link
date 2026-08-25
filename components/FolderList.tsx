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
              <span className="text-xs text-[var(--text-sub)]">{folder.count}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
