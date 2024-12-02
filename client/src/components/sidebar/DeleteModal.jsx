import React from 'react';
import './deletemodal.scss';

const DeleteModal = ({ isOpen, onClose, onConfirm, type }) => {
  if (!isOpen) return null;

  // Dynamic message based on the type of item being deleted
  const getMessage = () => {
    if (type === 'community') {
      return 'Are you sure you want to delete this community?';
    }
    return 'Are you sure you want to delete this post?';
  };

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <h2>Confirm to delete</h2>
        <p>{getMessage()}</p> {/* Display dynamic message */}
        <div className="confirmation-buttons">
          <button onClick={onConfirm} className="confirm-button">Delete</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
