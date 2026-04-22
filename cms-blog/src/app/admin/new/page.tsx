import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default function NewPostPage() {
  async function create(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "");
    const slug = String(formData.get("slug") || "");
    const content = String(formData.get("content") || "");
    const published = Boolean(formData.get("published"));

    await prisma.post.create({ data: { title, slug, content, published } });
    redirect("/admin");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <form action={create} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" className="w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" className="w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" rows={10} className="w-full rounded border px-3 py-2" required />
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="published" /> Published
        </label>
        <div className="pt-2">
          <button className="rounded bg-black text-white px-4 py-2">Create</button>
        </div>
      </form>
    </main>
  );
}
