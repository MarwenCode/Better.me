import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommunity } from '../../redux/communitySlice/communitySlice';
import './createCommunityModal.scss';




const CreateCommunityModal = ({ isOpen, onClose }) => {
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
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>X</button>
          <h2>Create Community</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Creating...' : 'Create'}
            </button>
            {error && <p className="error-message">Error: {error}</p>}
          </form>
        </div>
      </div>
    ) : null
  );
};

export default CreateCommunityModal;


