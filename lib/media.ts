import { list, put, del } from "@vercel/blob";
import { PROPERTIES, TOURS } from "@/lib/data";

export const REGISTRY_PATH = "omuga-media/registry.json";
export const MEDIA_PREFIX = "omuga-media/";

export type MediaItem = {
  id: string;
  kind: "image" | "video";
  title: string;
  description: string;
  url: string;
  poster?: string;
  audioUrl?: string;
  audioLabel?: string;
  tag?: string;
  createdAt: string;
};

export type MediaInput = {
  kind: "image" | "video";
  title: string;
  description: string;
  url: string;
  tag?: string;
  audioUrl?: string;
  audioLabel?: string;
};

const BLOB_HOST = ".public.blob.vercel-storage.com";

function isBlobUrl(url: string): boolean {
  return url.includes(BLOB_HOST);
}

export async function readRegistry(): Promise<MediaItem[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { blobs } = await list({ prefix: REGISTRY_PATH, limit: 1 });
    if (!blobs.length) return null;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data)) return null;
    return data.filter(
      (item) => item && typeof item.id === "string" && typeof item.url === "string"
    ) as MediaItem[];
  } catch {
    return null;
  }
}

export async function writeRegistry(items: MediaItem[]): Promise<void> {
  await put(REGISTRY_PATH, JSON.stringify(items, null, 2), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function seedMedia(): MediaItem[] {
  const now = new Date().toISOString();
  const images: MediaItem[] = PROPERTIES.map((p, i) => ({
    id: `seed-image-${i + 1}`,
    kind: "image",
    title: p.name,
    description: `${p.specs.join(" · ")} — from as low as ${p.price}.`,
    url: p.image,
    tag: p.tag,
    createdAt: now,
  }));
  const videos: MediaItem[] = TOURS.map((t, i) => ({
    id: `seed-video-${i + 1}`,
    kind: "video",
    title: t.title,
    description: t.caption,
    url: t.video,
    poster: t.poster,
    createdAt: now,
  }));
  return [...images, ...videos];
}

export async function getMedia(kind?: "image" | "video"): Promise<MediaItem[]> {
  const items = await readRegistryOrSeed();
  const list = kind ? items.filter((item) => item.kind === kind) : items;
  return list.sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );
}

/**
 * Returns the existing registry, or the seed items when no registry has ever
 * been written (or it is empty). Used by all read/write operations so that:
 *  - the seed items shown on the admin dashboard are real entries that can be
 *    edited/deleted,
 *  - adding the first item does not wipe the default content,
 *  - an emptied catalog falls back to the default content again.
 */
export async function readRegistryOrSeed(): Promise<MediaItem[]> {
  const registry = await readRegistry();
  if (!registry || registry.length === 0) return seedMedia();
  return registry;
}

export async function deleteBlobIfHosted(url?: string): Promise<void> {
  if (!url || !isBlobUrl(url)) return;
  try {
    await del(url);
  } catch {
    // ignore — file may already be gone
  }
}

export function newId(): string {
  return crypto.randomUUID();
}