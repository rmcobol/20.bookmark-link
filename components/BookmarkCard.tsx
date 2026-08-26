"use client";

import type { Bookmark } from "@/app/_lib/types";
import { useState } from "react";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import EditBookmarkButton from "./EditBookmarkButton";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false);

  let hostname = bookmark.url;
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    // 잘못된 형식의 URL이면 원본 문자열을 그대로 보여준다.
  }

  const showThumbnail = Boolean(bookmark.thumbnail) && !thumbnailFailed;

  return (
    <div className="group relative">
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-colors duration-150 hover:bg-[var(--hover-bg)]"
      >
        {showThumbnail && (
          // eslint-disable-next-line @next/next/no-img-element -- 외부 임의 도메인 썸네일이라 next/image 사용 불가
          <img
            src={bookmark.thumbnail}
            alt=""
            onError={() => setThumbnailFailed(true)}
            className="h-32 w-full shrink-0 object-cover"
          />
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[var(--hover-bg)] text-xs">
              🔗
            </span>
            <span className="truncate text-xs text-[var(--text-sub)]">{hostname}</span>
          </div>
          <h3 className="line-clamp-1 text-sm font-medium text-[var(--text)]">
            {bookmark.title}
          </h3>
          <p className="line-clamp-2 text-xs text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        </div>
      </a>
      <div className="pointer-events-none absolute top-2 right-2 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
        <EditBookmarkButton bookmark={bookmark} />
        <DeleteBookmarkButton bookmarkId={bookmark.id} bookmarkTitle={bookmark.title} />
      </div>
    </div>
  );
}
