import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.published) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 prose prose-neutral">
      <Link href="/" className="text-sm text-blue-600 hover:underline">
        ← Back
      </Link>
      <h1 className="!mt-2">{post.title}</h1>
      <div className="text-sm text-gray-500">
        {new Date(post.createdAt).toLocaleString()}
      </div>
      <article className="mt-6 whitespace-pre-wrap">{post.content}</article>
    </main>
  );
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}
