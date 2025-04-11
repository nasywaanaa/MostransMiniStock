import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import step1active from "../assets/checkdetailsactive.png";
import step2active from "../assets/confirmidentityactive.png";
import step3inactive from "../assets/confirmchangesinactive.png";

import "./ProductDetailPage.css"; 

const ConfirmIdentityPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
  const [operatorId, setOperatorId] = useState("");

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="page-container">
      <main className="product-detail-container">
        <div className="back-link">
          <a onClick={() => navigate(-1)}>&larr; Update Inventory</a>
        </div>

        <div className="step-bar">
          <div className="step">
            <img src={step1active} alt="Check Details" />
            <p className="step-label active">Check Details</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step2active} alt="Confirm Identity" />
            <p className="step-label active">Confirm Identity</p>
          </div>
          <div className="line"></div>
          <div className="step">
            <img src={step3inactive} alt="Confirm Changes" />
            <p className="step-label">Confirm Changes</p>
          </div>
        </div>

        <div className="centered-container">
        <div className="identity-card">
            <h2>Confirm Identity</h2>

            <div className="identity-form">
                <label>Identifier Operator</label>
                <input
                type="text"
                placeholder="Enter Internet Identity"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                />

                <div className="button-group">
                <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
                <button
                    className="next navy"
                    onClick={() =>
                    operatorId
                        ? navigate("/confirm-update", { state: { ...product, operatorId } })
                        : alert("Please enter operator ID")
                    }
                >
                    Next
                </button>
                </div>
            </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmIdentityPage;
