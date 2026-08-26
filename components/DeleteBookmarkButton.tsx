"use client";

import { useState } from "react";
import DeleteBookmarkModal from "./DeleteBookmarkModal";

type DeleteBookmarkButtonProps = {
  bookmarkId: string;
  bookmarkTitle: string;
};

export default function DeleteBookmarkButton({
  bookmarkId,
  bookmarkTitle,
}: DeleteBookmarkButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${bookmarkTitle} 링크 삭제`}
        onClick={() => setIsOpen(true)}
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-sub)] transition-colors duration-150 hover:border-[var(--error)] hover:text-[var(--error)]"
      >
        <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="M4.5 6h11M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m-6 0 .6 9.4A1.5 1.5 0 0 0 8.1 17h3.8a1.5 1.5 0 0 0 1.5-1.6L14 6M8.5 9.5v4M11.5 9.5v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <DeleteBookmarkModal
          bookmarkId={bookmarkId}
          bookmarkTitle={bookmarkTitle}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
