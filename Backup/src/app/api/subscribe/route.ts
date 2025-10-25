import { NextRequest, NextResponse } from 'next/server';
import { fetchStrapi } from '@/lib/api/strapi/fetch-strapi';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const response = await fetchStrapi('subscribers', {
            method: 'POST',
            body: JSON.stringify({ data: { email } }),
        });

        return NextResponse.json({ message: 'Subscribed successfully', data: response }, { status: 201 });
    } catch (error) {
        console.error('Error subscribing:', error);
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}