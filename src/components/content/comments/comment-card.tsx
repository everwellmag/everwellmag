import { Comment } from '@/lib/types/comment';

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
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
        <div className="border-b py-4 last:border-b-0" style={{ borderColor: 'var(--foreground)' }}>
            <div className="flex justify-between items-start mb-2">
                <p className="font-bold" style={{ color: 'var(--link-color)' }}>{comment.author.name}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{formatDate(comment.createdAt)}</p>
            </div>
            <p style={{ color: 'var(--foreground)' }}>{comment.content}</p>
        </div>
    );
}