import React from 'react';
import './deletemodal.scss'

const DeleteModal = ({isOpen, onClose, onConfirm}) => {

    if (!isOpen) return null;

  return (
    
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <h2>Confirm to delete</h2>
            <p>Are you sure you want to delete this community?</p>
            <div className="confirmation-buttons">
              <button onClick={onConfirm} className="confirm-button">Delete</button>
              <button onClick={onClose} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      );
  
}

export default DeleteModal