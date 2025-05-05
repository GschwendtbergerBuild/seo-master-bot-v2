'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ChatIndexPage() {
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    fetch('/api/chat')
      .then((res) => res.json())
      .then(setChats)
      .catch(console.error);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Deine Chats</h1>
      <ul className="space-y-2">
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link
              href={`/chat/${chat.id}`}
              className="text-blue-600 hover:underline"
            >
              {chat.title || chat.id}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={async () => {
          const id = crypto.randomUUID();
          await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id,
              message: { id: crypto.randomUUID(), parts: [''] },
              selectedChatModel: 'chat-model-default',
              selectedVisibilityType: 'public',
            }),
          });
          window.location.href = `/chat/${id}`;
        }}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded"
      >
        Neuen Chat starten
      </button>
    </main>
  );
}
