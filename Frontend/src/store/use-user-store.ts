import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type User } from "@/interfaces";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  resetUser: () => void;
}

export const useUserStore = create(
  //@ts-ignore
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
