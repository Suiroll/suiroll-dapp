/* @refresh reload */
import React from "react";
import ReactDOM from "react-dom/client"
import App from "./core/App";
import Layout from "./core/Layout";
import {WalletProvider} from "@suiet/wallet-kit";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?",
  );
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <WalletProvider>
      <Layout>
        <App />
      </Layout>
    </WalletProvider>
  </React.StrictMode>,
)
