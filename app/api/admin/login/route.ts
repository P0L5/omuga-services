import { NextResponse } from "next/server";
import { checkCredentials, createAdminSession } from "@/lib/admin";

export async function POST(request: Request): Promise<Response> {
  let body: { username?: string; password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "").trim();

  if (!checkCredentials(username, password)) {
    return NextResponse.json(
      { error: "Wrong username or password." },
      { status: 401 }
    );
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}