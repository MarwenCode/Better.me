import React, { useState } from "react";
import CreatePostModal from "../createPostModal/CreatePostModal";
import Posts from "../posts/Posts";
import "./communitydetails.scss";

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
    <div className="communityDetails">
     
        <div className="items">
          <button onClick={handleOpenModal} className="createPost">+ Create a Post</button>
       
   
      </div>
      <div className="left">
        <Posts communityId={community.id} />
      </div>
   

      {isModalOpen && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          communityId={community.id}
        />
      )}
    </div>
  );
};

export default CommunityDetails;
