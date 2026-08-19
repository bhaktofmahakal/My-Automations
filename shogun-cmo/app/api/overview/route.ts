import { NextResponse } from "next/server";
import { overview } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json(overview()); }
