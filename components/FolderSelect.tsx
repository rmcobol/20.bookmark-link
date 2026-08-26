"use client";

import { useFolders } from "@/app/_lib/folder-context";

export default function FolderSelect() {
  const { folders } = useFolders();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
        폴더
      </label>
      <div className="relative">
        <select
          id="folder"
          name="folderId"
          defaultValue=""
          className="h-10 w-full appearance-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 pr-8 text-sm text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
        >
          <option value="" disabled>
            폴더 선택
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          fill="none"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-sub)]"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
