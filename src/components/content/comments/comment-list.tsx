import { Comment } from '@/lib/types/comment';

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-4">
            {comments.length === 0 ? (
                <p className="italic" style={{ color: 'var(--text-secondary)' }}>No comments yet. Be the first to share your thoughts!</p>
            ) : (
                comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="p-4 rounded-lg shadow-sm border"
                        style={{ backgroundColor: 'var(--card-bg)', border: 'none' }}
                    >
                        <div className="flex items-start space-x-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                                style={{ backgroundColor: 'var(--placeholder-bg)', color: 'var(--link-color)' }}
                            >
                                {comment.author.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-semibold" style={{ color: 'var(--foreground)' }}>{comment.author.name}</p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                        {formatDate(comment.createdAt)}
                                    </p>
                                </div>
                                <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>{comment.content}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}