"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "./types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders?: Folder[];
  children: React.ReactNode;
};

export function FolderProvider({ initialFolders = [], children }: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;

    supabase
      .from("folders")
      .select("id, name")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });

    return () => {
      active = false;
    };
  }, [supabase]);

  const addFolder = useCallback(
    async (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const { data, error } = await supabase
        .from("folders")
        .insert({ name: trimmed })
        .select("id, name")
        .single();

      if (error || !data) return;

      setFolders((prev) => [...prev, { id: String(data.id), name: data.name }]);
    },
    [supabase],
  );

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
