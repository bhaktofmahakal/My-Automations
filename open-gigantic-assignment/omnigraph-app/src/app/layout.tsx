import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { SafeApprovalModal } from '@/components/editor/SafeApprovalModal';

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
      <body className="h-full w-full bg-[#0d1117] text-[#e6edf3] overflow-hidden font-sans flex">
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Right Main Content Column */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
          {/* Top Application Header Bar */}
          <AppHeader />

          {/* Page Content Surface */}
          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>

          {/* Human-in-the-Loop Safe Barrier Modal */}
          <SafeApprovalModal />
        </div>
      </body>
    </html>
  );
}
