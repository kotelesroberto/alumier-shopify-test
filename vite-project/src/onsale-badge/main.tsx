import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import OnSaleBadge from "./OnSaleBadge.tsx";
import "./index.css";

const onSaleBadgeRoot = document.getElementById("onsale-badge-root");

if (onSaleBadgeRoot) {
  createRoot(onSaleBadgeRoot!).render(
    <StrictMode>
      <OnSaleBadge />
    </StrictMode>
  );
}
