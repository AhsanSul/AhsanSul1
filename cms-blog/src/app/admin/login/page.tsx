"use server";

import { redirect } from "next/navigation";
import { createSession, isAuthenticated } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  async function login(formData: FormData) {
    "use server";
    const password = String(formData.get("password") || "");
    const ok = await createSession(password);
    if (!ok) {
      redirect("/admin/login?error=1");
    }
    redirect("/admin");
  }

  const hasError = Boolean(searchParams && (searchParams["error"] ?? false));

  return (
    <main className="mx-auto max-w-sm px-6 py-10">
      <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
      {hasError && (
        <div className="mb-4 text-sm text-red-600">Invalid password</div>
      )}
      <form action={login} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>
        <button className="rounded bg-black text-white px-4 py-2">Login</button>
      </form>
      <p className="mt-4 text-sm text-gray-500">Default password is admin123. Override with ADMIN_PASSWORD in .env.</p>
    </main>
  );
}
