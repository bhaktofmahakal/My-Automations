import { NextResponse } from "next/server";
import { listBrain, updateBrain } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ modules: listBrain() }); }
export async function PATCH(request: Request) { try { const body = await request.json(); return NextResponse.json({ module: updateBrain(String(body.id), String(body.content)) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update brain" }, { status: 400 }); } }
