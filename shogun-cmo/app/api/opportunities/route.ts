import { NextResponse } from "next/server";
import { listOpportunities, seedActionForOpportunity } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ opportunities: listOpportunities() }); }
export async function POST(request: Request) { try { const body = await request.json(); return NextResponse.json({ actionId: seedActionForOpportunity(String(body.opportunityId), String(body.channel ?? "community")) }, { status: 201 }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to stage action" }, { status: 400 }); } }
