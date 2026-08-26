import Link from "next/link";
import NewFolderButton from "./NewFolderButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--background)]/80 px-4 backdrop-blur-sm">
      <span className="text-base font-semibold tracking-tight text-[var(--text)]">
        🔖 북마크 링크
      </span>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <Link
          href="/new"
          className="flex h-9 items-center gap-1.5 rounded-md bg-[var(--accent)] px-4 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
        >
          <span aria-hidden>+</span>새 링크
        </Link>
      </div>
    </header>
  );
}
