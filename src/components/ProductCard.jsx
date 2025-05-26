import React from "react";
import { useStore } from "../store";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useStore();
  const isFav = favorites.includes(product.id);

  return (
    <div
      className="card bg-secondary text-light mb-4"
      style={{ width: "18rem" }}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "200px", objectFit: "contain" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <button
          className="btn btn-outline-light"
          onClick={() => toggleFavorite(product.id)}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
