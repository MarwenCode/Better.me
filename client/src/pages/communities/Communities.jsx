import React, { useState, useEffect } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import CommunityDetails from '../../components/communityDetails/CommunityDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '../../redux/communitySlice/communitySlice'; 
import { fetchPostsForAllCommunities } from '../../redux/postSlice/postSlice';
import Posts from '../../components/posts/Posts';
import './communities.scss';

const Communities = () => {
  const { posts, status: postStatus } = useSelector((state) => state.posts);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const dispatch = useDispatch();
  const { communities, status: communityStatus } = useSelector((state) => state.communities);

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([])
  

  console.log(communities)

  useEffect(() => {
    if (communityStatus === 'idle') {
      dispatch(fetchCommunities());
    }
    if (postStatus === 'idle') {
      dispatch(fetchPostsForAllCommunities()); // Assurez-vous d'appeler correctement
    }
  }, [dispatch, communityStatus, postStatus]);

  useEffect(() => {
    if (communities.length > 0 && !selectedCommunity) {
      // Sélectionner automatiquement la première communauté si aucune n'est sélectionnée
      setSelectedCommunity(communities[0]);
    }
  }, [communities, selectedCommunity]);

  useEffect(() => {
    if (posts.length > 0 ) {
      setAllPosts(posts);
      setFilteredPosts(posts);
    }
  });

  useEffect(() => {
    if (selectedCommunity) {
      const filtered = allPosts.filter(post => post.communityId === selectedCommunity.id);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(allPosts); // Affiche tous les posts par défaut
    }
  }, [selectedCommunity, allPosts]);




  return (
    <div className="communities">
      <div className="sidebar">
        <SideBar onSelectCommunity={setSelectedCommunity} />
      </div>
      <div className="content">
        {selectedCommunity ? (
          <CommunityDetails community={selectedCommunity} />
        ) : (
          <Posts posts={filteredPosts} />
        )}
      </div>
    </div>
  );
};

export default Communities;
