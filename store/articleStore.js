import { create } from "zustand";
import axios from "axios";

export const articleStore = create((set) => ({
    articles: [],
    loading: false,

    fetchArticles: async () => {
        set({ loading: true });

        try {
            const res = await axios.get("http://localhost:3000/api/blog", {cache: "no-store"});
    
            set({
               
                articles: res.data,
                loading: false
            });
        } catch (error) {
            console.log(error)
            set({error:error.message, loading: false });
        }
    },
}));