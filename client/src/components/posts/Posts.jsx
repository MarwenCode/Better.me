import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByCommunity } from '../../redux/postSlice/postSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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
