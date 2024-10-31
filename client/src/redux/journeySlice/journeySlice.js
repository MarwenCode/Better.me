import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all journeys for a specific user
export const fetchOwnJourneys = createAsyncThunk(
  'journeys/fetchOwnJourneys',
  async (user_id) => {
    const response = await axios.get('http://localhost:5000/api/journeys/own', {
      params: { user_id }
    });
    return response.data.journeys;
  }
);

// Create a new journey
export const createJourney = createAsyncThunk(
  'journeys/createJourney',
  async ({ title, description, user_id }) => {
    const response = await axios.post('http://localhost:5000/api/journeys', {
      title,
      description,
      user_id
    });
    return response.data.journey;
  }
);

// Fetch a specific journey by ID
export const fetchJourneyById = createAsyncThunk(
  'journeys/fetchJourneyById',
  async (id) => {
    const response = await axios.get(`http://localhost:5000/api/journeys/${id}`);
    return response.data.goal;
  }
);

// Update a specific journey
export const updateJourney = createAsyncThunk(
  'journeys/updateJourney',
  async ({ id, title, description, image, steps }) => {
    const response = await axios.put(`http://localhost:5000/api/journeys/${id}`, {
      title,
      description,
      image,
      steps
    });
    return response.data.journey;
  }
);

// Fetch steps for a specific journey
export const fetchSteps = createAsyncThunk(
  'journeys/fetchSteps',
  async (goal_id) => {
    const response = await axios.get(`http://localhost:5000/api/journeys/steps/${goal_id}`);
    return response.data.steps;
  }
);

// Add a new step
export const addStep = createAsyncThunk(
  'journeys/addStep',
  async ({ goal_id, description }) => {
    const response = await axios.post('http://localhost:5000/api/journeys/steps', { goal_id, description });
    return response.data.step;
  }
);

// Update a step
export const updateStep = createAsyncThunk(
  'journeys/updateStep',
  async (step) => {
    const response = await axios.put('http://localhost:5000/api/journeys/steps', step);
    return response.data.step;
  }
);

// Toggle step completion
export const toggleStepCompletion = createAsyncThunk(
  'journeys/toggleStepCompletion',
  async ({ step_id, goal_id, completed }) => {
    const response = await axios.put('http://localhost:5000/api/journeys/steps/toggle', { step_id, goal_id, completed });
    return response.data;
  }
);


// Delete a step
export const deleteStep = createAsyncThunk(
  'journeys/deleteStep',
  async (step_id) => {
    await axios.delete(`http://localhost:5000/api/journeys/steps/${step_id}`);
    return step_id;
  }
);

export const deleteJourney = createAsyncThunk(
  'journeys/deleteJourney',
  async (journeyId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/journeys/${journeyId}`);
      
      // Retourner la réponse avec le goal_id du journey supprimé
      return response.data;  // Cela contient { goal_id: journeyId }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);







const journeySlice = createSlice({
  name: 'journeys',
  initialState: {
    journeys: [],
    journey: null, // To store a specific journey fetched by ID
    steps: [], // To store steps related to the journey
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnJourneys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOwnJourneys.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.journeys = action.payload;
      })
      .addCase(fetchOwnJourneys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createJourney.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createJourney.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.journeys.push(action.payload); // Add new journey to the list
      })
      .addCase(createJourney.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchJourneyById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJourneyById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.journey = action.payload; // Store the fetched journey details
      })
      .addCase(fetchJourneyById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateJourney.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJourney.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the journey in the list if needed
        const updatedJourney = action.payload;
        state.journeys = state.journeys.map(journey =>
          journey.goal_id === updatedJourney.goal_id ? updatedJourney : journey
        );
        state.journey = updatedJourney; // Update the specific journey details
      })
      .addCase(updateJourney.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSteps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.steps = action.payload;
      })
      .addCase(fetchSteps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addStep.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.steps.push(action.payload);
      })
      .addCase(addStep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateStep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStep.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the step in the list if needed
        const updatedStep = action.payload;
        state.steps = state.steps.map(step =>
          step.step_id === updatedStep.step_id ? updatedStep : step
        );
      })
      .addCase(updateStep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteStep.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the step from the list
        const stepIdToRemove = action.payload;
        state.steps = state.steps.filter(step => step.step_id !== stepIdToRemove);
      })
      .addCase(deleteStep.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteJourney.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Filtrer les journeys pour exclure celui qui a été supprimé
        state.journeys = state.journeys.filter(journey => journey.goal_id !== action.payload.goal_id);
    })
    
    
    
     
    

      
  },
});

export default journeySlice.reducer;






