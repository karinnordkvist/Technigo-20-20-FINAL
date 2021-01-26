import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  project_category: '',
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
  },
});
