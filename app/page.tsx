// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Willkommen zum AI‑Chat</h1>
      <Link href="/chat">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Zum Chat
        </button>
      </Link>
    </main>
  );
}
