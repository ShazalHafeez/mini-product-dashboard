import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStore } from "../store";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { selectedCategory } = useStore();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      axios
        .get(
          selectedCategory
            ? `https://fakestoreapi.com/products/category/${selectedCategory}`
            : "https://fakestoreapi.com/products"
        )
        .then((res) => res.data),
    keepPreviousData: true,
  });

  if (isLoading) return <div className="text-light">Loading products…</div>;
  if (error) return <div className="text-danger">Failed to load products</div>;

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
