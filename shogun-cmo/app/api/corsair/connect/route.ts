import { NextResponse } from "next/server";
import { corsair } from "@/server/corsair";

export const dynamic = "force-dynamic";

const tenantId = "shogunai";

function errorMessage(error: unknown, fallback: string) {
  if (!(error instanceof Error)) return fallback;
  const cause = error.cause;
  if (cause && typeof cause === "object" && "code" in cause) {
    return `${error.message} (${String((cause as { code?: unknown }).code)})`;
  }
  return error.message || fallback;
}

export async function POST() {
  try {
    const link = await corsair.manage.connect.createLink({
      plugin: "github",
      tenantId,
      oauthMode: "managed",
    });

    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error, "Unable to create Corsair connect link.") }, { status: 502 });
  }
}

export async function GET() {
  try {
    const status = await corsair.manage.connectionStatus.get({ tenantId });
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json({ error: errorMessage(error, "Unable to read Corsair connection status.") }, { status: 502 });
  }
}
