"use client";

import { useState } from "react";
import EditFolderModal from "./EditFolderModal";

type EditFolderButtonProps = {
  folderId: string;
  folderName: string;
};

export default function EditFolderButton({ folderId, folderName }: EditFolderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={`${folderName} 폴더 이름 수정`}
        onClick={() => setIsOpen(true)}
        className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-sub)] transition-colors duration-150 hover:bg-[var(--border)] hover:text-[var(--text)]"
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
      {isOpen && (
        <EditFolderModal
          folderId={folderId}
          folderName={folderName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
