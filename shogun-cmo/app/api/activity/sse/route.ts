import { listActivity } from "@/lib/api";
export const dynamic = "force-dynamic";
export function GET() { const encoder = new TextEncoder(); const stream = new ReadableStream({ start(controller) { controller.enqueue(encoder.encode(`data: ${JSON.stringify({ activity: listActivity().slice(0, 20) })}\n\n`)); controller.close(); } }); return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } }); }
