import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByCommunity, createPost, deletePost } from "../../redux/postSlice/postSlice";
import { fetchCommunityById } from "../../redux/communitySlice/communitySlice";
import CreatePostModal from "./CreatePostModal";
import Sidebar from "../../components/sidebar/SideBar";
import DeleteModal from "../../components/sidebar/DeleteModal";
import "./singlecommunity.scss";

const SingleCommunity = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedCommunity, status: communityStatus, error: communityError } = useSelector((state) => state.communities);
  const { posts, status: postsStatus, error: postsError } = useSelector((state) => state.posts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // État pour ouvrir/fermer le modal de suppression
  const [postToDelete, setPostToDelete] = useState(null); // Stocker l'ID du post à supprimer

  useEffect(() => {
    dispatch(fetchCommunityById(id));
    dispatch(fetchPostsByCommunity(id));
  }, [dispatch, id]);

  // Gestion de la création du post
  const handleCreatePost = ({ title, content }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    if (!userId) {
      alert("You must be logged in to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("community_id", id);
    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("content", content);

    dispatch(createPost(formData))
      .then(() => {
        setIsModalOpen(false);
        dispatch(fetchPostsByCommunity(id)); // Recharger les posts
      })
      .catch((error) => {
        console.error("Failed to create post:", error);
        alert(error?.response?.data?.error || "Failed to create the post.");
      });
  };

  // Gestion de la suppression du post
  const handleDeletePost = () => {
    if (postToDelete) {
      dispatch(deletePost(postToDelete)) // Dispatch de la suppression
        .then(() => {
          dispatch(fetchPostsByCommunity(id)); // Recharger les posts après suppression
          setIsDeleteModalOpen(false); // Fermer le modal après suppression
        })
        .catch((error) => {
          console.error("Failed to delete post:", error);
        });
    }
  };

  const openDeleteModal = (postId) => {
    setPostToDelete(postId); // Stocke l'ID du post à supprimer
    setIsDeleteModalOpen(true); // Ouvre le modal de confirmation
  };

  return (
    <div className="single-community-container">
      <Sidebar />

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

        {/* Bouton pour ouvrir le modal de création */}
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
          {postsStatus === "loading" && <p>Loading posts...</p>}
          {postsStatus === "succeeded" && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p className="post-date">
                  Posted on: {new Date(post.created_at).toLocaleDateString()}
                </p>
                {/* Bouton de suppression */}
                <button onClick={() => openDeleteModal(post.id)} className="delete-button">
                  Delete
                </button>
              </div>
            ))
          ) : (
            postsStatus === "succeeded" && <p>No posts found for this community.</p>
          )}
          {postsStatus === "failed" && <p>Error: {postsError}</p>}
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePost} // Passer la fonction de suppression au modal
      />
    </div>
  );
};

export default SingleCommunity;
