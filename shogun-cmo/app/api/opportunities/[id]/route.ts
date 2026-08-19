import { NextResponse } from "next/server";
import { opportunityDetail } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const result = opportunityDetail(id);
  return result ? NextResponse.json(result) : NextResponse.json({ error: "Opportunity not found" }, { status: 404 });
}
