// src/app/comment-page/page.tsx
import { Suspense } from 'react';
import CommentPageContent from '@/app/components/CommentPageContent';

export default function CommentPage() {
    return (
        <Suspense fallback={<div>読み込み中...</div>}>
            <CommentPageContent />
        </Suspense>
    );
}