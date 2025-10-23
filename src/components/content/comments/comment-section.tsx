'use client';

import React, { useState } from 'react';

interface CommentSectionProps {
    contentId: number | string; // ✅ Fix: Hỗ trợ number hoặc string cho ID
    contentType: 'article' | 'product'; // ✅ Giữ union type, nhưng đảm bảo match khi gọi
}

export default function CommentSection({ contentId, contentType }: CommentSectionProps) {
    const [comments] = useState<
        { id: number; author: string; content: string; date: string }[]
    >([
        { id: 1, author: 'Everwell Reader', content: 'Bài viết rất hay!', date: '2025-10-22' },
    ]);

    return (
        <section>
            <h3 className="text-xl font-semibold mb-4">
                Bình luận ({contentType} #{contentId}) {/* ✅ Sử dụng props mới */}
            </h3>
            <ul className="space-y-3">
                {comments.map((c) => (
                    <li key={c.id} className="border rounded-lg p-3">
                        <p className="font-semibold">{c.author}</p>
                        <p className="text-gray-700">{c.content}</p>
                        <p className="text-sm text-gray-500 mt-1">{c.date}</p>
                    </li>
                ))}
            </ul>

            <form className="mt-6 border-t pt-4">
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring"
                    rows={3}
                    placeholder="Viết bình luận của bạn..."
                />
                <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:opacity-90"
                >
                    Gửi bình luận
                </button>
            </form>
        </section>
    );
}