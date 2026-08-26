"use client";

import { useState } from "react";
import NewFolderModal from "./NewFolderModal";

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 items-center gap-1.5 rounded-md border border-[var(--border)] px-4 text-sm font-medium text-[var(--text)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
      >
        <span aria-hidden>+</span>새 폴더
      </button>
      {isOpen && <NewFolderModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
