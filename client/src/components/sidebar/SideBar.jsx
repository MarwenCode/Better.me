import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateCommunityModal from '../../pages/communities/CreateCommunityModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '../../redux/communitySlice/communitySlice';
import './sidebar.scss';

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { communities, status } = useSelector((state) => state.communities);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  const handleCreateCommunity = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
            <div key={community.id} className="community-item">
              <img className="community-image" src={community.imageUrl} alt={community.title} />
              <span className="community-title">{community.title}</span>
            </div>
          ))
        ) : (
          <p>No communities found.</p>
        )}
        {status === 'failed' && <p>Error fetching communities.</p>}
      </div>
      <div className="home-link">
        <Link to="/">Home</Link>
      </div>
      {isModalOpen && <CreateCommunityModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;

