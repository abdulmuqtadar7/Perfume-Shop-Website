"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine } from "./types";

type CartState = {
  lines: CartLine[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  add: (productId: string, variant?: string) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, delta: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      add: (productId, variant) => {
        const lineId = variant ? `${productId}::${variant}` : productId;
        const existing = get().lines.find((l) => l.lineId === lineId);
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.lineId === lineId ? { ...l, qty: l.qty + 1 } : l
            ),
          });
        } else {
          set({ lines: [...get().lines, { lineId, productId, qty: 1, variant }] });
        }
      },
      remove: (lineId) => set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),
      setQty: (lineId, delta) =>
        set({
          lines: get()
            .lines.map((l) =>
              l.lineId === lineId ? { ...l, qty: Math.max(1, l.qty + delta) } : l
            ),
        }),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "ub-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

type WishState = {
  ids: string[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useWish = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      toggle: (id) =>
        set({
          ids: get().ids.includes(id)
            ? get().ids.filter((x) => x !== id)
            : [...get().ids, id],
        }),
      has: (id) => get().ids.includes(id),
    }),
    {
      name: "ub-wish",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

// UI drawer/modal state
type UIState = {
  cartOpen: boolean;
  wishOpen: boolean;
  quickViewId: string | null;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  chatOpen: boolean;
  toast: string | null;
  setCart: (v: boolean) => void;
  setWish: (v: boolean) => void;
  setQuickView: (id: string | null) => void;
  setSearch: (v: boolean) => void;
  setMobileNav: (v: boolean) => void;
  setChat: (v: boolean) => void;
  pushToast: (msg: string) => void;
};

export const useUI = create<UIState>((set) => ({
  cartOpen: false,
  wishOpen: false,
  quickViewId: null,
  searchOpen: false,
  mobileNavOpen: false,
  chatOpen: false,
  toast: null,
  setCart: (v) => set({ cartOpen: v }),
  setWish: (v) => set({ wishOpen: v }),
  setQuickView: (id) => set({ quickViewId: id }),
  setSearch: (v) => set({ searchOpen: v }),
  setMobileNav: (v) => set({ mobileNavOpen: v }),
  setChat: (v) => set({ chatOpen: v }),
  pushToast: (msg) => {
    set({ toast: msg });
    setTimeout(() => set({ toast: null }), 2400);
  },
}));
