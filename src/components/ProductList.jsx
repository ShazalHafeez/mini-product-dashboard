// src/components/ProductList.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../store";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { selectedCategory, favorites } = useStore();
  const isFavorites = selectedCategory === "favorites";

  // 1. Single useQuery hook
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: isFavorites
      ? ["favorites", favorites] // key includes favorites array
      : ["products", selectedCategory], // normal products key
    queryFn: async () => {
      if (isFavorites) {
        // fetch all products then filter
        const all = await axios
          .get("https://fakestoreapi.com/products")
          .then((res) => res.data);
        return all.filter((p) => favorites.includes(p.id));
      }
      // normal or category-specific fetch
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : "https://fakestoreapi.com/products";
      return axios.get(url).then((res) => res.data);
    },
    // keep previous data on category switch
    keepPreviousData: !isFavorites,
    // longer cache for favorites mode
    staleTime: isFavorites ? 1000 * 60 * 5 : 0,
  });

  // 2. Now conditionally render
  if (isFavorites && favorites.length === 0) {
    return <div className="text-light">No favorites added yet.</div>;
  }

  if (isLoading) {
    return (
      <div className="text-light">
        {isFavorites ? "Loading favorites…" : "Loading products…"}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-danger">
        {isFavorites ? "Error loading favorites." : "Failed to load products."}
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
