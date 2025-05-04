// app/chat/layout.tsx
import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Deine Chats',
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Chat Übersicht</h1>
        <Link href="/" className="text-sm text-gray-600 hover:underline">
          ← Zurück zur Startseite
        </Link>
      </header>
      {children}
    </main>
  );
}
