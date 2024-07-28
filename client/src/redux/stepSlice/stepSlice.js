// // src/redux/stepSlice/stepSlice.js

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Fetch steps for a specific journey
// export const fetchSteps = createAsyncThunk(
//   'steps/fetchSteps',
//   async (goal_id) => {
//     const response = await axios.get(`http://localhost:5000/api/journeys/steps/${goal_id}`);
//     return response.data.steps;
//   }
// );

// // Add a new step
// export const addStep = createAsyncThunk(
//   'steps/addStep',
//   async ({ goal_id, description }) => {
//     const response = await axios.post('http://localhost:5000/api/journeys/steps', { goal_id, description });
//     return response.data.step;
//   }
// );

// const stepSlice = createSlice({
//   name: 'steps',
//   initialState: {
//     steps: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSteps.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchSteps.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.steps = action.payload;
//       })
//       .addCase(fetchSteps.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addStep.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addStep.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.steps.push(action.payload);
//       })
//       .addCase(addStep.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default stepSlice.reducer;

