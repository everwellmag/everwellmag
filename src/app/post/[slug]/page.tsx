// src/app/post/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { fetchFromStrapi } from '@/lib/strapi';
import ReactMarkdown from 'react-markdown';

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const { data: posts } = await fetchFromStrapi('posts');
  return posts.map((post: any) => ({
    slug: post.attributes?.slug || post.id.toString(), // Fallback nếu slug undefined
  }));
}

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = params;
  const res = await fetchFromStrapi(`posts?filters[slug][$eq]=${slug}`);

  if (!res?.data?.length) {
    const resById = await fetchFromStrapi(`posts/${slug}`);
    if (!resById?.data) return notFound();
    return renderPost(resById.data);
  }

  return renderPost(res.data[0]);
}

function renderPost(post: any) {
  const { attributes } = post || {}; // Fallback nếu post undefined
  const { title, content } = attributes || {};
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{title || 'Untitled'}</h1>
      <ReactMarkdown className="prose max-w-none">{content || 'No content available'}</ReactMarkdown>
    </article>
  );
}