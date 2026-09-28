import React from "react";
import ReactDOM from "react-dom/client";
import { Portfolio } from "@/components/portfolio";
import "./styles.css";

const root = document.getElementById("root");

if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Portfolio />
      </React.StrictMode>,
    );
  } catch (err) {
    root.innerHTML = `<pre style="color:red;padding:2rem">${err}</pre>`;
  }
} else {
  document.body.innerHTML = '<pre style="color:red;padding:2rem">Root element not found</pre>';
}
