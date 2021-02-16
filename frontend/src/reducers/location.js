import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  project_category: '',
  storiesIntro: '',
};

export const location = createSlice({
  name: 'location',
  initialState: initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },

    setProjectCategory: (state, action) => {
      state.project_category = action.payload;
    },

    setStoriesIntro: (state, action) => {
      state.storiesIntro = action.payload;
    },
  },
});
