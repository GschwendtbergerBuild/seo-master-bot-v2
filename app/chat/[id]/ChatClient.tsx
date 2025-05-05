// app/chat/[id]/page.tsx
import ChatClient from './ChatClient';

export default function ChatPage({ params }: { params: { id: string } }) {
  return <ChatClient chatId={params.id} />;
}
