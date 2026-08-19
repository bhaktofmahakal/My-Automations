import { NextResponse } from "next/server";
import { createGoal, listCampaigns } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ campaigns: listCampaigns() }); }
export async function POST(request: Request) { try { const body = await request.json(); return NextResponse.json(createGoal(String(body.goal ?? "")), { status: 201 }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create campaign" }, { status: 400 }); } }
