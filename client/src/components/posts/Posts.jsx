import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByCommunity } from '../../redux/postSlice/postSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Assurez-vous que Link est importé
import './posts.scss';

const Posts = ({ communityId }) => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (communityId) {
      dispatch(fetchPostsByCommunity(communityId));
    }
  }, [dispatch, communityId]);

  const handleShareClick = (postId) => {
    const shareUrl = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Post URL copied to clipboard!');
  };

  if (status === 'loading') {
    return <p>Loading posts...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading posts: {error}</p>;
  }

  return (
    <div className="posts">
      <h2>Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                <strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}
              </p>
              <div className="post-actions">
                {/* Lien vers PostDetails avec l'ID du post */}
                <Link to={`/post/${post.id}`} className="comment-btn">
                  <FontAwesomeIcon icon={faComment} /> Comment
                </Link>
                <button className="share-btn" onClick={() => handleShareClick(post.id)}>
                  <FontAwesomeIcon icon={faShareAlt} /> Share
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Posts;




