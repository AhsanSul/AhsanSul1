import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, createdAt: true },
  });

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-6 text-gray-600">No posts yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-4">
              <Link href={`/post/${post.slug}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </Link>
              <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
