import { NextRequest, NextResponse } from 'next/server';
import { CMS_DOMAIN } from '@/lib/config';
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log('Received POST comment payload:', JSON.stringify(body, null, 2));

        // Kiểm tra payload
        if (!body.data || !body.data.content || !body.data.author || (!body.data.article && !body.data.product)) {
            return NextResponse.json(
                { error: 'Invalid payload', details: 'Missing required fields: content, author, or article/product' },
                { status: 400 }
            );
        }

        // Chặn bình luận chứa liên kết
        const urlPattern = /(https?:\/\/|www\.)\S+/i;
        if (urlPattern.test(body.data.content)) {
            return NextResponse.json(
                { error: 'Invalid comment', details: 'Comments containing links are not allowed' },
                { status: 400 }
            );
        }

        // Proxy tới Strapi
        const response = await fetch(`${CMS_DOMAIN}/api/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('Strapi error:', data);
            return NextResponse.json(
                { error: 'Failed to post comment', details: data.error?.message || 'Unknown error' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('POST comment error:', error);
        return NextResponse.json(
            { error: 'Failed to post comment', details: (error as Error).message },
            { status: 400 }
        );
    }
}