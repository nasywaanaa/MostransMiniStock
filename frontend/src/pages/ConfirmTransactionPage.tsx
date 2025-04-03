import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import step1active from "../assets/checkdetailsactive.png";
import step2active from "../assets/confirmidentityactive.png";
import step3active from "../assets/confirmchangesactive.png";

import "./ProductDetailPage.css"; // Masih pakai styling dari sini

const ConfirmTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;

  const [action, setAction] = useState("Add Stock");
  const [quantity, setQuantity] = useState("");

  if (!product) return <div>Product not found</div>;

  return (
    <div className="page-container">
      <main className="product-detail-container">
        <div className="back-link">
          <a onClick={() => navigate(-1)}>&larr; Update Inventory</a>
        </div>

        {/* Step Bar */}
        <div className="step-bar">
          <div className="step">
            <img src={step1active} alt="Check Document" />
            <p className="step-label active">Check Document</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step2active} alt="Confirm Identity" />
            <p className="step-label active">Confirm Identity</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step3active} alt="Confirm Transaction" />
            <p className="step-label active">Confirm Transaction</p>
          </div>
        </div>

        {/* Card Middle */}
        <div className="identity-card">
          <h2>Confirm Transaction</h2>

          <label>Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            style={{ width: "100%", padding: "0.7rem", borderRadius: "10px", marginBottom: "1rem", color: "#757575" }}
          >
            <option value="Add Stock">Add Stock</option>
            <option value="Delete Stock">Delete Stock</option>
          </select>

          <label>Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div style={{ marginTop: "1rem", textAlign: "left" }}>
            <p style={{ fontWeight: 700, color: "#fd7e14" }}>Warning!</p>
            <p style={{ fontSize: "14px", color: "#fd7e14" }}>
            After confirmation, stock will change
            </p>
          </div>

          <div className="button-group">
            <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button
                className="next navy"
                onClick={() => {
                    if (!quantity) {
                    alert("Mohon isi quantity");
                    return;
                    }

                    // Simulasi navigasi ke halaman validasi (StockUpdatedPage)
                    navigate("/stock-updated", {
                    state: {
                        ...product,
                        action,
                        quantity,
                    },
                    });
                }}
                >
                Next
                </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmTransactionPage;
