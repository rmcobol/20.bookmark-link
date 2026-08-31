"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Bookmark } from "./types";

type NewBookmarkInput = {
  url: string;
  folderId: string;
  title: string;
  description: string;
  thumbnail?: string;
};

type BookmarkUpdateInput = {
  folderId: string;
  title: string;
  description: string;
};

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => Promise<void>;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

type BookmarkProviderProps = {
  initialBookmarks?: Bookmark[];
  children: React.ReactNode;
};

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toBookmark(row: LinkRow): Bookmark {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? "",
    description: row.description ?? "",
    folderId: row.folder_id != null ? String(row.folder_id) : "",
    thumbnail: row.thumbnail_url ?? undefined,
  };
}

export function BookmarkProvider({ initialBookmarks = [], children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
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
      setBookmarks([]);
      return;
    }

    let active = true;

    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!active || !data) return;
        setBookmarks((data as LinkRow[]).map(toBookmark));
      });

    return () => {
      active = false;
    };
  }, [supabase, userId]);

  const addBookmark = useCallback(
    async (input: NewBookmarkInput) => {
      const { data, error } = await supabase
        .from("links")
        .insert({
          url: input.url,
          title: input.title,
          description: input.description,
          thumbnail_url: input.thumbnail ?? null,
          folder_id: input.folderId ? Number(input.folderId) : null,
        })
        .select("id, url, title, description, thumbnail_url, folder_id")
        .single();

      if (error || !data) throw error ?? new Error("링크를 저장하지 못했습니다.");

      setBookmarks((prev) => [...prev, toBookmark(data as LinkRow)]);
    },
    [supabase],
  );

  const updateBookmark = useCallback(
    async (id: string, input: BookmarkUpdateInput) => {
      const title = input.title.trim();
      if (!title || !input.folderId) return;

      const { error } = await supabase
        .from("links")
        .update({
          title,
          description: input.description,
          folder_id: Number(input.folderId),
        })
        .eq("id", Number(id));

      if (error) return;

      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.id === id
            ? { ...bookmark, folderId: input.folderId, title, description: input.description }
            : bookmark,
        ),
      );
    },
    [supabase],
  );

  const deleteBookmark = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("links").delete().eq("id", Number(id));

      if (error) return;

      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    },
    [supabase],
  );

  const value = useMemo(
    () => ({ bookmarks, addBookmark, updateBookmark, deleteBookmark }),
    [bookmarks, addBookmark, updateBookmark, deleteBookmark],
  );

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
