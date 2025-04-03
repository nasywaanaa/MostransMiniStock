import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDetailPage.css"; // menggunakan style umum

import success from "../assets/success.png";

const StockUpdatedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content stock-updated">
        <button className="close-button" onClick={() => navigate("/management")}>×</button>
        <h2>Stock Updated</h2>
        <img src={success} alt="Success" className="success-icon" />
        <table>
          <tbody>
            <tr><td><strong>ID History</strong></td><td>1</td></tr>
            <tr><td><strong>Product Name</strong></td><td>Paracetamol 500mg</td></tr>
            <tr><td><strong>Product Category</strong></td><td>Medicines</td></tr>
            <tr><td><strong>Description</strong></td><td><span style={{ color: "#2f9e44", fontWeight: "bold" }}>Add Stock</span></td></tr>
            <tr><td><strong>Update Date</strong></td><td>01 January 2025</td></tr>
            <tr><td><strong>Update Time</strong></td><td>12.00 WIB</td></tr>
            <tr><td><strong>Operator</strong></td><td>Nasywaa Anggun Athiefah</td></tr>
            <tr><td><strong>ID</strong></td><td>1</td></tr>
            <tr><td><strong>Total Changes</strong></td><td>120 pieces</td></tr>
            <tr><td><strong>Notes</strong></td><td>Incoming stock from routine procurement</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockUpdatedPage;
