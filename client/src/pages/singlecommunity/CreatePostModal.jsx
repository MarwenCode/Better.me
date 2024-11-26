import React, { useState } from "react";
import "./createPostModal.scss"

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("Title and content are required!");
      return;
    }
    // Appel de la fonction onSubmit avec les données du formulaire
    onSubmit({ title, content });
    setTitle(""); // Réinitialiser le champ du titre
    setContent(""); // Réinitialiser le champ de contenu
  };

  // Si le modal n'est pas ouvert, on ne le rend pas
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Post Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />
  <textarea
    placeholder="Write your post here..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
    required
  />
  <div className="modal-actions">
    <button type="submit" disabled={!title.trim() || !content.trim()}>
      Create Post
    </button>
    <button type="button" onClick={onClose}>
      Cancel
    </button>
  </div>
</form>
form>
      </div>
    </div>
  );
};

export default CreatePostModal;
