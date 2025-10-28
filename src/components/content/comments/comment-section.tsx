import { Comment } from '@/lib/types/comment';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import Pagination from '@/components/ui/pagination';

interface CommentSectionProps {
    articleSlug?: string;
    productSlug?: string;
    comments: Comment[];
    totalComments?: number;
    currentPage?: number;
}

export default function CommentSection({
    articleSlug,
    productSlug,
    comments,
    totalComments = comments.length,
    currentPage = 1,
}: CommentSectionProps) {
    const baseUrl = articleSlug ? `/article/${articleSlug}` : `/product/${productSlug}`;
    const pageSize = 10;

    return (
        <section
            className="mt-12 max-w-4xl mx-auto rounded-lg shadow-md px-0 pb-6"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        >
            <h2 className="text-2xl font-bold mb-6 px-6 pt-6" style={{ color: 'var(--foreground)' }}>Comments ({totalComments})</h2>
            <CommentForm articleSlug={articleSlug} productSlug={productSlug} />
            <CommentList comments={comments} />
            <Pagination
                currentPage={currentPage}
                totalItems={totalComments}
                pageSize={pageSize}
                baseUrl={baseUrl}
            />
        </section>
    );
}