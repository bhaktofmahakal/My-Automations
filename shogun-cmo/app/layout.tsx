import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "ShogunCMO", description: "Memory-first growth operating system for ShogunAI" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
