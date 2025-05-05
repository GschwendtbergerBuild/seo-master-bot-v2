// app/chat/[id]/layout.tsx
import React from 'react';

export default function ChatDetailLayout({
  children,
}: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-white p-8">{children}</div>;
}
