import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ManagementPage from "./pages/ManagementPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ConfirmIdentityPage from "./pages/ConfirmIdentityPage";
import ConfirmTransactionPage from "./pages/ConfirmTransactionPage";
import StockUpdatedPage from "./pages/StockUpdatedPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/confirm-identity" element={<ConfirmIdentityPage />} />
        <Route path="/confirm-update" element={<ConfirmTransactionPage />} />
        <Route path="/stock-updated" element={<StockUpdatedPage />} />
      </Routes>
    </Router>
  );
};

export default App;
