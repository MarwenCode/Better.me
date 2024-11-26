import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/SideBar";
import { fetchPostsByUser } from "../../redux/postSlice/postSlice";
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./home.scss";

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
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchPostsByUser(user.id));
    }
  }, [dispatch, user?.id]);

  return (
<div className="home-container">
  <aside className="left-section">
    <Sidebar />
  </aside>

  <main className="center-section">
    <header className="profile-header">
      <h2>{user?.username}</h2>
    </header>

    <section className="user-posts">
      <h2>My Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>
                <strong>Created at:</strong> {new Date(post.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </section>
  </main>

  <aside className="right-section">
    {[
      { icon: "fas fa-cog", label: "Settings" },
      { icon: "fas fa-share-alt", label: "Social Media" },
      { icon: "fas fa-user", label: "Biography" },
      { icon: "fas fa-users", label: "Followers" },
      { icon: "fas fa-envelope", label: "Messages" },
      { icon: "fas fa-bell", label: "Notifications" },
      { icon: "fas fa-adjust", label: "Theme" },
    ].map((item, index) => (
      <div className="icon-item" key={index}>
        <i className={item.icon} title={item.label}></i>
        <span>{item.label}</span>
      </div>
    ))}
  </aside>
</div>

  );
};

export default Home;
