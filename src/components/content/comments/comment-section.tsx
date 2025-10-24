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
            className="mt-12 max-w-3xl mx-auto rounded-lg shadow-md p-6"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--foreground)' }}
        >
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Comments ({totalComments})</h2>
            <CommentForm articleSlug={articleSlug} productSlug={productSlug} />
            <CommentList comments={comments} />
            <Pagination
                currentPage={currentPage}
                totalComments={totalComments}
                pageSize={pageSize}
                baseUrl={baseUrl}
            />
        </section>
    );
}