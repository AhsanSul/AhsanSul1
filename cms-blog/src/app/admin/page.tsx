import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminIndex() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, published: true, createdAt: true },
  });

  return (
    <main>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link href="/admin/new" className="rounded bg-black text-white px-3 py-2">New Post</Link>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="py-2">{p.title}</td>
              <td className="text-gray-500">{p.slug}</td>
              <td>{p.published ? "Published" : "Draft"}</td>
              <td className="text-gray-500">{new Date(p.createdAt).toLocaleString()}</td>
              <td className="text-right">
                <Link href={`/admin/edit/${p.id}`} className="text-blue-600 hover:underline mr-3">Edit</Link>
                <Link href={`/post/${p.slug}`} className="text-gray-600 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
