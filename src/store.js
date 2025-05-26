// src/store.js
import { create } from "zustand";

export const useStore = create((set) => ({
  // ───── Filter slice ─────
  selectedCategory: "",
  setSelectedCategory: (cat) => set({ selectedCategory: cat }),

  // ───── Favorites slice ─────
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => {
      const exists = state.favorites.includes(id);
      return {
        favorites: exists
          ? state.favorites.filter((f) => f !== id)
          : [...state.favorites, id],
      };
    }),

}));
