"use client";

import type { Bookmark } from "@/app/_lib/types";
import { useState } from "react";
import EditBookmarkModal from "./EditBookmarkModal";

type EditBookmarkButtonProps = {
  bookmark: Bookmark;
};

export default function EditBookmarkButton({ bookmark }: EditBookmarkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmark.title} 링크 수정`}
        onClick={() => setIsOpen(true)}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-sub)] transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
      >
        <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="M13.5 3.5a1.5 1.5 0 0 1 2.12 0l.88.88a1.5 1.5 0 0 1 0 2.12l-8.5 8.5-3.5.88.88-3.5 8.12-8.88Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && <EditBookmarkModal bookmark={bookmark} onClose={() => setIsOpen(false)} />}
    </>
  );
}
