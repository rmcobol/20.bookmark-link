import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/**
 * 로그인한 사용자만 접근할 수 있는 서버 컴포넌트에서 호출한다.
 * 비로그인 상태면 로그인 페이지로 리다이렉트한다.
 */
export async function requireUser() {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
