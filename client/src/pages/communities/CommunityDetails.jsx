import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal';
import Posts from '../../components/posts/Posts';
import './communitydetails.scss';

const CommunityDetails = ({ community }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!community) {
    return <p>No community data available.</p>;
  }

  return (
    <div className='communityDetails'>
      <div className="top">
        <div className="leftSide">
          <button onClick={handleOpenModal}>+ Create a Post</button>
        </div>
        <div className="rightSide">
          <h1>{community.title}</h1>
          <p>{community.description}</p>
        </div>
      </div>

      <div className="down">
        <div className="leftSide">
          <Posts communityId={community.id} /> {/* Pass communityId as a prop */}
        </div>
        <div className="rightSide">
          <h3>{community.title}</h3>
          <p>{community.description}</p>
          <span>Members number</span>
        </div>
      </div>

      {isModalOpen && <CreatePostModal isOpen={isModalOpen} onClose={handleCloseModal} communityId={community.id} />}
    </div>
  );
};

export default CommunityDetails;




