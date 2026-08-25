export default function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="link-url" className="text-sm font-medium text-[var(--text)]">
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        placeholder="https://example.com"
        className="h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
      />
    </div>
  );
}
