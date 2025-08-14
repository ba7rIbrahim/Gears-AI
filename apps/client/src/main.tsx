import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProviders } from "./providers/auth-ui-provider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviders>
        <App />
      </AuthProviders>
    </BrowserRouter>
  </StrictMode>
);
