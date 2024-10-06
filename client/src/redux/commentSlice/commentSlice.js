import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Créer un commentaire
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ postId, userId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        post_id: postId,
        user_id: userId,
        content
      });
      return response.data.comment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Récupérer les commentaires par post
export const fetchCommentsByPost = createAsyncThunk(
  'comments/fetchCommentsByPost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/post/${postId}`);
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Lors de la création d'un commentaire
      .addCase(createComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Lors de la récupération des commentaires par post
      .addCase(fetchCommentsByPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;

