import type { Bookmark } from "@/app/_lib/types";

type BookmarkCardProps = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  let hostname = bookmark.url;
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    // 잘못된 형식의 URL이면 원본 문자열을 그대로 보여준다.
  }

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors duration-150 hover:bg-[var(--hover-bg)]"
    >
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
    </a>
  );
}
