"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isValidPassword, sessionToken, SESSION_COOKIE } from "@/lib/auth";
import { safeNextPath } from "@/lib/nav";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!(await isValidPassword(password))) {
    redirect(`/zugang?fehler=1&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(next);
}
