import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/SideBar';
import { fetchPostsByUser } from '../../redux/postSlice/postSlice';
import './home.scss';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log(posts);
  console.log(user);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);


  useEffect(() => {
    if (user?.id) {
       dispatch(fetchPostsByUser(user.id))
    }
  }, [dispatch, user?.id]);



  return (
    <div className="home-container">
      <div className="left-section">
      
        <div className="recent-communities">
          <h2>Recent Communities</h2>
          {/* Add code to show recent communities */}

          <button> + create a community</button>
          <div className="show">
           <p> show recent communities</p>
           <img src="" alt="" />
        <span>   title communities 1</span>
        <span>   title communities 2</span>
        <span>   title communities 3</span>

          </div>
        </div>
      </div>

    
      <div className="center-section">
        <div className="profile-header">
          <h2>{user?.username}</h2>
        </div>
        <button>Create a Post</button>
        <div className="user-posts">
          <h2>My Posts</h2>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
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
      </div>
  

      <div className="right-section">
  <div className="profile-settings">
    <h2>Settings</h2>
    <button>Edit Profile</button>
  </div>
  
  <div className="social-media">
    <h2>Social Media Links</h2>
    <button>+ Add Social Link</button>
    {/* Example of social media links */}
    <div className="social-links">
      <a href="#" target="_blank">Facebook</a>
      <a href="#" target="_blank">Twitter</a>
      <a href="#" target="_blank">LinkedIn</a>
    </div>
  </div>
  
  <div className="biography">
    <h2>Biography</h2>
    <p>This is a short biography of the user. You can add a brief description here.</p>
  </div>
  
  <div className="followers">
    <h2>Followers</h2>
    <p>500 Followers</p>
  </div>
</div>

    </div>
  );
};

export default Home;
