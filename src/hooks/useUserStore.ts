import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserData = {
    auth: boolean;
    user: {
        name: string;
        email: string;
        token: string;
    } | undefined;
};

type Store = {
    user: UserData | null;
    loading: boolean;

    saveUser: (data: UserData) => void;
    logout: () => void;
};

export const useUserStore = create(
    persist<Store>(
        (set) => ({
            user: null,
            loading: false,

            saveUser: (data) => set({ user: data }),
            logout: () => set({ user: null }),
        }),
        {
            name: "userData",
            storage: createJSONStorage(() => AsyncStorage), // ← вот здесь магия
        }
    )
);
