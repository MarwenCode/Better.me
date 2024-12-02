import React, { useState, useEffect } from "react";
import CreateCommunityModal from "../createCommunityModal/CreateCommunityModal";
import DeleteModal from "./DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunities, deleteCommunityById } from "../../redux/communitySlice/communitySlice";
import { useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineStar, AiOutlineBarChart, AiOutlineDelete } from "react-icons/ai";
import "./sidebar.scss";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalDeleteOpen, setConfirmModalDeleteOpen] = useState(false);
  const [communityToDelete, setCommunityToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Pour naviguer vers une autre page
  const { communities, status, error } = useSelector((state) => state.communities);

  // Charger les communautés au montage
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  // Ouvrir la modal de création de communauté
  const handleCreateCommunity = () => {
    setIsModalOpen(true);
  };

  // Fermer la modal de création de communauté
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Gestion de la suppression de communauté
  const handleDeleteClick = (communityId) => {
    setCommunityToDelete(communityId);
    setConfirmModalDeleteOpen(true);
  };

  const handleDeleteCommunity = async () => {
    try {
      dispatch(deleteCommunityById(communityToDelete));
      setConfirmModalDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting community:", error);
    }
  };

  // Naviguer vers une page de communauté
  const handleNavigateToCommunity = (communityId) => {
    navigate(`/community/${communityId}`);
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
        {status === "loading" && <p>Loading communities...</p>}
        {status === "succeeded" && communities.length > 0 ? (
          communities.map((community) => (
            <div key={community.id} className="community-item">
              <div
                className="community-info"
                onClick={() => handleNavigateToCommunity(community.id)} // Naviguer vers la communauté
              >
                <span className="community-title">{community.title}</span>
                <p className="community-description">{community.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Empêche la navigation lors de la suppression
                  handleDeleteClick(community.id);
                }}
                className="delete-btn"
              >
                <AiOutlineDelete className="delete-icon" />
              </button>
            </div>
          ))
        ) : (
          <p>No communities found.</p>
        )}
        {status === "failed" && <p>Error fetching communities: {error}</p>}
      </div>

      {/* Modal de création de communauté */}
      {isModalOpen && <CreateCommunityModal isOpen={isModalOpen} onClose={handleCloseModal} />}

      {/* Modal de confirmation de suppression */}
      <DeleteModal
        isOpen={isConfirmModalDeleteOpen}
        onClose={() => setConfirmModalDeleteOpen(false)}
        onConfirm={handleDeleteCommunity}
        type="community" // Pass "community" to the DeleteModal
      />
    </div>
  );
};

export default Sidebar;
