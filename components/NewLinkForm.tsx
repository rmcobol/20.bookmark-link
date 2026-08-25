import type { Folder } from "@/app/_lib/types";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

type NewLinkFormProps = {
  folders: Folder[];
};

export default function NewLinkForm({ folders }: NewLinkFormProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-base font-semibold text-[var(--text)]">새 링크 추가</h2>
      <LinkUrlInput />
      <FolderSelect folders={folders} />
      <button
        type="button"
        className="h-10 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)]"
      >
        저장
      </button>
    </div>
  );
}
