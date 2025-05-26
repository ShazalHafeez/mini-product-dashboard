// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container); // ← create the root
const queryClient = new QueryClient();

root.render(
  // ← use root.render
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
