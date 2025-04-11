import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import searchIcon from "../assets/search.png";
import "./ManagementPage.css";

const ITEMS_PER_PAGE = 5;

const ManagementPage = () => {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState("");
  const [notFound, setNotFound] = useState(false); // 🆕

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                getAllProducts {
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
        setProducts(json.data.getAllProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => a.IDProduct - b.IDProduct);
  const displayData = searchResult.length > 0 ? searchResult : sortedProducts;

  const totalPages = Math.ceil(displayData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = displayData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSearch = async () => {
    const trimmed = searchId.trim();
    if (!trimmed) {
      setSearchResult([]);
      setNotFound(false);
      setCurrentPage(1);
      return;
    }
  
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
          variables: { id: parseInt(trimmed) },
        }),
      });
  
      const json = await response.json();
  
      if (json?.data?.getProductById) {
        setSearchResult([json.data.getProductById]);
        setNotFound(false);
      } else {
        setSearchResult([]);
        setNotFound(true); // ✅ penting!
      }
  
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching product:", error);
      setSearchResult([]);
      setNotFound(true);
    }
  };
  

  return (
    <div className="page-container">
      <Header />
      <main className="management-container">
        <h1 className="management-title">Update Inventory</h1>

        <div className="management-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Masukkan ID Produk"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src={searchIcon} alt="Search" className="search-icon" />
            </button>
          </div>

          <table className="inventory-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Name</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Minimum Capacity</th>
                <th>Maximum Capacity</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item) => (
                  <tr key={item.IDProduct}>
                    <td>{item.IDProduct}</td>
                    <td>{item.ProductName}</td>
                    <td>{item.TotalStock}</td>
                    <td>{item.Unit}</td>
                    <td>{item.MinimumCapacity}</td>
                    <td>{item.MaximumCapacity}</td>
                    <td>
                      <button
                        className="btn-pilih"
                        onClick={() => navigate("/product-detail", { state: { IDProduct: item.IDProduct } })}
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                ))
              ) : notFound ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    ID Produk tidak ditemukan.
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    Tidak ada produk yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {displayData.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                ‹ Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next ›
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManagementPage;
