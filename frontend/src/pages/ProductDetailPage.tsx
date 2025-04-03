// src/pages/ProductDetailPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import step1active from "../assets/checkdetailsactive.png";
import step2inactive from "../assets/confirmidentityinactive.png";
import step3inactive from "../assets/confirmchangesinactive.png";

import "./ProductDetailPage.css";

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="page-container">
      <main className="product-detail-container">
        <div className="back-link">
          <a onClick={() => navigate(-1)}>&larr; Update Inventory</a>
        </div>

        {/* Step Bar */}
        <div className="step-bar">
          <div className="step">
            <img src={step1active} alt="Check Details" />
            <p className="step-label active">Check Details</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step2inactive} alt="Confirm Identity" />
            <p className="step-label">Confirm Identity</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step3inactive} alt="Confirm Changes" />
            <p className="step-label">Confirm Changes</p>
          </div>
        </div>

        {/* Product Detail Card */}
        <div className="product-card">
          <div className="row"><strong>ID Product</strong><p>{product.id}</p></div>
          <div className="row"><strong>Product Name</strong><p>{product.name}</p></div>
          <div className="row"><strong>Product Category</strong><p>{product.category}</p></div>
          <div className="row"><strong>Product Description</strong><p>{product.description}</p></div>
          <div className="row"><strong>Total Stock</strong><p>{product.stock}</p></div>
          <div className="row"><strong>Unit</strong><p>{product.unit}</p></div>
          <div className="row"><strong>Status</strong><p>{product.status}</p></div>
          <div className="row"><strong>Minimum Capacity</strong><p>{product.min}</p></div>
          <div className="row"><strong>Maximum Capacity</strong><p>{product.max}</p></div>
          <div className="button-group">
          <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button className="next" onClick={() => navigate("/confirm-identity", { state: product })}>
            Next
          </button>
        </div>
        
        </div>

        {/* Button */}

      </main>
    </div>
  );
};

export default ProductDetailPage;
