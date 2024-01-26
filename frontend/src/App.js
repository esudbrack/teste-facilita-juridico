import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ListaClientes from "./pages/ListaClientes";
import { Layout } from "./layouts/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ListaClientes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
