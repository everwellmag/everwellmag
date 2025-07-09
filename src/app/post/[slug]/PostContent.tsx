'use client'

import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/imageUrl'

export default function PostContent({ post }: { post: any }) {
  const components = {
    types: {
      image: ({ value }: any) => (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || 'image'}
          className="my-4 rounded-md"
        />
      ),
    },
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <PortableText value={post.body} components={components} />
    </main>
  )
}
