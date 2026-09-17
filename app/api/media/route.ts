import { NextRequest, NextResponse } from "next/server";
import { getMedia } from "@/lib/media";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest): Promise<Response> {
  const kind = request.nextUrl.searchParams.get("kind");
  const validKind = kind === "image" || kind === "video" ? kind : undefined;
  const items = await getMedia(validKind);
  return NextResponse.json({ items });
}