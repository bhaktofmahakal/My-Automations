import { NextResponse } from "next/server";
import { research, ResearchUnavailableError } from "@/lib/research";
export const dynamic = "force-dynamic";
export async function POST(request: Request) { try { const body = await request.json() as { query?: string; mode?: "discovery" | "fetch" | "browser" }; if (!body.query?.trim()) return NextResponse.json({ error: "Query is required" }, { status: 400 }); return NextResponse.json({ sources: await research(body.query, body.mode ?? "discovery") }); } catch (error) { const status = error instanceof ResearchUnavailableError ? 503 : 502; return NextResponse.json({ error: error instanceof Error ? error.message : "Research failed" }, { status }); } }
