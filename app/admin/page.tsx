import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin — Omuga Services",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminSession();
  if (authed) {
    redirect("/admin/dashboard");
  }
  return <LoginForm />;
}