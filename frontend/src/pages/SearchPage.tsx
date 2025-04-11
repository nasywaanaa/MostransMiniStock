import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import search from "../assets/search.png";

import "./SearchPage.css";

const SearchPage = () => {
  const [inputId, setInputId] = useState("");
  const [product, setProduct] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setNotFound(false);
    setProduct(null);

    if (!inputId) return;

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              getProductById(IDProduct: ${inputId}) {
                IDProduct
                ProductName
                ProductCategory
                ProductDescription
                TotalStock
                Unit
                MinimumCapacity
                MaximumCapacity
              }
            }
          `,
        }),
      });

      const json = await response.json();
      const result = json.data.getProductById;

      if (result) {
        setProduct(result);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setNotFound(true);
    }
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

          {notFound && (
            <p style={{ color: "red", marginTop: "1rem" }}>ID Product tidak ditemukan.</p>
          )}

          {product && (
            <div className="result-box styled-result">
              <div><label>ID Product</label><p>{product.IDProduct}</p></div>
              <div><label>Product Name</label><p>{product.ProductName}</p></div>
              <div><label>Product Category</label><p>{product.ProductCategory}</p></div>
              <div><label>Product Description</label><p>{product.ProductDescription}</p></div>
              <div><label>Total Stock</label><p>{product.TotalStock}</p></div>
              <div><label>Unit</label><p>{product.Unit}</p></div>
              <div><label>Minimum Capacity</label><p>{product.MinimumCapacity}</p></div>
              <div><label>Maximum Capacity</label><p>{product.MaximumCapacity}</p></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
