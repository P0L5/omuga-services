import { NextRequest, NextResponse } from "next/server";
import { isAdminSession } from "@/lib/admin";
import {
  readRegistryOrSeed,
  writeRegistry,
  deleteBlobIfHosted,
} from "@/lib/media";

export const runtime = "nodejs";

type PatchBody = {
  title?: string;
  description?: string;
  tag?: string;
  url?: string;
  audioUrl?: string;
  audioLabel?: string;
  removeAudio?: boolean;
  removeMedia?: boolean;
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const registry = await readRegistryOrSeed();
  const index = registry.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  let body: PatchBody = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const item = registry[index];

  // Handle audio replacement
  if (body.removeAudio) {
    await deleteBlobIfHosted(item.audioUrl);
    item.audioUrl = undefined;
    item.audioLabel = undefined;
  } else if (body.audioUrl) {
    await deleteBlobIfHosted(item.audioUrl);
    item.audioUrl = body.audioUrl;
    item.audioLabel = body.audioLabel ?? item.audioLabel;
  }

  // Handle media replacement
  if (body.removeMedia) {
    await deleteBlobIfHosted(item.url);
    item.url = "";
  } else if (body.url) {
    await deleteBlobIfHosted(item.url);
    item.url = body.url;
  }

  // Metadata
  if (body.title !== undefined) item.title = body.title.trim();
  if (body.description !== undefined) item.description = body.description.trim();
  if (body.tag !== undefined) item.tag = body.tag.trim() || undefined;

  if (!item.url || !item.title) {
    return NextResponse.json(
      { error: "Title and media are required." },
      { status: 400 }
    );
  }

  registry[index] = item;
  await writeRegistry(registry);

  return NextResponse.json({ item });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<Response> {
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const registry = await readRegistryOrSeed();
  const item = registry.find((i) => i.id === id);
  if (!item) {
    return NextResponse.json({ error: "Item not found." }, { status: 404 });
  }

  // Delete blob files
  await deleteBlobIfHosted(item.url);
  await deleteBlobIfHosted(item.poster);
  await deleteBlobIfHosted(item.audioUrl);

  const updated = registry.filter((i) => i.id !== id);
  await writeRegistry(updated);

  return NextResponse.json({ ok: true });
}