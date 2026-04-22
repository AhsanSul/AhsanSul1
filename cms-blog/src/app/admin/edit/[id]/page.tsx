import prisma from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return notFound();

  async function update(formData: FormData) {
    "use server";
    const title = String(formData.get("title") || "");
    const slug = String(formData.get("slug") || "");
    const content = String(formData.get("content") || "");
    const published = Boolean(formData.get("published"));
    await prisma.post.update({ where: { id: postId }, data: { title, slug, content, published } });
    redirect("/admin");
  }

  async function remove() {
    "use server";
    await prisma.post.delete({ where: { id: postId } });
    redirect("/admin");
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form action={update} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" defaultValue={post.title} className="w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" defaultValue={post.slug} className="w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" rows={10} defaultValue={post.content} className="w-full rounded border px-3 py-2" required />
        </div>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="published" defaultChecked={post.published} /> Published
        </label>
        <div className="pt-2 flex gap-3">
          <button className="rounded bg-black text-white px-4 py-2">Save</button>
          <button formAction={remove} className="rounded bg-red-600 text-white px-4 py-2">Delete</button>
        </div>
      </form>
    </main>
  );
}
