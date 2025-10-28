'use client';
import { useState, useRef } from 'react';
import { CMS_DOMAIN } from '@/lib/config';
import SimpleMathCaptcha from '@/components/ui/simple-math-captcha';

interface CommentFormProps {
    articleSlug?: string;
    productSlug?: string;
}

export default function CommentForm({ articleSlug, productSlug }: CommentFormProps) {
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [mathOk, setMathOk] = useState(false);

    // Dùng ref để gọi reset captcha từ bên ngoài
    const captchaRef = useRef<{ reset: () => void } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!mathOk) {
            setError('Please solve the math question first.');
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            let documentId: string;
            let entityType: 'article' | 'product';

            if (articleSlug) {
                entityType = 'article';
                const response = await fetch(
                    `${CMS_DOMAIN}/api/articles?filters[slug][$eq]=${articleSlug}&fields[0]=documentId`
                );
                const data = await response.json();
                documentId = data.data?.[0]?.documentId;
            } else if (productSlug) {
                entityType = 'product';
                const response = await fetch(
                    `${CMS_DOMAIN}/api/products?filters[slug][$eq]=${productSlug}&fields[0]=documentId`
                );
                const data = await response.json();
                documentId = data.data?.[0]?.documentId;
            } else {
                throw new Error('No article or product slug provided');
            }

            if (!documentId) {
                throw new Error(`${entityType} not found`);
            }

            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        content,
                        author: { name: authorName, email: authorEmail || null },
                        [entityType]: documentId,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to post comment');
            }

            // === RESET SAU KHI GỬI THÀNH CÔNG ===
            setContent('');
            setAuthorName('');
            setAuthorEmail('');
            setMathOk(false);
            captchaRef.current?.reset();           // <-- reset captcha
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Error posting comment: ' + (err as Error).message);
            console.error('POST comment error:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 rounded-lg border"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
            {success && (
                <p
                    className="p-3 rounded mb-4 transition-opacity duration-300"
                    style={{ color: '#10B981', backgroundColor: 'var(--placeholder-bg)' }}
                >
                    Comment posted successfully!
                </p>
            )}
            {error && (
                <p
                    className="p-3 rounded mb-4 transition-opacity duration-300"
                    style={{ color: '#EF4444', backgroundColor: 'var(--placeholder-bg)' }}
                >
                    {error}
                </p>
            )}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 border rounded-lg resize-y focus-glow shadow-none"
                style={{ borderColor: 'var(--border-color)' }}
                rows={5}
                required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full p-3 border rounded-lg focus-glow shadow-none"
                    style={{ borderColor: 'var(--border-color)' }}
                    required
                />
                <input
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    placeholder="Your email (optional)"
                    className="w-full p-3 border rounded-lg focus-glow shadow-none"
                    style={{ borderColor: 'var(--border-color)' }}
                />
            </div>

            {/* CAPTCHA + NÚT – CĂN PHẢI */}
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <SimpleMathCaptcha ref={captchaRef} onVerify={setMathOk} />
                <button
                    type="submit"
                    disabled={submitting || !mathOk}
                    className="px-6 py-2 rounded-lg text-white font-semibold transition duration-200 btn-gradient disabled:bg-[var(--placeholder-bg)] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {submitting ? 'Submitting...' : 'Post Comment'}
                </button>
            </div>
        </form>
    );
}