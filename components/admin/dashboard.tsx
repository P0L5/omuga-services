"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import {
  ExternalLink,
  Image as ImageIcon,
  LogOut,
  Music,
  Pencil,
  Plus,
  Trash2,
  Video,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { MediaItem } from "@/lib/media";

const MEDIA_PREFIX = "omuga-media/";

function extOf(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return /^[a-z0-9]{1,5}$/.test(ext) ? ext : "bin";
}

async function uploadFile(file: File): Promise<string> {
  const res = await upload(`${MEDIA_PREFIX}${crypto.randomUUID()}.${extOf(file)}`, file, {
    access: "public",
    multipart: file.size > 4 * 1024 * 1024,
    handleUploadUrl: "/api/admin/blob",
  });
  return res.url;
}

/* ------------------------------------------------------------------ */
/*  Toast banner                                                       */
/* ------------------------------------------------------------------ */

function Toast({ message, tone }: { message: string; tone: "ok" | "err" }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-2xl ${
        tone === "ok" ? "bg-emerald-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add / edit form modal                                              */
/* ------------------------------------------------------------------ */

type ModalState =
  | { mode: "add"; kind: "image" | "video" }
  | { mode: "edit"; item: MediaItem }
  | null;

function MediaFormModal({
  state,
  onClose,
  onSaved,
}: {
  state: NonNullable<ModalState>;
  onClose: () => void;
  onSaved: (item: MediaItem) => void;
}) {
  const editing = state.mode === "edit";
  const initial = editing ? (state as { mode: "edit"; item: MediaItem }).item : null;
  const kind = editing ? initial!.kind : (state as { mode: "add"; kind: "image" | "video" }).kind;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [keepAudio, setKeepAudio] = useState<boolean>(!!initial?.audioUrl);
  const [mediaPreview, setMediaPreview] = useState<string | null>(initial?.url ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pickMedia = (file: File | null) => {
    if (mediaPreview && !initial?.url.includes(mediaPreview)) {
      URL.revokeObjectURL(mediaPreview);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaFile(file);
      setMediaPreview(url);
    } else {
      setMediaFile(null);
    }
  };

  const discardAudio = () => {
    setAudioFile(null);
    setKeepAudio(false);
  };

  const save = async () => {
    if (busy) return;
    if (!title.trim()) {
      setError("Please give this a title.");
      return;
    }
    setBusy(true);
    setError("");

    try {
      let url = initial?.url ?? "";
      let audioUrl = keepAudio ? initial?.audioUrl : undefined;
      let audioLabel = keepAudio ? initial?.audioLabel : undefined;

      if (mediaFile) url = await uploadFile(mediaFile);
      if (audioFile) {
        audioUrl = await uploadFile(audioFile);
        audioLabel = audioFile.name;
      }

      if (editing) {
        const res = await fetch(`/api/admin/media/${initial!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            tag: tag.trim(),
            url: mediaFile ? url : undefined,
            audioUrl,
            audioLabel,
            removeAudio: !keepAudio && !audioFile,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not save.");
        onSaved(data.item);
      } else {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind,
            title: title.trim(),
            description: description.trim(),
            tag: tag.trim(),
            url,
            audioUrl,
            audioLabel,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Could not save.");
        onSaved(data.item);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-medium text-ivory">
            {editing ? "Edit" : kind === "image" ? "Add an image" : "Add a video"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full border border-border text-ivory/60 transition-colors hover:text-ivory"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue">
              1. Choose a {kind === "image" ? "picture" : "video"} file
            </label>
            {mediaPreview ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                {kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="max-h-72 w-full object-contain bg-ink/60"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    muted
                    playsInline
                    preload="metadata"
                    className="max-h-72 w-full bg-ink/60 object-contain"
                  />
                )}
                <label
                  htmlFor="replace-media"
                  className="absolute right-3 top-3 cursor-pointer rounded-full border border-border bg-ink/80 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:border-blue"
                >
                  Change
                </label>
                <input
                  id="replace-media"
                  type="file"
                  accept={kind === "image" ? "image/*" : "video/*"}
                  className="hidden"
                  onChange={(e) => pickMedia(e.target.files?.[0] ?? null)}
                />
              </div>
            ) : (
              <label
                htmlFor="pick-media"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-background/40 px-6 py-12 text-center transition-colors hover:border-blue/60"
              >
                {kind === "image" ? (
                  <ImageIcon className="size-8 text-blue" />
                ) : (
                  <Video className="size-8 text-blue" />
                )}
                <span className="text-sm font-medium text-ivory/70">
                  Click here to choose a {kind === "image" ? "picture" : "video"}
                </span>
                <span className="text-xs text-ivory/40">
                  {kind === "image" ? "JPG, PNG, WebP" : "MP4, WebM"}
                </span>
              </label>
            )}
            {!mediaPreview && (
              <input
                id="pick-media"
                type="file"
                accept={kind === "image" ? "image/*" : "video/*"}
                className="hidden"
                onChange={(e) => pickMedia(e.target.files?.[0] ?? null)}
              />
            )}
          </div>

          <div>
            <label
              htmlFor="item-title"
              className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue"
            >
              2. Title{" "}
              <span className="font-normal normal-case tracking-normal text-ivory/40">
                (required)
              </span>
            </label>
            <Input
              id="item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lakeside Cottage, Jinja"
              className="h-12 rounded-xl bg-background/60 px-4 text-ivory focus-visible:border-blue/60"
            />
          </div>

          <div>
            <label
              htmlFor="item-desc"
              className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue"
            >
              3. Short description
            </label>
            <Textarea
              id="item-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A sentence guests will see under this photo or video…"
              className="min-h-24 rounded-xl bg-background/60 px-4 py-3 text-ivory focus-visible:border-blue/60"
            />
          </div>

          <div>
            <label
              htmlFor="item-tag"
              className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue"
            >
              4. Small label{" "}
              <span className="font-normal normal-case tracking-normal text-ivory/40">
                (optional, e.g. “New” or “Featured”)
              </span>
            </label>
            <Input
              id="item-tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="New"
              className="h-12 rounded-xl bg-background/60 px-4 text-ivory focus-visible:border-blue/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue">
              5. Add a sound{" "}
              <span className="font-normal normal-case tracking-normal text-ivory/40">
                (optional)
              </span>
            </label>
            {keepAudio || audioFile ? (
              <div className="flex items-center justify-between rounded-xl border border-blue/30 bg-background/40 px-4 py-3">
                <span className="flex items-center gap-2 text-sm text-ivory/80">
                  <Music className="size-4 text-blue" />
                  {audioFile
                    ? audioFile.name
                    : (initial?.audioLabel ?? "Sound added")}
                </span>
                <button
                  onClick={discardAudio}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label
                htmlFor="pick-audio"
                className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-blue/60"
              >
                <span className="flex items-center gap-2 text-sm text-ivory/60">
                  <Music className="size-4 text-blue" />
                  Attach an audio file (mp3, m4a…)
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue">
                  Choose
                </span>
              </label>
            )}
            {!keepAudio && !audioFile && (
              <input
                id="pick-audio"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            )}
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-12 rounded-full px-6 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-ivory/60 hover:text-ivory"
            >
              Cancel
            </Button>
            <Button
              onClick={save}
              disabled={busy}
              className="h-12 cursor-pointer rounded-full bg-blue px-7 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow disabled:opacity-60"
            >
              {busy ? "Saving…" : editing ? "Save changes" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Media card                                                         */
/* ------------------------------------------------------------------ */

function MediaCard({
  item,
  onEdit,
  onDelete,
}: {
  item: MediaItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-blue/40">
      <div className="relative aspect-video overflow-hidden bg-ink/50">
        {item.kind === "image" ? (
          <Image
            src={item.url}
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
          />
        ) : (
          <video
            src={item.url}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {item.tag && (
          <span className="absolute left-3 top-3 rounded-full border border-blue/40 bg-ink/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-blue backdrop-blur-md">
            {item.tag}
          </span>
        )}
        {item.audioUrl && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-ink/70 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
            <Music className="size-3 text-blue" /> Sound
          </span>
        )}
        <span
          className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] ${
            item.kind === "image"
              ? "bg-blue text-white"
              : "bg-white text-ink"
          }`}
        >
          {item.kind === "image" ? "Image" : "Video"}
        </span>
      </div>

      <div className="p-5">
        <h3 className="truncate font-serif text-lg font-medium text-ivory">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ivory/55">
          {item.description || "No description."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={onEdit}
            className="inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-full border border-border text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:border-blue hover:text-blue"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
          <button
            onClick={onDelete}
            aria-label={`Delete ${item.title}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-border text-ivory/50 transition-colors hover:border-red-500/60 hover:text-red-400"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const router = useRouter();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<{ message: string; tone: "ok" | "err" } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<MediaItem | null>(null);

  const notify = (message: string, tone: "ok" | "err" = "ok") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3200);
  };

  const refresh = useCallback(async () => {
    const res = await fetch("/api/media", { cache: "no-store" });
    const data = await res.json();
    setItems(Array.isArray(data.items) ? data.items : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const handleSaved = (item: MediaItem) => {
    const wasEdit = modal?.mode === "edit";
    setModal(null);
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists ? prev.map((i) => (i.id === item.id ? item : i)) : [item, ...prev];
    });
    notify(
      wasEdit
        ? "Changes saved — live now."
        : "Saved! Your media is now live on the website."
    );
  };

  const doDelete = async () => {
    if (!confirmDelete) return;
    const id = confirmDelete.id;
    setConfirmDelete(null);
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete.");
      setItems((prev) => prev.filter((i) => i.id !== id));
      notify("Deleted. It is no longer on the website.");
    } catch {
      notify("Could not delete. Please try again.", "err");
    }
  };

  const imageCount = items.filter((i) => i.kind === "image").length;
  const videoCount = items.filter((i) => i.kind === "video").length;

  return (
    <div className="min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white">
              <Image
                src="/logo.jpg"
                alt="Omuga Services"
                fill
                sizes="36px"
                className="object-contain p-0.5"
              />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg font-semibold tracking-[0.2em] text-ivory">
                OMUGA
              </span>
              <span className="mt-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.45em] text-blue">
                Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:border-blue hover:text-blue sm:inline-flex"
            >
              <ExternalLink className="size-3.5" /> View site
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ivory/70 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut className="size-3.5" /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        {/* Intro */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-medium text-ivory sm:text-5xl">
              Your media gallery
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/55">
              Anything you publish here appears on the website instantly —
              no technical skills needed. Guests can always see it; only staff can
              change it.
            </p>
            <p className="mt-2 text-sm text-ivory/45">
              {loading
                ? "Loading…"
                : `${imageCount} image${imageCount === 1 ? "" : "s"} · ${videoCount} video${
                    videoCount === 1 ? "" : "s"
                  } live`}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => setModal({ mode: "add", kind: "image" })}
              className="h-13 cursor-pointer rounded-full bg-blue px-7 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-blue-light hover:blue-glow"
            >
              <Plus className="size-4" /> Add an image
            </Button>
            <Button
              onClick={() => setModal({ mode: "add", kind: "video" })}
              className="h-13 cursor-pointer rounded-full border border-blue/50 bg-transparent px-7 text-[0.7rem] font-bold uppercase tracking-[0.25em] text-blue transition-all duration-300 hover:bg-blue/10"
            >
              <Plus className="size-4" /> Add a video
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video animate-pulse rounded-2xl border border-border bg-card"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
              <p className="font-serif text-2xl font-medium text-ivory">
                Nothing here yet
              </p>
              <p className="mt-2 text-sm text-ivory/50">
                Click “Add an image” or “Add a video” to publish your first item.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  onEdit={() => setModal({ mode: "edit", item })}
                  onDelete={() => setConfirmDelete(item)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {modal && (
        <MediaFormModal
          state={modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 text-center shadow-2xl">
            <h3 className="font-serif text-2xl font-medium text-ivory">
              Delete this {confirmDelete.kind}?
            </h3>
            <p className="mt-2 text-sm text-ivory/55">
              “{confirmDelete.title}” will be removed from the website. Its file is
              deleted too and cannot be recovered.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setConfirmDelete(null)}
                className="h-11 rounded-full px-6 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ivory/60 hover:text-ivory"
              >
                Keep it
              </Button>
              <Button
                onClick={doDelete}
                className="h-11 cursor-pointer rounded-full bg-red-600 px-6 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-white hover:bg-red-500"
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} tone={toast.tone} />}
    </div>
  );
}