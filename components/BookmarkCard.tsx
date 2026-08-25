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
      className="flex flex-col gap-2 rounded-xl border border-black/[.08] p-4 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.3]"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-black/[.06] text-xs dark:bg-white/[.08]">
          🔗
        </span>
        <span className="truncate text-xs text-zinc-500 dark:text-zinc-400">{hostname}</span>
      </div>
      <h3 className="line-clamp-1 text-sm font-medium text-black dark:text-zinc-50">
        {bookmark.title}
      </h3>
      <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
        {bookmark.description}
      </p>
    </a>
  );
}
