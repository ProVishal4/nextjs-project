import { create } from "zustand";
import axios from "axios";

const getBaseUrl = () => {
    // On server-side use environment value (or fallback)
    if (typeof window === "undefined") {
        return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    }

    // On client: if offline use .env URL, otherwise use localhost
    // (swap logic here if you actually want env when online and localhost when offline)
    return !navigator.onLine
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : "http://localhost:3000";
};

// create axios instance and set baseURL dynamically per request
const api = axios.create();
api.interceptors.request.use((config) => {
    config.baseURL = getBaseUrl();
    return config;
});

export const categoryStore = create((set) => ({
    category: [],
    loading: false,

    fetchCategory: async () => {
        set({ loading: true });

        try {
            const res = await api.get("/api/category");

            set({
                category: res.data,
                loading: false,
            });
        } catch (error) {
            console.log("categoryStore error:- ", error);
            set({ error: error.message, loading: false });
        }
    },
}));