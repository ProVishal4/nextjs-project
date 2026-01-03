import { create } from "zustand";
import axios from "axios";

export const categoryStore = create((set) => ({
    category: [],
    loading: false,

    fetchCategory: async () => {
        set({ loading: true });

        try {
            const res = await axios.get("/api/category");
    
            set({
               
                category: res.data,
                loading: false
            });
        } catch (error) {
            console.log("categoryStore error:- ",error)
            set({error:error.message, loading: false });
        }
    },
}));