
import React from "react";
import { BrowserRouter } from "react-router-dom";



import { FilterProvider, CartProvider } from "./context/index";
import { AllRoutes } from "./routes/AllRoutes";
import { Header, Footer, ScrollToTop } from "./components/index";
import './App.css';

export default function App() {
  return (
  <BrowserRouter >
    <ScrollToTop />
    <CartProvider>
      <FilterProvider>
     
        <Header />
        <AllRoutes />
        <Footer />
      </FilterProvider>
    </CartProvider>
  </BrowserRouter>
  );
}

