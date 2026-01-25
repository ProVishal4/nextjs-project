import { create } from "zustand";
import axios from "axios";

export const categoryStore = create((set) => ({
    category: [],
    loading: false,

    fetchCategory: async () => {
        set({ loading: true });
        const categoryUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/category` || "http://localhost:3000/api/category"
        try {
            const res = await axios.get(categoryUrl);

            set({

                category: res.data,
                loading: false
            });
        } catch (error) {
            console.log("categoryStore error:- ", error)
            set({ error: error.message, loading: false });
        }
    },
}));