import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsByCommunity } from '../../redux/postSlice/postSlice';
import './posts.scss';

const Posts = ({ communityId }) => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (communityId) {
      dispatch(fetchPostsByCommunity(communityId));
    }
  }, [dispatch, communityId]);

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
              <p><strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}</p>
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
