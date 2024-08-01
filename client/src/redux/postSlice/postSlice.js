import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

// // Fetch comments by post
// export const fetchCommentsByPost = createAsyncThunk(
//   'comments/fetchCommentsByPost',
//   async (post_id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/comments/${post_id}`);
//       return response.data.comments;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      // .addCase(fetchPostsByCommunity.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })
      // .addCase(fetchCommentsByPost.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.comments = action.payload;
      // })
      // .addCase(fetchCommentsByPost.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // });
  },
});

export default postSlice.reducer;

