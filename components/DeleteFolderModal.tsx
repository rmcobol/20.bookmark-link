"use client";

import { useFolders } from "@/app/_lib/folder-context";
import { useState } from "react";
import { createPortal } from "react-dom";

type DeleteFolderModalProps = {
  folderId: string;
  folderName: string;
  onClose: () => void;
};

export default function DeleteFolderModal({
  folderId,
  folderName,
  onClose,
}: DeleteFolderModalProps) {
  const { deleteFolder } = useFolders();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteFolder(folderId);
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 삭제</h2>
        <p className="text-sm leading-relaxed text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{folderName}</span> 폴더를
          삭제하시겠습니까?
          <br />
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-9 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-9 rounded-md bg-[var(--error)] px-4 text-sm font-medium text-white transition-colors duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
