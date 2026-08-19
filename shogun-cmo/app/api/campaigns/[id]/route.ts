import { NextResponse } from "next/server";
import { campaignDetail } from "@/lib/api";
export const dynamic = "force-dynamic";
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) { const { id } = await context.params; const result = campaignDetail(id); return result ? NextResponse.json(result) : NextResponse.json({ error: "Campaign not found" }, { status: 404 }); }
