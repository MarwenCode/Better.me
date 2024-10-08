import React, { useState, useEffect } from 'react';
import CreateCommunityModal from '../createCommunityModal/CreateCommunityModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities, deleteCommunityById } from '../../redux/communitySlice/communitySlice';
import { fetchPostsByCommunity } from '../../redux/postSlice/postSlice';
import DeleteModal from './DeleteModal';
import { AiFillHome, AiOutlineStar, AiOutlineBarChart } from 'react-icons/ai'; 
import './sidebar.scss';

const Sidebar = ({ onSelectCommunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalDeleteOpen, setConfirmModalDeleteOpen] = useState(false);
  const [communityToDelete, setCommunityToDelete] = useState(null); // Stocker l'ID de la communauté à supprimer
  const dispatch = useDispatch();
  const { communities, status, error } = useSelector((state) => state.communities);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (communities && communities.length > 0) {
      communities.forEach((community) => {
        dispatch(fetchPostsByCommunity(community.id));
      });
    }
  }, [dispatch, communities]);

  const handleCreateCommunity = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectCommunity = (community) => {
    console.log('Selected community:', community); // Log to verify
    onSelectCommunity(community);
  };

  // Ouvre le modal de confirmation pour supprimer la communauté
  const handleDeleteClick = (communityId) => {
    setCommunityToDelete(communityId); // Stocker l'ID de la communauté
    setConfirmModalDeleteOpen(true); // Ouvrir le modal de confirmation
  };

  // Supprime la communauté après confirmation
  const handleDeleteCommunity = async () => {
    try {
      dispatch(deleteCommunityById(communityToDelete)); // Utiliser l'ID stocké
      onSelectCommunity(null); // Effacer la communauté sélectionnée après suppression
      setConfirmModalDeleteOpen(false); // Fermer le modal
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  return (
    <div className="sidebar">
 <nav className="sidebar-nav">
        <ul>
          <li>
            <AiFillHome className="icon" />
            <a href="/">Home</a>
          </li>
          <li>
            <AiOutlineStar className="icon" />
            <a href="/popularity">Popularity</a>
          </li>
          <li>
            <AiOutlineBarChart className="icon" />
            <a href="/recent-activities">Recent Activities</a>
          </li>
        </ul>
      </nav>

      <button className="create-community-button" onClick={handleCreateCommunity}>
        Create Community
      </button>
      <div className="communities-list">
        <h3>Recent Communities</h3>
        {status === 'loading' && <p>Loading communities...</p>}
        {status === 'succeeded' && communities.length > 0 ? (
          communities.map((community) => (
            <div key={community.id} className="community-item" onClick={() => handleSelectCommunity(community)}>
              <span className="community-title">{community.title}</span>
              <p className="community-description">{community.description}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteClick(community.id); // Ouvre le modal pour confirmation
                }}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No communities found.</p>
        )}
        {status === 'failed' && <p>Error fetching communities: {error}</p>}
      </div>
      {isModalOpen && <CreateCommunityModal isOpen={isModalOpen} onClose={handleCloseModal} />}

      {/* Modal de confirmation de suppression */}
      <DeleteModal
        isOpen={isConfirmModalDeleteOpen}
        onClose={() => setConfirmModalDeleteOpen(false)} // Ferme le modal sans supprimer
        onConfirm={handleDeleteCommunity} // Confirme et supprime
      />
    </div>
  );
};

export default Sidebar;
