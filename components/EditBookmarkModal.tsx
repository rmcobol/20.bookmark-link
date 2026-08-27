"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import { useFolders } from "@/app/_lib/folder-context";
import type { Bookmark } from "@/app/_lib/types";
import { useState } from "react";
import { createPortal } from "react-dom";

type EditBookmarkModalProps = {
  bookmark: Bookmark;
  onClose: () => void;
};

export default function EditBookmarkModal({ bookmark, onClose }: EditBookmarkModalProps) {
  const { folders } = useFolders();
  const { updateBookmark } = useBookmarks();
  const [folderId, setFolderId] = useState(bookmark.folderId);
  const [title, setTitle] = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || isSaving) return;
    setIsSaving(true);
    try {
      await updateBookmark(bookmark.id, { folderId, title, description });
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-bookmark-folder" className="text-sm font-medium text-[var(--text)]">
            폴더
          </label>
          <div className="relative">
            <select
              id="edit-bookmark-folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="h-10 w-full appearance-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 pr-8 text-sm text-[var(--text)] outline-none transition-colors duration-150 focus:border-[var(--accent)]"
            >
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

        <div className="flex flex-col gap-2">
          <label htmlFor="edit-bookmark-title" className="text-sm font-medium text-[var(--text)]">
            제목
          </label>
          <input
            id="edit-bookmark-title"
            type="text"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="edit-bookmark-description"
            className="text-sm font-medium text-[var(--text)]"
          >
            설명
          </label>
          <textarea
            id="edit-bookmark-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            className="resize-none rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim() || isSaving}
            className="h-9 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
