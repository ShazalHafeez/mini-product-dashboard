// src/components/FilterBar.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../store";

export default function FilterBar() {
  const { selectedCategory, setSelectedCategory } = useStore();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axios
        .get("https://fakestoreapi.com/products/categories")
        .then((res) => res.data),
  });

  if (isLoading) return <div className="text-light">Loading…</div>;
  if (error) return <div className="text-danger">Error loading categories</div>;

  return (
    <div className="mb-4 d-flex flex-column w-75 mx-auto">
      <label htmlFor="categorySelect" className="form-label text-light">
        Filter:
      </label>
      <select
        id="categorySelect"
        className="form-select bg-dark text-light border-secondary"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
        <option value="favorites">Favorites</option>
      </select>
    </div>
  );
}
