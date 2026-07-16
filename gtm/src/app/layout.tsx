import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { CommandMenu } from '@/components/command-menu';
import './globals.css';

// JSON-LD structured data for SEO
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GTM Skills',
  url: 'https://github.com/bhaktofmahakal/My-Automations',
  description: 'The open-source operating system for agentic GTM. Prompts, agent workflows, tools, browser extension, and API. Free and MIT licensed.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://github.com/bhaktofmahakal/My-Automations/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GTM Skills',
  url: 'https://github.com/bhaktofmahakal/My-Automations',
  logo: 'https://github.com/bhaktofmahakal/My-Automations/logo.svg',
  sameAs: [
    'https://github.com/bhaktofmahakal/My-Automations/tree/main/gtm',
  ],
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GTM Skills | The Agentic GTM Operating System',
  description: 'The open-source operating system for agentic GTM. Prompts, agent workflows, tools, browser extension, and API for B2B sales teams. Free and MIT licensed.',
  keywords: 'gtm skills, agentic gtm, agentic sales, agentic bdr, gtm operating system, sales agents, b2b sales tools, mcp server, openclaw, sales workflows',
  authors: [{ name: 'Utsav Mishra' }],
  manifest: '/manifest.json',
  openGraph: {
    title: 'GTM Skills | The Agentic GTM Operating System',
    description: 'The open-source operating system for agentic GTM. Prompts, agent workflows, tools, and API for B2B sales.',
    url: 'https://github.com/bhaktofmahakal/My-Automations',
    siteName: 'GTM Skills',
    type: 'website',
    images: [
      {
        url: 'https://github.com/bhaktofmahakal/My-Automations/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GTM Skills - The Agentic GTM Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  metadataBase: new URL('https://github.com/bhaktofmahakal/My-Automations'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CommandMenu />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
