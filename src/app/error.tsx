'use client';

import { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log lỗi để debug, có thể gửi lên server analytics sau
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">Something went wrong!</h1>
                <p className="text-gray-600 mt-2">{error.message || 'An unexpected error occurred.'}</p>
                <button
                    onClick={reset}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}