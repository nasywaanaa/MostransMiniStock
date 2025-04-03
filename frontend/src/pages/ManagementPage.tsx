import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

import Header from "../components/Header";
import Footer from "../components/Footer";
import searchIcon from "../assets/search.png"; // gunakan logo search dari assets
import "./ManagementPage.css";

const dummyData = [
  {
    id: "1",
    name: "Syringe 10ml",
    category: "Medical Tools",
    description: "Suntikan steril ukuran 10ml untuk injeksi intravena.",
    stock: 120,
    unit: "pieces",
    status: "Normal",
    min: 50,
    max: 300,
  },
  {
    id: "2",
    name: "Paracetamol 500mg",
    category: "Medicines",
    description: "Obat pereda demam dan nyeri dengan dosis 500mg.",
    stock: 200,
    unit: "tablets",
    status: "Normal",
    min: 100,
    max: 500,
  },
  {
    id: "3",
    name: "Face Shield",
    category: "Protective Equipment",
    description: "Pelindung wajah transparan untuk tenaga medis.",
    stock: 80,
    unit: "pieces",
    status: "Warning",
    min: 30,
    max: 250,
  },
  {
    id: "4",
    name: "Hand Sanitizer",
    category: "Sanitation",
    description: "Pembersih tangan berbasis alkohol untuk desinfeksi.",
    stock: 150,
    unit: "bottles",
    status: "Normal",
    min: 70,
    max: 400,
  },
  {
    id: "5",
    name: "Gloves",
    category: "Protective Equipment",
    description: "Sarung tangan medis sekali pakai untuk sterilisasi.",
    stock: 300,
    unit: "pairs",
    status: "Normal",
    min: 150,
    max: 600,
  },
  {
    id: "6",
    name: "Stethoscope",
    category: "Medical Tools",
    description: "Alat pemeriksaan denyut jantung dan pernapasan.",
    stock: 60,
    unit: "units",
    status: "Normal",
    min: 20,
    max: 120,
  },
  {
    id: "7",
    name: "Thermometer",
    category: "Medical Tools",
    description: "Termometer digital untuk pemeriksaan suhu tubuh.",
    stock: 90,
    unit: "units",
    status: "Normal",
    min: 40,
    max: 180,
  },
  {
    id: "8",
    name: "Mask KN95",
    category: "Protective Equipment",
    description: "Masker filtrasi tinggi KN95 untuk perlindungan pernapasan.",
    stock: 220,
    unit: "pieces",
    status: "Normal",
    min: 110,
    max: 440,
  },
];


const ITEMS_PER_PAGE = 5;

const ManagementPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState("");

  const navigate = useNavigate();

  // Filtering data berdasarkan ID
  const filteredData = searchId
    ? dummyData.filter((item) => item.id === searchId.trim())
    : dummyData;

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleSearch = () => {
    setCurrentPage(1); // reset halaman ke awal
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
              placeholder="Masukkan ID Sertifikat"
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
                currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.stock}</td>
                    <td>{item.unit}</td>
                    <td>{item.min}</td>
                    <td>{item.max}</td>
                    <td>
                      <button
                        className="btn-pilih"
                        onClick={() => navigate("/product-detail", { state: item })}
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>There is no product with that ID</td></tr>
              )}
            </tbody>
          </table>

          {filteredData.length > 0 && (
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>‹ Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>Next ›</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManagementPage;
