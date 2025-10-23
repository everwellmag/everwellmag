// src/app/[category]/layout.tsx
// ✅ Chỉ wrap children, không fetch để tránh trùng logic
import { ReactNode } from 'react';

export default function CategoryLayout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}