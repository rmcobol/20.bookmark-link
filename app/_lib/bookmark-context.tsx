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

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (input: NewBookmarkInput) => void;
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

  const value = useMemo(() => ({ bookmarks, addBookmark }), [bookmarks, addBookmark]);

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
