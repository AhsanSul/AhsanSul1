import Link from "next/link";
import { isAuthenticated, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    await destroySession();
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <nav className="space-x-4">
          <Link href="/admin" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link href="/" className="text-gray-600 hover:underline">View site</Link>
        </nav>
        <form action={logout}>
          <button className="text-sm text-red-600 hover:underline">Logout</button>
        </form>
      </header>
      {children}
    </div>
  );
}