import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/SideBar';
import CommunityDetails from '../../pages/communities/CommunityDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '../../redux/communitySlice/communitySlice';
import './communities.scss';

const Communities = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const dispatch = useDispatch();
  const { communities, status } = useSelector((state) => state.communities);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCommunities());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (communities.length > 0 && !selectedCommunity) {
      // Sélectionner automatiquement la première communauté si aucune n'est sélectionnée
      setSelectedCommunity(communities[0]);
    }
  }, [communities, selectedCommunity]);

  return (
    <div className="communities">
      <div className="sidebar">
        <Sidebar onSelectCommunity={setSelectedCommunity} />
      </div>
      <div className="content">
        {selectedCommunity ? (
          <CommunityDetails community={selectedCommunity} />
        ) : (
          <p>Select a community to view details.</p>
        )}
      </div>
    </div>
  );
};

export default Communities;
