"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

function toKoreanMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }
  if (normalized.includes("invalid") && normalized.includes("email")) {
    return "올바른 이메일 주소를 입력해주세요.";
  }
  return "링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canSubmit = email.trim() !== "" && !isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/confirm?next=/reset-password`,
    });

    if (error) {
      setToast(toKoreanMessage(error.message));
      setIsSubmitting(false);
      return;
    }

    setIsSent(true);
    setIsSubmitting(false);
  };

  const inputClass =
    "h-10 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--text)] outline-none transition-colors duration-150 placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]";

  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--background)] px-6 py-10">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <span className="text-center text-lg font-semibold tracking-tight text-[var(--text)]">
          🔖 북마크 링크
        </span>

        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold text-[var(--text)]">비밀번호 찾기</h1>
          <p className="text-sm leading-relaxed text-[var(--text-sub)]">
            가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        {isSent && (
          <p className="text-sm leading-relaxed text-[var(--success)]">
            비밀번호 재설정 링크를 이메일로 보냈습니다. 메일함을 확인해주세요.
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-10 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
        </button>

        <p className="text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </form>
    </main>
  );
}
