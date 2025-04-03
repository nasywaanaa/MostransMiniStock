import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import search from "../assets/search.png";

import "./SearchPage.css";

const dummyData = {
  1: {
    id: "1",
    name: "Syringe 10ml",
    category: "Alat Medis",
    description: "Suntikan steril ukuran 10ml untuk injeksi intravena.",
    stock: 120,
    unit: "pieces",
    status: "Normal",
    min: 50,
    max: 300,
  },
  // Tambah data dummy lainnya di sini jika perlu
};

const SearchPage = () => {
  const [inputId, setInputId] = useState("");
  const [product, setProduct] = useState<any | null>(null);

  const handleSearch = () => {
    const result = dummyData[inputId];
    setProduct(result || null);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="hero">
        <h1 className="page-title">Check Inventory</h1>
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Insert ID Product"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src={search} alt="Search" className="search-icon" />
            </button>
          </div>

          {product && (
            <div className="result-box styled-result">
              <div>
                <label>ID Product</label>
                <p>{product.id}</p>
              </div>
              <div>
                <label>Product Name</label>
                <p>{product.name}</p>
              </div>
              <div>
                <label>Product Category</label>
                <p>{product.category}</p>
              </div>
              <div>
                <label>Product Description</label>
                <p>{product.description}</p>
              </div>
              <div>
                <label>Total Stock</label>
                <p>{product.stock}</p>
              </div>
              <div>
                <label>Unit</label>
                <p>{product.unit}</p>
              </div>
              <div>
                <label>Status</label>
                <p>{product.status}</p>
              </div>
              <div>
                <label>Minimum Capacity</label>
                <p>{product.min}</p>
              </div>
              <div>
                <label>Maximum Capacity</label>
                <p>{product.max}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
