import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export function Button({ children, className = '', type = 'button', ...props }: ButtonProps) {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}