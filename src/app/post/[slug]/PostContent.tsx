'use client';

import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/imageUrl';
import Image from 'next/image';

// Định nghĩa interface cho BodyBlock (dựa trên PortableText của Sanity)
interface BodyBlock {
  _type: string;
  children?: { _type: string; text: string; marks?: string[] }[];
  style?: string;
  asset?: { _ref: string };
  alt?: string;
}

// Định nghĩa interface cho Post và ImageValue
interface Post {
  title: string;
  body: BodyBlock[];
}

interface ImageValue {
  asset: { _ref: string };
  alt?: string;
}

export default function PostContent({ post }: { post: Post }) {
  const components = {
    types: {
      image: ({ value }: { value: ImageValue }) => (
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'image'}
          width={800}
          height={600}
          className="my-4 rounded-md"
        />
      ),
    },
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <PortableText value={post.body} components={components} />
    </main>
  );
}