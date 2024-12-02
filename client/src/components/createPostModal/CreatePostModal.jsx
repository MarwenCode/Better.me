// import React, { useState } from 'react';
// import './createpostmodal.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../../redux/postSlice/postSlice';

// const CreatePostModal = ({ isOpen, onClose, communityId }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [picture, setPicture] = useState(null);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
  
//   // Récupération des informations utilisateur depuis le store Redux
//   const { user } = useSelector((state) => state.auth);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
  
//     if (!user || !user.id) {
//       setError('User ID is required');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('community_id', communityId);
//     formData.append('user_id', user.id);
//     formData.append('title', title);
//     formData.append('content', description);
  
//     if (picture) {
//       formData.append('picture', picture); // La photo est optionnelle
//     }
  
//     try {
//       await dispatch(createPost(formData)).unwrap();
//       onClose(); // Fermer le modal après la création du post
//     } catch (err) {
//       console.error('Error creating post:', err);
//       setError('Failed to create post');
//     }
//   };
  
//   if (!isOpen) return null;

//   return (
//     <div className="createpostmodal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2>Create a Post</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="title">Title</label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="picture">Picture (optional)</label>
//             <input
//               type="file"
//               id="picture"
//               onChange={(e) => setPicture(e.target.files[0])}
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="submit-button">Create Post</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePostModal;
