import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../../redux/postSlice/postSlice';
import { fetchCommentsByPost, createComment } from '../../redux/commentSlice/commentSlice';
import { useParams } from 'react-router-dom';
import './postdetails.scss';

const PostDetails = () => {
  const { id: postId } = useParams(); // Get the post ID from the URL
  const dispatch = useDispatch();
  const { post, status: postStatus, error: postError } = useSelector((state) => state.posts);
  const { comments, status: commentsStatus, error: commentsError } = useSelector((state) => state.comments);

  const [commentContent, setCommentContent] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Récupérer les informations de l'utilisateur
  const userId = user ? user.id : null; // Assurez-vous que l'ID de l'utilisateur est disponible
  console.log(userId);

  // Log to verify the fetched post ID
  console.log('Post ID from URL:', postId);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId)); // Call the action to fetch the post by ID
      dispatch(fetchCommentsByPost(postId)); // Call the action to fetch the comments by post ID
    }
  }, [dispatch, postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentContent.trim() === '') {
      alert('Comment content cannot be empty');
      return;
    }
    if (!userId) {
      alert('User ID is required');
      return;
    }
    dispatch(createComment({ postId, userId, content: commentContent }));
    setCommentContent(''); // Clear the comment input after submission
  };

  if (postStatus === 'loading' || commentsStatus === 'loading') {
    return <p>Loading post details...</p>;
  }

  if (postStatus === 'failed' || commentsStatus === 'failed') {
    return <p>Error loading post details: {postError || commentsError}</p>;
  }

  // Check if the post is defined before trying to access its properties
  if (!post) {
    console.log('Post not found.'); // Log if the post is not found
    return <p>Post not found.</p>;
  }

  // Log to verify the fetched post details
  console.log('Fetched Post:', post);

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}</p>
      {/* Display comments */}
      <h3>Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p>{comment.content}</p>
              <p><strong>Created at:</strong> {new Date(comment.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
      {/* Comment form */}
      <h3>Add a Comment</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write your comment here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostDetails;
