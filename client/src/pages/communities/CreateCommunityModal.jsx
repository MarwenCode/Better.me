import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommunity } from '../../redux/communitySlice/communitySlice';
import './createCommunityModal.scss';

const CreateCommunityModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.communities); // Accès à l'état Redux

  const handleSubmit = (e) => {
    e.preventDefault();

    const communityData = {
      title,
      description,
    };

    dispatch(createCommunity(communityData))
      .unwrap()
      .then(() => {
        // Fermer le modal et réinitialiser le formulaire après une soumission réussie
        onClose();
        setTitle('');
        setDescription('');
      })
      .catch((err) => {
        // Gérer l'erreur, afficher éventuellement une notification ou un message
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
              disabled={status === 'loading'} // Désactiver le bouton pendant le chargement
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

