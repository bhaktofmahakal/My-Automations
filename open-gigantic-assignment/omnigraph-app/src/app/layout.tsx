import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OmniGraph Studio — Multi-Agent Graph-Traversal & TokenFold Workspace',
  description:
    'Real-time collaborative multi-agent IDE for Open Gigantic (Superbrain), operationalizing TokenFold Context Compression, ObjectGraph (.og) Typed Traversal, and PSMAS Circular Manifold Scheduling.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="h-full w-full bg-[#08090d] text-white overflow-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
