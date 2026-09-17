import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin";
import Dashboard from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Omuga Services",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const authed = await isAdminSession();
  if (!authed) {
    redirect("/admin");
  }
  return <Dashboard />;
}