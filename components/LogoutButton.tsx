"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="mt-auto flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text-sub)] transition-colors duration-150 hover:bg-[var(--hover-bg)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span aria-hidden>🚪</span>
      {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}
