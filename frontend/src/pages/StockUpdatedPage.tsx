import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";

import success from "../assets/success.png";

const StockUpdatedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="modal-overlay">
        <div className="modal-content stock-updated">
          <p>Data tidak ditemukan. Kembali ke halaman utama.</p>
          <button onClick={() => navigate("/management")}>Kembali</button>
        </div>
      </div>
    );
  }

  // Format tanggal & jam lokal
  const now = new Date();
  const updateDate = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const updateTime = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content stock-updated">
        <button className="close-button" onClick={() => navigate("/management")}>×</button>
        <h2>Stock Updated</h2>
        <img src={success} alt="Success" className="success-icon" />

        <table>
          <tbody>
            <tr><td><strong>ID Product</strong></td><td>{data.IDProduct}</td></tr>
            <tr><td><strong>Product Name</strong></td><td>{data.ProductName}</td></tr>
            <tr><td><strong>Product Category</strong></td><td>{data.ProductCategory || "-"}</td></tr>
            <tr>
              <td><strong>Description</strong></td>
              <td>
                <span style={{ color: data.action === "ADD" ? "#2f9e44" : "#e03131", fontWeight: "bold" }}>
                  {data.action === "ADD" ? "Add Stock" : "Delete Stock"}
                </span>
              </td>
            </tr>
            <tr><td><strong>Update Date</strong></td><td>{updateDate}</td></tr>
            <tr><td><strong>Update Time</strong></td><td>{updateTime} WIB</td></tr>
            <tr><td><strong>Operator</strong></td><td>Nasywaa Anggun Athiefah</td></tr> {/* bisa diganti dari login */}
            <tr><td><strong>Quantity</strong></td><td>{data.quantity} {data.Unit?.toLowerCase() || "unit"}</td></tr>
            <tr><td><strong>Total Stock Sekarang</strong></td><td>{data.TotalStock} {data.Unit?.toLowerCase() || "unit"}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockUpdatedPage;
