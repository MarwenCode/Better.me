import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsByCommunity,
  createPost, // Action pour créer un post
} from "../../redux/postSlice/postSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./posts.scss";

const Posts = ({ communityId }) => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Charger les posts de la communauté
  useEffect(() => {
    if (communityId) {
      dispatch(fetchPostsByCommunity(communityId));
    }
  }, [dispatch, communityId]);

  // Soumission du formulaire pour créer un post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      alert("Title and content are required!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur
    const userId = user ? user.id : null;

    if (!userId) {
      alert("You must be logged in to create a post.");
      return;
    }

    dispatch(createPost({ communityId, title: newPostTitle, content: newPostContent, userId }));
    setNewPostTitle(""); // Réinitialiser les champs
    setNewPostContent("");
  };

  const handleShareClick = (postId) => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Post URL copied to clipboard!");
  };

  if (status === "loading") {
    return <p>Loading posts...</p>;
  }

  if (status === "failed") {
    return <p>Error loading posts: {error}</p>;
  }

  return (
    <div className="posts">
      <h2>Posts</h2>
      {/* Formulaire de création de post */}
      <form className="create-post-form" onSubmit={handleCreatePost}>
        <input
          type="text"
          placeholder="Post Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your post here..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>

      {posts.length > 0 ? (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <h3 className="post-title">{post.title}</h3>
                <span className="post-date">{new Date(post.created_at).toLocaleString()}</span>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="post-actions">
                <Link to={`/post/${post.id}`} className="comment-btn">
                  <FontAwesomeIcon icon={faComment} /> 
                </Link>
                <button className="share-btn" onClick={() => handleShareClick(post.id)}>
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;
