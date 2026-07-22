"use client";

import { useAdminAuthStore } from "@/lib/store/admin-auth-store";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminShell } from "@/components/admin/admin-shell";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const isAdmin = useAdminAuthStore((s) => s.isAdmin);

  if (!isAdmin) return <AdminLogin />;

  return <AdminShell>{children}</AdminShell>;
}
