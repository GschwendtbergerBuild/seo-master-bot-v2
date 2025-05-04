'use client';
// app/chat/page.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

type ChatSummary = { id: string; title: string };

export default function ChatIndexPage() {
  const [chats, setChats] = useState<ChatSummary[]>([]);

  useEffect(() => {
    fetch('/api/chat')
      .then((res) => res.json())
      .then((data: ChatSummary[]) => setChats(data))
      .catch(console.error);
  }, []);

  return (
    <>
      <ul className="space-y-4">
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
        onClick={() =>
          fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          })
            .then((res) => res.json())
            .then((newChat: { id: string }) => {
              window.location.href = `/chat/${newChat.id}`;
            })
        }
        className="mt-8 px-4 py-2 bg-green-600 text-white rounded"
      >
        Neuen Chat starten
      </button>
    </>
  );
}
