import { create } from "zustand";

export const useNetworkStore = create((set) => ({
    isOnline: true,
    setOnline: (status) => set({ isOnline: status }),
}));