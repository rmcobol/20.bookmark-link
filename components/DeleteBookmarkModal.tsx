"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import { createPortal } from "react-dom";

type DeleteBookmarkModalProps = {
  bookmarkId: string;
  bookmarkTitle: string;
  onClose: () => void;
};

export default function DeleteBookmarkModal({
  bookmarkId,
  bookmarkTitle,
  onClose,
}: DeleteBookmarkModalProps) {
  const { deleteBookmark } = useBookmarks();

  const handleDelete = () => {
    deleteBookmark(bookmarkId);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">링크 삭제</h2>
        <p className="text-sm leading-relaxed text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{bookmarkTitle}</span> 링크를
          삭제하시겠습니까?
          <br />
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-9 rounded-md bg-[var(--error)] px-4 text-sm font-medium text-white transition-colors duration-150 hover:opacity-90"
          >
            삭제
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
