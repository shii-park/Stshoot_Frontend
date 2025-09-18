"use client";

import React, { useState, useCallback } from 'react';

interface SuperChatModalProps {
    onSuperChat: (price: number, message: string) => void;
    onModalClose: () => void;
}

const SuperChatModal = ({ onSuperChat, onModalClose }: SuperChatModalProps) => {
    const [price, setPrice] = useState<number | ''>('');
    const [message, setMessage] = useState('');

    const handleSend = useCallback(() => {
        if (price && price > 0) {
            onSuperChat(Number(price), message);
        }
    }, [price, message, onSuperChat]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative z-20">
                <h2 className="text-xl font-bold mb-4">投げ銭する</h2>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">金額 (円)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        min="1"
                        max="50000"
                        placeholder='1~50000円'
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">メッセージ</label>
                    <input
                        type="text"
                        id="message"
                        value={message}
                        placeholder='20文字以内'
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        maxLength={20}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onModalClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                        キャンセル
                    </button>
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={!price || price <= 0}
                        className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:opacity-50"
                    >
                        投げ銭する
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuperChatModal;