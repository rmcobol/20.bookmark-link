"use client";

import { useFolders } from "@/app/_lib/folder-context";
import { useState } from "react";
import { createPortal } from "react-dom";

type NewFolderModalProps = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: NewFolderModalProps) {
  const { addFolder } = useFolders();
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || isSaving) return;
    setIsSaving(true);
    try {
      await addFolder(name);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/40">
      <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-base font-semibold text-[var(--text)]">새 폴더</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            id="folder-name"
            type="text"
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="폴더 이름을 입력하세요"
            className="h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
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
            disabled={!name.trim() || isSaving}
            className="h-9 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
