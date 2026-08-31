"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Folder } from "./types";

type FolderContextValue = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  renameFolder: (id: string, name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextValue | null>(null);

type FolderProviderProps = {
  initialFolders?: Folder[];
  children: React.ReactNode;
};

export function FolderProvider({ initialFolders = [], children }: FolderProviderProps) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUserId(data.user?.id ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!userId) {
      setFolders([]);
      return;
    }

    let active = true;

    supabase
      .from("folders")
      .select("id, name")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setFolders(data.map((row) => ({ id: String(row.id), name: row.name })));
      });

    return () => {
      active = false;
    };
  }, [supabase, userId]);

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

  const renameFolder = useCallback(
    async (id: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;

      const { error } = await supabase
        .from("folders")
        .update({ name: trimmed })
        .eq("id", Number(id));

      if (error) return;

      setFolders((prev) =>
        prev.map((folder) => (folder.id === id ? { ...folder, name: trimmed } : folder)),
      );
    },
    [supabase],
  );

  const deleteFolder = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("folders").delete().eq("id", Number(id));

      if (error) return;

      setFolders((prev) => prev.filter((folder) => folder.id !== id));
    },
    [supabase],
  );

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
