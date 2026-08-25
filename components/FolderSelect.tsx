import type { Folder } from "@/app/_lib/types";

type FolderSelectProps = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: FolderSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folder" className="text-sm font-medium text-black dark:text-zinc-50">
        폴더
      </label>
      <select
        id="folder"
        name="folderId"
        defaultValue=""
        className="h-10 rounded-md border border-black/[.08] bg-transparent px-3 text-sm text-black outline-none focus:border-black/[.3] dark:border-white/[.145] dark:text-zinc-50 dark:focus:border-white/[.4]"
      >
        <option value="" disabled>
          폴더 선택
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
