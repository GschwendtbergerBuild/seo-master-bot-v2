// app/chat/embed/page.tsx
'use client';

import { ChatClient } from '../[id]/ChatClient';

export default function EmbedPage() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ChatClient chatId="public" />
    </div>
  );
}
