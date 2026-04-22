import { cookies } from "next/headers";
import crypto from "node:crypto";

const SESSION_COOKIE = "session";
const DEFAULT_ADMIN_PASSWORD = "admin123";

export async function createSession(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
  if (password !== adminPassword) return false;

  const token = crypto.randomBytes(24).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  // In a real app we would persist sessions. For simplicity, accept any token if set.
  return true;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return Boolean(token);
}
