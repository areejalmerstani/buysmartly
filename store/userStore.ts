import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

interface UserStore {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User, token: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user, accessToken) => set({ user, accessToken }),
            clearUser: () => set({ user: null, accessToken: null }),
        }),
        { name: "buysmartly-user" }
    )
);