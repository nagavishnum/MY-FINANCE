import React from "react";
import "./Modal.css";

const RModal = ({ type,category, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <bold>{`${type.toUpperCase()} ${category}`}</bold>
        <div style={{paddingTop:"20px"}}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default RModal;
