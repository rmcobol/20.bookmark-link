import type { Folder } from "@/app/_lib/types";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
      <h2 className="text-base font-semibold text-black dark:text-zinc-50">새 링크 추가</h2>
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <button
        type="button"
        className="h-10 rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        저장
      </button>
    </div>
  );
}
