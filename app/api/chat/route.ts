// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
import {
  getChatById,
  saveChat,
  getMessagesByChatId,
  saveMessages,
} from '@/lib/db/queries';
import {
  appendClientMessage,
  appendResponseMessages,
  createDataStream,
  smoothStream,
  streamText,
} from 'ai';
import { systemPrompt } from '@/lib/ai/prompts';
import { myProvider } from '@/lib/ai/providers';
import { generateUUID, getTrailingMessageId } from '@/lib/utils';

export async function POST(request: Request) {
  const { id, message, selectedChatModel, selectedVisibilityType } =
    await request.json();

  let chat = await getChatById({ id });

  if (!chat) {
    await saveChat({
      id,
      userId: 'public', // nur Dummy
      title: 'Öffentlicher Chat',
      visibility: selectedVisibilityType,
    });
  }

  const prev = await getMessagesByChatId({ id });

  const messages = appendClientMessage({ messages: prev, message });

  await saveMessages({
    messages: [
      {
        chatId: id,
        id: message.id,
        role: 'user',
        parts: message.parts,
        attachments: message.experimental_attachments ?? [],
        createdAt: new Date(),
      },
    ],
  });

  const streamId = uuid();
  const stream = createDataStream({
    execute: (dataStream) => {
      const result = streamText({
        model: myProvider.languageModel(selectedChatModel),
        system: systemPrompt({ selectedChatModel, requestHints: {} }),
        messages,
        experimental_transform: smoothStream({ chunking: 'word' }),
        experimental_generateMessageId: generateUUID,
      });
      result.consumeStream();
      result.mergeIntoDataStream(dataStream, { sendReasoning: true });
    },
  });
  return new Response(await stream.stream(), {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const chatId = url.searchParams.get('chatId');
  if (!chatId) return new Response('chatId fehlt', { status: 400 });

  const messages = await getMessagesByChatId({ id: chatId });
  return NextResponse.json(messages);
}
