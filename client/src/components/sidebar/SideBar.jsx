import React, { useState, useEffect } from 'react';
import CreateCommunityModal from '../createCommunityModal/CreateCommunityModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities, deleteCommunityById } from '../../redux/communitySlice/communitySlice';
import { fetchPostsByCommunity } from '../../redux/postSlice/postSlice';
import './sidebar.scss';

const Sidebar = ({ onSelectCommunity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleDeleteCommunity = async (communityId) => {
    try {
      dispatch(deleteCommunityById(communityId));
      onSelectCommunity(null); // Clear the selected community after deletion
    } catch (error) {
      console.error('Error deleting community:', error);
    }
  };

  return (
    <div className="sidebar">
      <button className="create-community-button" onClick={handleCreateCommunity}>
        Create Community
      </button>
      <div className="communities-list">
        {status === 'loading' && <p>Loading communities...</p>}
        {status === 'succeeded' && communities.length > 0 ? (
          communities.map((community) => (
            <div key={community.id} className="community-item" onClick={() => handleSelectCommunity(community)}>
              <span className="community-title">{community.title}</span>
              <p className="community-description">{community.description}</p>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteCommunity(community.id); }}>Delete</button>
            </div>
          ))
        ) : (
          <p>No communities found.</p>
        )}
        {status === 'failed' && <p>Error fetching communities: {error}</p>}
      </div>
      {isModalOpen && <CreateCommunityModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;




