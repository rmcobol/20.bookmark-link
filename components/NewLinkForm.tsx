"use client";

import { useBookmarks } from "@/app/_lib/bookmark-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FolderSelect from "./FolderSelect";
import LinkUrlInput from "./LinkUrlInput";

type OgResponse = {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  error?: string;
};

export default function NewLinkForm() {
  const router = useRouter();
  const { addBookmark } = useBookmarks();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = String(formData.get("url") ?? "").trim();
    const folderId = String(formData.get("folderId") ?? "");

    if (!url) {
      setError("링크 주소를 입력해주세요.");
      return;
    }
    if (!folderId) {
      setError("폴더를 선택해주세요.");
      return;
    }

    setError(null);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const og: OgResponse = await response.json();

      if (!response.ok) {
        setError(og.error ?? "링크 정보를 가져오지 못했습니다.");
        setIsSaving(false);
        return;
      }

      addBookmark({
        url: og.url ?? url,
        folderId,
        title: og.title || url,
        description: og.description ?? "",
        thumbnail: og.image,
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 다시 시도해주세요.");
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <h2 className="text-base font-semibold text-[var(--text)]">새 링크 추가</h2>
      <LinkUrlInput />
      <FolderSelect />
      {error && <p className="text-xs text-[var(--error)]">{error}</p>}
      <button
        type="submit"
        disabled={isSaving}
        className="h-10 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isSaving ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
