"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * DEMO-ONLY gate, not real security: this password ships in the client JS
 * bundle and the check runs entirely in the browser, so anyone can read it
 * from devtools or just flip `isAdmin` in localStorage directly. It exists
 * only to keep the admin UI from being one click away for casual visitors.
 * A real deployment needs server-side auth (session/JWT) before this panel
 * could safely go live — see docs/ADMIN_PANEL.md.
 */
const DEMO_ADMIN_PASSWORD = "yerbas-admin-2026";

interface AdminAuthState {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      login: (password) => {
        const ok = password === DEMO_ADMIN_PASSWORD;
        if (ok) set({ isAdmin: true });
        return ok;
      },
      logout: () => set({ isAdmin: false }),
    }),
    { name: "ndm-admin-auth" }
  )
);

export { DEMO_ADMIN_PASSWORD };
