'use client';
// app/chat/[id]/page.tsx
import { useEffect, useState, FormEvent, useRef } from 'react';
import { useParams } from 'next/navigation';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  parts: string[];
};

export default function ChatDetailPage() {
  const params = useParams();
  const chatId = params.id as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // alle Nachrichten einmalig laden
  useEffect(() => {
    fetch(`/api/chat?chatId=${chatId}`)
      .then((res) => res.json())
      .then((data: Message[]) => setMessages(data))
      .catch(console.error);
  }, [chatId]);

  // Nachricht abschicken
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value;
    if (!text) return;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: chatId,
        message: { id: crypto.randomUUID(), role: 'user', parts: [text] },
        selectedChatModel: 'gpt-4o-mini',
        selectedVisibilityType: 'private',
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // nach dem Absenden neu laden
        inputRef.current!.value = '';
        return fetch(`/api/chat?chatId=${chatId}`);
      })
      .then((r) => r.json())
      .then((msgs: Message[]) => setMessages(msgs))
      .catch(console.error);
  };

  return (
    <div className="space-y-4">
      {/* Chat-Verlauf */}
      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.role === 'user' ? 'text-right' : 'text-left text-gray-700'
            }
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'
              }`}
            >
              {msg.parts.join('')}
            </span>
          </div>
        ))}
      </div>

      {/* Eingabeformular */}
      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          ref={inputRef}
          rows={3}
          className="w-full p-2 border rounded"
          placeholder="Deine Nachricht…"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Senden
        </button>
      </form>
    </div>
  );
}
