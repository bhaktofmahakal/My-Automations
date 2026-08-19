import { NextResponse } from "next/server";
import { integrationStatus } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ integrations: integrationStatus() }); }
