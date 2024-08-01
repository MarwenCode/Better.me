import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Créer une communauté
export const createCommunity = createAsyncThunk(
  'communities/createCommunity',
  async (communityData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/communities', communityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.community;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Obtenir toutes les communautés
export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/communities');
      return response.data.communities;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Supprimer une communauté par ID
export const deleteCommunityById = createAsyncThunk(
  'communities/deleteCommunityById',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/communities/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Obtenir une communauté par ID
export const fetchCommunityById = createAsyncThunk(
  'communities/fetchCommunityById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/communities/${id}`);
      return response.data.community;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    communities: [],
    community: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommunity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCommunity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities.push(action.payload);
      })
      .addCase(createCommunity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchCommunityById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.community = action.payload;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteCommunityById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCommunityById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.communities = state.communities.filter(community => community.id !== action.payload);
        state.community = null;
      })
      .addCase(deleteCommunityById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      
  },
});

export default communitySlice.reducer;



