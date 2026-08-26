"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Folder } from "./types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders: Folder[];
  children: React.ReactNode;
};

export function FolderProvider({ initialFolders, children }: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);

  const addFolder = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) => [
      ...prev,
      { id: `folder-${Date.now()}`, name: trimmed, count: 0 },
    ]);
  }, []);

  const renameFolder = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setFolders((prev) =>
      prev.map((folder) => (folder.id === id ? { ...folder, name: trimmed } : folder)),
    );
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
  }, []);

  const value = useMemo(
    () => ({ folders, addFolder, renameFolder, deleteFolder }),
    [folders, addFolder, renameFolder, deleteFolder],
  );

  return <FolderContext.Provider value={value}>{children}</FolderContext.Provider>;
}

export function useFolders() {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolders must be used within a FolderProvider");
  }
  return context;
}
