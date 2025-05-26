import React from "react";
import FilterBar from "./components/FilterBar";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <div className="container py-5 bg-dark min-vh-100 min-vw-100 text-white">
      <h1 className="mb-4 text-center">Mini Product Dashboard</h1>
      <FilterBar />
      <ProductList />
    </div>
  );
}
