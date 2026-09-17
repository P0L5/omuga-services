import { NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin";
import {
  type MediaItem,
  type MediaInput,
  readRegistryOrSeed,
  writeRegistry,
  newId,
} from "@/lib/media";

export async function POST(request: Request): Promise<Response> {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<MediaInput & { audioLabel?: string }> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind = body.kind;
  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const url = body.url;

  if (kind !== "image" && kind !== "video") {
    return NextResponse.json({ error: "Choose image or video." }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Please add a title." }, { status: 400 });
  }
  if (!url) {
    return NextResponse.json({ error: "File was not uploaded." }, { status: 400 });
  }

  const registry = await readRegistryOrSeed();
  const item: MediaItem = {
    id: newId(),
    kind,
    title,
    description,
    url,
    tag: body.tag?.trim() || undefined,
    audioUrl: body.audioUrl || undefined,
    audioLabel: body.audioLabel?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  registry.push(item);
  await writeRegistry(registry);

  return NextResponse.json({ item });
}