"use client";

import React from 'react';

interface SuperChatButtonProps {
    onOpenModal: () => void;
}

export default function SuperChatButton({ onOpenModal }: SuperChatButtonProps) {
    return (
        <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
            aria-label="スーパーチャット"
            title="スーパーチャット"
        >
            ¥
        </button>
    );
}