// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./authSlice/authSlice";
import journeyReducer from "./journeySlice/journeySlice";
// import stepReducer from "./stepSlice/stepSlice"
import communityReducer from './communitySlice/communitySlice';
import postReducer from "./postSlice/postSlice";
import commentReducer from "./commentSlice/commentSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    journeys: journeyReducer,
    // steps: stepReducer,
    communities: communityReducer,
    posts: postReducer,
    comments: commentReducer,
  },
});


export default store;