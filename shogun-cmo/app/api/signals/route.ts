import { NextResponse } from "next/server";
import { createManualSignal, listSignals } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ signals: listSignals() }); }
export async function POST(request: Request) { try { return NextResponse.json(createManualSignal(await request.json()), { status: 201 }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to ingest signal" }, { status: 400 }); } }
