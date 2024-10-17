import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Geiranger } from "./Experiments/Landscapes/Geiranger.tsx";
import { Akureyri } from "./Experiments/Landscapes/Akureyri.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/sandbox">
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="geiranger" element={<Geiranger />} />
        <Route path="akureyri" element={<Akureyri />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
