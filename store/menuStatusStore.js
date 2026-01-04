import { create } from "zustand";

const menuStatusStore = create((set) => ({
    status: "",

    setStatus: (value) => set({ status: value }),

    clearStatus: () => set({ status: "" }),
}));

export default menuStatusStore;