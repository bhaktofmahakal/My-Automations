import { toNextJsHandler } from "corsair";

export const dynamic = "force-dynamic";

async function dispatch(method: "GET" | "POST" | "OPTIONS", request: Request) {
  const { corsair } = await import("@/server/corsair");
  const handler = toNextJsHandler(corsair, { basePath: "/api/corsair" });
  return handler[method](request);
}

export const GET = (request: Request) => dispatch("GET", request);
export const POST = (request: Request) => dispatch("POST", request);
export const OPTIONS = (request: Request) => dispatch("OPTIONS", request);
