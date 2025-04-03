import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import warnred from "../assets/warnred.png";
import warnorange from "../assets/warnorange.png";
import DetailHistory from "../components/DetailHistory";

import "./HistoryPage.css";

const historyData = [
  { time: "12.00 WIB, 01 January 2025", action: "delete", item: "Paracetamol 500mg" },
  { time: "12.10 WIB, 02 January 2025", action: "delete", item: "Syringe 10ml" },
  { time: "13.01 WIB, 03 January 2025", action: "add", item: "Alat Pelindung Diri" },
  { time: "10.51 WIB, 03 January 2025", action: "delete", item: "Face Shield" },
  { time: "11.21 WIB, 04 January 2025", action: "add", item: "Betadine" },
  { time: "14.30 WIB, 05 January 2025", action: "add", item: "Masker KN95" },
  { time: "09.15 WIB, 06 January 2025", action: "delete", item: "Hand Sanitizer" },
  { time: "16.45 WIB, 07 January 2025", action: "add", item: "Gloves" },
];

const ITEMS_PER_PAGE = 5;

const HistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  const totalPages = Math.ceil(historyData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = historyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = (item: any, index: number) => {
    setSelectedData({
      id: index + 1 + startIndex,
      productName: item.item,
      category: "Medicines",
      action: item.action === "add" ? "Add Stock" : "Delete Stock",
      date: item.time.split(", ")[1],
      time: item.time.split(", ")[0],
      operator: "Nasywaa Anggun Athifah",
      totalChanges: "120 pieces",
      notes: "Incoming stock from routine procurement",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="page-container">
      <Header />
      <main className="history-container">
        <h1 className="history-title">History Log</h1>

        <div className="history-card">
          {currentData.map((entry, index) => (
            <div className="history-item" key={index}>
              <div className="history-left">
                <img
                  src={entry.action === "add" ? warnred : warnorange}
                  alt="status"
                  className="status-icon"
                />
                <div className="history-info">
                  <strong>{entry.time}</strong>
                  <p>
                    {entry.action === "add" ? "Add stock" : "Delete stock"} →
                    &nbsp;{entry.item}
                  </p>
                </div>
              </div>
              <a
                onClick={() => openModal(entry, index)}
                className="detail-link"
                style={{ cursor: "pointer" }}
              >
                Detail History
              </a>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            ‹ Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next ›
          </button>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {selectedData && (
        <DetailHistory
          visible={showModal}
          onClose={closeModal}
          data={selectedData}
        />
      )}
    </div>
  );
};

export default HistoryPage;
