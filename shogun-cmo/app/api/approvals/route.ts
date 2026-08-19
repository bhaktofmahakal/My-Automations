import { NextResponse } from "next/server";
import { actOnApproval, listApprovals } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ actions: listApprovals() }); }
export async function POST(request: Request) { try { const body = await request.json(); return NextResponse.json(actOnApproval(String(body.actionId), body.action, body.editedPayload, body.reason)); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Approval transition failed" }, { status: 409 }); } }
