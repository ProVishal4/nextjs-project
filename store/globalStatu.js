import { create } from "zustand"

export const searchStore = create((set) =>({
    searchData: "",
    setSearchData: (value) => set({ searchData : value})

}))

