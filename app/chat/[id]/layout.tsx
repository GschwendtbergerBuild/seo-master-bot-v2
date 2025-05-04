// app/chat/[id]/layout.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Chat Detail',
};

export default function ChatDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <header className="mb-6 flex items-center space-x-4">
        <Link href="/chat" className="text-gray-600 hover:underline">
          ← Zurück zur Übersicht
        </Link>
        <h2 className="text-2xl font-semibold">Chat: {params.id}</h2>
      </header>
      {children}
    </main>
  );
}
