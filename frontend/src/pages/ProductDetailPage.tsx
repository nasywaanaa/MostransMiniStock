import React, { useEffect, useState } from "react";
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
  const { IDProduct } = location.state || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!IDProduct) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query ($id: Int!) {
                getProductById(IDProduct: $id) {
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
            variables: { id: IDProduct },
          }),
        });

        const json = await response.json();
        setProduct(json.data.getProductById);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [IDProduct]);

  if (loading) return <div className="page-container">Loading...</div>;
  if (!product) return <div className="page-container">Product not found.</div>;

  return (
    <div className="page-container">
      <Header />
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
          <div className="row"><strong>ID Product</strong><p>{product.IDProduct}</p></div>
          <div className="row"><strong>Product Name</strong><p>{product.ProductName}</p></div>
          <div className="row"><strong>Product Category</strong><p>{product.ProductCategory}</p></div>
          <div className="row"><strong>Product Description</strong><p>{product.ProductDescription}</p></div>
          <div className="row"><strong>Total Stock</strong><p>{product.TotalStock}</p></div>
          <div className="row"><strong>Unit</strong><p>{product.Unit}</p></div>
          <div className="row"><strong>Minimum Capacity</strong><p>{product.MinimumCapacity}</p></div>
          <div className="row"><strong>Maximum Capacity</strong><p>{product.MaximumCapacity}</p></div>
          <div className="button-group">
            <button className="cancel" onClick={() => navigate(-1)}>Cancel</button>
            <button className="next" onClick={() => navigate("/confirm-identity", { state: product })}>
              Next
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
