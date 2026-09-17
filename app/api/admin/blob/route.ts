import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdminSession())) {
          throw new Error("Unauthorized");
        }
        return {};
      },
      onUploadCompleted: async () => {
        // no-op; the client registers metadata after upload completes
      },
    });

    return Response.json(jsonResponse);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Upload token failed.";
    return Response.json({ error: message }, { status: 401 });
  }
}