export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long', // October
        day: 'numeric', // 22
    });
}
