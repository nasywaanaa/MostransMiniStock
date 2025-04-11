import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import step1active from "../assets/checkdetailsactive.png";
import step2active from "../assets/confirmidentityactive.png";
import step3active from "../assets/confirmchangesactive.png";

import "./ProductDetailPage.css"; 

const ConfirmTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;

  const [action, setAction] = useState("Add Stock");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  if (!product) return <div>Product not found</div>;

  const handleNext = async () => {
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      alert("Mohon isi quantity dengan benar");
      return;
    }

    setLoading(true);

    const graphqlAction = action === "Add Stock" ? "ADD" : "DELETE";

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation UpdateStock($id: Int!, $qty: Int!, $act: String!) {
              updateProductStock(IDProduct: $id, quantity: $qty, action: $act) {
                IDProduct
                ProductName
                TotalStock
              }
            }
          `,
          variables: {
            id: product.IDProduct,
            qty: parseInt(quantity),
            act: graphqlAction,
          },
        }),
      });

      const json = await response.json();
      const updated = json.data?.updateProductStock;

      if (updated) {
        navigate("/stock-updated", {
          state: {
            ...updated,
            action: graphqlAction,
          },
        });
      } else {
        alert("Gagal mengupdate stock.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Terjadi kesalahan saat mengupdate stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="product-detail-container">
        <div className="back-link">
          <a onClick={() => navigate(-1)}>&larr; Update Inventory</a>
        </div>

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

        <div className="identity-card">
          <h2>Confirm Transaction</h2>

          <label>Action</label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: "10px",
              marginBottom: "1rem",
              color: "#757575",
            }}
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
            <button className="cancel" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="next navy" onClick={handleNext} disabled={loading}>
              {loading ? "Processing..." : "Next"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmTransactionPage;
