// postSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.post;
    } catch (error) {
      console.error("Error in createPost thunk:", error);
      return rejectWithValue(error.response?.data || "An unknown error occurred");
    }
  }
);

// Delete a post by ID
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      return response.data; // Optionally, use response data for further confirmation
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



// Fetch posts by community
export const fetchPostsByCommunity = createAsyncThunk(
  'posts/fetchPostsByCommunity',
  async (community_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/community/${community_id}`);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//fetch posts for all communities 
export const fetchPostsForAllCommunities = createAsyncThunk(
  'posts/fetchPostsForAllCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/');
      return response.data.posts;
      } catch (error) {
        return rejectWithValue(error.response.data);
        }
        }
)


// Fetch posts by user
export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchPostsByUser',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/user/${user_id}`);
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Action to fetch a specific post by ID
export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (postId) => {
  const response = await axios.get(`http://localhost:5000/api/posts/post/${postId}`);
  return response.data.post; // Ensure the response contains the post
});


const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchPostsByCommunity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostsByCommunity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPostsForAllCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("All Posts Fetched:", action.payload); // Log pour vérifier les posts
        state.posts = action.payload.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("User Posts Fetched:", action.payload); 
        state.posts = action.payload.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      })

        // Gestion de fetchPostById
        .addCase(fetchPostById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPostById.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.post = action.payload; // Stocker le post récupéré
        })
        .addCase(fetchPostById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        //delete post
        .addCase(deletePost.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.posts = state.posts.filter((post) => post.id !== action.meta.arg); // Using postId passed to the thunk
        })
        
      
  },
});

export default postSlice.reducer;


