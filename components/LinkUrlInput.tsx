export default function LinkUrlInput() {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="link-url" className="text-sm font-medium text-black dark:text-zinc-50">
        링크 주소
      </label>
      <input
        id="link-url"
        name="url"
        type="url"
        placeholder="https://example.com"
        className="h-10 rounded-md border border-black/[.08] bg-transparent px-3 text-sm text-black outline-none placeholder:text-zinc-400 focus:border-black/[.3] dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/[.4]"
      />
    </div>
  );
}
