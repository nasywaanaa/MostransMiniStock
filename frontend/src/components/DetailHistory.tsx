import React from "react";
import "./DetailHistory.css";

type DetailModalProps = {
  visible: boolean;
  onClose: () => void;
  data: {
    id: number;
    productName: string;
    category: string;
    action: string;
    date: string;
    time: string;
    operator: string;
    description: string;
    totalChanges: string;
    notes: string;
  };
};

const DetailModal: React.FC<DetailModalProps> = ({ visible, onClose, data }) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detail History</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <table>
          <tbody>
            <tr><td><strong>ID History</strong></td><td>{data.id}</td></tr>
            <tr><td><strong>Product Name</strong></td><td>{data.productName}</td></tr>
            <tr><td><strong>Product Category</strong></td><td>{data.category}</td></tr>
            <tr><td><strong>Description</strong></td><td>{data.action}</td></tr>
            <tr><td><strong>Update Date</strong></td><td>{data.date}</td></tr>
            <tr><td><strong>Update Time</strong></td><td>{data.time}</td></tr>
            <tr><td><strong>Operator</strong></td><td>{data.operator}</td></tr>
            <tr><td><strong>Total Changes</strong></td><td>{data.totalChanges}</td></tr>
            <tr><td><strong>Notes</strong></td><td>{data.notes}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailModal;
