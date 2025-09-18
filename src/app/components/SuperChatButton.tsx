"use client";

import  React, { useCallback, useState, useRef } from 'react';

interface SuperChatButtonProps {
    onSuperChat: (price: number, message: string) => void;
}

export default function SuperChatButton({ onSuperChat }: SuperChatButtonProps) {
  const [price, setPrice] = useState<number | ''>('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuperChat = useCallback(() => {
    if (price && price > 0) {
      onSuperChat(Number(price), message);
      setPrice('');
      setMessage('');
      setIsModalOpen(false);
    }
  }, [price, message, onSuperChat]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
        aria-label="スーパーチャット"
        title="スーパーチャット"
      >
        ¥
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">投げ銭する</h2>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">金額 (円)</label>
              <input
                type="number"
                id="price"
                value={price}
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
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                maxLength={50}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleSuperChat}
                disabled={!price || price <= 0}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 disabled:opacity-50"
              >
                投げ銭する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}