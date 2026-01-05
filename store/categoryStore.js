import { create } from "zustand";
import axios from "axios";


const baseUrl =process.env.NEXT_PUBLIC_BASE_URL
    // ||  `http://localhost:3000`;
export const categoryStore = create((set) => ({
    category: [],
    loading: false, 

    fetchCategory: async () => {
        set({ loading: true });

        try {
            const res = await axios.get(`${baseUrl}/apis/categories`);
    
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