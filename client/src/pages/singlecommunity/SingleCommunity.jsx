import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsByCommunity,
  createPost,
} from "../../redux/postSlice/postSlice";
import { fetchCommunityById } from "../../redux/communitySlice/communitySlice";
import CreatePostModal from "./CreatePostModal";
import "./singlecommunity.scss";

const SingleCommunity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Sélectionner les données depuis le store
  const { selectedCommunity, status: communityStatus, error: communityError } = useSelector(
    (state) => state.communities
  );
  const { posts, status: postsStatus, error: postsError } = useSelector((state) => state.posts);

  // État pour gérer l'ouverture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les détails de la communauté et ses posts
  useEffect(() => {
    dispatch(fetchCommunityById(id));
    dispatch(fetchPostsByCommunity(id));
  }, [dispatch, id]);

  // Gestion de la création du post
  const handleCreatePost = async ({ title, content }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
  
    if (!userId) {
      alert("You must be logged in to create a post.");
      return;
    }
  
    const formData = new FormData();
    formData.append("community_id", id); // ID de la communauté
    formData.append("user_id", userId); // ID utilisateur
    formData.append("title", title); // Titre
    formData.append("content", content); // Contenu
  
    try {
      await dispatch(createPost(formData)).unwrap(); // Appel à Redux et gestion des erreurs
      setIsModalOpen(false); // Fermer le modal
    } catch (error) {
      console.error("Failed to create post:", error);
      alert(error?.message || "Failed to create the post.");
    }
  };
  


  return (
    <div className="single-community">
      {/* Détails de la communauté */}
      {communityStatus === "loading" && <p>Loading community details...</p>}
      {communityStatus === "succeeded" && selectedCommunity ? (
        <div className="community-details">
          <h1>{selectedCommunity.title}</h1>
          <p>{selectedCommunity.description}</p>
        </div>
      ) : (
        communityStatus === "failed" && <p>Error: {communityError}</p>
      )}

      {/* Bouton pour ouvrir le modal */}
      <div className="add-post">
        <button onClick={() => setIsModalOpen(true)}>+ Add Post</button>
      </div>

      {/* Modal de création de post */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />

      {/* Liste des posts */}
      <div className="community-posts">
        <h2>Posts</h2>
        {postsStatus === "loading" && <p>Loading posts...</p>}
        {postsStatus === "succeeded" && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p className="post-date">Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          postsStatus === "succeeded" && <p>No posts found for this community.</p>
        )}
        {postsStatus === "failed" && <p>Error: {postsError}</p>}
      </div>
    </div>
  );
};

export default SingleCommunity;
