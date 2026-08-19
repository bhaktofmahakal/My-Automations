import { NextResponse } from "next/server";
import { listActivity } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { return NextResponse.json({ activity: listActivity() }); }
