// app/chat/actions.ts
import { v4 as uuid } from 'uuid';

// Einfache In‑Memory‑Speicherung
let chats: { id: string; title: string }[] = [];

/**
 * Liefert alle Chats
 */
export async function listChats() {
  return chats;
}

/**
 * Legt einen neuen Chat an und gibt ihn zurück
 */
export async function createChat() {
  const newChat = { id: uuid(), title: 'Neuer Chat' };
  chats.push(newChat);
  return newChat;
}
