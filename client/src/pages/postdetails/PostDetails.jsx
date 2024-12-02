// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPostById } from '../../redux/postSlice/postSlice';
// import { fetchCommentsByPost, createComment } from '../../redux/commentSlice/commentSlice';
// import { useParams } from 'react-router-dom';
// import './postdetails.scss';
// import SideBar from '../../components/sidebar/SideBar';

// const PostDetails = () => {
//   const { id: postId } = useParams(); // Get the post ID from the URL
//   const dispatch = useDispatch();
//   const { post, status: postStatus, error: postError } = useSelector((state) => state.posts);
//   const { comments, status: commentsStatus, error: commentsError } = useSelector((state) => state.comments);

//   const [commentContent, setCommentContent] = useState('');
//   const user = JSON.parse(localStorage.getItem('user')); // Récupérer les informations de l'utilisateur
//   const userId = user ? user.id : null; // Assurez-vous que l'ID de l'utilisateur est disponible

//   useEffect(() => {
//     if (postId) {
//       dispatch(fetchPostById(postId)); // Call the action to fetch the post by ID
//       dispatch(fetchCommentsByPost(postId)); // Call the action to fetch the comments by post ID
//     }
//   }, [dispatch, postId]);

//   const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     if (commentContent.trim() === '') {
//       alert('Comment content cannot be empty');
//       return;
//     }
//     if (!userId) {
//       alert('User ID is required');
//       return;
//     }
//     dispatch(createComment({ postId, userId, content: commentContent }));
//     setCommentContent(''); // Clear the comment input after submission
//   };

//   if (postStatus === 'loading' || commentsStatus === 'loading') {
//     return <p>Loading post details...</p>;
//   }

//   if (postStatus === 'failed' || commentsStatus === 'failed') {
//     return <p>Error loading post details: {postError || commentsError}</p>;
//   }

//   if (!post) {
//     return <p>Post not found.</p>;
//   }

//   return (
//     <div className="post-details">
//     <h2>{post.title}</h2>
//     <p>{post.content}</p>
//     <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}</p>
  
//     <h3>Comments</h3>
//     <div className="comments">
//       {comments.length > 0 ? (
//         comments.map((comment) => (
//           <div key={comment.id} className="comment-item">
//             <div className="avatar"></div> {/* Placeholder for profile picture */}
//             <div className="comment-content">
//               <div className="username">Username</div> {/* Replace with actual username */}
//               <div className="text">{comment.content}</div>
//               <div className="comment-date">{new Date(comment.created_at).toLocaleString()}</div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No comments available.</p>
//       )}
//     </div>
  
//     <h3>Add a Comment</h3>
//     <form onSubmit={handleCommentSubmit}>
//       <div className="avatar"></div> {/* Placeholder for current user's profile picture */}
//       <textarea
//         value={commentContent}
//         onChange={(e) => setCommentContent(e.target.value)}
//         placeholder="Write your comment here..."
//         required
//       />
//       <button type="submit">Submit</button>
//     </form>
//   </div>
  
//   );
// };

// export default PostDetails;

