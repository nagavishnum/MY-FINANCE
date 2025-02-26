import React from "react";
import "./Modal.css";

const RModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <div style={{paddingTop:"20px"}}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default RModal;
