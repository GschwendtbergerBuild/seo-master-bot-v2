// app/layout.tsx
import './globals.css'; // <-- Relativer Pfad statt '@/globals.css'

export const metadata = {
  title: 'AI Chat',
  description: 'Einbettbarer Chat ohne Login',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
