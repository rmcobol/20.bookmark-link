"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
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
  addBookmark: (input: NewBookmarkInput) => void;
  updateBookmark: (id: string, input: BookmarkUpdateInput) => void;
  deleteBookmark: (id: string) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

type BookmarkProviderProps = {
  initialBookmarks: Bookmark[];
  children: React.ReactNode;
};

export function BookmarkProvider({ initialBookmarks, children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  const addBookmark = useCallback((input: NewBookmarkInput) => {
    setBookmarks((prev) => [...prev, { id: `bookmark-${Date.now()}`, ...input }]);
  }, []);

  const updateBookmark = useCallback((id: string, input: BookmarkUpdateInput) => {
    if (!input.title.trim() || !input.folderId) return;

    setBookmarks((prev) =>
      prev.map((bookmark) =>
        bookmark.id === id
          ? { ...bookmark, folderId: input.folderId, title: input.title.trim(), description: input.description }
          : bookmark,
      ),
    );
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
  }, []);

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
