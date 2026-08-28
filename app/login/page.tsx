"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "@/components/Toast";
import { createClient } from "@/utils/supabase/client";

function toKoreanMessage(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (normalized.includes("email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.";
  }
  return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canSubmit = email.trim() !== "" && password !== "" && !isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setToast(toKoreanMessage(error.message));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
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

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="h-10 rounded-md bg-[var(--accent)] text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-sm text-[var(--text-sub)]">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            회원가입
          </Link>
        </p>
      </form>
    </main>
  );
}
