// src/lib/seo/generate-site-metadata.ts
import type { Metadata } from 'next';

interface MetadataOptions {
    title: string;
    description: string;
    keywords?: string[];
    openGraph?: {
        title?: string;
        description?: string;
        images?: string[];
    };
}

export function generateSiteMetadata(options: MetadataOptions): Metadata {
    return {
        title: options.title,
        description: options.description,
        keywords: options.keywords || ['health', 'wellness', 'everwell', 'magazine'],
        openGraph: {
            title: options.title,
            description: options.description,
            images: options.openGraph?.images || ['/images/og/default.jpg'],
            type: 'website',
            siteName: 'Everwell Magazine',
        },
    };
}