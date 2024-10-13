import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommunity } from '../../redux/communitySlice/communitySlice';
import './createCommunityModal.scss';

const DarkCreateCommunityModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.communities);

  const handleSubmit = (e) => {
    e.preventDefault();

    const communityData = {
      title,
      description,
    };

    dispatch(createCommunity(communityData))
      .unwrap()
      .then(() => {
        onClose();
        setTitle('');
        setDescription('');
      })
      .catch((err) => {
        console.error('Error creating community:', err);
      });
  };

  return (
    isOpen ? (
      <div className="dark-modal-overlay">
        <div className="dark-modal-container">
          <button className="dark-close-icon" onClick={onClose}>X</button>
          <h2 className="dark-modal-title">Create Community</h2>
          <form onSubmit={handleSubmit}>
            <div className="dark-form-group">
              <label htmlFor="title" className="dark-label">Title</label>
              <input
                type="text"
                id="title"
                className="dark-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="dark-form-group">
              <label htmlFor="description" className="dark-label">Description</label>
              <textarea
                id="description"
                className="dark-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="dark-submit-button"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Creating...' : 'Create'}
            </button>
            {error && <p className="dark-error-message">Error: {error}</p>}
          </form>
        </div>
      </div>
    ) : null
  );
};

export default DarkCreateCommunityModal;

